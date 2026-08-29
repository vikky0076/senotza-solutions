import FAQ from "@/components/shared/FAQ";
import ContactCTA from "@/components/shared/ContactCTA";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "FAQ | SENOTZA SOLUTIONS",
  description: "Find answers to common questions about our services, pricing, timeline, technology, and post-launch support.",
};

export default function FAQPage() {
  return (
    <main className="flex min-h-screen flex-col pt-20">
      <FAQ />
      <ContactCTA />
      <Footer />
    </main>
  );
}
