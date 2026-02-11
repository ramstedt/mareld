import Hero from '@/components/Hero/Hero';
import Blocks from '@/components/Blocks/Blocks';
import { client, urlFor } from '@/lib/sanity';
import { landingPageQuery, tatuerareListQuery } from '@/lib/sanityQueries';
import { notFound } from 'next/navigation';

export default async function Home() {
  const page = await client.fetch(landingPageQuery);

  if (!page) {
    notFound();
  }

  const hero = page.hero || {};
  const heroBackground = hero.backgroundImage
    ? urlFor(hero.backgroundImage).width(2000).auto('format').url()
    : '/heroplaceholder.jpg';

  const mapImage = (imageField) => {
    if (!imageField?.image) return null;
    return {
      src: urlFor(imageField.image).width(1600).auto('format').url(),
      alt: imageField.alt || '',
    };
  };

  const mapImages = (images = []) => images.map(mapImage).filter(Boolean);

  const tatuerareArtists = await client.fetch(tatuerareListQuery);

  const mapTatuerareMembers = (artists = []) =>
    (artists || []).map((artist) => ({
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

  const mapBlocks = (blocks = []) =>
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
        const teamMembers = mapTatuerareMembers(tatuerareArtists).map(
          (member) => ({
            ...member,
            image: mapImage(member.image) || {
              src: '/heroplaceholder.jpg',
              alt: member.image?.alt || member.name || '',
            },
          }),
        );

        return {
          ...block,
          teamMembers,
        };
      }

      return block;
    });

  return (
    <div>
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

        <Blocks blocks={mapBlocks(page.blocks)} />
      </main>
    </div>
  );
}
