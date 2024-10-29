"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import Image from "next/image";

type TalentsProps = {
  talents: Content.TalentDocument[];
};

export default function ArtistGrid({ talents }: TalentsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  // Extract unique categories from the list of talents
  useMemo(() => {
    const allCategories = new Set<string>();
    talents.forEach((talent) => {
      const genre = talent.data.genre?.toLowerCase();
      if (genre) {
        allCategories.add(genre);
      }
    });
    setCategories(["all", ...Array.from(allCategories)]);
  }, [talents]);

  const toggleCategory = (category: string) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category,
    );
  };

  // Filter talents by selected category
  const filteredTalents = useMemo(() => {
    if (!selectedCategory || selectedCategory === "all") {
      return talents;
    } else {
      return talents.filter(
        (talent) =>
          talent.data.genre &&
          talent.data.genre.toLowerCase() === selectedCategory,
      );
    }
  }, [selectedCategory, talents]);

  return (
    <div className="container mx-auto px-4">
      <div className="sticky top-0 z-10 bg-white py-4">
        <div className="flex justify-start space-x-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`rounded-full border px-4 py-2 text-sm uppercase ${
                selectedCategory === category
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
        <AnimatePresence>
          {filteredTalents.map((talent) => (
            <motion.div
              key={talent.id}
              initial={{ opacity: 0.5, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0.5, y: -10 }}
              transition={{ duration: 0.3 }}
              layout
              className="group relative cursor-pointer"
            >
              <PrismicNextLink field={talent.data.spotlight_link}>
                <div className="relative h-[280px] w-full overflow-hidden">
                  <motion.div
                    className="h-full w-full"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4 }}
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
                <button className="font-montserrat mx-auto mt-2 block w-[70%] rounded-full border border-broocksprimary bg-transparent px-2 py-1 text-center uppercase text-black transition-colors duration-300 group-hover:bg-broocksprimary group-hover:text-white">
                  {talent.data.name}
                </button>
              </PrismicNextLink>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
