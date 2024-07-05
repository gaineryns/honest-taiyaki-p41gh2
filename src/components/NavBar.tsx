"use client";

import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Link from "next/link";

type NavbarProps = {
  settings: Content.SettingsDocument;
  talentmenu: Content.MenuTalentDocument;
};
export default function NavBar({ settings, talentmenu }: NavbarProps) {
  return (
    <nav
      className="z-506 sticky top-0 bg-white px-4 py-4 md:px-6 md:py-6"
      aria-label="Main"
    >
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-white md:flex-row md:items-center">
        <Link href="/">
          <PrismicNextImage
            field={settings.data.fallback_og_image}
            alt={settings.data.site_title || "broocksagency Home Page"}
            className="h-12 w-auto"
          />
          <span className="sr-only">Glisten.ai Home Page</span>
        </Link>
        <ul className="flex gap-6 text-black">
          {settings.data.navigation.map((item) => {
            console.log(item);
            return (
              <li key={item.label}>
                <PrismicNextLink field={item.link}>
                  {item.label}
                </PrismicNextLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
