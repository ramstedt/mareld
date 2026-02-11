import { defineField, defineType } from 'sanity';

export const ourTeamBlock = defineType({
  name: 'ourTeamBlock',
  title: 'Our Team',
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
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'teamMembers',
      title: 'Team members',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'jobTitle',
              title: 'Job title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'imageWithAlt',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'email',
              title: 'Email',
              type: 'string',
            }),
            defineField({
              name: 'facebook',
              title: 'Facebook link',
              type: 'url',
            }),
            defineField({
              name: 'instagram',
              title: 'Instagram link',
              type: 'url',
            }),
            defineField({
              name: 'button',
              title: 'Button',
              type: 'button',
            }),
          ],
          preview: {
            select: { title: 'name', media: 'image.image' },
          },
        },
      ],
    }),
  ],
});
