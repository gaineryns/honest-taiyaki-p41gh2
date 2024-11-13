"use client";

import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { useState, useEffect } from "react";
import { asLink } from "@prismicio/helpers";

/**
 * Props for `Package2`.
 */
export type Package2Props = SliceComponentProps<Content.Package2Slice>;

/**
 * Component for "Package2" Slices.
 */
const Package2 = ({ slice }: Package2Props): JSX.Element => {
  const isRightPicture = slice.variation === "rightPicture";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const bookingUrl = slice.primary.link
    ? asLink(slice.primary.link) ?? undefined
    : undefined;

  // Gérer le scroll du body
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="my-10"
    >
      <div
        className={`flex flex-col items-center md:flex-row ${
          isRightPicture ? "md:flex-row-reverse" : ""
        } gap-8`}
      >
        {/* Image container with 50% width and responsive fixed height */}
        <div className="w-full flex-shrink-0 md:w-1/2">
          <PrismicNextImage
            field={slice.primary.image}
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-[400px]" // Responsive height adjustments
          />
        </div>

        {/* Text content with flexible width based on content size */}
        <div className="flex flex-1 flex-col items-start">
          <h2 className="mb-0 text-2xl font-bold text-broocksprimary">
            {slice.primary.category}
          </h2>
          <h3 className="mb-4 text-lg text-gray-600">{slice.primary.title}</h3>
          <div className="mb-4 text-base text-gray-700">
            <PrismicRichText
              field={slice.primary.description}
              components={{
                list: ({ children }) => (
                  <ul className="list-disc pl-6">{children}</ul>
                ),
                listItem: ({ children }) => (
                  <li className="pl-4 text-lg text-gray-700">{children}</li>
                ),
              }}
            />
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="hover:bg-broocksprimary-dark mt-auto rounded-md bg-broocksprimary px-4 py-2 text-white transition-colors duration-300"
          >
            REQUEST MORE INFO
          </button>

          {/* Sidebar */}
          <div
            className={`fixed right-0 top-0 z-50 h-full w-full bg-white shadow-lg transition-transform duration-300 md:w-[600px] ${
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="relative h-full overflow-y-auto">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="absolute right-4 top-4 z-10 text-2xl hover:text-gray-600"
              >
                ×
              </button>
              <iframe
                title={`Booking calendar for ${slice.primary.title}`}
                src={bookingUrl}
                className="h-full w-full overflow-y-auto"
              />
            </div>
          </div>

          {/* Overlay pour tous les écrans */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-black bg-opacity-50"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Package2;
