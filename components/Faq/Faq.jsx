import {
  Button,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@relume_io/relume-ui';

export const Faq = (props) => {
  const {
    heading,
    description,
    questions,
    footerHeading,
    footerDescription,
    button,
  } = {
    ...props,
  };

  return (
    <section
      id='relume'
      className='px-[5%] py-16 md:py-24 lg:py-28 no-button-style'
    >
      <div className='container max-w-lg'>
        <div className='rb-12 mb-12 text-center md:mb-18 lg:mb-20'>
          <h2 className='rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl'>
            {heading}
          </h2>
          <p className='md:text-md'>{description}</p>
        </div>

        <Accordion type='multiple'>
          {questions.map((question, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className='md:py-5 md:text-md'>
                {question.title}
              </AccordionTrigger>
              <AccordionContent className='md:pb-6'>
                {question.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className='mx-auto mt-12 max-w-md text-center md:mt-18 lg:mt-20'>
          <h4 className='mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl'>
            {footerHeading}
          </h4>
          <p className='md:text-md'>{footerDescription}</p>

          <div className='mt-6 md:mt-8'>
            <Button className={button.variant} {...button}>
              {button.title}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
