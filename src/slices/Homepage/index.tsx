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
    slice.primary.video.link_type === "Media"
      ? (slice.primary.video as any).url
      : "";
  const logoUrl =
    slice.primary.logo.link_type === "Media"
      ? (slice.primary.logo as any).url
      : "";

  const handleVideoClick = () => {
    setLogoVisible(false);
    setTimeout(() => {
      window.location.href = "/talents/actors";
    }, 2000); // Delay matches the animation duration
  };

  useEffect(() => {
    const videoElement = document.querySelector("video") as HTMLVideoElement;
    if (videoElement) {
      videoElement.playsInline = true;
      videoElement.setAttribute("playsinline", "");
      videoElement.play().catch((error) => {
        console.log("Lecture automatique impossible:", error);
      });
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
      className="relative h-screen w-full overflow-hidden"
    >
      {videoUrl && (
        <video
          src={videoUrl}
          autoPlay
          playsInline
          muted
          loop
          className="absolute left-0 top-0 h-full w-full object-cover"
        />
      )}
      <AnimatePresence>
        {logoVisible && logoUrl && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            onClick={handleVideoClick}
          >
            <Image
              src={logoUrl}
              alt="Logo"
              width={500}
              height={500}
              className="h-auto w-48 sm:w-64 md:w-96 lg:w-[30rem]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Homepage;
