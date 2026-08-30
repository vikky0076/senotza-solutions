"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import AnimatedText from "@/components/animations/AnimatedText";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroAnimation from "./HeroAnimation";

// Dynamically import Scene to disable SSR for Three.js
const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] lg:h-screen w-full flex flex-col lg:flex-row items-stretch overflow-hidden bg-white">

      {/* ═══════════════════════════════════════════════
          LEFT PANEL — Animation
      ═══════════════════════════════════════════════ */}
      <div className="relative w-full lg:w-[45%] xl:w-[40%] flex items-center shrink-0 min-h-[40vh] lg:min-h-0 pt-20 lg:pt-0">
        <HeroAnimation />
      </div>

      {/* ═══════════════════════════════════════════════
          RIGHT PANEL — Hero Content (3D object lives here, behind text)
      ═══════════════════════════════════════════════ */}
      <div className="relative z-10 w-full lg:w-[55%] xl:w-[60%] shrink-0 flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-16 xl:px-24 pt-12 lg:pt-0 pb-12 lg:pb-0">
        {/* ── 3D Object — behind the text ── */}
        <Scene />
        {/* Text content — above the 3D object */}
        <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          {/* Tag line */}
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/15 bg-black/5 text-black/60 text-xs font-mono tracking-widest uppercase mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Digital Agency
          </motion.span>

          <AnimatedText
            el="h1"
            text="Transforming Ideas"
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tighter text-black leading-[0.95]"
          />
          <AnimatedText
            el="h1"
            text="Into Digital"
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tighter text-black/70 leading-[0.95] mt-1"
          />
          <AnimatedText
            el="h1"
            text="Experiences."
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tighter text-black leading-[0.95] mt-1"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            className="mt-4 text-sm sm:text-base text-black/60 max-w-md font-light leading-relaxed"
          >
            SENOTZA SOLUTIONS builds modern websites, web applications, digital
            identities and technology solutions designed around real business goals.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
            className="mt-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 px-6 py-3 bg-black text-white rounded-full font-medium text-sm overflow-hidden transition-transform hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">Start a Project</span>
              <span className="relative z-10 transition-transform group-hover:translate-x-1">
                <ArrowRight size={16} />
              </span>
            </Link>

            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 px-2 py-3 text-black font-medium text-sm relative"
            >
              Explore Our Work
              <span className="absolute bottom-2 left-0 w-full h-[1px] bg-black/30 transition-all duration-300 group-hover:bg-black" />
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3, ease: "easeOut" }}
            className="mt-8 flex items-center gap-8 sm:gap-10 border-t-2 border-black/30 pt-5"
          >
            {[
              { value: "50+", label: "Projects Delivered" },
              { value: "3+", label: "Years Experience" },
              { value: "100%", label: "Client Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <span className="text-2xl sm:text-3xl font-heading font-bold text-black">
                  {stat.value}
                </span>
                <span className="text-[11px] sm:text-xs text-black/60 font-medium tracking-wide">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
        </div>{/* end z-10 text wrapper */}
      </div>

    </section>
  );
}
