import { groq } from 'next-sanity';

// ───────────────────────────────────────────────
// SUBJECTS
// ───────────────────────────────────────────────

/** Fetch all subjects for the Academics page */
export const ALL_SUBJECTS_QUERY = groq`
  *[_type == "subject"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    department,
    description,
    "imageUrl": featuredImage.asset->url,
    gradeLevel
  }
`;

/** Fetch a single subject by slug */
export const SUBJECT_BY_SLUG_QUERY = groq`
  *[_type == "subject" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    department,
    description,
    body,
    "imageUrl": featuredImage.asset->url,
    gradeLevel,
    "teacher": teacher->{
      name,
      role,
      email,
      "photoUrl": photo.asset->url
    }
  }
`;

/** Get all subject slugs for generateStaticParams */
export const ALL_SUBJECT_SLUGS_QUERY = groq`
  *[_type == "subject" && defined(slug.current)][].slug.current
`;

// ───────────────────────────────────────────────
// NEWS
// ───────────────────────────────────────────────

/** Fetch all news articles */
export const ALL_NEWS_QUERY = groq`
  *[_type == "news" && hidden != true] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    publishedAt,
    excerpt,
    featured,
    "imageUrl": coverImage.asset->url,
    "author": author->{ name, role }
  }
`;

/** Fetch latest N news articles (for homepage preview) */
export const LATEST_NEWS_QUERY = groq`
  *[_type == "news" && hidden != true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    category,
    publishedAt,
    excerpt,
    "imageUrl": coverImage.asset->url
  }
`;

/** Fetch a single news article by slug */
export const NEWS_BY_SLUG_QUERY = groq`
  *[_type == "news" && hidden != true && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    publishedAt,
    excerpt,
    body,
    facebookUrl,
    "imageUrl": coverImage.asset->url,
    "author": author->{ name, role, "photoUrl": photo.asset->url }
  }
`;

/** Get all news slugs for generateStaticParams */
export const ALL_NEWS_SLUGS_QUERY = groq`
  *[_type == "news" && hidden != true && defined(slug.current)][].slug.current
`;

// ───────────────────────────────────────────────
// STAFF
// ───────────────────────────────────────────────

/** Fetch all staff members */
export const ALL_STAFF_QUERY = groq`
  *[_type == "staff"] | order(order asc, name asc) {
    _id,
    name,
    role,
    department,
    bio,
    qualifications,
    email,
    "photoUrl": photo.asset->url
  }
`;
