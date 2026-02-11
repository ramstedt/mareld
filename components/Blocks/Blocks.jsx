'use client';

import { TextAndImage } from '@/components/TextAndImage/TextAndImage';
import { Faq } from '@/components/Faq/Faq';
import { ImageCarousel } from '@/components/ImageCarousel/ImageCarousel';
import { Gallery } from '@/components/Gallery/Gallery';
import { OurTeam } from '@/components/OurTeam/OurTeam';
import { PortableText } from '@portabletext/react';
import {
  BiLogoDribbble,
  BiLogoLinkedinSquare,
  BiLogoInstagram,
  BiLogoFacebookCircle,
} from 'react-icons/bi';
import { FaXTwitter } from 'react-icons/fa6';
import { HiOutlineMail } from 'react-icons/hi';

const socialIconMap = {
  linkedin: <BiLogoLinkedinSquare className='size-6' />,
  x: <FaXTwitter className='size-6 p-0.5' />,
  dribbble: <BiLogoDribbble className='size-6' />,
  instagram: <BiLogoInstagram className='size-6' />,
  facebook: <BiLogoFacebookCircle className='size-6' />,
  email: <HiOutlineMail className='size-6' />,
};

const allowedVariants = new Set([
  'primary',
  'secondary',
  'secondary-alt',
  'tertiary',
  'link',
  'link-alt',
  'ghost',
]);

const normalizeVariant = (variant) => {
  const normalized = String(variant || '').toLowerCase();
  return allowedVariants.has(normalized) ? normalized : 'primary';
};

const normalizeButton = (button) => {
  if (!button) return button;
  const variant = normalizeVariant(button.variant);
  return { ...button, variant };
};

const mapButtons = (buttons = []) => (buttons || []).map(normalizeButton);

const mapTeamMembers = (teamMembers = []) =>
  teamMembers.map((member) => ({
    ...member,
    socialLinks: [
      ...(member.email
        ? [{ href: `mailto:${member.email}`, network: 'email' }]
        : []),
      ...(member.facebook
        ? [{ href: member.facebook, network: 'facebook' }]
        : []),
      ...(member.instagram
        ? [{ href: member.instagram, network: 'instagram' }]
        : []),
    ].map((link) => ({
      ...link,
      icon: socialIconMap[link.network],
    })),
    button: member.button ? normalizeButton(member.button) : undefined,
  }));

export default function Blocks({ blocks = [] }) {
  return (
    <>
      {blocks.map((block) => {
        if (block._type === 'textAndImageBlock') {
          return (
            <TextAndImage
              key={block._key}
              tagline={block.tagline}
              heading={block.heading}
              description={block.description}
              imagePosition={block.imagePosition}
              buttons={mapButtons(block.buttons)}
              image={block.image}
            />
          );
        }

        if (block._type === 'faqBlock') {
          return (
            <Faq
              key={block._key}
              heading={block.heading}
              description={block.description}
              questions={block.questions}
              footerHeading={block.footerHeading}
              footerDescription={block.footerDescription}
              button={normalizeButton(block.button)}
            />
          );
        }

        if (block._type === 'imageCarouselBlock') {
          return (
            <ImageCarousel
              key={block._key}
              heading={block.heading}
              description={block.description}
              images={block.images}
            />
          );
        }

        if (block._type === 'galleryBlock') {
          return (
            <Gallery
              key={block._key}
              heading={block.heading}
              description={block.description}
              images={block.images}
            />
          );
        }

        if (block._type === 'tatuerareBlock') {
          return (
            <OurTeam
              key={block._key}
              tagline='Tatuerare'
              heading='Vårt team'
              description='Lär känna våra tatuerare och deras stilar.'
              teamMembers={mapTeamMembers(block.teamMembers || [])}
            />
          );
        }
        if (block._type === 'richTextBlock') {
          return (
            <section key={block._key} className='px-[5%] py-12 md:py-16'>
              <div className='container max-w-3xl prose prose-lg'>
                <PortableText value={block.content || []} />
              </div>
            </section>
          );
        }

        return null;
      })}
    </>
  );
}
