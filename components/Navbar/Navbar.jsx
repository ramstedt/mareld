'use client';
import styles from './Navbar.module.css';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export const defaultNavbarConfig = {
  '/': { color: 'dark', showBorder: false },
  '/galleri': { color: 'light', showBorder: true },
  '/galleri/': { color: 'light', showBorder: true },
  '*': { color: 'light', showBorder: true },
};

export default function Navbar(props) {
  const {
    brandPrimary,
    brandSecondary,
    links = NavbarDefaults.links,
    navbarConfig = NavbarDefaults.navbarConfig,
  } = {
    ...NavbarDefaults,
    ...props,
  };

  const safeLinks = Array.isArray(links) ? links : [];
  const effectiveConfig = navbarConfig ?? defaultNavbarConfig;

  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const lastY = useRef(0);
  const initialized = useRef(false);
  const pathname = usePathname() || '/';
  const matchKey =
    Object.keys(effectiveConfig)
      .sort((a, b) => b.length - a.length)
      .find((key) => pathname.startsWith(key)) || '*';
  const { color, showBorder } = effectiveConfig[matchKey];

  useEffect(() => {
    const update = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      const viewportH =
        window.visualViewport?.height ??
        Math.max(window.innerHeight, document.documentElement.clientHeight);

      setAtTop(y < viewportH);

      if (!initialized.current) {
        initialized.current = true;
        lastY.current = y;
        setHidden(false);
        return;
      }

      const diff = y - lastY.current;
      if (isOpen) {
        setHidden(false);
        lastY.current = y;
        return;
      }

      const threshold = 6;

      if (diff < 0) {
        setHidden(false);
      }

      if (diff > threshold && y > 20) {
        setHidden(true);
      }

      lastY.current = y;
    };

    const reinitAndUpdate = () => {
      initialized.current = false;
      requestAnimationFrame(update);
    };

    update();
    const raf = requestAnimationFrame(update);
    const timeout = setTimeout(update, 0);

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('hashchange', reinitAndUpdate, { passive: true });
    window.addEventListener('pageshow', reinitAndUpdate, { passive: true });
    window.addEventListener('resize', update, { passive: true });

    const vv = window.visualViewport;
    if (vv) {
      vv.addEventListener('resize', update, { passive: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
      window.removeEventListener('scroll', update);
      window.removeEventListener('hashchange', reinitAndUpdate);
      window.removeEventListener('pageshow', reinitAndUpdate);
      window.removeEventListener('resize', update);
      if (vv) {
        vv.removeEventListener('resize', update);
      }
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`${styles.navbar} ${hidden ? styles.navbarHidden : ''} ${
          atTop && color === 'dark'
            ? styles.transparent
            : color === 'dark'
            ? styles.dark
            : styles.light
        } ${color === 'light' ? styles.darkText : styles.lightText} ${
          isOpen ? styles.menuOpen : ''
        }`}
      >
        <div className={styles.logo}>
          <Link href='/'>
            <span className={styles.logoFirstName}>{brandPrimary}</span>{' '}
            <span className={styles.logoLastName}>{brandSecondary}</span>
          </Link>
        </div>
        <div className={styles.navLinks}>
          {safeLinks.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setIsOpen(false)}>
              {l.label}
            </Link>
          ))}
        </div>
        <button
          className={styles.burger}
          aria-label='Toggle menu'
          aria-expanded={isOpen}
          aria-controls='primaryNav'
          onClick={() => setIsOpen(!isOpen)}
        >
          <span style={{ marginTop: '1rem' }} />
        </button>

        <div
          className={styles.overlay}
          aria-hidden={!isOpen}
          style={{
            pointerEvents: isOpen ? 'auto' : 'none',
            opacity: isOpen ? 1 : 0,
          }}
          onClick={() => isOpen && setIsOpen(false)}
        />

        <div
          className={`${styles.menuPanel} ${
            color === 'dark' ? styles.dark : styles.light
          }`}
          id='primaryNav'
          aria-hidden={!isOpen}
          style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        >
          <div className={styles.navLinks}>
            {safeLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setIsOpen(false)}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div className={showBorder ? styles.border : styles.noBorder}></div>
      </nav>
    </>
  );
}

export const NavbarDefaults = {
  brandPrimary: 'Mareld',
  brandSecondary: '',
  links: [
    { href: '/#om', label: 'Om' },
    { href: '/#event', label: 'Event' },
    { href: '/#kurser', label: 'Kurser' },
    { href: '/galleri', label: 'Galleri' },
    { href: '/#kontakt', label: 'Kontakt' },
  ],
  navbarConfig: defaultNavbarConfig,
};
