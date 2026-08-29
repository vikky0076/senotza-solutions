"use client";

import { motion } from "framer-motion";
import AnimatedText from "@/components/animations/AnimatedText";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    subtitle: "For individuals and small businesses",
    price: "Starting from ₹15,000",
    idealFor: "Personal portfolios, small business landing pages, and simple web presences.",
    features: [
      "Custom responsive design",
      "Up to 5 pages",
      "Mobile optimization",
      "Basic SEO setup",
      "Contact form integration",
      "1 round of revisions",
    ],
    deliverables: ["Source code", "Deployment to hosting"],
    support: "30 days post-launch support",
    highlighted: false,
  },
  {
    name: "Professional",
    subtitle: "For growing businesses",
    price: "Starting from ₹40,000",
    idealFor: "Business websites, service-based companies, and brands needing a complete digital presence.",
    features: [
      "Custom UI/UX design",
      "Up to 12 pages",
      "Advanced animations",
      "Full SEO optimization",
      "CMS integration",
      "Performance optimization",
      "Analytics integration",
      "3 rounds of revisions",
    ],
    deliverables: ["Source code", "Design files", "Brand guidelines", "Deployment"],
    support: "90 days post-launch support",
    highlighted: true,
  },
  {
    name: "Custom / Business",
    subtitle: "For advanced systems",
    price: "Custom Quote",
    idealFor: "Web applications, database-driven systems, dashboards, and enterprise solutions.",
    features: [
      "Full-stack development",
      "Custom web application",
      "Database architecture",
      "Authentication system",
      "Admin panel",
      "API development",
      "Third-party integrations",
      "Unlimited revisions",
    ],
    deliverables: ["Source code", "Documentation", "Architecture diagrams", "Full deployment"],
    support: "Ongoing maintenance available",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section className="relative w-full py-32 bg-background overflow-hidden" id="pricing">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-20">
          <AnimatedText
            el="h2"
            text="Transparent Pricing"
            className="text-4xl sm:text-6xl font-heading font-bold text-white tracking-tighter"
          />
          <AnimatedText
            el="p"
            text="Honest pricing. No hidden fees. Every project is scoped to your exact needs."
            className="text-white/60 text-xl mt-4"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex flex-col p-8 md:p-10 rounded-2xl border transition-colors duration-500 ${
                plan.highlighted
                  ? "border-primary/40 bg-white/[0.04] scale-[1.02]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                  Most Popular
                </div>
              )}

              <span className="text-primary/60 font-mono text-sm tracking-widest uppercase">
                {plan.name}
              </span>
              <p className="text-white/50 text-sm mt-1">{plan.subtitle}</p>

              <p className="text-3xl font-heading font-bold text-white mt-6">{plan.price}</p>

              <p className="text-white/40 text-sm mt-4 mb-6 pb-6 border-b border-white/10">
                {plan.idealFor}
              </p>

              <div className="flex flex-col gap-3 flex-grow">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check size={16} className="text-primary/70 mt-0.5 shrink-0" />
                    <span className="text-white/60 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-white/40 text-xs font-mono mb-1">DELIVERABLES</p>
                <p className="text-white/60 text-sm">{plan.deliverables.join(" · ")}</p>
                <p className="text-white/40 text-xs font-mono mt-3 mb-1">SUPPORT</p>
                <p className="text-white/60 text-sm">{plan.support}</p>
              </div>

              <Link
                href="/contact"
                className={`mt-8 w-full py-3.5 rounded-full text-center font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                  plan.highlighted
                    ? "bg-white text-black hover:bg-gray-200"
                    : "border border-white/20 text-white hover:bg-white/10"
                }`}
              >
                Request a Custom Quote
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
