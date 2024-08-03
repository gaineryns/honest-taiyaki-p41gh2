import { Metadata } from "next";

import { createClient } from "@/prismicio";
import ContactCard from "@/components/ContactCard";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("contact_info");

  return (
    <div className="container">
      <ContactCard data={page.data} />;
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("contact_info");

  return {
    // title: page.data.meta_title,
    // description: page.data.meta_description,
  };
}
