import { type NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getWriteClient } from '@/lib/sanity/writeClient';
import { fetchPagePosts, getFacebookConfig, isNewsPost, postToNewsFields } from '@/lib/facebook';

// Image uploads can take a while on the first run
export const maxDuration = 60;

/**
 * Imports new Facebook Page posts as Sanity news items.
 * Called daily by the Vercel cron in vercel.json (which sends `Authorization: Bearer $CRON_SECRET`).
 * Does nothing until the Facebook and Sanity write env vars are set — see docs/facebook-sync.md.
 */
export async function GET(req: NextRequest) {
  const facebook = getFacebookConfig();
  const sanity = getWriteClient();

  if (!facebook || !sanity) {
    return NextResponse.json({ skipped: true, reason: 'Facebook sync is not configured.' });
  }

  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return NextResponse.json({ message: 'CRON_SECRET is not set.' }, { status: 500 });
  }
  if (req.headers.get('authorization') !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const posts = (await fetchPagePosts(facebook)).filter((p) => isNewsPost(p, facebook.hashtag));

    // Skip posts already imported — including ones staff have edited or hidden
    const existing = new Set(
      await sanity.fetch<string[]>(
        `*[_type == "news" && defined(facebookPostId)].facebookPostId`
      )
    );
    const newPosts = posts.filter((p) => !existing.has(p.id));

    const created: string[] = [];
    const failed: { id: string; error: string }[] = [];

    for (const post of newPosts) {
      try {
        let coverImage: { _type: 'image'; asset: { _type: 'reference'; _ref: string } } | undefined;
        if (post.full_picture) {
          const img = await fetch(post.full_picture, { cache: 'no-store' });
          if (img.ok) {
            const asset = await sanity.assets.upload('image', Buffer.from(await img.arrayBuffer()), {
              filename: `facebook-${post.id}.jpg`,
            });
            coverImage = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
          }
        }

        await sanity.createIfNotExists({
          _id: `facebook-${post.id}`,
          _type: 'news',
          ...postToNewsFields(post, facebook.hashtag),
          category: 'Announcement',
          publishedAt: new Date(post.created_time).toISOString(),
          ...(coverImage && { coverImage }),
          source: 'facebook',
          facebookPostId: post.id,
          facebookUrl: post.permalink_url,
          hidden: false,
          featured: false,
        });
        created.push(post.id);
      } catch (err) {
        failed.push({ id: post.id, error: err instanceof Error ? err.message : String(err) });
      }
    }

    if (created.length) {
      revalidatePath('/');
      revalidatePath('/news');
      revalidatePath('/news/[slug]', 'page');
    }

    return NextResponse.json({
      checked: posts.length,
      created: created.length,
      failed,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Facebook sync error:', err);
    return NextResponse.json({ message: 'Facebook sync failed.' }, { status: 500 });
  }
}
