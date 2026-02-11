import Hero from '@/components/Hero/Hero';
import Blocks from '@/components/Blocks/Blocks';
import { client, urlFor } from '@/lib/sanity';
import { pageBySlugQuery, tatuerareListQuery } from '@/lib/sanityQueries';
import { notFound } from 'next/navigation';

const mapImage = (imageField) => {
  if (!imageField?.image) return null;
  return {
    src: urlFor(imageField.image).width(1600).auto('format').url(),
    alt: imageField.alt || '',
  };
};

const mapImages = (images = []) => images.map(mapImage).filter(Boolean);

const mapBlocks = (blocks = [], tatuerareArtists = []) =>
  (blocks || []).map((block) => {
    if (block._type === 'textAndImageBlock') {
      return {
        ...block,
        image: mapImage(block.image),
      };
    }

    if (
      block._type === 'imageCarouselBlock' ||
      block._type === 'galleryBlock'
    ) {
      return {
        ...block,
        images: mapImages(block.images),
      };
    }

    if (block._type === 'tatuerareBlock') {
      const teamMembers = (tatuerareArtists || []).map((artist) => ({
        name: artist.name,
        slug: artist.slug,
        jobTitle: 'Tatuerare',
        description: artist.shortDescription || '',
        instagram: artist.instagram,
        facebook: artist.facebook,
        image: artist.portrait?.image
          ? {
              image: artist.portrait.image,
              alt: artist.portrait.alt || artist.name,
            }
          : null,
      }));

      return {
        ...block,
        teamMembers: teamMembers.map((member) => ({
          ...member,
          image: mapImage(member.image) || {
            src: '/heroplaceholder.jpg',
            alt: member.image?.alt || member.name || '',
          },
        })),
      };
    }

    return block;
  });

export default async function Page({ params }) {
  const page = await client.fetch(pageBySlugQuery, { slug: params.slug });

  if (!page) {
    notFound();
  }

  const tatuerareArtists = await client.fetch(tatuerareListQuery);

  const hero = page.hero || {};
  const heroBackground = hero.backgroundImage
    ? urlFor(hero.backgroundImage).width(2000).auto('format').url()
    : '/heroplaceholder.jpg';

  return (
    <main>
      <Hero
        text={hero.text || page.title}
        backgroundSrc={heroBackground}
        backgroundAlt={hero.backgroundAlt || 'Hero background'}
        foregroundSrc='/herowave.png'
        foregroundAlt='Hero wave'
      />

      {page.ingress ? (
        <section className='px-[5%] py-12 md:py-16'>
          <div className='container max-w-3xl'>
            <p className='text-lg md:text-xl'>{page.ingress}</p>
          </div>
        </section>
      ) : null}

      <Blocks blocks={mapBlocks(page.blocks, tatuerareArtists)} />
    </main>
  );
}
