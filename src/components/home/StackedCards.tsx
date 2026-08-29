"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import AnimatedText from "@/components/animations/AnimatedText";

const features = [
  {
    title: "Custom, Not Template",
    description: "Every solution is engineered specifically for your business logic and brand identity. We don't force your vision into pre-made boxes.",
    color: "bg-zinc-900",
  },
  {
    title: "Performance First",
    description: "Speed is a feature. We optimize every byte, ensuring your platform loads instantly and ranks higher on search engines.",
    color: "bg-zinc-800",
  },
  {
    title: "Mobile First Architecture",
    description: "Over 60% of traffic is mobile. Our foundations are built for smaller screens first, scaling gracefully to desktop.",
    color: "bg-zinc-900",
  },
  {
    title: "Technical Thinking",
    description: "We bridge the gap between abstract design and rigid code, ensuring what looks good also functions flawlessly under load.",
    color: "bg-zinc-800",
  },
  {
    title: "Transparent Process",
    description: "No hidden fees, no black-box development. You have full visibility into our timeline, decisions, and codebase.",
    color: "bg-zinc-900",
  },
  {
    title: "Long-Term Support",
    description: "Launch is just the beginning. We provide ongoing maintenance, security patches, and scaling support as you grow.",
    color: "bg-zinc-800",
  },
];

interface CardProps {
  feature: typeof features[0];
  i: number;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
}

const Card = ({ feature, i, progress, range, targetScale }: CardProps) => {
  const containerRef = useRef(null);
  
  // Create a spring-like smooth scale and opacity effect based on scroll
  const scale = useTransform(progress, range, [1, targetScale]);
  
  return (
    <div ref={containerRef} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{ scale, top: `calc(-5vh + ${i * 25}px)` }}
        className={`relative flex flex-col w-full max-w-4xl rounded-[2rem] p-8 md:p-14 transform-gpu shadow-2xl border border-white/10 ${feature.color}`}
      >
        <div className="flex justify-between items-start gap-8 flex-col sm:flex-row">
          <h3 className="text-4xl md:text-5xl font-heading font-bold text-white max-w-sm leading-tight">
            {feature.title}
          </h3>
          <p className="text-white/60 text-lg md:text-xl max-w-md font-light">
            {feature.description}
          </p>
        </div>
        
        {/* Abstract structural decoration inside card */}
        <div className="mt-12 h-40 w-full rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50" />
          <span className="font-mono text-white/20 text-6xl font-bold">{`0${i + 1}`}</span>
        </div>
      </motion.div>
    </div>
  );
};

export default function StackedCards() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="relative w-full bg-background pb-32 pt-20">
      <div className="container mx-auto px-4 sm:px-6 mb-20 text-center">
        <AnimatedText
          el="h2"
          text="Why SENOTZA?"
          className="text-4xl sm:text-6xl font-heading font-bold text-white tracking-tighter"
        />
      </div>
      
      <div ref={containerRef} className="relative w-full container mx-auto px-4 sm:px-6">
        {features.map((feature, i) => {
          const targetScale = 1 - (features.length - i) * 0.05;
          return (
            <Card
              key={i}
              i={i}
              feature={feature}
              progress={scrollYProgress}
              range={[i * 0.15, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}
