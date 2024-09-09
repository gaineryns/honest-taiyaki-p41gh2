import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import {
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineClock,
} from "react-icons/hi";
import { FaXTwitter, FaInstagram, FaSun } from "react-icons/fa6";
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from "react-icons/bi";

/**
 * Props for `Contact`.
 */
export type ContactProps = SliceComponentProps<Content.ContactSlice>;

/**
 * Component for "Contact" Slices.
 */
const Contact = ({ slice }: ContactProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex w-full"
    >
      <div className="flex w-1/3 items-center justify-center bg-purple-700 p-4 text-white">
        <blockquote className="relative text-center text-xl">
          <BiSolidQuoteAltLeft className="absolute -left-4 -top-2 text-xl" />
          <PrismicRichText field={slice.primary.key_word} />
          <BiSolidQuoteAltRight className="absolute -bottom-2 -right-4 text-xl" />
        </blockquote>
      </div>
      <div className="flex w-2/3 flex-col items-center justify-center bg-white p-8">
        <div className="mb-6 text-center text-2xl">
          <PrismicRichText field={slice.primary.title} />
        </div>
        <div className="mb-4 flex items-center justify-center">
          <PrismicNextImage
            field={slice.primary.image}
            className="mr-6 h-36 w-36 rounded-full border-4 border-purple-700"
          />
          <div className="text-lg leading-tight">
            <div className="mb-2 flex items-center">
              <HiOutlineLocationMarker className="mr-3 h-5 w-5 text-purple-700" />
              <span className="font-normal text-gray-800">
                {slice.primary.location}
              </span>
            </div>
            <div className="mb-2 flex items-center">
              <HiOutlinePhone className="mr-3 h-5 w-5 text-purple-700" />
              <span className="font-normal text-gray-800">
                {slice.primary.phone}
              </span>
            </div>
            <div className="mb-2 flex items-center">
              <HiOutlineMail className="mr-3 h-5 w-5 text-purple-700" />
              <span className="font-normal text-gray-800">
                {slice.primary.email}
              </span>
            </div>
            <div className="mb-2 flex items-center">
              <HiOutlineClock className="mr-3 h-5 w-5 text-purple-700" />
              <span className="font-normal text-gray-800">
                {slice.primary.open_hour_and_day}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          <div className="flex items-center justify-center rounded-full bg-purple-600 p-2 text-xl text-white">
            <FaXTwitter className="h-4 w-4" />
          </div>
          <div className="flex items-center justify-center rounded-full bg-purple-600 p-2 text-xl text-white">
            <FaInstagram className="h-4 w-4" />
          </div>
          <div className="flex items-center justify-center rounded-full bg-purple-600 p-2 text-xl text-white">
            <FaSun className="h-4 w-4" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
