"use client";

import { Content } from "@prismicio/client";

import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import { useEffect, useState } from "react";
import ArtistGrid from "@/components/ArtistGrid";

/**
 * Props for `TalentsGallery`.
 */
export type TalentsGalleryProps =
  SliceComponentProps<Content.TalentsGallerySlice>;

/**
 * Component for "TalentsGallery" Slices.
 */
const TalentsGallery = ({ slice }: TalentsGalleryProps): JSX.Element => {
  const [talents, setTalents] = useState<Content.TalentDocument[]>([]);

  useEffect(() => {
    const fetchTalents = async () => {
      const client = createClient();

      // Extraire les UIDs des talents liés
      const talentUIDs = slice.primary.talents
        .map((item) => (item.talent as { uid: string }).uid)
        .filter((uid) => uid !== undefined);

      // Requête pour chaque UID afin de récupérer les documents de talents complets
      const talentPromises = talentUIDs.map((uid) =>
        client.getByUID("talent", uid!),
      );

      // Attendre que toutes les requêtes soient complétées et stocker les résultats
      const resolvedTalents = await Promise.all(talentPromises);
      setTalents(resolvedTalents); // Mettre à jour le state avec les talents récupérés
    };

    fetchTalents();
  }, [slice.primary.talents]);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div>
        <ArtistGrid talents={talents} />
      </div>
    </section>
  );
};

export default TalentsGallery;
