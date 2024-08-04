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
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="relative">
        <StarGrid />
        {isFilled.richText(slice.primary.heading) && (
          <h1 className="ext-balance text-5x1 md:text-7x1 t text-center font-medium">
            <PrismicText field={slice.primary.heading} />
          </h1>
        )}
        <PrismicRichText field={slice.primary.body} />
        <ButtonLink field={slice.primary.button_link}>
          {slice.primary.button_label}
        </ButtonLink>
        <PrismicNextImage field={slice.primary.image} />
      </div>

      <StarGrid />
    </Bounded>
  );
};

export default Hero;
