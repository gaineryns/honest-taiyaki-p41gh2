import NavBar from "@/components/NavBar";
import { createClient } from "@/prismicio";
import NavBarLocation from "@/components/NavBarLocation";

export default async function Header() {
  const client = createClient();
  const globalNav = await client.getByUID("navigation", "global-nav");
  const menulocation = await client.getSingle("contact_menu");
  return (
    <header>
      <NavBarLocation settings={menulocation} />
      <NavBar globalNav={globalNav} />
    </header>
  );
}