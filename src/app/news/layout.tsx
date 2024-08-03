import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function TalentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="root">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
