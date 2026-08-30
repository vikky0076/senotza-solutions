"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import AnimatedText from "@/components/animations/AnimatedText";

const features = [
  {
    title: "Custom, Not Template",
    badge: "Tailored Engineering",
    description: "Every solution is engineered specifically for your business logic and brand identity. We don't force your vision into pre-made boxes.",
    image: "/images/why-us/custom-solution.png",
    color: "bg-zinc-900",
    gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
  },
  {
    title: "Performance First",
    badge: "Sub-Second Speeds",
    description: "Speed is a feature. We optimize every byte, ensuring your platform loads instantly and ranks higher on search engines.",
    image: "/images/why-us/performance.png",
    color: "bg-zinc-800",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
  },
  {
    title: "Mobile First Architecture",
    badge: "Adaptive Touch UX",
    description: "Over 60% of traffic is mobile. Our foundations are built for smaller screens first, scaling gracefully to desktop.",
    image: "/images/why-us/mobile-first.png",
    color: "bg-zinc-900",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
  },
  {
    title: "Technical Thinking",
    badge: "Scalable Systems",
    description: "We bridge the gap between abstract design and rigid code, ensuring what looks good also functions flawlessly under load.",
    image: "/images/why-us/technical-thinking.png",
    color: "bg-zinc-800",
    gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
  },
  {
    title: "Transparent Process",
    badge: "Full Code Visibility",
    description: "No hidden fees, no black-box development. You have full visibility into our timeline, decisions, and codebase.",
    image: "/images/why-us/transparent-process.png",
    color: "bg-zinc-900",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
  },
  {
    title: "Long-Term Support",
    badge: "24/7 Security & Growth",
    description: "Launch is just the beginning. We provide ongoing maintenance, security patches, and scaling support as you grow.",
    image: "/images/why-us/long-term-support.png",
    color: "bg-zinc-800",
    gradient: "from-teal-500/20 via-emerald-500/10 to-transparent",
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
    <div ref={containerRef} className="h-screen flex items-center justify-center sticky top-0 py-6">
      <motion.div
        style={{ scale, top: `calc(-5vh + ${i * 25}px)` }}
        className="relative w-full max-w-5xl rounded-[20px] p-[2px] transform-gpu transition-all duration-300 hover:shadow-[0px_0px_30px_1px_rgba(0,255,117,0.30)] group border border-white/10 hover:border-transparent"
        style={{ background: "transparent", scale, top: `calc(-5vh + ${i * 25}px)` }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundImage = "linear-gradient(163deg, #00ff75 0%, #3700ff 100%)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundImage = "none"; }}
        data-gradient-card
      >
        {/* Inner card */}
        <div className={`relative flex flex-col rounded-[18px] p-6 sm:p-10 md:p-12 shadow-2xl overflow-hidden transition-all duration-200 group-hover:scale-[0.99] group-hover:rounded-[20px] ${feature.color}`}>
        {/* Background glow accent */}
        <div className={`absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br ${feature.gradient} rounded-full blur-3xl opacity-50 pointer-events-none`} />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Text Content Column */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-primary uppercase px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
                {feature.badge}
              </span>
              <span className="font-mono text-white/30 text-3xl font-bold">
                0{i + 1}
              </span>
            </div>

            <div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight tracking-tight">
                {feature.title}
              </h3>
              <p className="text-white/70 text-base sm:text-lg lg:text-xl mt-4 font-light leading-relaxed">
                {feature.description}
              </p>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-white/40">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>SENOTZA STANDARD // 0{i + 1}</span>
            </div>
          </div>

          {/* Visual Image Column */}
          <div className="lg:col-span-6 w-full">
            <div className="relative w-full h-56 sm:h-72 lg:h-80 rounded-2xl overflow-hidden border border-white/15 bg-black/40 shadow-inner group-hover:border-primary/40 transition-colors duration-500">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                priority={i < 2}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
              
              {/* Floating label inside image */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <span className="text-xs font-mono text-white/80 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                  {feature.title}
                </span>
              </div>
            </div>
          </div>
        </div>
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

