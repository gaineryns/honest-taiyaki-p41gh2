import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import TalentDetails from "@/components/TalentDetails";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const talent = await client
    .getByUID("talent", params.uid)
    .catch(() => notFound());

  return (
    <div className="mx-auto max-w-6xl rounded-lg bg-white text-black shadow-lg">
      <TalentDetails talent={talent.data} />;
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const talent = await client
    .getByUID("talent", params.uid)
    .catch(() => notFound());

  return {
    title: talent.data.meta_title,
    description: talent.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const talent = await client.getAllByType("talent");

  return talent.map((talent) => {
    return { uid: talent.uid };
  });
}
