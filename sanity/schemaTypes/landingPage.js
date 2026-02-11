import { defineField, defineType } from 'sanity';

export const landingPage = defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Text',
          type: 'string',
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Background image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'backgroundAlt',
          title: 'Background alt text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'ingress',
      title: 'Ingress',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'blocks',
      title: 'Blocks',
      type: 'array',
      of: [
        { type: 'textAndImageBlock' },
        { type: 'faqBlock' },
        { type: 'imageCarouselBlock' },
        { type: 'galleryBlock' },
        { type: 'richTextBlock' },
        { type: 'tatuerareBlock' },
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: title || 'Landing Page' };
    },
  },
});
