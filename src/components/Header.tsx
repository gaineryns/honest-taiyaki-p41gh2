import NavBar from "@/components/NavBar";
import { createClient } from "@/prismicio";
import NavBarLocation from "@/components/NavBarLocation";

export default async function Header() {
  const client = createClient();
  const globalNav = await client.getByUID("navigation", "global-nav");
  return (
    <header className="my-5">
      {/* <NavBarLocation settings={menulocation} /> */}
      <NavBar globalNav={globalNav} />
    </header>
  );
}
