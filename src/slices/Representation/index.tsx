import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import "./styles.css"; // Ensure this CSS file is created

/**
 * Props for `Representation`.
 */
export type RepresentationProps =
  SliceComponentProps<Content.RepresentationSlice>;

/**
 * Component for "Representation" Slices.
 */
const Representation = ({ slice }: RepresentationProps): JSX.Element => {
  return (
    <section
      className="representation-section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.primary.representation.map((item, index) => (
        <div
          key={index}
          className={`film-card ${index % 2 === 0 ? "even" : "odd"}`}
        >
          <PrismicNextImage field={item.image} className="film-image" />
          <h2 className="film-title">{item.title}</h2>
          <PrismicRichText field={item.description} />
          <p className="film-actor">
            <strong>Actor:</strong> {item.talent_name}
          </p>
        </div>
      ))}
    </section>
  );
};

export default Representation;
