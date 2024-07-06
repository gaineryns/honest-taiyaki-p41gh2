"use client";

import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import Link from "next/link";

type NavbarProps = {
  settings: Content.SettingsDocument;
  globalNav: Content.NavigationDocument;
};
export default function NavBar({ settings, globalNav }: NavbarProps) {
  return (
    <nav
      className="z-506 sticky top-0 bg-white px-4 py-4 md:px-6 md:py-6"
      aria-label="Main"
    >
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-white md:flex-row md:items-center">
        <Link href="/">
          <PrismicNextImage
            field={globalNav.data.fallback_og_image}
            alt={globalNav.data.site_title || "broocksagency Home Page"}
            className="h-12 w-auto"
          />
          <span className="sr-only">Glisten.ai Home Page</span>
        </Link>
        <ul className="flex gap-6 text-black">
          {/* Renders top-level links. */}
          {globalNav.data.slices.map((slice) => {
            return (
              <li key={slice.id}>
                <PrismicNextLink field={slice.primary.link}>
                  <PrismicText field={slice.primary.name} />
                </PrismicNextLink>

                {/* Renders child links, if present. */}
                {slice.items.length > 0 && (
                  <ul>
                    {slice.items.map((item) => {
                      return (
                        <li key={JSON.stringify(item)}>
                          <PrismicNextLink field={item.child_link}>
                            <PrismicText field={item.child_name} />
                          </PrismicNextLink>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
