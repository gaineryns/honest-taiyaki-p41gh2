"use client";

import React from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Carousel } from "@material-tailwind/react";
import { PrismicRichText } from "@prismicio/react";

/**
 * Props for `Diapo`.
 */
export type DiapoProps = SliceComponentProps<Content.DiapoSlice>;

/**
 * Component for "Diapo" Slices.
 */
const Diapo = ({ slice }: DiapoProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="diapo-slice"
    >
      <div className="diapo-container">
        <PrismicRichText field={slice.primary.title} />
        <Carousel
          className="mt-8 rounded-xl"
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                    activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
          autoplay={true}
          loop={true}
          autoplayDelay={3000}
        >
          {slice.primary.images.map((item, index) => (
            <img
              key={index}
              src={item.media.url}
              alt={item.media.alt || `Slide ${index + 1}`}
              className="h-full w-full object-cover"
            />
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Diapo;
