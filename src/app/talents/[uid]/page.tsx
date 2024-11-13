import { Metadata } from "next";
import { notFound } from "next/navigation";

import { PrismicRichText, SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = { uid: string };

/**
 * This page renders a Prismic Document dynamically based on the URL.
 */

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("talents_gallery", params.uid, {
      fetchOptions: { next: { revalidate: 5 } },
    })
    .catch(() => notFound());

  return {
    title: page.data.title,
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title || undefined,
      images: [
        {
          url: page.data.meta_image.url || "",
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: Params }) {
  const client = createClient();

  // Fetch the document with revalidation every 60 seconds
  const page = await client.getByUID("talents_gallery", params.uid, {
    fetchOptions: { next: { revalidate: 5 } }, // Revalidate every 60 seconds
  });

  if (!page) {
    notFound();
  }

  return (
    <div className="container">
      <h1 className="text-center">{page.data.title}</h1>
      <SliceZone slices={page.data.slices} components={components} />
    </div>
  );
}

/**
 * Generate static parameters for each document.
 */
export async function generateStaticParams() {
  const client = createClient();

  // Query all Documents from the API, except the homepage
  const pages = await client.getAllByType("talents_gallery", {
    predicates: [prismic.filter.not("my.page.uid", "dancers")],
  });

  // Define a path for every Document
  return pages.map((page) => {
    return { uid: page.uid };
  });
}
