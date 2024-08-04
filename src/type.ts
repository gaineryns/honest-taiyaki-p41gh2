import { RichTextField, LinkField, ImageField } from "@prismicio/client";

export interface HeroSlice {
  slice_type: string;
  variation: string;
  primary: {
    heading: RichTextField;
    body: RichTextField;
    button_link: LinkField;
    button_label: string;
    image: ImageField;
  };
}