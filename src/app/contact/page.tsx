import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { Metadata } from "next";
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from "react-icons/bi";
import {
  FaXTwitter,
  FaInstagram,
  FaSun,
  FaPinterest,
  FaLinkedin,
} from "react-icons/fa6";

import {
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineClock,
} from "react-icons/hi";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("contact_info", {
    fetchOptions: { next: { revalidate: 60 } },
  });

  return (
    <div className="container mx-auto px-4">
      <div className="text-center">
        <PrismicRichText field={page.data.title} />
      </div>
      <SliceZone slices={page.data.slices} components={components} />
      <section className="mt-[100px] flex w-full flex-col md:flex-row">
        <div className="flex min-h-full w-full items-center justify-center bg-purple-700 p-4 text-white md:w-1/3">
          <blockquote className="relative mx-auto max-w-[80%] p-2 text-center text-lg md:text-xl">
            <BiSolidQuoteAltLeft className="absolute -left-4 -top-2 text-xl" />
            <PrismicRichText field={page.data.key_word} />
            <BiSolidQuoteAltRight className="absolute -bottom-2 -right-4 text-xl" />
          </blockquote>
        </div>
        <div className="flex w-full flex-col items-center justify-center bg-gray-300 p-4 md:w-2/3 md:p-8">
          <div className="mb-6 text-center text-xl md:text-2xl">
            <PrismicRichText field={page.data.title2} />
          </div>
          <div className="mb-4 flex flex-col items-center justify-center md:flex-row">
            <PrismicNextImage
              field={page.data.image}
              className="mb-4 h-28 w-28 rounded-full border-4 border-purple-700 md:mb-0 md:mr-6 md:h-36 md:w-36"
            />
            <div className="text-base leading-tight md:text-lg">
              <div className="mb-2 flex items-center">
                <HiOutlineLocationMarker className="mr-3 h-5 w-5 text-purple-700" />
                <a
                  href={`https://maps.google.com/?q=${page.data.location}`}
                  target="_blank"
                  className="font-normal"
                >
                  {page.data.location}
                </a>
              </div>
              <div className="mb-2 flex items-center">
                <HiOutlinePhone className="mr-3 h-5 w-5 text-purple-700" />
                <a href={`tel:${page.data.phone}`} className="font-normal">
                  {page.data.phone}
                </a>
              </div>
              <div className="mb-2 flex items-center">
                <HiOutlineMail className="mr-3 h-5 w-5 text-purple-700" />
                <a href={`mailto:${page.data.email}`} className="font-normal">
                  {page.data.email}
                </a>
              </div>
              <div className="mb-2 flex items-center">
                <HiOutlineClock className="mr-3 h-5 w-5 text-purple-700" />
                <span className="font-normal">
                  {page.data.open_hour_and_day}
                </span>
              </div>
            </div>
          </div>
          <div className="m-4 text-center md:m-8">
            <PrismicRichText field={page.data.nocontact} />
          </div>
          <div className="mt-4 flex justify-center space-x-4">
            {page.data.instagram && page.data.instagram.link_type && (
              <PrismicNextLink field={page.data.instagram}>
                <FaInstagram className="h-8 w-8 text-broocksprimary" />
              </PrismicNextLink>
            )}
            {page.data.pinterest && page.data.pinterest.link_type && (
              <PrismicNextLink field={page.data.pinterest}>
                <FaPinterest className="h-8 w-8 text-broocksprimary" />
              </PrismicNextLink>
            )}
            {page.data.linkedin && page.data.linkedin.link_type && (
              <PrismicNextLink field={page.data.linkedin}>
                <FaLinkedin className="h-8 w-8 text-broocksprimary" />
              </PrismicNextLink>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("contact_info");

  return {
    // title: page.data.meta_title,
    // description: page.data.meta_description,
  };
}
