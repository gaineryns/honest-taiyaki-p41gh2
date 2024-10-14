"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Content } from "@prismicio/client";
import Image from "next/image";
import Link from "next/link";
import Modal from "react-modal";
import TalentDetails from "./TalentDetails"; // Import du composant TalentDetails
import { FiX } from "react-icons/fi"; // Import de l'icône de fermeture de react-icons

type TalentsProps = {
  talents: Content.TalentDocument[];
};

Modal.setAppElement("#root");

export default function ArtistGrid({ talents }: TalentsProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedTalent, setSelectedTalent] =
    useState<Content.TalentDocument | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shuffledTalents, setShuffledTalents] = useState<
    Content.TalentDocument[]
  >([]);

  useEffect(() => {
    const allCategories = new Set<string>();
    talents.forEach((talent) => {
      const genre = talent.data.genre?.toLowerCase();
      if (genre && !allCategories.has(genre)) {
        allCategories.add(genre);
      }
    });
    setCategories(Array.from(allCategories));
  }, [talents]);

  // Fonction pour mélanger les talents aléatoirement
  const shuffleTalents = (talentsArray: Content.TalentDocument[]) => {
    return talentsArray.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    // Mélanger les talents seulement côté client après le rendu
    setShuffledTalents(shuffleTalents([...talents]));
  }, [talents]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category],
    );
  };

  // Fonction pour ordonner les talents par talentsorder
  const orderTalents = (talentsArray: Content.TalentDocument[]) => {
    return talentsArray.sort((a, b) => {
      const orderA = a.data.talentsorder || 0;
      const orderB = b.data.talentsorder || 0;
      return orderA - orderB;
    });
  };

  // Utiliser useMemo pour filtrer et ordonner les talents
  const filteredTalents = useMemo(() => {
    let result = shuffledTalents;

    if (
      selectedCategories.length === 0 ||
      selectedCategories.length === categories.length
    ) {
      // Ne pas changer le mélange aléatoire si toutes les catégories sont sélectionnées
      result = shuffledTalents;
    } else {
      // Filtrer selon les catégories sélectionnées
      result = shuffledTalents.filter(
        (talent) =>
          talent.data.genre &&
          selectedCategories.includes(talent.data.genre.toLowerCase()),
      );
    }

    // Ordonner les talents si la variable talentsorder existe
    return orderTalents(result);
  }, [selectedCategories, shuffledTalents, categories]);

  const openModal = (talent: Content.TalentDocument) => {
    setSelectedTalent(talent);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTalent(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="container mx-auto px-4">
      <div className="sticky top-0 z-10 bg-white py-4">
        <div className="flex justify-start space-x-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`rounded-full border px-4 py-2 text-sm uppercase ${
                selectedCategories.includes(category)
                  ? "border-broocksprimary bg-broocksprimary text-white"
                  : "border-broocksprimary bg-transparent text-black"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredTalents.map((talent) => (
          <motion.div
            key={talent.id}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            layout
            className="group relative cursor-pointer"
            onClick={() => openModal(talent)}
          >
            <div className="relative h-[280px] w-full overflow-hidden">
              <motion.div
                className="h-full w-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={
                    talent.data.head_shot.url ||
                    "https://t4.ftcdn.net/jpg/02/17/34/67/360_F_217346782_7XpCTt8bLNJqvVAaDZJwvZjm0epQmj6j.jpg"
                  }
                  alt={talent.data.name || "Unknown"}
                  layout="fill"
                  objectFit="cover"
                  className="transition-all duration-500"
                />
              </motion.div>
            </div>
            <button className="font-montserrat mx-auto mt-2 block w-[70%] rounded-full border border-broocksprimary bg-transparent px-2 py-1 text-center uppercase text-black transition-colors duration-300 focus:bg-broocksprimary focus:text-white group-hover:bg-broocksprimary group-hover:text-white">
              {talent.data.name}
            </button>
          </motion.div>
        ))}
      </div>

      {selectedTalent && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Talent Modal"
          className="relative mx-auto mt-[100px] max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-lg bg-white p-6 shadow-lg"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
        >
          <div className="relative mx-auto w-full max-w-5xl p-6">
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 flex items-center justify-center rounded-full bg-red-500 p-2 text-white hover:bg-red-600"
              aria-label="Fermer"
            >
              <FiX className="text-2xl" />
            </button>
            <TalentDetails talent={selectedTalent.data} />
            <Link href={`/talents/${selectedTalent.uid}`}>
              <div className="mt-4 inline-block rounded bg-broocksprimary px-4 py-2 text-white">
                Voir la page complète
              </div>
            </Link>
          </div>
        </Modal>
      )}
    </div>
  );
}
