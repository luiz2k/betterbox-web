"use client";

import CarouselFooter from "./CarouselFooter";
import CarouselHeader from "./CarouselHeader";
import CarouselCards from "./CarouselCards";

type CarouselProps = {
  title?: string;
  subtitle?: string;
  data: {
    id: number;
    title: string;
    posterPath: string;
  }[];
  href?: string;
};

const Carousel = ({ title, subtitle, data, href }: CarouselProps) => {
  return (
    <>
      <section className="space-y-2 rounded bg-color-3/10 p-2">
        {title && subtitle && (
          <CarouselHeader title={title} subtitle={subtitle} />
        )}

        <CarouselCards data={data}>
          <CarouselFooter href={href} />
        </CarouselCards>
      </section>
    </>
  );
};

export default Carousel;
