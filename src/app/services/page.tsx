import Services from "@/components/home/Services";
import Pricing from "@/components/home/Pricing";
import FAQ from "@/components/shared/FAQ";
import ContactCTA from "@/components/shared/ContactCTA";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Services & Pricing | SENOTZA SOLUTIONS",
  description: "Explore our comprehensive digital services — from web development to branding — with transparent, honest pricing.",
};

export default function ServicesPage() {
  return (
    <main className="flex min-h-screen flex-col pt-20">
      <Services />
      <Pricing />
      <FAQ />
      <ContactCTA />
      <Footer />
    </main>
  );
}
