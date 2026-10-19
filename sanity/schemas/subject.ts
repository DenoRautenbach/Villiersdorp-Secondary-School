import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'subject',
  title: 'Academic Subject',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Subject Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: ['Languages', 'Mathematics', 'Sciences', 'Humanities', 'Commerce', 'Arts', 'Technology'],
      },
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Full Content',
      type: 'blockContent',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'teacher',
      title: 'Head Teacher',
      type: 'reference',
      to: [{ type: 'staff' }],
    }),
    defineField({
      name: 'gradeLevel',
      title: 'Grade Level',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: ['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'department',
      media: 'featuredImage',
    },
  },
});
