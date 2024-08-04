import {
  EmbedField,
  ImageField,
  KeyTextField,
  LinkField,
  NumberField,
  RichTextField,
} from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Image from "next/image";

interface TalentProps {
  name: KeyTextField;
  head_shot: ImageField;
  spotlight_link: LinkField;
  imdb_link: LinkField;
  vimeo_link: EmbedField;
  height: KeyTextField;
  color_eye: KeyTextField;
  color_hair: KeyTextField;
  playing_age_min: NumberField;
  playing_age_max: NumberField;
  cv_file: LinkField;
  comp_card: LinkField;
  description: RichTextField;
}

/**
 * Converts height from feet and inches to centimeters.
 */
const convertHeightToCm = (height: KeyTextField | null): string => {
  if (!height) {
    return "Height not provided";
  }

  const [feet, inches] = height.split("'").map((v) => parseInt(v, 10));
  const totalInches = feet * 12 + inches;
  const cm = Math.round(totalInches * 2.54);
  return `${cm} cm`;
};

const TalentDetails = ({ talent }: { talent: TalentProps }) => {
  const heightInCm = convertHeightToCm(talent.height);
  return (
    <>
      <div className="bg-gray-100">
        <div className="mb-4 w-full rounded-lg bg-gray-100 p-4">
          <h2 className="text-left text-2xl font-bold">{talent.name}</h2>
        </div>
        <div className="mb-4 flex flex-wrap rounded-lg bg-gray-100 p-4 md:flex-nowrap">
          <div className="flex w-full flex-col items-center p-4 md:w-1/3">
            <PrismicNextImage
              field={talent.head_shot}
              className="mb-4 h-[270px] w-full rounded-lg object-cover shadow-md"
            />
            {talent.spotlight_link && (
              <PrismicNextLink field={talent.spotlight_link}>
                <Image
                  src="https://images.prismic.io/broocksagency/Zp1cwx5LeNNTxVGI_spotlight-logo.webp?auto=format,compress"
                  alt="Spotlight"
                  className="mb-2 h-auto w-20 bg-black"
                  width="80"
                  height="80"
                />
              </PrismicNextLink>
            )}
            {talent.imdb_link && (
              <PrismicNextLink field={talent.imdb_link}>
                <Image
                  src="https://broocksagency.cdn.prismic.io/broocksagency/Zp1deR5LeNNTxVGb_IMDB_Logo_2016.svg"
                  alt="IMDb"
                  className="h-auto w-20"
                  width={20}
                  height={20}
                />
              </PrismicNextLink>
            )}
          </div>
          <div className="flex w-full flex-col justify-between p-4 md:w-2/3">
            {talent.vimeo_link?.embed_url && (
              <iframe
                src={talent.vimeo_link.embed_url}
                className="mb-4 h-[270px] w-full rounded-lg shadow-md"
                allowFullScreen
              ></iframe>
            )}
            <div className="flex flex-wrap">
              <div className="mb-2 w-1/2">
                <strong>Height:</strong> {heightInCm}
              </div>
              <div className="mb-2 w-1/2">
                <strong>Eye:</strong> {talent.color_eye}
              </div>
              <div className="mb-2 w-1/2">
                <strong>Hair:</strong> {talent.color_hair}
              </div>
              <div className="mb-2 w-1/2">
                <strong>Playing age:</strong> {talent.playing_age_min} -{" "}
                {talent.playing_age_max} years
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap pb-10 pt-10">
        <div className="flex w-full flex-col items-center border-r-2 border-[#e8be69] p-4 md:w-1/3">
          <PrismicNextLink
            field={talent.cv_file}
            className="cta-button-alt fixed-width-button mb-4 text-center"
          >
            CV
          </PrismicNextLink>
          <PrismicNextLink
            field={talent.comp_card}
            className="cta-button-alt fixed-width-button text-center"
          >
            COMP CARD
          </PrismicNextLink>
        </div>
        <div className="w-full p-4 py-6 md:w-2/3">
          <h3 className="mb-4 text-lg font-bold uppercase">Biography</h3>
          <PrismicRichText field={talent.description} />
        </div>
      </div>
    </>
  );
};

export default TalentDetails;