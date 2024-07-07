"use client";

import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import Link from "next/link";
import { useState } from "react";

type NavbarProps = {
  globalNav: Content.NavigationDocument;
};

export default function NavBar({ globalNav }: NavbarProps) {
  // Hover state to manage which menu is currently hovered
  const [hoverMenu, setHoverMenu] = useState<string | null>(null);

  return (
    <nav className="bg-white px-4 py-4 md:px-6 md:py-6" aria-label="Main">
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-black md:flex-row md:items-center">
        <div>
          <Link href="/">
            <PrismicNextImage
              field={globalNav.data.fallback_og_image}
              alt={globalNav.data.site_title || "broocksagency Home Page"}
              className="h-12 w-auto"
            />
            <span className="sr-only">Glisten.ai Home Page</span>
          </Link>
        </div>
        <div>
          <ul className="flex gap-6">
            {/* Renders top-level links. */}
            {globalNav.data.slices.map((slice) => (
              <li
                key={slice.id}
                className="relative"
                onMouseEnter={() => setHoverMenu(slice.id)}
                onMouseLeave={() => setHoverMenu(null)}
              >
                {slice.items.length > 0 ? (
                  <>
                    <button className="focus:outline-none">
                      <PrismicText field={slice.primary.name} />
                    </button>
                    {/* Render sub-menu if items exist and this slice is being hovered */}
                    {hoverMenu === slice.id && (
                      <ul className="absolute left-0 mt-2 bg-white shadow-lg">
                        {slice.items.map((item, index) => (
                          <li key={index} className="p-2">
                            <PrismicNextLink field={item.child_link}>
                              <PrismicText field={item.child_name} />
                            </PrismicNextLink>
                          </li>
                        ))}
                      </ul>
                    )}
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
