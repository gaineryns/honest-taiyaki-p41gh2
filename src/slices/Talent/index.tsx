import TalentDetails from "@/components/TalentDetails";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Actor`.
 */
export type ActorProps = SliceComponentProps<Content.ActorSlice>;

/**
 * Component for "Actor" Slices.
 */
const Actor = ({ slice }: ActorProps): JSX.Element => {
  const talent = {
    name: slice.primary.name,
    gallery_image: slice.primary.gallery_image,
    spotlight_link: slice.primary.spotlight_link,
    imdb_link: slice.primary.imdb_link,
    vimeo_link: slice.primary.vimeo_link,
    height_by_feet_and_inches: slice.primary.height_by_feet_and_inches,
    eye_color: slice.primary.eye_color,
    hair: slice.primary.hair,
    playing_age_min: slice.primary.playing_age_min,
    playing_age_max: slice.primary.playing_age_max,
    cv_file: slice.primary.cv_file,
    comp_card: slice.primary.comp_card,
    description: slice.primary.description,
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mx-auto max-w-6xl rounded-lg bg-white text-black shadow-lg"
    >
      <TalentDetails talent={talent} />
    </section>
  );
};

export default Actor;
