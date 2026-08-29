import Pricing from "@/components/home/Pricing";
import FAQ from "@/components/shared/FAQ";
import ContactCTA from "@/components/shared/ContactCTA";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Pricing | SENOTZA SOLUTIONS",
  description: "Transparent, honest pricing for every project scope. From starter plans to fully custom enterprise solutions.",
};

export default function PricingPage() {
  return (
    <main className="flex min-h-screen flex-col pt-20">
      <Pricing />
      <FAQ />
      <ContactCTA />
      <Footer />
    </main>
  );
}
