"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Content } from "@prismicio/client";
import Image from "next/image";
import Link from "next/link";

type TalentsProps = {
  talents: Content.TalentDocument[];
};

export default function ArtistGrid({ talents }: TalentsProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

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

  const toggleCategory = (category: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category],
    );
  };

  const filteredTalents =
    selectedCategories.length === 0 ||
    selectedCategories.length === categories.length
      ? talents
      : talents.filter(
          (talent) =>
            talent.data.genre &&
            selectedCategories.includes(talent.data.genre.toLowerCase()),
        );

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
                  ? "border-[#e8be69] bg-[#e8be69] text-white"
                  : "border-[#e8be69] bg-transparent text-black"
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
            className="relative cursor-pointer"
          >
            <Link href={`/talents/${talent.uid}`}>
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
                    className="grayscale transition-all duration-500 hover:grayscale-0"
                  />
                </motion.div>
              </div>
              <button className="font-montserrat mx-auto mt-2 block w-[70%] rounded-full border border-[#e8be69] bg-transparent px-2 py-1 text-center uppercase text-black">
                {talent.data.name}
              </button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
