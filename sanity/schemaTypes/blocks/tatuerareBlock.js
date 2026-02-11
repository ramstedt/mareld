import { defineField, defineType } from 'sanity';

export const tatuerareBlock = defineType({
  name: 'tatuerareBlock',
  title: 'Tatuerare',
  type: 'object',
  fields: [
    defineField({
      name: 'auto',
      title: 'Auto',
      type: 'boolean',
      initialValue: true,
      hidden: true,
      readOnly: true,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Tatuerare block',
        subtitle: 'Auto-fetched artists',
      };
    },
  },
});
