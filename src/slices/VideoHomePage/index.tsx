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
      <div className="video-wrapper">
        <video src={videoUrl} loop className="full-width-video" />
        <div className="centered-button">
          <PrismicNextLink field={slice.primary.cta_link}>
            View Talents
          </PrismicNextLink>
        </div>
      </div>
    </section>
  );
};

export default VideoHomePage;
