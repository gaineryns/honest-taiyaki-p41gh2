import { Metadata } from "next";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Script from "next/script";

const customComponents = {
  hyperlink: ({ children, node }: any) => (
    <a
      href={node.data.url}
      className="text-broocksprimary hover:text-broocksprimary"
    >
      {children}
    </a>
  ),
  // Add more custom components for other HTML elements as needed
};

const descriptionComponents = {
  hyperlink: ({ children, node }: any) => (
    <a
      href={node.data.url}
      className="block text-center text-broocksprimary hover:text-broocksprimary"
    >
      {children}
    </a>
  ),
  heading1: ({ children }: any) => (
    <h1 className="text-center font-bold text-broocksprimary">{children}</h1>
  ),
  heading2: ({ children }: any) => (
    <h2 className="my-7 text-center font-bold text-broocksprimary">
      {children}
    </h2>
  ),
  heading3: ({ children }: any) => (
    <h3 className="text-center font-bold text-broocksprimary">{children}</h3>
  ),
  list: ({ children }: any) => (
    <ul
      className="mx-auto list-disc pl-4 text-broocksprimary"
      style={{ width: "fit-content" }}
    >
      {children}
    </ul>
  ),
  listItem: ({ children }: any) => (
    <li className="text-gray-700">{children}</li>
  ),
  paragraph: ({ children }: any) => <p className="text-center">{children}</p>,
  // Continue with other elements as needed, ensuring they all include centering styles
};

function AcuitySchedulingScript() {
  return (
    <Script
      src="https://embed.acuityscheduling.com/js/embed.js"
      strategy="lazyOnload"
    ></Script>
  );
}

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("package", {
    fetchOptions: { next: { revalidate: 60 } },
  });

  return (
    <div className="container">
      <div className="text-center">
        <PrismicRichText field={page.data.title} />
      </div>
      {/* <PrismicRichText
        field={page.data.description}
        components={descriptionComponents}
      />
      <h2 className="my-7 text-center font-bold text-broocksprimary">
        {page.data.text_package}
      </h2> */}

      <SliceZone slices={page.data.slices} components={components} />
      <AcuitySchedulingScript />
      <div className="mt-9 text-center">
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
  const page = await client.getSingle("package");

  return {
    // title: page.data.meta_title,
    // description: page.data.meta_description,
  };
}
