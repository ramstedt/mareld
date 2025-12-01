import { FaXTwitter } from 'react-icons/fa6';
import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoYoutube,
} from 'react-icons/bi';
import Link from 'next/link';

export const Footer = (props) => {
  const {
    logo,
    address,
    contact,
    columnLinks,
    socialMediaLinks,
    footerText,
    footerLinks,
  } = {
    ...FooterDefaults,
    ...props,
  };
  return (
    <footer className='px-[5%] py-12 md:py-18 lg:py-20 bg-(--black) text-(--white)'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-x-[4vw] gap-y-12 pb-12 md:gap-y-16 md:pb-18 lg:grid-cols-[1fr_0.5fr] lg:gap-y-4 lg:pb-20 color-(--white)'>
          <div>
            <div className='rb-6 mb-6 md:mb-8'>
              <Link href={logo.url}>
                <img src={logo.src} alt={logo.alt} className='inline-block' />
              </Link>
            </div>
            <div className='rb-6 mb-6 md:mb-8'>
              <div>
                <p className='mb-1 text-sm font-semibold'>{address.label}</p>
                <p className='mb-5 text-sm md:mb-6'>{address.value}</p>
              </div>
              <div>
                <p className='mb-1 text-sm font-semibold'>{contact.label}</p>
                <p className='flex flex-col text-sm underline decoration-(--white) underline-offset-1 md:mb-6'>
                  <Link href={`tel:${contact.phone}`} className='text-white'>
                    {contact.phone}
                  </Link>
                  <Link href={`mailto:${contact.email}`}>{contact.email}</Link>
                </p>
              </div>
            </div>
            <div className='grid grid-flow-col grid-cols-[max-content] items-start justify-start gap-x-3'>
              {socialMediaLinks.map((link, index) => (
                <Link key={index} href={link.url}>
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
          <div className='grid grid-cols-1 items-start gap-x-6 gap-y-10 md:grid-cols-2 md:gap-x-8 md:gap-y-4'>
            {columnLinks.map((column, index) => (
              <ul key={index}>
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex} className='py-2 text-sm font-semibold'>
                    <Link href={link.url}>{link.title}</Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className='h-px w-full bg-(--white)' />
        <div className='flex flex-col-reverse items-start justify-between pb-4 pt-6 text-sm md:flex-row md:items-center md:pb-0 md:pt-8'>
          <p className='mt-8 md:mt-0'>{footerText}</p>
          <ul className='grid grid-flow-row grid-cols-[max-content] justify-center gap-y-4 text-sm md:grid-flow-col md:gap-x-6 md:gap-y-0'>
            {footerLinks.map((link, index) => (
              <li key={index} className='underline'>
                <Link href={link.url}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export const FooterDefaults = {
  logo: {
    url: '#',
    src: 'https://d22po4pjz3o32e.cloudfront.net/logo-image.svg',
    alt: 'Logo image',
  },
  address: {
    label: 'Adress:',
    value: 'Karl Johansgatan 152, 414 50 Göteborg',
  },
  contact: {
    label: 'Kontakt:',
    email: 'info@email.com',
  },
  columnLinks: [
    {
      links: [
        { title: 'Link One', url: '#' },
        { title: 'Link Two', url: '#' },
        { title: 'Link Three', url: '#' },
        { title: 'Link Four', url: '#' },
        { title: 'Link Five', url: '#' },
      ],
    },
    {
      links: [
        { title: 'Link Six', url: '#' },
        { title: 'Link Seven', url: '#' },
        { title: 'Link Eight', url: '#' },
        { title: 'Link Nine', url: '#' },
        { title: 'Link Ten', url: '#' },
      ],
    },
  ],
  socialMediaLinks: [
    { url: '#', icon: <BiLogoFacebookCircle className='size-6' /> },
    { url: '#', icon: <BiLogoInstagram className='size-6' /> },
  ],
  footerText: '© ',
  footerLinks: [{ title: 'Privacy Policy', url: '#' }],
};
