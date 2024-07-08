"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Content } from "@prismicio/client";
import Image from "next/image";
import TalentModal from "./TalentModal";

type TalentsProps = {
  talents: Content.TalentDocument[];
};

export default function ArtistGrid({ talents }: TalentsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>(["all"]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [, setSelectedTalent] = useState<Content.TalentDocument | null>(null);

  useEffect(() => {
    const allCategories = new Set<string>(["all"]);
    talents.forEach((talent) => {
      talent.data.slices.forEach((slice) => {
        if (slice.slice_type === "actor") {
          allCategories.add(slice.primary.genre.toLowerCase());
        }
      });
    });
    setCategories(Array.from(allCategories));
  }, [talents]);

  const filteredTalents =
    selectedCategory === "all"
      ? talents
      : talents.filter((talent) =>
          talent.data.slices.some(
            (slice) =>
              slice.slice_type === "actor" &&
              slice.primary.genre.toLowerCase() === selectedCategory,
          ),
        );

  const handleImageClick = (talent: Content.TalentDocument) => {
    setSelectedTalent(talent);
    setShowModal(true);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="sticky top-0 z-10 bg-white py-4">
        <div className="flex justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`mx-2 rounded px-4 py-2 ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredTalents.map((talent) =>
          talent.data.slices.map(
            (slice) =>
              slice.slice_type === "actor" && (
                <motion.div
                  key={talent.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  layout
                  className="relative cursor-pointer"
                  onClick={() => handleImageClick(talent)}
                >
                  <motion.div
                    className="flex h-[270px] w-full items-center justify-center overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image
                      src={slice.primary.gallery_image.url}
                      alt={slice.primary.name}
                      width={270}
                      height={270}
                      className="object-cover grayscale transition-all duration-500 hover:grayscale-0"
                      layout="fixed"
                    />
                  </motion.div>
                  <p className="mt-2 text-center">{slice.primary.name}</p>
                </motion.div>
              ),
          ),
        )}
      </div>
      {selectedTalent && (
        <TalentModal
          showModal={showModal}
          setShowModal={setShowModal}
          talent={selectedTalent}
        />
      )}
    </div>
  );
}
