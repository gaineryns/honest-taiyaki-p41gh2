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
    <div className="about-slice-wrapper">
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="about-slice"
      >
        <div className="content-wrapper">
          <div>
            <PrismicNextImage field={slice.primary.image} />
            <div className="person-details">
              <PrismicRichText field={slice.primary.person} />
              <PrismicRichText field={slice.primary.person_title} />
            </div>
          </div>
          <div className="text-section">
            <div className="title">
              <PrismicRichText field={slice.primary.title} />
            </div>
            <PrismicRichText field={slice.primary.description} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
