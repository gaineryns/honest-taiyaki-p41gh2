import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Filterlist`.
 */
export type FilterlistProps = SliceComponentProps<Content.FilterlistSlice>;

/**
 * Component for "Filterlist" Slices.
 */
const Filterlist = ({ slice }: FilterlistProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for filterlist (variation: {slice.variation}) Slices
    </section>
  );
};

export default Filterlist;
