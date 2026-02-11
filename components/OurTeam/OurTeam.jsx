'use client';

import { Button } from '@relume_io/relume-ui';
import Image from 'next/image';
import Link from 'next/link';
import { BiLogoLinkedinSquare } from 'react-icons/bi';
import { FaXTwitter } from 'react-icons/fa6';

export const OurTeam = (props) => {
  const { tagline, heading, description, teamMembers } = {
    ...OurTeamDefaults,
    ...props,
  };

  return (
    <section id='relume' className='px-[5%] py-16 md:py-24 lg:py-28'>
      <div className='container'>
        <div className='rb-12 mb-12 max-w-lg md:mb-18 lg:mb-20'>
          <p className='mb-3 font-semibold md:mb-4'>{tagline}</p>
          <h2 className='rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl'>
            {heading}
          </h2>
          <p className='md:text-md'>{description}</p>
        </div>

        <div className='grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12'>
          {teamMembers.map((member, index) => (
            <TeamMember key={index} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TeamMember = ({ member }) => {
  const slug =
    typeof member.slug === 'string' ? member.slug : member.slug?.current;
  const href = slug ? `/tatuerare/${slug}` : null;
  return (
    <div className='flex flex-col'>
      {href ? (
        <Link href={href} className='group color-white'>
          <div className='relative mb-5 aspect-square size-full overflow-hidden md:mb-6 md:pt-[100%]'>
            <Image
              src={member.image?.src || '/heroplaceholder.jpg'}
              alt={member.image?.alt || member.name}
              width={300}
              height={300}
              className='absolute inset-0 size-full object-cover'
            />
          </div>

          <div className='mb-3 md:mb-4 text-[var(--warm-charcoal)] hover:text-[var(--mareld-blue)]'>
            <h5 className='text-md font-semibold md:text-lg'>{member.name}</h5>
            <h6 className='md:text-md'>{member.jobTitle}</h6>
          </div>
        </Link>
      ) : (
        <>
          <div className='relative mb-5 aspect-square size-full overflow-hidden md:mb-6 md:pt-[100%]'>
            <Image
              src={member.image?.src || '/heroplaceholder.jpg'}
              alt={member.image?.alt || member.name}
              width={300}
              height={300}
              className='absolute inset-0 size-full object-cover'
            />
          </div>

          <div className='mb-3 md:mb-4'>
            <h5 className='text-md font-semibold md:text-lg'>{member.name}</h5>
            <h6 className='md:text-md'>{member.jobTitle}</h6>
          </div>
        </>
      )}

      <p>{member.description}</p>

      {member.button ? (
        <div className='mt-6'>
          <Button {...member.button}>{member.button.title}</Button>
        </div>
      ) : null}

      <div className='mt-6 grid grid-flow-col grid-cols-[max-content] gap-[0.875rem] self-start'>
        {(member.socialLinks || []).map((link, index) => (
          <Link key={index} href={link.href}>
            {link.icon}
          </Link>
        ))}
      </div>
    </div>
  );
};

export const OurTeamDefaults = {
  tagline: 'Tagline',
  heading: 'Our team',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  teamMembers: [
    {
      image: {
        src: 'https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg',
        alt: 'Relume placeholder image 1',
      },
      name: 'Full name',
      jobTitle: 'Job title',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
      socialLinks: [
        { href: '#', icon: <BiLogoLinkedinSquare className='size-6' /> },
        { href: '#', icon: <FaXTwitter className='size-6 p-0.5' /> },
      ],
    },
  ],
};
