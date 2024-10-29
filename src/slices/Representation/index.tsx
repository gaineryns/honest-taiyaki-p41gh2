import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Representation`.
 */
export type RepresentationProps =
  SliceComponentProps<Content.RepresentationSlice>;

/**
 * Format date to "Month Year".
 */
const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

/**
 * Component for "Representation" Slices.
 */
const Representation = ({ slice }: RepresentationProps): JSX.Element => {
  // Sort representation items by date, from most recent to oldest
  const sortedRepresentations = [...slice.primary.representation].sort(
    (a, b) => {
      const dateA = a.date ? Date.parse(a.date) : 0;
      const dateB = b.date ? Date.parse(b.date) : 0;
      return dateB - dateA;
    },
  );

  return (
    <section
      className="grid grid-cols-1 gap-16 p-5 md:grid-cols-3"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {sortedRepresentations.map((item, index) => (
        <div key={index} className="mb-10 flex flex-col items-start text-left">
          <h2 className="my-2 text-[1.0rem] font-extrabold text-broocksprimary sm:text-[1.2rem] md:text-[1.4rem] lg:text-[1.6rem]">
            {formatDate(item.date)} {/* Date with larger font */}
          </h2>
          <div className="w-full">
            <PrismicNextImage
              field={item.image}
              className="mb-2 h-56 w-full object-cover"
            />
          </div>
          <div className="text-sm leading-5 text-gray-700 md:text-center lg:text-lg">
            <PrismicRichText
              field={item.description}
              components={{
                hyperlink: ({ node, children }) => (
                  <a href="#" className="text-broocksprimary">
                    {children}
                  </a>
                ),
              }}
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default Representation;
