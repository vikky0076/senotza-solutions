"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import AnimatedText from "@/components/animations/AnimatedText";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

// Dynamically import Scene to disable SSR for Three.js
const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative h-full w-full flex items-stretch overflow-hidden bg-white">

      {/* ═══════════════════════════════════════════════
          LEFT PANEL — Content (3D object lives here, behind text)
      ═══════════════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col justify-center w-full lg:w-[52%] px-6 sm:px-10 md:px-14 lg:px-16 xl:px-24 pt-28 pb-20 lg:pt-32">
        {/* ── 3D Object — behind the text, inside the left panel ── */}
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/15 bg-black/5 text-black/60 text-xs font-mono tracking-widest uppercase mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Digital Agency
          </motion.span>

          <AnimatedText
            el="h1"
            text="Transforming Ideas"
            className="text-5xl sm:text-6xl md:text-7xl font-heading font-bold tracking-tighter text-black leading-[0.9] [text-shadow:_2px_4px_12px_rgba(0,0,0,0.15)]"
          />
          <AnimatedText
            el="h1"
            text="Into Digital"
            className="text-5xl sm:text-6xl md:text-7xl font-heading font-bold tracking-tighter text-black/70 leading-[0.9] mt-1 [text-shadow:_2px_4px_12px_rgba(0,0,0,0.12)]"
          />
          <AnimatedText
            el="h1"
            text="Experiences."
            className="text-5xl sm:text-6xl md:text-7xl font-heading font-bold tracking-tighter text-black leading-[0.9] mt-1 [text-shadow:_2px_4px_16px_rgba(0,0,0,0.18)]"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            className="mt-8 text-base sm:text-lg text-black/60 max-w-md font-light leading-relaxed [text-shadow:_0px_1px_4px_rgba(0,0,0,0.08)]"
          >
            SENOTZA SOLUTIONS builds modern websites, web applications, digital
            identities and technology solutions designed around real business goals.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5"
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 px-7 py-3.5 bg-black text-white rounded-full font-medium text-base overflow-hidden transition-transform hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">Start a Project</span>
              <span className="relative z-10 transition-transform group-hover:translate-x-1">
                <ArrowRight size={18} />
              </span>
            </Link>

            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 px-2 py-3.5 text-black font-medium text-base relative"
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
            className="mt-16 flex items-center gap-8 sm:gap-12 border-t border-black/20 pt-8"
          >
            {[
              { value: "50+", label: "Projects Delivered" },
              { value: "3+", label: "Years Experience" },
              { value: "100%", label: "Client Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="text-2xl sm:text-3xl font-heading font-bold text-black [text-shadow:_1px_2px_8px_rgba(0,0,0,0.18)]">
                  {stat.value}
                </span>
                <span className="text-xs text-black/70 font-medium tracking-wide">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
        </div>{/* end z-10 text wrapper */}
      </div>



      {/* ═══════════════════════════════════════════════
          RIGHT PANEL — Office Image
      ═══════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:block absolute top-0 right-0 bottom-0 z-10"
        style={{ left: "52%" }}
      >
        {/* Slanted left-edge mask — the polygon cuts away the left side diagonally */}
        <div
          className="relative w-full h-full overflow-hidden"
        >
          <Image
            src="/hero-office.jpg"
            alt="Modern office workspace — Senotza Solutions"
            fill
            className="object-cover object-center"
            priority
            sizes="50vw"
          />

          {/* Left-side gradient — blends the slanted cut into the white background */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.55) 20%, rgba(255,255,255,0.15) 50%, transparent 100%)",
            }}
          />

          {/* Bottom gradient — connects to the next section with white */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80" />

          {/* Top-left vignette for extra depth */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 0% 0%, rgba(255,255,255,0.6) 0%, transparent 60%)",
            }}
          />
        </div>
      </motion.div>

      {/* ── Bottom fade-out into next section ── */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent z-30 pointer-events-none" />
    </section>
  );
}
