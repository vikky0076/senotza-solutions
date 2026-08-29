import About from "@/components/home/About";
import Founder from "@/components/about/Founder";
import ContactCTA from "@/components/shared/ContactCTA";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "About | SENOTZA SOLUTIONS",
  description: "Learn about SENOTZA SOLUTIONS — our mission, vision, values, and the mind behind the company.",
};

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col pt-20">
      <About />
      <Founder />
      <ContactCTA />
      <Footer />
    </main>
  );
}
