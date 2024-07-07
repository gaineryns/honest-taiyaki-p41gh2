import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Actor`.
 */
export type ActorProps = SliceComponentProps<Content.ActorSlice>;

/**
 * Converts height from feet and inches to centimeters.
 */
const convertHeightToCm = (height: string): string => {
  const [feet, inches] = height.split("'").map((v) => parseInt(v, 10));
  const totalInches = feet * 12 + inches;
  const cm = Math.round(totalInches * 2.54);
  return `${cm} cm`;
};

/**
 * Component for "Actor" Slices.
 */
const Actor = ({ slice }: ActorProps): JSX.Element => {
  const heightInCm = convertHeightToCm(slice.primary.height_by_feet_and_inches);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mx-auto max-w-6xl rounded-lg bg-white text-black shadow-lg"
    >
      <div className="bg-gray-100">
        <div className="mb-4 w-full rounded-lg bg-gray-100 p-4">
          <h2 className="text-left text-2xl font-bold">{slice.primary.name}</h2>
        </div>
        <div className="mb-4 flex flex-wrap rounded-lg bg-gray-100 p-4 md:flex-nowrap">
          <div className="flex w-full flex-col items-center p-4 md:w-1/3">
            <PrismicNextImage
              field={slice.primary.gallery_image}
              className="mb-4 h-[270px] w-full rounded-lg object-cover shadow-md"
            />
            <PrismicNextLink
              field={slice.primary.spotlight_link}
              className="mt-4"
            >
              <img
                src="/path-to-spotlight-logo.png"
                alt="Spotlight"
                className="mb-2 h-auto w-20"
              />
            </PrismicNextLink>
            <PrismicNextLink field={slice.primary.imdb_link} className="mt-2">
              <img
                src="/path-to-imdb-logo.png"
                alt="IMDb"
                className="h-auto w-20"
              />
            </PrismicNextLink>
          </div>
          <div className="flex w-full flex-col justify-between p-4 md:w-2/3">
            <iframe
              src={slice.primary.vimeo_link.url}
              className="mb-4 h-[270px] w-full rounded-lg shadow-md"
              allowFullScreen
            ></iframe>
            <div className="flex flex-wrap">
              <div className="mb-2 w-1/2">
                <strong>Height:</strong> {heightInCm}
              </div>
              <div className="mb-2 w-1/2">
                <strong>Eye:</strong> {slice.primary.eye_color}
              </div>
              <div className="mb-2 w-1/2">
                <strong>Hair:</strong> {slice.primary.hair}
              </div>
              <div className="mb-2 w-1/2">
                <strong>Playing age:</strong> {slice.primary.playing_age_min} -{" "}
                {slice.primary.playing_age_max} years
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="flex w-full flex-col items-center border-r-2 border-[#e8be69] p-4 md:w-1/3">
          <PrismicNextLink
            field={slice.primary.cv_file}
            className="cta-button-alt mb-4"
          >
            CV
          </PrismicNextLink>
          <PrismicNextLink
            field={slice.primary.comp_card}
            className="cta-button-alt"
          >
            COMP CARD
          </PrismicNextLink>
        </div>
        <div className="w-full p-4 py-6 md:w-2/3">
          <h3 className="mb-4 text-lg font-bold uppercase">Biography</h3>
          <PrismicRichText field={slice.primary.description} />
        </div>
      </div>
    </section>
  );
};

export default Actor;
