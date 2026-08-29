"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedText from "@/components/animations/AnimatedText";

const steps = [
  {
    id: "01",
    title: "Discovery",
    description: "We listen. We research your market, competitors, and audience to understand what your project truly needs.",
  },
  {
    id: "02",
    title: "Strategy",
    description: "We define the architecture, technology stack, content strategy, and milestones before writing a single line of code.",
  },
  {
    id: "03",
    title: "UI/UX",
    description: "We design interfaces that are intuitive, beautiful, and conversion-focused — wireframes to high-fidelity prototypes.",
  },
  {
    id: "04",
    title: "Development",
    description: "Clean, maintainable, performance-optimized code. Built with modern frameworks and best practices.",
  },
  {
    id: "05",
    title: "Testing",
    description: "Rigorous quality assurance across devices, browsers, and edge cases. We break it so your users don't have to.",
  },
  {
    id: "06",
    title: "Launch",
    description: "Deployment to production with monitoring, SEO configuration, and performance optimization from day one.",
  },
  {
    id: "07",
    title: "Growth",
    description: "Post-launch analytics, iteration, and scaling support. Your digital presence evolves with your business.",
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });

  return (
    <section className="relative w-full py-32 bg-background overflow-hidden" id="process">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-20 text-center">
          <AnimatedText
            el="h2"
            text="Our Creative Process"
            className="text-4xl sm:text-6xl font-heading font-bold text-white tracking-tighter"
          />
          <AnimatedText
            el="p"
            text="A proven methodology that transforms complexity into clarity."
            className="text-white/60 text-xl mt-4"
          />
        </div>

        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Animated Progress Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 md:-translate-x-[0.5px]">
            <motion.div
              style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
              className="absolute top-0 left-0 w-full h-full bg-primary"
            />
          </div>

          {steps.map((step, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`relative flex items-start gap-8 mb-16 last:mb-0 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 top-2 w-4 h-4 -translate-x-1/2 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="w-4 h-4 rounded-full bg-background border-2 border-primary"
                  />
                </div>

                {/* Content Card */}
                <div
                  className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                    isLeft ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
                  }`}
                >
                  <span className="font-mono text-primary/60 text-sm">{step.id}</span>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mt-1">
                    {step.title}
                  </h3>
                  <p className="text-white/60 text-base mt-3 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block md:w-[calc(50%-2rem)]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
