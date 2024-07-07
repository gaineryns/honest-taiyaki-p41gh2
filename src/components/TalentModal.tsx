import React from "react";
import { RichTextBlock } from "@prismicio/react";
import TalentModalContent from "./TalentModalContent";

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

interface ModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  talent: Talent | null;
}

/**
 * Converts height from feet and inches to centimeters.
 */
const convertHeightToCm = (height?: string): string => {
  if (!height) return "Height not available";
  const [feet, inches] = height.split("'").map((v) => parseInt(v, 10));
  const totalInches = feet * 12 + (inches || 0); // Ensure inches is not NaN
  const cm = Math.round(totalInches * 2.54);
  return `${cm} cm`;
};

const TalentModal: React.FC<ModalProps> = ({
  showModal,
  setShowModal,
  talent,
}) => {
  if (!talent) return null;

  const heightInCm = convertHeightToCm(talent.height_by_feet_and_inches);

  return (
    <>
      {showModal && (
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
                <TalentModalContent
                  talent={talent}
                  heightInCm={heightInCm}
                  setShowModal={setShowModal}
                />
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
      )}
    </>
  );
};

export default TalentModal;
