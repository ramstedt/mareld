import { defineField, defineType } from 'sanity';

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site title',
      type: 'string',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      options: { hotspot: false },
      description: 'Square image recommended (at least 512x512).',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph image',
      type: 'imageWithAlt',
      description: 'Used for social sharing previews.',
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta title (override)',
      type: 'string',
      description: 'If set, overrides the site title in meta tags.',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description (override)',
      type: 'text',
      rows: 3,
      description: 'If set, overrides the site description in meta tags.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Settings' };
    },
  },
});
