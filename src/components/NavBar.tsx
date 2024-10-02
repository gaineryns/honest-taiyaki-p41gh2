"use client";

import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type NavbarProps = {
  globalNav: Content.NavigationDocument;
};

export default function NavBar({ globalNav }: NavbarProps) {
  const [hoverMenu, setHoverMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = (id: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Annuler le délai de fermeture si on repasse sur le menu
    }
    setHoverMenu(id); // Ouvrir le sous-menu
  };

  const handleMouseLeave = () => {
    // Délai de 5 secondes avant la fermeture du sous-menu
    timeoutRef.current = setTimeout(() => {
      setHoverMenu(null); // Fermer le sous-menu après 5 secondes
    }, 5000);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setHoverMenu(null); // Fermer le sous-menu si on clique à l'extérieur
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true); // Réduire la taille de la navbar au scroll
    } else {
      setIsScrolled(false); // Restaurer la taille initiale
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`navbar fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-broocksprimary py-2 text-white"
          : "bg-broocksprimary py-4 text-white"
      }`}
      aria-label="Main"
      ref={menuRef}
    >
      <div className="flex w-full items-center justify-between px-8 font-medium md:px-16">
        <div className="flex items-center">
          <Link href="/">
            <PrismicNextImage
              field={globalNav.data.fallback_og_image}
              className={`transition-all duration-300 ${
                isScrolled ? "h-8 w-auto" : "h-16 w-auto"
              }`}
            />
            <span className="sr-only">Broocks Agency</span>
          </Link>
        </div>
        <div className="mt-2 md:mt-0">
          <ul className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
            {globalNav.data.slices.map((slice) => (
              <li
                key={slice.id}
                className="menu-item relative text-broocksgold focus:outline-none"
                onMouseEnter={() => handleMouseEnter(slice.id)}
                onMouseLeave={handleMouseLeave}
              >
                {slice.items.length > 0 ? (
                  <>
                    <div
                      className="relative" // Crée un conteneur englobant le lien et le sous-menu
                      onMouseEnter={() => handleMouseEnter(slice.id)} // Garder le sous-menu ouvert
                      onMouseLeave={handleMouseLeave} // Appliquer la fermeture avec délai si on quitte toute la zone
                    >
                      <span
                        className={`text-broocksgold focus:outline-none ${
                          hoverMenu === slice.id ? "text-broocksgold" : ""
                        }`}
                      >
                        <PrismicText field={slice.primary.name} />
                      </span>
                      <AnimatePresence>
                        {hoverMenu === slice.id && (
                          <motion.ul
                            className="submenu absolute left-0 mt-6 w-48 bg-gray-300 text-black shadow-lg"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                          >
                            {slice.items.map((item, index) => (
                              <li
                                key={index}
                                className="submenu-item p-2 transition-colors hover:bg-broocksprimary hover:text-white"
                              >
                                <PrismicNextLink field={item.child_link}>
                                  <span className="text-broocksgold focus:text-broocksgold">
                                    <PrismicText field={item.child_name} />
                                  </span>
                                </PrismicNextLink>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                ) : (
                  <PrismicNextLink field={slice.primary.link}>
                    <span className="text-broocksgold focus:text-broocksgold">
                      <PrismicText field={slice.primary.name} />
                    </span>
                  </PrismicNextLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
