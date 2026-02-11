'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer/Footer';

export default function Chrome({ children, links, footer, logo }) {
  const pathname = usePathname();
  const hideChrome = pathname?.startsWith('/sanity');

  if (hideChrome) return children;

  return (
    <div className='site-theme'>
      <Navbar links={links} logo={logo} />
      {children}
      <Footer {...footer} logo={logo} />
    </div>
  );
}
