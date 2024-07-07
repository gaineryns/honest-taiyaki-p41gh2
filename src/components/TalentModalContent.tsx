import React from "react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, RichTextBlock } from "@prismicio/react";

interface Talent {
  name: string;
  gallery_image: { url: string };
  spotlight_link: { url: string };
  imdb_link: { url: string };
  vimeo_link: { url: string };
  height_by_feet_and_inches: string;
  eye_color: string;
  hair: string;
  playing_age_min: number;
  playing_age_max: number;
  cv_file: { url: string };
  comp_card: { url: string };
  description: RichTextBlock[];
}

interface TalentModalContentProps {
  talent: Talent;
  heightInCm: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const TalentModalContent: React.FC<TalentModalContentProps> = ({
  talent,
  heightInCm,
  setShowModal,
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
    <div className="relative mx-auto my-6 w-auto max-w-6xl">
      <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
        <div className="flex items-start justify-between rounded-t border-b border-solid border-gray-200 p-5">
          <h3 className="text-2xl font-semibold">{talent.name}</h3>
          <button
            className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black outline-none focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <span className="block h-6 w-6 bg-transparent text-2xl text-black outline-none focus:outline-none">
              ×
            </span>
          </button>
        </div>
        <div className="relative flex-auto p-6">
          <div className="bg-gray-100">
            <div className="mb-4 w-full rounded-lg bg-gray-100 p-4">
              <h2 className="text-left text-2xl font-bold">{talent.name}</h2>
            </div>
            <div className="mb-4 flex flex-wrap rounded-lg bg-gray-100 p-4 md:flex-nowrap">
              <div className="flex w-full flex-col items-center p-4 md:w-1/3">
                <PrismicNextImage
                  field={talent.gallery_image}
                  className="mb-4 h-[270px] w-full rounded-lg object-cover shadow-md"
                />
                <PrismicNextLink field={talent.spotlight_link} className="mt-4">
                  <img
                    src="/path-to-spotlight-logo.png"
                    alt="Spotlight"
                    className="mb-2 h-auto w-20"
                  />
                </PrismicNextLink>
                <PrismicNextLink field={talent.imdb_link} className="mt-2">
                  <img
                    src="/path-to-imdb-logo.png"
                    alt="IMDb"
                    className="h-auto w-20"
                  />
                </PrismicNextLink>
              </div>
              <div className="flex w-full flex-col justify-between p-4 pb-8 md:w-2/3">
                <iframe
                  src={talent.vimeo_link}
                  className="mb-4 h-[270px] w-full rounded-lg shadow-md"
                  allowFullScreen
                ></iframe>
                <div className="flex flex-wrap">
                  <div className="mb-2 w-1/2">
                    <strong>Height:</strong> {heightInCm}
                  </div>
                  <div className="mb-2 w-1/2">
                    <strong>Eye:</strong> {talent.eye_color}
                  </div>
                  <div className="mb-2 w-1/2">
                    <strong>Hair:</strong> {talent.hair}
                  </div>
                  <div className="mb-2 w-1/2">
                    <strong>Playing age:</strong> {talent.playing_age_min} -{" "}
                    {talent.playing_age_max} years
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap border-t-2 border-[#e8be69]">
            <div className="flex w-full flex-col items-center border-r-2 border-[#e8be69] p-4 md:w-1/3">
              <PrismicNextLink
                field={talent.cv_file}
                className="cta-button-alt mb-4"
              >
                CV
              </PrismicNextLink>
              <PrismicNextLink
                field={talent.comp_card}
                className="cta-button-alt"
              >
                COMP CARD
              </PrismicNextLink>
            </div>
            <div className="w-full p-4 pb-8 md:w-2/3">
              <h3 className="mb-4 text-lg font-bold uppercase">Biography</h3>
              <PrismicRichText field={talent.description} />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end rounded-b border-t border-solid border-gray-200 p-6">
          <button
            className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
            type="button"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
    <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
  </div>
);

export default TalentModalContent;
