import ProjectGallery from "@/components/projects/ProjectGallery";
import ContactCTA from "@/components/shared/ContactCTA";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Our Work | SENOTZA SOLUTIONS",
  description: "A curated selection of projects showcasing our expertise in web development, design, branding, and digital solutions.",
};

export default function ProjectsPage() {
  return (
    <main className="flex min-h-screen flex-col pt-20">
      <ProjectGallery />
      <ContactCTA />
      <Footer />
    </main>
  );
}
