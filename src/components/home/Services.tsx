"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedText from "@/components/animations/AnimatedText";
import { ArrowUpRight } from "lucide-react";

const services = [
  { id: "01", title: "Website Development", category: "Engineering" },
  { id: "02", title: "Web Applications", category: "Engineering" },
  { id: "03", title: "Portfolio Designs", category: "Design" },
  { id: "04", title: "Business Websites", category: "Engineering" },
  { id: "05", title: "Landing Pages", category: "Marketing" },
  { id: "06", title: "UI/UX Design", category: "Design" },
  { id: "07", title: "Branding & Logos", category: "Identity" },
  { id: "08", title: "Content Writing", category: "Content" },
  { id: "09", title: "SEO", category: "Marketing" },
  { id: "10", title: "Maintenance Services", category: "Support" },
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full py-32 bg-background overflow-hidden" id="services">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-20">
          <AnimatedText
            el="h2"
            text="Our Capabilities"
            className="text-4xl sm:text-6xl font-heading font-bold text-white tracking-tighter"
          />
          <AnimatedText
            el="p"
            text="Comprehensive digital solutions engineered for scale and designed for impact."
            className="text-white/60 text-xl mt-4 max-w-2xl"
          />
        </div>

        <div className="flex flex-col border-t border-white/10">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: index * 0.05 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative flex flex-col sm:flex-row sm:items-center justify-between py-8 border-b border-white/10 cursor-pointer overflow-hidden"
            >
              {/* Subtle Background Hover Shift */}
              <div className="absolute inset-0 bg-white/[0.02] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              
              {/* Content */}
              <div className="relative z-10 flex items-center gap-6 sm:gap-12">
                <span className="text-white/40 font-mono text-sm">{service.id}</span>
                <h3 className="text-3xl sm:text-5xl font-heading font-bold text-white/80 group-hover:text-white transition-all duration-500 group-hover:translate-x-4">
                  {service.title}
                </h3>
              </div>
              
              <div className="relative z-10 mt-4 sm:mt-0 flex items-center gap-6 sm:gap-12 self-start sm:self-auto ml-12 sm:ml-0">
                <span className="px-4 py-1 rounded-full border border-white/10 text-white/60 text-sm group-hover:border-primary/50 group-hover:text-primary transition-colors duration-500">
                  {service.category}
                </span>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500 group-hover:rotate-45">
                  <ArrowUpRight size={20} className="text-white group-hover:text-black" />
                </div>
              </div>

              {/* Accent Line Animation */}
              <div className="absolute bottom-0 left-0 h-[1px] bg-primary w-0 group-hover:w-full transition-all duration-700 ease-out z-20" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
