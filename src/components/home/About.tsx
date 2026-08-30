"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedText from "@/components/animations/AnimatedText";

export default function About() {
  return (
    <section className="relative w-full py-32 overflow-hidden" id="about">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-office.jpg"
          alt="Modern office workspace — Senotza Solutions"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-background/85" />
      </div>

      {/* Content — above the background */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6">
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
              className="group rounded-[20px] p-[2px] transition-all duration-300 hover:shadow-[0px_0px_30px_1px_rgba(0,255,117,0.30)] border border-white/10 hover:border-transparent"
              style={{ background: "transparent" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundImage = "linear-gradient(163deg, #00ff75 0%, #3700ff 100%)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundImage = "none"; }}
            >
              <div className="relative p-8 md:p-10 rounded-[18px] bg-[#1a1a1a] transition-all duration-200 group-hover:scale-[0.98] group-hover:rounded-[20px] h-full">
                <span className="text-primary/60 font-mono text-sm tracking-widest uppercase">
                  {item.label}
                </span>
                <h3 className="text-2xl font-heading font-bold text-white mt-4">
                  {item.title}
                </h3>
                <p className="text-white/60 mt-4 leading-relaxed">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
