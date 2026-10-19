/**
 * Facebook Graph API helpers for syncing the school's Page posts into Sanity news.
 * See docs/facebook-sync.md for setup.
 */

export interface FacebookPost {
  id: string;
  message?: string;
  created_time: string;
  full_picture?: string;
  permalink_url?: string;
}

export interface FacebookConfig {
  pageId: string;
  accessToken: string;
  graphVersion: string;
  hashtag: string | null;
  limit: number;
}

/** Returns null when the Facebook sync isn't configured, so callers can no-op. */
export function getFacebookConfig(): FacebookConfig | null {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  if (!pageId || !accessToken) return null;

  const hashtag = process.env.FACEBOOK_SYNC_HASHTAG?.trim();
  return {
    pageId,
    accessToken,
    graphVersion: process.env.FACEBOOK_GRAPH_VERSION ?? 'v23.0',
    hashtag: hashtag ? (hashtag.startsWith('#') ? hashtag : `#${hashtag}`) : null,
    limit: Math.min(Number(process.env.FACEBOOK_SYNC_LIMIT ?? 10) || 10, 50),
  };
}

export async function fetchPagePosts(config: FacebookConfig): Promise<FacebookPost[]> {
  const url = new URL(`https://graph.facebook.com/${config.graphVersion}/${config.pageId}/posts`);
  url.searchParams.set('fields', 'id,message,created_time,full_picture,permalink_url');
  url.searchParams.set('limit', String(config.limit));
  url.searchParams.set('access_token', config.accessToken);

  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    // Graph API errors carry a JSON body; never log the URL (it contains the token)
    const body = await res.text();
    throw new Error(`Facebook Graph API ${res.status}: ${body.slice(0, 500)}`);
  }
  const json = (await res.json()) as { data?: FacebookPost[] };
  return json.data ?? [];
}

/** Whether a post should become a news item (has text, and the hashtag if one is required). */
export function isNewsPost(post: FacebookPost, hashtag: string | null): boolean {
  if (!post.message?.trim()) return false;
  if (!hashtag) return true;
  return post.message.toLowerCase().includes(hashtag.toLowerCase());
}

function stripHashtag(text: string, hashtag: string | null): string {
  if (!hashtag) return text;
  const escaped = hashtag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(`\\s*${escaped}\\b`, 'gi'), '').trim();
}

function slugify(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
    .replace(/-+$/, '');
}

function shorten(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

let keyCounter = 0;
function key(): string {
  keyCounter += 1;
  return `fb${Date.now().toString(36)}${keyCounter.toString(36)}`;
}

/** Turns a post's text into title, excerpt and Portable Text body for the Sanity news schema. */
export function postToNewsFields(post: FacebookPost, hashtag: string | null) {
  const text = stripHashtag(post.message ?? '', hashtag);
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const firstLine = lines[0] ?? 'School update';

  // First line (or first sentence of it) becomes the title
  const firstSentence = firstLine.split(/(?<=[.!?])\s/)[0];
  const title = shorten(firstSentence, 90);
  const rest = lines.join(' ').slice(firstSentence.length).trim();

  const postSuffix = post.id.split('_').pop() ?? post.id;
  const slug = `${slugify(title) || 'nuus'}-${postSuffix.slice(-6)}`;

  const body = lines.map((line) => ({
    _type: 'block',
    _key: key(),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text: line, marks: [] }],
  }));

  return {
    title,
    slug: { _type: 'slug', current: slug },
    excerpt: shorten(rest || text, 200),
    body,
  };
}
