"use client";

import { useEffect, useRef } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Carousel, CarouselItem } from "@material-tailwind/react";

/**
 * Props for `Diapo`.
 */
export type DiapoProps = SliceComponentProps<Content.DiapoSlice>;

/**
 * Component for "Diapo" Slices.
 */
const Diapo = ({ slice }: DiapoProps): JSX.Element => {
  const carouselRef = useRef<any>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.next();
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="diapo-slice"
    >
      <Carousel ref={carouselRef} loop>
        {slice.primary.images.map((item, index) => (
          <CarouselItem key={index}>
            <PrismicNextLink field={item.media}>
              <PrismicNextImage field={item.media} alt={`Slide ${index + 1}`} />
            </PrismicNextLink>
          </CarouselItem>
        ))}
      </Carousel>
    </section>
  );
};

export default Diapo;
