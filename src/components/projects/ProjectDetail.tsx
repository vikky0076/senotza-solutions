"use client";

import { motion } from "framer-motion";
import AnimatedText from "@/components/animations/AnimatedText";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

interface ProjectDetailProps {
  project: {
    title: string;
    category: string;
    description: string;
    technologies: string[];
    challenge: string;
    strategy: string;
    solution: string;
    result: string;
  };
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <main className="flex min-h-screen flex-col pt-24">
      {/* Back Button */}
      <div className="container mx-auto px-4 sm:px-6 mb-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft size={16} /> Back to Projects
        </Link>
      </div>

      {/* Project Hero */}
      <section className="container mx-auto px-4 sm:px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary/60 font-mono text-sm tracking-widest uppercase">
            {project.category}
          </span>
          <h1 className="text-5xl sm:text-7xl font-heading font-bold text-white tracking-tighter mt-2">
            {project.title}
          </h1>
          <p className="text-white/60 text-xl mt-6 max-w-3xl">{project.description}</p>
        </motion.div>

        {/* Hero Image Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 aspect-[21/9] rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex items-center justify-center"
        >
          <span className="text-white/20 font-heading text-2xl">Project Preview</span>
        </motion.div>
      </section>

      {/* Content Sections */}
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-20 pb-32">
        {/* Challenge */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary/60 font-mono text-sm tracking-widest uppercase">The Challenge</span>
          <h2 className="text-3xl font-heading font-bold text-white mt-2">Understanding the Problem</h2>
          <p className="text-white/60 mt-4 text-lg leading-relaxed">{project.challenge}</p>
        </motion.section>

        {/* Strategy */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary/60 font-mono text-sm tracking-widest uppercase">Strategy</span>
          <h2 className="text-3xl font-heading font-bold text-white mt-2">Our Approach</h2>
          <p className="text-white/60 mt-4 text-lg leading-relaxed">{project.strategy}</p>
        </motion.section>

        {/* Solution */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary/60 font-mono text-sm tracking-widest uppercase">Solution</span>
          <h2 className="text-3xl font-heading font-bold text-white mt-2">What We Built</h2>
          <p className="text-white/60 mt-4 text-lg leading-relaxed">{project.solution}</p>
        </motion.section>

        {/* Technology */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary/60 font-mono text-sm tracking-widest uppercase">Technology</span>
          <h2 className="text-3xl font-heading font-bold text-white mt-2">Tech Stack</h2>
          <div className="flex flex-wrap gap-3 mt-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full bg-white/5 text-white/60 text-sm border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Gallery Placeholder */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary/60 font-mono text-sm tracking-widest uppercase">Gallery</span>
          <h2 className="text-3xl font-heading font-bold text-white mt-2">Visual Showcase</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="aspect-[16/10] rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex items-center justify-center"
              >
                <span className="text-white/20 font-mono text-sm">Screenshot {n}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Results */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary/60 font-mono text-sm tracking-widest uppercase">Results</span>
          <h2 className="text-3xl font-heading font-bold text-white mt-2">Impact</h2>
          <p className="text-white/60 mt-4 text-lg leading-relaxed">{project.result}</p>
        </motion.section>
      </div>
    </main>
  );
}
