'use client';
import { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

export const Gallery = (props) => {
  const { heading, description, images } = {
    ...props,
  };

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id='gallery' className='px-[5%] py-16 md:py-24 lg:py-28'>
      <div className='container'>
        <div className='mb-12 text-center md:mb-18 lg:mb-20'>
          <h2 className='mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl'>
            {heading}
          </h2>
          <p className='md:text-md'>{description}</p>
        </div>

        <div className='grid auto-cols-fr justify-center gap-6 md:grid-cols-2 md:gap-8'>
          {images.map((image, index) => (
            <div
              key={index}
              className={clsx('inline-block w-full cursor-pointer', {
                'col-start-1 col-end-2 row-start-1 row-end-3': index === 0,
              })}
              onClick={() => setSelectedImage(image)}
            >
              <div
                className={clsx('relative size-full', {
                  'pt-[100%]': index === 0,
                  'pt-[56.25%]': index !== 0,
                })}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className='absolute inset-0 size-full object-cover'
                />
              </div>
            </div>
          ))}
        </div>
        {selectedImage && (
          <div
            className='fixed inset-0 z-10 flex items-start justify-center bg-[color:var(--ink)]/60 pt-2 md:items-center md:pt-0'
            onClick={() => setSelectedImage(null)}
          >
            <div
              className='relative w-[90vw] max-w-5xl max-h-[90vh]'
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type='button'
                className='absolute right-4 top-4 z-10 rounded-full bg-[color:var(--ink)]/70 px-3 py-1 text-sm text-[var(--bone)]'
                onClick={() => setSelectedImage(null)}
              >
                Close
              </button>
              <div className='relative w-full h-[80vh]'>
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className='object-contain'
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
