import { defineField, defineType } from 'sanity';

export const textAndImageBlock = defineType({
  name: 'textAndImageBlock',
  title: 'Text + Image',
  type: 'object',
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image position',
      type: 'string',
      description: 'Desktop position. On mobile the image stacks vertically.',
      options: {
        list: [
          { title: 'Right (desktop) / Bottom (mobile)', value: 'right' },
          { title: 'Left (desktop) / Top (mobile)', value: 'left' },
        ],
        layout: 'radio',
      },
      initialValue: 'right',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [{ type: 'button' }],
      validation: (Rule) => Rule.max(2),
    }),
  ],
  preview: {
    select: { title: 'heading', media: 'image.image' },
    prepare({ title, media }) {
      return {
        title: title || 'Text + Image',
        media,
      };
    },
  },
});
