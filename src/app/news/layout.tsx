import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="root" className="pt-[100px]">
      <Header />
      <main className="container">{children}</main>
      <Footer />
    </div>
  );
}
