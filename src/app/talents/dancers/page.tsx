import ArtistGrid from "@/components/ArtistGrid";
import { createClient } from "@/prismicio";
import Head from "next/head";

export default async function Page() {
  const client = createClient();
  const talents = await client.getAllByType("talent");
  const actorTalents = talents.filter(
    (talent) => talent.data.category === "Dancer" && talent.data.enable,
  );
  return (
    <div>
      <main className="container">
        <h1>Our dancers</h1>
        <ArtistGrid talents={actorTalents} />
      </main>
    </div>
  );
}
