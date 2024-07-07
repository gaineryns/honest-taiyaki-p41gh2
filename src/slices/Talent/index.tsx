import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Actor`.
 */
export type ActorProps = SliceComponentProps<Content.ActorSlice>;

/**
 * Component for "Actor" Slices.
 */
const Actor = ({ slice }: ActorProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div>
        <PrismicNextImage field={slice.primary.gallery_image} />
      </div>
      <div>{slice.primary.name}</div>
      <div>
        <PrismicRichText field={slice.primary.description} />
      </div>
      <PrismicNextLink field={slice.primary.vimeo_link}>Link</PrismicNextLink>
      <PrismicNextLink field={slice.primary.comp_card}>Link</PrismicNextLink>
      <PrismicNextLink field={slice.primary.cv_file}>Link</PrismicNextLink>
      <div>{slice.primary.height_by_feet_and_inches}</div>
      <>{slice.primary.eye_color}</>
      <>{slice.primary.hair}</>
      <>{slice.primary.genre}</>
      <>{slice.primary.playing_age_min}</>
      <>{slice.primary.playing_age_max}</>
    </section>
  );
};

export default Actor;
