import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
  const client = createClient();
  const page = await client.getByUID("news", "news");

  return (
    <div className="container">
      <h1>{page.data.title}</h1>
      <SliceZone slices={page.data.slices} components={components} />
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
