"use client";

import { motion, Variants, useReducedMotion } from "framer-motion";
import React from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  el?: React.ElementType;
  once?: boolean;
}

export default function AnimatedText({
  text,
  className,
  el: Wrapper = "p",
  once = true,
}: AnimatedTextProps) {
  const shouldReduceMotion = useReducedMotion();

  const defaultAnimations: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return React.createElement(
    Wrapper,
    { className },
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10%" }}
      variants={defaultAnimations}
      className="inline-block"
    >
      {text}
    </motion.span>
  );
}
