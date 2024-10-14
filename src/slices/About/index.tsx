import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `About`.
 */
export type AboutProps = SliceComponentProps<Content.AboutSlice>;

/**
 * Component for "About" Slices.
 */
const About = ({ slice }: AboutProps): JSX.Element => {
  return (
    <div className="w-full bg-white py-8">
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="mx-auto flex max-w-screen-xl flex-col items-center px-8 text-black"
      >
        <div className="flex flex-col items-start md:flex-row md:items-start">
          <div>
            {/* Fixing the image size explicitly */}
            <PrismicNextImage
              field={slice.primary.image}
              className="w-full max-w-[400px] rounded-lg"
            />
            <div className="mt-4 text-left">
              <PrismicRichText
                field={slice.primary.person}
                components={{
                  heading2: ({ children }) => (
                    <h2 className="mb-0 text-xl font-bold">{children}</h2>
                  ),
                }}
              />
              <PrismicRichText
                field={slice.primary.person_title}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-lg font-light">{children}</p>
                  ),
                }}
              />
            </div>
          </div>
          <div className="mt-6 max-w-lg md:ml-8 md:mt-0">
            <div className="mb-6 text-left text-2xl font-bold">
              <PrismicRichText field={slice.primary.title} />
            </div>
            <PrismicRichText
              field={slice.primary.description}
              components={{
                paragraph: ({ children }) => (
                  <p className="mb-4 text-lg leading-relaxed">{children}</p>
                ),
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
