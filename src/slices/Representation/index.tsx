import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Representation`.
 */
export type RepresentationProps =
  SliceComponentProps<Content.RepresentationSlice>;

/**
 * Type Guard to check if the `talent_link` is not empty.
 */
const isTalentLinkAvailable = (
  talentLink: any,
): talentLink is { uid: string } =>
  !!talentLink && typeof talentLink.uid === "string";

/**
 * Component for "Representation" Slices.
 */
const Representation = ({ slice }: RepresentationProps): JSX.Element => {
  console.log(
    "Representation slice:",
    slice.primary.representation[0]?.talent_link,
  );

  return (
    <section
      className="grid grid-cols-1 gap-16 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.primary.representation.map((item, index) => (
        <div
          key={index}
          className={`mb-10 flex flex-col items-start text-left ${
            index % 2 === 0 ? "" : "translate-y-20 transform"
          }`}
        >
          <PrismicNextImage field={item.image} className="h-auto w-full" />
          <h2 className="text-md my-2 font-bold text-broocksprimary">
            {item.title}
          </h2>
          <div className="text-xs">
            <PrismicRichText field={item.description} />
          </div>
          <p className="mt-auto text-sm">
            <strong>Actor: </strong>
            {isTalentLinkAvailable(item.talent_link) && (
              <PrismicNextLink
                href={`/talents/${item.talent_link.uid}`}
                className="font-semibold text-broocksprimary hover:underline"
              >
                {item.talent_name}
              </PrismicNextLink>
            )}
          </p>
        </div>
      ))}
    </section>
  );
};

export default Representation;
