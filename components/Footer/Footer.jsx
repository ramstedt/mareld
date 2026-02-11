'use client';

import { FaXTwitter } from 'react-icons/fa6';
import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoYoutube,
} from 'react-icons/bi';
import Link from 'next/link';

export const Footer = (props) => {
  const { address, contact, socialMediaLinks, logo } = {
    ...FooterDefaults,
    ...props,
  };

  const socialIconMap = {
    facebook: <BiLogoFacebookCircle className='size-6' />,
    instagram: <BiLogoInstagram className='size-6' />,
    linkedin: <BiLogoLinkedinSquare className='size-6' />,
    youtube: <BiLogoYoutube className='size-6' />,
    x: <FaXTwitter className='size-6' />,
  };

  const safeSocialLinks = (socialMediaLinks || [])
    .map((link) => ({
      ...link,
      icon: link.icon || socialIconMap[link.network],
    }))
    .filter((link) => link.url && link.icon);

  return (
    <footer
      id='kontakt'
      className='px-[5%] py-12 md:py-18 lg:py-20 bg-[var(--surface-dark)] text-[var(--bone)] [--link-hover:var(--bone)]'
    >
      <div className='container'>
        <div className='grid grid-cols-1 gap-y-10 md:grid-cols-[1.2fr_0.8fr] md:gap-x-16'>
          <div className='space-y-6'>
            {logo?.src ? (
              <div>
                <img
                  src={logo.src}
                  alt={logo.alt || 'Logo'}
                  width={200}
                  height={60}
                  loading='lazy'
                  decoding='async'
                />
              </div>
            ) : null}
            <div>
              {address?.label ? (
                <p className='mb-2 text-sm font-semibold uppercase tracking-wide'>
                  {address.label}
                </p>
              ) : null}
              {address?.lines ? (
                <p className='whitespace-pre-line text-sm leading-6 text-[color:var(--bone)]/90'>
                  {address.lines}
                </p>
              ) : null}
            </div>

            <div>
              {contact?.label ? (
                <p className='mb-2 text-sm font-semibold uppercase tracking-wide'>
                  {contact.label}
                </p>
              ) : null}
              {contact?.phone || contact?.email ? (
                <div className='flex flex-col gap-1 text-sm'>
                  {contact?.phone ? (
                    <Link
                      href={`tel:${contact.phone}`}
                      className='underline decoration-[color:var(--bone)]/60 underline-offset-4 transition-colors'
                    >
                      {contact.phone}
                    </Link>
                  ) : null}
                  {contact?.email ? (
                    <Link
                      href={`mailto:${contact.email}`}
                      className='underline decoration-[color:var(--bone)]/60 underline-offset-4 transition-colors'
                    >
                      {contact.email}
                    </Link>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>

          <div className='flex flex-col items-start gap-4 md:items-end md:text-right'>
            {safeSocialLinks.length ? (
              <div className='flex items-center gap-3'>
                {safeSocialLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.url}
                    className='transition-transform duration-200 hover:-translate-y-0.5'
                  >
                    {link.icon}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
};

export const FooterDefaults = {
  address: {
    label: 'Adress:',
    lines: 'Karl Johansgatan 152\\n414 50 Göteborg',
  },
  contact: {
    label: 'Kontakt:',
    email: 'info@email.com',
  },
  socialMediaLinks: [
    { url: '#', icon: <BiLogoFacebookCircle className='size-6' /> },
    { url: '#', icon: <BiLogoInstagram className='size-6' /> },
  ],
};
