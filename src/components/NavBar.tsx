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
    }, 200); // Adjust delay as needed
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setHoverMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className="navbar container bg-[#EFEFEF] p-0"
      aria-label="Main"
      ref={menuRef}
    >
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-black md:flex-row md:items-center">
        <div>
          <Link href="/">
            <PrismicNextImage
              field={globalNav.data.fallback_og_image}
              // alt={globalNav.data.site_title || "broocksagency Home Page"}
              className="h-12 w-auto"
            />
            <span className="sr-only">Glisten.ai Home Page</span>
          </Link>
        </div>
        <div>
          <ul className="flex gap-6">
            {globalNav.data.slices.map((slice) => (
              <li
                key={slice.id}
                className="menu-item relative"
                onMouseEnter={() => handleMouseEnter(slice.id)}
                onMouseLeave={handleMouseLeave}
              >
                {slice.items.length > 0 ? (
                  <>
                    <button className="focus:outline-none">
                      <PrismicText field={slice.primary.name} />
                    </button>
                    <AnimatePresence>
                      {hoverMenu === slice.id && (
                        <motion.ul
                          className="submenu absolute z-50 mt-2 w-48 bg-white shadow-lg"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          onMouseEnter={() => handleMouseEnter(slice.id)}
                          onMouseLeave={handleMouseLeave}
                        >
                          {slice.items.map((item, index) => (
                            <li
                              key={index}
                              className="submenu-item p-2 hover:bg-gray-100"
                            >
                              <PrismicNextLink field={item.child_link}>
                                <PrismicText field={item.child_name} />
                              </PrismicNextLink>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <PrismicNextLink field={slice.primary.link}>
                    <PrismicText field={slice.primary.name} />
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
