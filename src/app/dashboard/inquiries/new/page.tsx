"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Send, Loader2, CheckCircle } from "lucide-react";

export default function NewInquiryPage() {
  const { user, getAuthToken } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    fullName: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    company: "",
    service: "",
    projectType: "",
    budget: "",
    description: "",
    preferredContact: "email",
    additionalRequirements: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const token = getAuthToken();
    if (!token) { setError("Please log in."); setLoading(false); return; }

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || "Failed to submit. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
          <CheckCircle size={32} className="text-green-400" />
        </div>
        <h2 className="text-3xl font-heading font-bold text-white">Inquiry Submitted!</h2>
        <p className="text-white/60 mt-4 max-w-md">We&rsquo;ve received your project request and will get back to you within 24 hours.</p>
        <button onClick={() => router.push("/dashboard/inquiries")} className="mt-8 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors">
          View My Inquiries
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-white">New Project Request</h1>
      <p className="text-white/60 mt-2">Tell us about your project and we&rsquo;ll get started.</p>

      {error && <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="mt-8 space-y-6 max-w-3xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/60 text-sm mb-2">Full Name *</label>
            <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-primary/40 focus:outline-none" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-white/60 text-sm mb-2">Email *</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-primary/40 focus:outline-none" placeholder="you@example.com" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/60 text-sm mb-2">Phone / WhatsApp *</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-primary/40 focus:outline-none" placeholder="+91 9876543210" />
          </div>
          <div>
            <label className="block text-white/60 text-sm mb-2">Company Name</label>
            <input type="text" name="company" value={form.company} onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-primary/40 focus:outline-none" placeholder="Your company" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/60 text-sm mb-2">Service Required *</label>
            <select name="service" value={form.service} onChange={handleChange} required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary/40 focus:outline-none appearance-none">
              <option value="" className="bg-zinc-900">Select a service</option>
              <option value="Website Development" className="bg-zinc-900">Website Development</option>
              <option value="Web Application" className="bg-zinc-900">Web Application</option>
              <option value="Portfolio Design" className="bg-zinc-900">Portfolio Design</option>
              <option value="Business Website" className="bg-zinc-900">Business Website</option>
              <option value="Landing Page" className="bg-zinc-900">Landing Page</option>
              <option value="UI/UX Design" className="bg-zinc-900">UI/UX Design</option>
              <option value="Branding & Logo" className="bg-zinc-900">Branding & Logo</option>
              <option value="Content Writing" className="bg-zinc-900">Content Writing</option>
              <option value="SEO" className="bg-zinc-900">SEO</option>
              <option value="Maintenance" className="bg-zinc-900">Maintenance</option>
            </select>
          </div>
          <div>
            <label className="block text-white/60 text-sm mb-2">Budget Range *</label>
            <select name="budget" value={form.budget} onChange={handleChange} required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary/40 focus:outline-none appearance-none">
              <option value="" className="bg-zinc-900">Select budget</option>
              <option value="₹10,000 - ₹25,000" className="bg-zinc-900">₹10,000 - ₹25,000</option>
              <option value="₹25,000 - ₹50,000" className="bg-zinc-900">₹25,000 - ₹50,000</option>
              <option value="₹50,000 - ₹1,00,000" className="bg-zinc-900">₹50,000 - ₹1,00,000</option>
              <option value="₹1,00,000+" className="bg-zinc-900">₹1,00,000+</option>
              <option value="Let's discuss" className="bg-zinc-900">Let&apos;s discuss</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-white/60 text-sm mb-2">Project Description *</label>
          <textarea name="description" value={form.description} onChange={handleChange} required rows={5}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-primary/40 focus:outline-none resize-none"
            placeholder="Describe your project, goals, and specific requirements..." />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/60 text-sm mb-2">Preferred Contact</label>
            <select name="preferredContact" value={form.preferredContact} onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary/40 focus:outline-none appearance-none">
              <option value="email" className="bg-zinc-900">Email</option>
              <option value="phone" className="bg-zinc-900">Phone</option>
              <option value="whatsapp" className="bg-zinc-900">WhatsApp</option>
            </select>
          </div>
          <div>
            <label className="block text-white/60 text-sm mb-2">Project Type</label>
            <input type="text" name="projectType" value={form.projectType} onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-primary/40 focus:outline-none" placeholder="e.g., E-commerce, Portfolio" />
          </div>
        </div>
        <div>
          <label className="block text-white/60 text-sm mb-2">Additional Requirements</label>
          <textarea name="additionalRequirements" value={form.additionalRequirements} onChange={handleChange} rows={3}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-primary/40 focus:outline-none resize-none"
            placeholder="Any additional details, deadlines, or references..." />
        </div>
        <button type="submit" disabled={loading}
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-medium text-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-50">
          {loading ? <Loader2 size={20} className="animate-spin" /> : <><Send size={18} /> Start My Project</>}
        </button>
      </form>
    </div>
  );
}
