import Header from "@/components/Header";
import BackgroundFX from "@/components/BackgroundFX";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <BackgroundFX />
      <Header />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}

