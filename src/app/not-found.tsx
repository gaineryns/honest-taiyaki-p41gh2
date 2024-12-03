import Link from "next/link";
import Header from "@/components/Header";

export default function NotFound() {
  return (
    <div>
      <Header />
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h2>Page non trouvée</h2>
        <p>Désolé, la page que vous recherchez n&apos;existe pas.</p>
        <Link href="/" className="mt-4 underline">
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
