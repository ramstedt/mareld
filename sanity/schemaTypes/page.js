import { defineField, defineType } from 'sanity';

export const page = defineType({
  name: 'page',
  title: 'Sidor',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'navLabel',
      title: 'Navbar label',
      type: 'string',
      description: 'Optional label for the navbar. Defaults to the title.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Navbar order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'showInNavbar',
      title: 'Show in navbar',
      type: 'boolean',
      initialValue: true,
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
    select: { title: 'title', subtitle: 'slug.current' },
  },
});
