"use client";

import { Content } from "@prismicio/client";
import { HiClock, HiLocationMarker, HiPhone } from "react-icons/hi";

type NavbarProps = {
  settings: Content.ContactMenuDocument;
};
export default function NavBarLocation({ settings }: NavbarProps) {
  let iconStyles = { fontSize: "1.0em" };
  return (
    <nav className="md-:py-6 px-4 py-4 md:px-6" aria-label="Main">
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-white md:flex-row md:items-center">
        <ul className="flex flex-wrap items-center gap-6">
          <li key={settings.data.location} className="flex items-center">
            <HiLocationMarker
              style={iconStyles}
              className="text-broocksprimary mr-2 inline-block"
            />
            {settings.data.location}
          </li>
          <li key={settings.data.phone} className="flex items-center">
            <HiPhone
              style={iconStyles}
              className="text-broocksprimary mr-2 inline-block"
            />
            {settings.data.phone}
          </li>
          <li key={settings.data.hour} className="flex items-center">
            <HiClock
              style={iconStyles}
              className="text-broocksprimary mr-2 inline-block"
            />
            {settings.data.hour}
          </li>
        </ul>
      </div>
    </nav>
  );
}
