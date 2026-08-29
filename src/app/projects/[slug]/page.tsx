import { notFound } from "next/navigation";
import ProjectDetail from "@/components/projects/ProjectDetail";
import ContactCTA from "@/components/shared/ContactCTA";
import Footer from "@/components/layout/Footer";

const projectData: Record<string, {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  challenge: string;
  strategy: string;
  solution: string;
  result: string;
}> = {
  "senotza-v1": {
    title: "SENOTZA v1.0",
    category: "Websites",
    description: "The original SENOTZA SOLUTIONS website — built to establish our digital identity and online presence.",
    technologies: ["HTML", "CSS", "JavaScript"],
    challenge: "SENOTZA needed a professional web presence that communicated technical expertise while remaining approachable for small business clients.",
    strategy: "We focused on a clean, fast-loading design that emphasized credibility and showcased our capabilities through real project examples.",
    solution: "A handcrafted, fully responsive website built with vanilla HTML, CSS, and JavaScript — demonstrating that premium experiences don't require heavy frameworks.",
    result: "Successfully launched and served as the primary client acquisition channel. Led to the decision to rebuild with a modern stack for SENOTZA 2.0.",
  },
  "portfolio-design-system": {
    title: "Portfolio Design System",
    category: "UI/UX",
    description: "A modular design system for portfolio websites with reusable components and design tokens.",
    technologies: ["Figma", "React", "Tailwind CSS"],
    challenge: "Creating portfolio websites for multiple clients resulted in inconsistent quality and duplicated effort across projects.",
    strategy: "We designed a comprehensive component library with flexible theming, allowing rapid customization while maintaining design integrity.",
    solution: "A Figma-to-code design system with shared tokens for colors, typography, spacing, and animation — paired with React components.",
    result: "Reduced portfolio project delivery time while ensuring every output maintained a premium standard of quality.",
  },
  "business-web-app": {
    title: "Business Management App",
    category: "Web Applications",
    description: "A full-stack web application for managing client projects, invoices, and communications.",
    technologies: ["Next.js", "MongoDB", "TypeScript"],
    challenge: "The client was managing projects across spreadsheets, email chains, and paper invoices — leading to missed deadlines and lost revenue.",
    strategy: "We mapped their entire workflow digitally, identifying automation opportunities and designing an intuitive dashboard-first experience.",
    solution: "A custom Next.js application with role-based authentication, real-time project tracking, automated invoice generation, and client communication tools.",
    result: "Project details editable upon request. The application is designed to scale with the client's growing team.",
  },
  "brand-identity-project": {
    title: "Brand Identity Suite",
    category: "Branding",
    description: "Complete visual identity including logo, color system, typography, and brand guidelines.",
    technologies: ["Illustrator", "Photoshop", "Figma"],
    challenge: "The client had an outdated visual identity that no longer reflected their market positioning or professional growth.",
    strategy: "We conducted competitor analysis and brand workshops to define a visual language that communicates trust, modernity, and expertise.",
    solution: "A comprehensive brand suite including primary and secondary logos, a curated color palette, typography guidelines, and usage rules.",
    result: "Deliverables available upon request. The new identity was deployed across digital and print materials.",
  },
  "ecommerce-landing": {
    title: "E-Commerce Landing Page",
    category: "Websites",
    description: "High-conversion landing page optimized for speed, SEO, and mobile performance.",
    technologies: ["Next.js", "Tailwind CSS", "Vercel"],
    challenge: "The client's existing landing page had poor mobile performance and low conversion rates from paid advertising campaigns.",
    strategy: "Mobile-first redesign with a focus on page speed, clear CTAs, and trust signals placed at strategic scroll depths.",
    solution: "A blazing-fast Next.js landing page deployed on Vercel with sub-second load times, optimized images, and structured data for SEO.",
    result: "Performance metrics improved significantly. Specific conversion data available from the client upon request.",
  },
  "dashboard-ui": {
    title: "Analytics Dashboard",
    category: "Web Applications",
    description: "Real-time analytics dashboard with data visualization and role-based access control.",
    technologies: ["React", "D3.js", "Firebase"],
    challenge: "The team needed to monitor key business metrics in real-time but relied on manual reporting processes that were slow and error-prone.",
    strategy: "We designed a role-based dashboard that surfaces the most critical metrics first, with drill-down capabilities for deeper analysis.",
    solution: "A React-based dashboard with D3.js visualizations, Firebase real-time data syncing, and configurable widgets per user role.",
    result: "Dashboard is operational and actively used. Detailed impact metrics can be provided upon client authorization.",
  },
};

export function generateStaticParams() {
  return Object.keys(projectData).map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectData[slug];

  if (!project) {
    notFound();
  }

  return (
    <>
      <ProjectDetail project={project} />
      <ContactCTA />
      <Footer />
    </>
  );
}
