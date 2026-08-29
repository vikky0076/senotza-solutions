"use client";

import { motion } from "framer-motion";
import AnimatedText from "@/components/animations/AnimatedText";

export default function Founder() {
  return (
    <section className="relative w-full py-32 bg-background overflow-hidden" id="founder">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
          {/* Image / Visual Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 relative"
          >
            <div className="aspect-[3/4] rounded-2xl bg-gradient-to-b from-white/5 to-white/0 border border-white/10 overflow-hidden relative">
              {/* Placeholder for founder image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <span className="font-heading text-8xl font-bold text-white/10">V</span>
                  <span className="text-white/30 mt-4 font-mono text-sm">Founder</span>
                </div>
              </div>
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
            {/* Decorative element */}
            <div className="absolute -top-4 -right-4 w-32 h-32 border border-white/10 rounded-2xl -z-10" />
          </motion.div>

          {/* Text / Story Side */}
          <div className="lg:col-span-3 flex flex-col">
            <span className="text-primary/60 font-mono text-sm tracking-widest uppercase mb-4">
              The Mind Behind SENOTZA
            </span>
            <AnimatedText
              el="h2"
              text="Vignesh"
              className="text-5xl sm:text-7xl font-heading font-bold text-white tracking-tighter"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/60 text-lg mt-4"
            >
              B.Sc. Computer Science (AI & ML) · Kallakurichi, Tamil Nadu, India
            </motion.p>

            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 pl-6 border-l-2 border-primary/40"
            >
              <p className="text-xl md:text-2xl text-white/80 italic font-light leading-relaxed">
                &ldquo;We don&rsquo;t just build websites; we engineer digital bridges that 
                connect raw human ideas to outstanding digital solutions, ensuring 
                knowledge and functionality are accessible to all.&rdquo;
              </p>
            </motion.blockquote>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/60 mt-10 text-lg leading-relaxed"
            >
              SENOTZA was founded with a clear purpose — to make premium technology 
              accessible beyond the major metros. Vignesh combines deep technical 
              knowledge in AI, machine learning, and modern web architectures with 
              an obsession for design precision and user experience.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-white/60 mt-6 text-lg leading-relaxed"
            >
              Every project at SENOTZA is personally guided — from the first discovery 
              call to the final launch and beyond. No outsourcing, no shortcuts, no compromises.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
