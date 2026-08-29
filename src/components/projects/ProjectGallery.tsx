"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedText from "@/components/animations/AnimatedText";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const categories = ["All", "Websites", "Web Applications", "Branding", "UI/UX", "Other"];

const projects = [
  {
    slug: "senotza-v1",
    title: "SENOTZA v1.0",
    category: "Websites",
    description: "The original SENOTZA SOLUTIONS website — built to establish our digital identity.",
    technologies: ["HTML", "CSS", "JavaScript"],
  },
  {
    slug: "portfolio-design-system",
    title: "Portfolio Design System",
    category: "UI/UX",
    description: "A modular design system for portfolio websites with reusable components and tokens.",
    technologies: ["Figma", "React", "Tailwind CSS"],
  },
  {
    slug: "business-web-app",
    title: "Business Management App",
    category: "Web Applications",
    description: "A full-stack web application for managing client projects, invoices, and communications.",
    technologies: ["Next.js", "MongoDB", "TypeScript"],
  },
  {
    slug: "brand-identity-project",
    title: "Brand Identity Suite",
    category: "Branding",
    description: "Complete visual identity including logo, color system, typography, and brand guidelines.",
    technologies: ["Illustrator", "Photoshop", "Figma"],
  },
  {
    slug: "ecommerce-landing",
    title: "E-Commerce Landing Page",
    category: "Websites",
    description: "High-conversion landing page optimized for speed, SEO, and mobile performance.",
    technologies: ["Next.js", "Tailwind CSS", "Vercel"],
  },
  {
    slug: "dashboard-ui",
    title: "Analytics Dashboard",
    category: "Web Applications",
    description: "Real-time analytics dashboard with data visualization and role-based access control.",
    technologies: ["React", "D3.js", "Firebase"],
  },
];

export default function ProjectGallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="relative w-full py-32 bg-background overflow-hidden" id="projects">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-16">
          <AnimatedText
            el="h2"
            text="Selected Work"
            className="text-4xl sm:text-6xl font-heading font-bold text-white tracking-tighter"
          />
          <AnimatedText
            el="p"
            text="A curated selection of projects that showcase our craft."
            className="text-white/60 text-xl mt-4 max-w-2xl"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-white text-black"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-white/20 transition-colors duration-500"
                >
                  {/* Image Placeholder */}
                  <div className="aspect-[16/10] bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-heading text-3xl font-bold text-white/10 group-hover:text-white/20 transition-colors">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-45">
                      <ArrowUpRight size={18} className="text-white" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-primary/60 font-mono text-xs tracking-wider uppercase">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-heading font-bold text-white mt-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/50 text-sm mt-3 leading-relaxed flex-grow">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/40 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
