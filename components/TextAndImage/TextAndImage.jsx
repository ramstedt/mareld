import { Button } from '@relume_io/relume-ui';
import Image from 'next/image';
import { RxChevronRight } from 'react-icons/rx';

export const TextAndImage = (props) => {
  const { tagline, heading, description, buttons, image, imagePosition } = {
    ...props,
  };

  const imageLeft = imagePosition === 'left';

  return (
    <section id='relume' className='px-[5%] py-16 md:py-24 lg:py-28'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20'>
          {/* TEXT COLUMN */}
          <div
            className={imageLeft ? 'order-2 md:order-2' : 'order-1 md:order-1'}
          >
            <p className='mb-3 font-semibold md:mb-4'>{tagline}</p>
            <h2 className='rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl'>
              {heading}
            </h2>
            <p className='md:text-md'>{description}</p>

            <div className='mt-6 flex flex-wrap gap-4 md:mt-8'>
              {buttons.map((button, index) => (
                <Button key={index} {...button} className={button.variant}>
                  {button.title}
                </Button>
              ))}
            </div>
          </div>

          {/* IMAGE COLUMN */}
          <div
            className={imageLeft ? 'order-1 md:order-1' : 'order-2 md:order-2'}
          >
            <Image
              src={image.src}
              className='w-full object-cover'
              alt={image.alt}
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
