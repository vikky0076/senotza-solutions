import Process from "@/components/home/Process";
import ContactCTA from "@/components/shared/ContactCTA";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Our Process | SENOTZA SOLUTIONS",
  description: "A proven creative process from discovery to growth — how SENOTZA SOLUTIONS transforms ideas into digital experiences.",
};

export default function ProcessPage() {
  return (
    <main className="flex min-h-screen flex-col pt-20">
      <Process />
      <ContactCTA />
      <Footer />
    </main>
  );
}
