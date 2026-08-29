"use client";

import { motion } from "framer-motion";
import AnimatedText from "@/components/animations/AnimatedText";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What services do you provide?",
    answer:
      "We offer end-to-end digital solutions including website development, web applications, portfolio designs, business websites, landing pages, UI/UX design, branding & logos, content writing, SEO optimization, and ongoing maintenance services.",
  },
  {
    question: "How much does a website cost?",
    answer:
      "Every project is unique. Our Starter plans begin from ₹15,000 for simple websites, while Professional and Custom solutions are scoped based on your specific requirements. We provide transparent, detailed quotes before any work begins.",
  },
  {
    question: "How long does development take?",
    answer:
      "A typical website takes 2–4 weeks. Web applications and complex systems can take 4–12 weeks depending on scope. We establish clear timelines during the Strategy phase and keep you updated throughout.",
  },
  {
    question: "Can you build database-driven applications?",
    answer:
      "Absolutely. We specialize in full-stack development using modern frameworks like Next.js with databases such as MongoDB Atlas. We build authentication systems, admin panels, dashboards, and custom APIs.",
  },
  {
    question: "Do you provide maintenance?",
    answer:
      "Yes. Every project includes post-launch support (30–90 days depending on your plan). We also offer ongoing maintenance packages for security updates, performance optimization, and feature additions.",
  },
  {
    question: "Do you provide SEO?",
    answer:
      "SEO is built into every project from the ground up — semantic HTML, metadata, structured data, performance optimization, and sitemap generation. We also offer advanced SEO consulting as a standalone service.",
  },
  {
    question: "Can you redesign an existing website?",
    answer:
      "Yes. We frequently redesign and rebuild existing websites with modern technology, improved performance, better UX, and stronger visual identity — all while preserving your existing content and SEO rankings where possible.",
  },
  {
    question: "How do I start a project?",
    answer:
      "Simply reach out through our Contact page or send us an email at senotza.a2k@gmail.com. We'll schedule a discovery call to understand your vision, followed by a detailed proposal and timeline.",
  },
  {
    question: "Do you provide post-launch support?",
    answer:
      "Every project includes a dedicated support period after launch. For ongoing needs, we offer flexible maintenance plans that cover updates, monitoring, backups, and performance tuning.",
  },
];

export default function FAQ() {
  return (
    <section className="relative w-full py-32 bg-background overflow-hidden" id="faq">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-20">
          <AnimatedText
            el="h2"
            text="Frequently Asked Questions"
            className="text-4xl sm:text-6xl font-heading font-bold text-white tracking-tighter"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                className="border-b border-white/10"
              >
                <AccordionTrigger className="py-6 text-left text-lg font-medium text-white hover:text-primary transition-colors data-[open]:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-white/60 text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
