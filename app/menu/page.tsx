import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FullMenu from "@/components/FullMenu";
import CustomCursor from "@/components/CustomCursor";

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-[#0D0800]">
      <CustomCursor />
      <Navbar />
      <div className="pt-20">
        <FullMenu />
      </div>
      <Footer />
    </main>
  );
}
