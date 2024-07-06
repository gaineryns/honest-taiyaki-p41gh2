import NavBar from "@/components/NavBar";
import { createClient } from "@/prismicio";
import NavBarLocation from "@/components/NavBarLocation";

export default async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const globalNav = await client.getByUID("navigation", "0001");
  const menulocation = await client.getSingle("contact_menu");
  return (
    <header>
      <NavBarLocation settings={menulocation} />
      <NavBar settings={settings} globalNav={globalNav} />
    </header>
  );
}
