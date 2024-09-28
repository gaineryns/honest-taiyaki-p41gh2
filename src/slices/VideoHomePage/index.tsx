"use client";

import React from "react";
import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

export type VideoHomePageProps =
  SliceComponentProps<Content.VideoHomePageSlice>;

function isMediaLink(link: any): link is { url: string } {
  return link.url !== undefined;
}

const VideoHomePage = ({ slice }: VideoHomePageProps): JSX.Element => {
  let videoUrl = "";
  if (isMediaLink(slice.primary.video)) {
    videoUrl = slice.primary.video.url;
  }

  return (
    <section
      className="video-container"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="video-wrapper relative w-full">
        <video src={videoUrl} loop autoPlay muted className="h-auto w-full" />
        <div className="centered-button absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <PrismicNextLink
            field={slice.primary.cta_link}
            className="font-montserrat border-broocksprimary bg-broocksprimary hover:text-broocksprimary rounded-full border px-8 py-3 text-sm font-normal text-white transition-colors duration-200 hover:bg-transparent"
          >
            View Talents
          </PrismicNextLink>
        </div>
      </div>
    </section>
  );
};

export default VideoHomePage;
