import { Anton, Barlow, Sedgwick_Ave } from 'next/font/google';
import './globals.css';
import Chrome from '@/components/Chrome/Chrome';
import { client, urlFor } from '@/lib/sanity';
import { footerQuery, navPagesQuery, settingsQuery } from '@/lib/sanityQueries';

export const revalidate = 0;

const anton = Anton({
  variable: '--header',
  subsets: ['latin'],
  weight: '400',
});

const barlow = Barlow({
  variable: '--content',
  subsets: ['latin'],
  weight: ['400', '700'],
});

const sedgwickAve = Sedgwick_Ave({
  variable: '--display',
  subsets: ['latin'],
  weight: '400',
});

export async function generateMetadata() {
  try {
    const settings = await client.fetch(settingsQuery);

    const title = settings?.metaTitle || settings?.siteTitle || 'Mareld';
    const description =
      settings?.metaDescription ||
      settings?.siteDescription ||
      'Tatueringsstudio i Majorna';

    const ogImage = settings?.ogImage?.image
      ? urlFor(settings.ogImage.image)
          .width(1200)
          .height(630)
          .auto('format')
          .url()
      : undefined;

    const favicon = settings?.favicon
      ? urlFor(settings.favicon).width(64).height(64).auto('format').url()
      : undefined;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: ogImage ? [{ url: ogImage }] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ogImage ? [ogImage] : undefined,
      },
      icons: favicon ? { icon: favicon } : undefined,
    };
  } catch (error) {
    return {
      title: 'Mareld',
      description: 'Tatueringsstudio i Majorna',
    };
  }
}

const defaultLinks = [{ href: '#kontakt', label: 'Kontakt' }];

export default async function RootLayout({ children }) {
  let pageLinks = [];
  let footer = null;
  let logo = null;
  try {
    const pages = await client.fetch(navPagesQuery);
    pageLinks = (pages || []).map((page) => ({
      href: `/${page.slug}`,
      label: page.navLabel || page.title,
    }));
  } catch (error) {
    pageLinks = [];
  }

  try {
    const settings = await client.fetch(settingsQuery);
    if (settings?.logo?.image) {
      logo = {
        src: urlFor(settings.logo.image).width(240).auto('format').url(),
        alt: settings.logo.alt || settings.siteTitle || 'Logo',
      };
    }
  } catch (error) {
    logo = null;
  }

  try {
    const footerDoc = await client.fetch(footerQuery);
    if (footerDoc) {
      footer = {
        address: footerDoc.address,
        contact: footerDoc.contact,
        socialMediaLinks: footerDoc.socialMediaLinks,
      };
    }
  } catch (error) {
    footer = null;
  }

  return (
    <html lang='sv'>
      <body
        className={`${anton.variable} ${barlow.variable} ${sedgwickAve.variable} antialiased`}
      >
        <Chrome
          links={[...pageLinks, ...defaultLinks]}
          footer={footer}
          logo={logo}
        >
          {children}
        </Chrome>
      </body>
    </html>
  );
}
