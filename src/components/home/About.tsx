"use client";

import { motion } from "framer-motion";
import AnimatedText from "@/components/animations/AnimatedText";

export default function About() {
  return (
    <section className="relative w-full py-32 bg-background overflow-hidden rounded-t-3xl shadow-[0_-12px_40px_rgba(0,0,0,0.35)]" id="about">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
          <div>
            <AnimatedText
              el="h2"
              text="About SENOTZA"
              className="text-4xl sm:text-6xl font-heading font-bold text-white tracking-tighter"
            />
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "6rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-[2px] bg-primary mt-6"
            />
          </div>
          <div className="flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xl text-white/70 font-light leading-relaxed"
            >
              SENOTZA SOLUTIONS is a technology company born from a simple belief: 
              every idea deserves a digital identity that matches its ambition. We 
              engineer websites, applications, and digital experiences that are not 
              just functional — they are crafted.
            </motion.p>
          </div>
        </div>

        {/* Mission / Vision / Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-12">
          {[
            {
              label: "Mission",
              title: "Engineer Access to Knowledge",
              text: "We build technology that bridges the gap between raw ideas and impactful digital solutions — making knowledge and functionality accessible to all.",
            },
            {
              label: "Vision",
              title: "Redefine Digital Standards",
              text: "To become the partner of choice for businesses that refuse to settle for generic, AI-generated, or template-driven digital experiences.",
            },
            {
              label: "Values",
              title: "Craft Over Convention",
              text: "Precision engineering. Transparent collaboration. Performance obsession. Long-term thinking. Every project is treated as a partnership, not a transaction.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative p-8 md:p-10 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500"
            >
              <span className="text-primary/60 font-mono text-sm tracking-widest uppercase">
                {item.label}
              </span>
              <h3 className="text-2xl font-heading font-bold text-white mt-4">
                {item.title}
              </h3>
              <p className="text-white/60 mt-4 leading-relaxed">
                {item.text}
              </p>
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-white/10 rounded-tr-2xl group-hover:border-primary/30 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
