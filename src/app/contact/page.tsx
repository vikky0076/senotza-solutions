"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedText from "@/components/animations/AnimatedText";
import { Send, Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulating submission — will be connected to API in Phase 3
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <main className="flex min-h-screen flex-col pt-24 pb-32">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — Info */}
          <div>
            <AnimatedText
              el="h1"
              text="Let's Talk."
              className="text-5xl sm:text-7xl font-heading font-bold text-white tracking-tighter"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/60 text-xl mt-6 max-w-lg"
            >
              Have an idea, a project, or a question? We&rsquo;d love to hear from you.
              Fill out the form and we&rsquo;ll get back within 24 hours.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 space-y-6"
            >
              <a
                href="tel:+919943349064"
                className="flex items-center gap-4 text-white/60 hover:text-white transition-colors group"
              >
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/30 transition-colors">
                  <Phone size={18} />
                </div>
                <span className="text-lg">+91 99433 49064</span>
              </a>
              <a
                href="mailto:senotza.a2k@gmail.com"
                className="flex items-center gap-4 text-white/60 hover:text-white transition-colors group"
              >
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/30 transition-colors">
                  <Mail size={18} />
                </div>
                <span className="text-lg">senotza.a2k@gmail.com</span>
              </a>
              <div className="flex items-center gap-4 text-white/60">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                <span className="text-lg">Kallakurichi, Tamil Nadu, India</span>
              </div>
            </motion.div>
          </div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                  <Send size={24} className="text-green-400" />
                </div>
                <h3 className="text-3xl font-heading font-bold text-white">Message Sent!</h3>
                <p className="text-white/60 mt-4 max-w-sm">
                  Thank you for reaching out. We&rsquo;ll review your inquiry and get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-white/60 text-sm mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formState.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-primary/40 focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white/60 text-sm mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-primary/40 focus:outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-white/60 text-sm mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-primary/40 focus:outline-none transition-colors"
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-white/60 text-sm mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formState.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-primary/40 focus:outline-none transition-colors"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="service" className="block text-white/60 text-sm mb-2">
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formState.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary/40 focus:outline-none transition-colors appearance-none"
                    >
                      <option value="" className="bg-zinc-900">Select a service</option>
                      <option value="website" className="bg-zinc-900">Website Development</option>
                      <option value="webapp" className="bg-zinc-900">Web Application</option>
                      <option value="uiux" className="bg-zinc-900">UI/UX Design</option>
                      <option value="branding" className="bg-zinc-900">Branding & Logo</option>
                      <option value="seo" className="bg-zinc-900">SEO</option>
                      <option value="maintenance" className="bg-zinc-900">Maintenance</option>
                      <option value="other" className="bg-zinc-900">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-white/60 text-sm mb-2">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formState.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary/40 focus:outline-none transition-colors appearance-none"
                    >
                      <option value="" className="bg-zinc-900">Select a range</option>
                      <option value="10k-25k" className="bg-zinc-900">₹10,000 - ₹25,000</option>
                      <option value="25k-50k" className="bg-zinc-900">₹25,000 - ₹50,000</option>
                      <option value="50k-100k" className="bg-zinc-900">₹50,000 - ₹1,00,000</option>
                      <option value="100k+" className="bg-zinc-900">₹1,00,000+</option>
                      <option value="discuss" className="bg-zinc-900">Let&apos;s discuss</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-white/60 text-sm mb-2">
                    Tell us about your project *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-primary/40 focus:outline-none transition-colors resize-none"
                    placeholder="Describe your project, goals, and any specific requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-white text-black font-medium text-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      Send Inquiry
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
