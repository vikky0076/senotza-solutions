"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import AnimatedText from "@/components/animations/AnimatedText";

export default function ContactCTA() {
  return (
    <section className="relative w-full py-32 overflow-hidden bg-background">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <AnimatedText
            el="h2"
            text="Have an idea?"
            className="text-5xl sm:text-7xl font-heading font-bold text-white tracking-tighter"
          />
          <AnimatedText
            el="h2"
            text="Let's build it."
            className="text-5xl sm:text-7xl font-heading font-bold text-white/60 tracking-tighter mt-2"
          />
          
          <div className="mt-12 flex flex-col sm:flex-row items-center gap-6">
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-4 px-8 py-4 bg-white text-black rounded-full font-medium text-lg overflow-hidden transition-transform hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">Start a Project</span>
              <span className="relative z-10 transition-transform group-hover:translate-x-1">
                <ArrowRight size={20} />
              </span>
            </Link>
            
            <Link
              href="/pricing"
              className="group inline-flex items-center gap-2 px-8 py-4 text-white font-medium text-lg rounded-full border border-white/20 hover:bg-white/10 transition-colors"
            >
              Get a Custom Quote
              <Mail size={20} className="ml-2 opacity-70 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
