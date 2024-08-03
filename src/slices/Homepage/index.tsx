"use client";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/homepage.css";

/**
 * Props for `Homepage`.
 */
export type HomepageProps = SliceComponentProps<Content.HomepageSlice>;

/**
 * Component for "Homepage" Slices.
 */
const Homepage = ({ slice }: HomepageProps): JSX.Element => {
  const [logoVisible, setLogoVisible] = useState(true);

  const videoUrl =
    slice.primary.video.link_type === "Media" ? slice.primary.video.url : "";
  const logoUrl =
    slice.primary.logo.link_type === "Media" ? slice.primary.logo.url : "";

  const handleVideoClick = () => {
    setLogoVisible(false);
    setTimeout(() => {
      window.location.href = "/talents/actors";
    }, 2000); // Delay matches the animation duration
  };

  useEffect(() => {
    const videoElement = document.querySelector("video") as HTMLVideoElement;
    if (videoElement) {
      videoElement.play();
      videoElement.addEventListener("click", handleVideoClick);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("click", handleVideoClick);
      }
    };
  }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="video-section"
    >
      {videoUrl && (
        <video
          src={videoUrl}
          autoPlay
          muted
          loop
          className="fullscreen-video"
        />
      )}
      <AnimatePresence>
        {logoVisible && logoUrl && (
          <motion.div
            className="logo-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            onClick={handleVideoClick}
          >
            <Image
              src={logoUrl}
              alt="Logo"
              width={200}
              height={200}
              className="logo"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Homepage;
