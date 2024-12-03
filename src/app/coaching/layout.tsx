import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Analytics } from "@vercel/analytics/next";
export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="root" className="bg-gray-50 pt-[100px]">
      <Header />
      <main className="container">
        {children}
        <Analytics />
      </main>
      <Footer />
    </div>
  );
}
