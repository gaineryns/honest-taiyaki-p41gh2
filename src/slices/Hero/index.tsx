import Bounded from "@/components/Bounded";
import ButtonLink from "@/components/ButtonLink";
import StarGrid from "@/components/StarGrid";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";

/**
 * Props for `Hero`.
 */
// export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: any): JSX.Element => {
  return (
    <section className="w-full bg-white" id={slice.primary.anchor || undefined}>
      <Bounded className="pb-16 pt-20 text-center lg:pt-32">
        <div className="relative">
          <StarGrid />
          {isFilled.richText(slice.primary.heading) && (
            <h1 className="font-display text-slate-900 mx-auto max-w-4xl text-5xl font-medium tracking-tight sm:text-7xl">
              <PrismicText field={slice.primary.heading} />
            </h1>
          )}
          <div className="text-slate-700 mx-auto mt-6 max-w-2xl text-lg tracking-tight">
            <PrismicRichText field={slice.primary.body} />
          </div>
          <div className="mt-10 flex justify-center gap-x-6">
            <ButtonLink
              field={slice.primary.button_link}
              className="hover:bg-broocksprimary-dark mt-auto rounded-md bg-broocksprimary px-4 py-2 text-white transition-colors duration-300"
            >
              {slice.primary.button_label}
            </ButtonLink>
          </div>
          <div className="mt-6 text-center">
            <>{slice.primary.footer}</>
          </div>
          <PrismicNextImage
            field={slice.primary.image}
            className="mx-auto mt-10"
          />
        </div>
        <StarGrid />
      </Bounded>
    </section>
  );
};

export default Hero;
