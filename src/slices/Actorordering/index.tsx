import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Actorordering`.
 */
export type ActororderingProps =
  SliceComponentProps<Content.ActororderingSlice>;

/**
 * Component for "Actorordering" Slices.
 */
const Actorordering = ({ slice }: ActororderingProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for actorordering (variation: {slice.variation})
      Slices
    </section>
  );
};

export default Actorordering;
