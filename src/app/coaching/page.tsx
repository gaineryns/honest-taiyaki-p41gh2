import { Metadata } from "next";
import { PrismicRichText, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

const customComponents = {
  hyperlink: ({ children, node }: any) => (
    <a href={node.data.url} className="text-broocksgold hover:text-broocksgold">
      {children}
    </a>
  ),
  // Add more custom components for other HTML elements as needed
};
export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("package");

  return (
    <div className="container mx-auto px-4">
      <PrismicRichText field={page.data.title} />
      <PrismicRichText field={page.data.description} />
      <h2 className="my-4 font-bold">{page.data.text_package}</h2>
      <SliceZone slices={page.data.slices} components={components} />
      <div className="m-4">
        <PrismicRichText
          field={page.data.book_a_call}
          components={customComponents}
        />
      </div>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getByUID("news", "news");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
