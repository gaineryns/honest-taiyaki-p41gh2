import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Package2`.
 */
export type Package2Props = SliceComponentProps<Content.Package2Slice>;

/**
 * Component for "Package2" Slices.
 */
const Package2 = ({ slice }: Package2Props): JSX.Element => {
  const isRightPicture = slice.variation === "rightPicture";

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
          <PrismicNextLink
            field={slice.primary.link}
            className="hover:bg-broocksprimary-dark mt-auto rounded-md bg-broocksprimary px-4 py-2 text-white transition-colors duration-300"
          >
            REQUEST MORE INFO
          </PrismicNextLink>
        </div>
      </div>
    </section>
  );
};

export default Package2;
