import Hero from "@/components/hero/Hero";
import CapabilitiesSection from "@/components/capabilities/CapabilitiesSection";
import StackedCards from "@/components/home/StackedCards";
import About from "@/components/home/About";
import Process from "@/components/home/Process";
import ProjectGallery from "@/components/projects/ProjectGallery";
import Footer from "@/components/layout/Footer";
import RunningText from "@/components/home/RunningText";

export default function Home() {
  return (
    <main className="relative">
      {/* ── Hero: sticky so it stays pinned while content scrolls over it ── */}
      <div className="sticky top-0 z-0 h-screen">
        <Hero />
      </div>

      {/* ── Scrollable content — slides over the fixed hero ── */}
      <div className="relative z-10">
        <RunningText />
        <About />
        <CapabilitiesSection />
        <StackedCards />
        <Process />
        <ProjectGallery />
        <Footer />
      </div>
    </main>
  );
}
