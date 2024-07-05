import NavBar from "@/components/NavBar";
import { createClient } from "@/prismicio";
import NavBarLocation from "@/components/NavBarLocation";

export default async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const menulocation = await client.getSingle("contact_menu");
  const menuTalent = await client.getSingle("menu_talent");
  return (
    <header>
      <NavBarLocation settings={menulocation} />
      <NavBar settings={settings} talentmenu={menuTalent} />
    </header>
  );
}
