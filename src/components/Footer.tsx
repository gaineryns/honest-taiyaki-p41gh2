import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import { HiClock, HiLocationMarker, HiPhone } from "react-icons/hi";

export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("contact_info");
  const currentYear = new Date().getFullYear();

  let iconStyles = { color: "#E8BE69", fontSize: "1.0em" };
  return (
    <footer className="border-slate-600 flex flex-col items-center justify-between gap-6 border-t bg-gray-500 px-8 py-2 md:flex-row">
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-white md:flex-row md:items-center">
        <ul className="flex flex-wrap items-center gap-6">
          <li key={settings.data.location} className="flex items-center">
            <HiLocationMarker
              style={iconStyles}
              className="mr-2 inline-block"
            />
            {settings.data.location}
          </li>
          <li key={settings.data.phone} className="flex items-center">
            <HiPhone style={iconStyles} className="mr-2 inline-block" />
            {settings.data.phone}
          </li>
          <li
            key={settings.data.open_hour_and_day}
            className="flex items-center"
          >
            <HiClock style={iconStyles} className="mr-2 inline-block" />
            {settings.data.open_hour_and_day}
          </li>
        </ul>
      </div>
      <div className="flex flex-col items-center text-center md:items-end">
        {/* <div className="flex flex-wrap gap-4 text-black">
          <PrismicNextLink
            field={settings.data.privacy_policy_link}
            className="text-white hover:underline"
          >
            PRIVACY POLICY
          </PrismicNextLink>
          <span className="text-white">-</span>
          <PrismicNextLink
            field={settings.data.cookie_policy_link}
            className="text-white hover:underline"
          >
            COOKIE POLICY
          </PrismicNextLink>
          <span className="text-white">-</span>
          <PrismicNextLink
            field={settings.data.privacy_notice_link}
            className="text-white hover:underline"
          >
            PRIVACY NOTICE
          </PrismicNextLink>
        </div> */}
        <span className="text-white">©{currentYear} by Broocksagency</span>
      </div>
    </footer>
  );
}
