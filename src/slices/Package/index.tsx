import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

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
    >
      Placeholder component for package (variation: {slice.variation}) Slices
    </section>
  );
};

export default Package;
