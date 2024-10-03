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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // État pour le menu mobile
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = (id: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHoverMenu(id);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoverMenu(null);
    }, 5000);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setHoverMenu(null);
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState); // Toggle pour ouvrir/fermer le menu mobile
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
          ? "bg-broocksprimary py-1 text-white"
          : "bg-broocksprimary py-2 text-white"
      }`}
      aria-label="Main"
      ref={menuRef}
    >
      <div className="flex w-full items-center justify-between px-4 font-medium md:px-8">
        <div className="flex items-center">
          <Link href="/">
            <PrismicNextImage
              field={globalNav.data.fallback_og_image}
              className={`transition-all duration-300 ${
                isScrolled ? "h-6 w-auto" : "h-10 w-auto"
              }`}
            />
            <span className="sr-only">Broocks Agency</span>
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
        <div
          className={`mt-1 md:mt-0 ${isMobileMenuOpen ? "block" : "hidden"} md:flex`}
        >
          <ul className="flex flex-col items-center gap-1 md:flex-row md:gap-2">
            {globalNav.data.slices.map((slice) => (
              <li
                key={slice.id}
                className="menu-item relative focus:outline-none"
                onMouseEnter={() => handleMouseEnter(slice.id)}
                onMouseLeave={handleMouseLeave}
              >
                {slice.items.length > 0 ? (
                  <>
                    <div
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(slice.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <span
                        className={`text-sm text-white hover:text-broocksgold focus:outline-none ${
                          hoverMenu === slice.id ? "text-broocksgold" : ""
                        }`}
                      >
                        <PrismicText field={slice.primary.name} />
                      </span>
                      <AnimatePresence>
                        {hoverMenu === slice.id && (
                          <motion.ul
                            className="submenu absolute left-0 mt-4 w-40 bg-gray-300 text-black shadow-lg"
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
                                  <span className="text-white hover:text-broocksgold">
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
                    <span className="text-sm text-white hover:text-broocksgold">
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
