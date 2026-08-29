"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedText from "@/components/animations/AnimatedText";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <div className="text-[12rem] md:text-[16rem] font-heading font-black text-white/5 leading-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none -z-10 pointer-events-none">
          404
        </div>
        <AnimatedText
          el="h1"
          text="Page Not Found"
          className="text-4xl md:text-6xl font-heading font-bold text-white tracking-tighter"
        />
        <p className="text-white/60 mt-6 max-w-md mx-auto text-lg">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/"
            className="flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-medium text-lg hover:bg-gray-200 transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Return Home
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
