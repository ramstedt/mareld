import Hero from '@/components/Hero/Hero';
import { client, urlFor } from '@/lib/sanity';
import { tatuerareBySlugQuery } from '@/lib/sanityQueries';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import TattooerCalendar from '@/components/TattooerCalendar/TattooerCalendar';
import Image from 'next/image';

export default async function TatuerarePage({ params }) {
  const artist = await client.fetch(tatuerareBySlugQuery, {
    slug: params.slug,
  });

  if (!artist) {
    notFound();
  }

  const portrait = artist.portrait?.image
    ? {
        src: urlFor(artist.portrait.image).width(900).auto('format').url(),
        alt: artist.portrait.alt || artist.name,
      }
    : null;

  const heroBackground = portrait?.src || '/heroplaceholder.jpg';

  return (
    <main>
      <Hero
        text={artist.name}
        backgroundSrc={heroBackground}
        backgroundAlt={portrait?.alt || artist.name}
        foregroundSrc='/herowave.png'
        foregroundAlt='Hero wave'
      />

      <div className='px-[5%] pt-12 pb-16 md:pt-16 md:pb-20'>
        <div className='container'>
          <section className='grid items-center gap-8 border border-[color:var(--ink)]/10 bg-[color:var(--bone)]/95 p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] md:gap-12 md:p-10'>
          <div className='space-y-5'>
            <div>
              <p className='text-sm font-semibold uppercase tracking-wide text-[color:var(--ink)]/60'>
                Tatuerare
              </p>
              <h1 className='mt-2 text-4xl font-bold md:text-5xl'>
                {artist.name}
              </h1>
            </div>

            {artist.shortDescription ? (
              <p className='text-lg text-[color:var(--ink)]/80'>
                {artist.shortDescription}
              </p>
            ) : null}

            {artist.instagram || artist.facebook ? (
              <div className='flex flex-wrap gap-4 text-sm font-semibold'>
                {artist.instagram ? (
                  <a
                    href={artist.instagram}
                    className='underline underline-offset-4'
                  >
                    Instagram
                  </a>
                ) : null}
                {artist.facebook ? (
                  <a
                    href={artist.facebook}
                    className='underline underline-offset-4'
                  >
                    Facebook
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className='relative aspect-[4/5] w-full border border-[color:var(--ink)]/10 bg-[color:var(--sage)]/25'>
            {portrait ? (
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                sizes='(min-width: 768px) 40vw, 100vw'
                className='object-cover'
              />
            ) : (
              <div className='flex h-full items-center justify-center text-sm text-[color:var(--ink)]/60'>
                Ingen bild uppladdad
              </div>
            )}
          </div>
          </section>

          {artist.longDescription ? (
            <div className='mt-10 max-w-3xl'>
              <div className='prose prose-lg max-w-none'>
                <PortableText value={artist.longDescription} />
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <TattooerCalendar calendarId={artist.calendarId} />
    </main>
  );
}
