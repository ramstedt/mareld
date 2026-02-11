import { defineField, defineType } from 'sanity';

export const richTextBlock = defineType({
  name: 'richTextBlock',
  title: 'Rich Text',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: { title: 'content' },
    prepare({ title }) {
      return { title: 'Rich Text' };
    },
  },
});
