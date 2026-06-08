import { type NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * Sanity webhook endpoint for Incremental Static Regeneration (ISR).
 * 
 * Configure in Sanity Studio:
 *   URL: https://your-domain.com/api/revalidate
 *   Secret: match SANITY_REVALIDATE_SECRET in .env.local
 */
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');

  // Validate the webhook secret
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: 'Invalid revalidation secret.' },
      { status: 401 }
    );
  }

  try {
    const body = await req.json() as { _type?: string; slug?: { current?: string } };
    const type = body._type;
    const slug = body.slug?.current;

    // Revalidate based on document type
    switch (type) {
      case 'news':
        revalidatePath('/news');
        if (slug) revalidatePath(`/news/${slug}`);
        break;
      case 'subject':
        revalidatePath('/academics');
        if (slug) revalidatePath(`/academics/${slug}`);
        break;
      case 'staff':
        revalidatePath('/about');
        break;
      default:
        // Revalidate all pages for unknown types
        revalidatePath('/', 'layout');
    }

    // Also revalidate homepage (news preview)
    revalidatePath('/');

    return NextResponse.json({
      revalidated: true,
      type,
      slug,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Revalidation error:', err);
    return NextResponse.json(
      { message: 'Error processing webhook.' },
      { status: 500 }
    );
  }
}
