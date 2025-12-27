import Header from "@/components/Header";
import CanvasDotsBackground from "@/components/CanvasDotsBackground";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <CanvasDotsBackground />
      <Header />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}

