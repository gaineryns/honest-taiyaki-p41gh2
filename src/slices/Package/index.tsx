import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Package`.
 */
export type PackageProps = SliceComponentProps<Content.PackageSlice>;

/**
 * Component for "Package" Slices.
 */
const Package = ({ slice }: PackageProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex items-stretch justify-center space-x-4"
    >
      {slice.primary.package.map((item, index) => (
        <div
          key={index}
          className="flex w-80 flex-col rounded-lg bg-gray-100 shadow-md"
        >
          <div className="flex-grow p-6">
            <h2 className="mb-1 text-lg font-bold">{item.category}</h2>
            <h3 className="mb-3 text-xl">{item.title}</h3>
            <div className="text-sm">
              <PrismicRichText field={item.description} />
            </div>
          </div>
          <div className="space-y-2 p-6 text-sm">
            <p className="flex items-center">
              <span className="mr-2">⏰</span>
              {item.delivery}
            </p>
            <p className="flex items-center">
              <span className="mr-2">🔄</span>
              {item.revision}
            </p>
            <p className="flex items-center">
              <span className="mr-2">✔️</span>
              {item.duration}
            </p>
          </div>
          <div className="bg-broocksprimary w-full rounded-b-lg p-4 text-center text-2xl font-bold">
            £{item.price}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Package;
