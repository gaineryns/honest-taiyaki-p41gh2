import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";

export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("contact_info");
  const currentYear = new Date().getFullYear();

  // Styles d'icônes avec couleur broocksgold
  const iconStyles = { fontSize: "1.0em", color: "#DAA520" };

  return (
    <footer className="bg-broocksprimary px-8 py-4 text-white">
      {/* Texte de fin en bas à gauche sur une seule ligne avec Privacy Policy */}
      <div className="mt-2 flex flex-col items-center justify-center gap-2 text-center text-sm text-gray-100 md:flex-row md:justify-start md:text-left">
        <span>© {currentYear} Broocksagency, Inc.</span>
        {/* Ajout du lien Privacy Policy */}
        <Link
          href="/privacy-policy"
          className="text-broocksgold hover:underline"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
