import Hero from "@/components/hero/Hero";
import CapabilitiesSection from "@/components/capabilities/CapabilitiesSection";
import StackedCards from "@/components/home/StackedCards";
import About from "@/components/home/About";
import Process from "@/components/home/Process";

import Footer from "@/components/layout/Footer";
import RunningText from "@/components/home/RunningText";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <CapabilitiesSection />
      <StackedCards />
      <Process />
      <RunningText />
      <Footer />
    </main>
  );
}
