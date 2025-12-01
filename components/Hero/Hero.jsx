'use client';
import styles from './Hero.module.css';
import Image from 'next/image';

export default function Hero({
  backgroundSrc = '/heroplaceholder.jpg',
  foregroundSrc = '/herowave.png',
  backgroundAlt = 'Background hero image',
  foregroundAlt = 'Foreground hero image',
  text = 'text here',
}) {
  return (
    <section className={styles.hero}>
      <div className={styles.bgWrapper}>
        <Image
          src={backgroundSrc}
          alt={backgroundAlt}
          fill
          priority
          sizes='100vw'
          className={styles.bgImage}
        />
      </div>

      <div className={styles.tintLayer}></div>

      <div className={styles.overlayWrapper}>
        <Image
          src={foregroundSrc}
          alt={foregroundAlt}
          width={260}
          height={160}
          className={styles.overlayImage}
        />
      </div>

      <div className={styles.heroText}>
        <h1>{text}</h1>
      </div>
    </section>
  );
}
