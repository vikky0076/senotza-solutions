"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedText from "@/components/animations/AnimatedText";
import { RefreshCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error("SENOTZA Error Boundary caught an error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-24 text-center bg-zinc-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full p-8 rounded-3xl border border-zinc-800 bg-zinc-900/50"
      >
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
          <div className="w-8 h-8 text-red-500 font-bold text-2xl flex items-center justify-center">!</div>
        </div>
        <AnimatedText
          el="h1"
          text="Something went wrong"
          className="text-3xl font-heading font-bold text-white tracking-tighter"
        />
        <p className="text-zinc-400 mt-4 text-sm">
          We apologize for the inconvenience. A technical error has occurred. Our team has been notified.
        </p>
        
        <button
          onClick={() => reset()}
          className="mt-8 flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition-colors group"
        >
          <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
          Try Again
        </button>
      </motion.div>
    </main>
  );
}
