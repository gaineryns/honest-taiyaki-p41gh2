import ArtistGrid from "@/components/ArtistGrid";
import { createClient } from "@/prismicio";
import Head from "next/head";

export default async function Page() {
  const client = createClient();
  const talents = await client.getAllByType("talent");
  const actorTalents = talents.filter(
    (talent) => talent.data.category === "Actor",
  );
  return (
    <div>
      <Head>
        <title>Artist Grid</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <ArtistGrid talents={actorTalents} />
      </main>
    </div>
  );
}
