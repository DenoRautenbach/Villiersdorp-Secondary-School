import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'news',
  title: 'News & Announcements',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Announcement', 'Achievement', 'Sports', 'Arts & Culture', 'Community', 'Academics', 'Events'],
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'A short summary shown in the news listing',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Article Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'staff' }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Article',
      type: 'boolean',
      description: 'Pin this article to the top of the homepage news section',
      initialValue: false,
    }),
    defineField({
      name: 'hidden',
      title: 'Hide from Website',
      type: 'boolean',
      description: 'Hide this item without deleting it. Use this for imported Facebook posts — deleted ones are re-imported.',
      initialValue: false,
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: { list: ['manual', 'facebook'] },
      initialValue: 'manual',
      readOnly: true,
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook Post',
      type: 'url',
      readOnly: true,
      hidden: ({ document }) => document?.source !== 'facebook',
    }),
    defineField({
      name: 'facebookPostId',
      title: 'Facebook Post ID',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
      media: 'coverImage',
    },
  },
  orderings: [
    {
      title: 'Published Date (Newest)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
});
