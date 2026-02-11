import { defineField, defineType } from 'sanity';

export const imageCarouselBlock = defineType({
  name: 'imageCarouselBlock',
  title: 'Image Carousel',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'imageWithAlt' }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
});
