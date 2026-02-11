import { defineField, defineType } from 'sanity';

export const tatuerare = defineType({
  name: 'tatuerare',
  title: 'Tatuerare',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram link',
      type: 'url',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook link',
      type: 'url',
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait image',
      type: 'imageWithAlt',
      description: 'A portrait or studio shot of the artist.',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'longDescription',
      title: 'Long description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'calendarId',
      title: 'Google Calendar ID',
      type: 'string',
      description:
        'Så gör du: 1) Gå till calendar.google.com och skapa en ny kalender. 2) Öppna kalenderns Inställningar och delning. 3) Markera “Gör tillgänglig för allmänheten”. 4) Under “Integrera kalender” kopiera “Kalender-ID”. 5) Klistra in det här.',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'slug.current' },
  },
});
