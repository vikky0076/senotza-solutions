"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedText from "@/components/animations/AnimatedText";
import TiltCard from "@/components/shared/TiltCard";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { signUpWithEmail, user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && !authLoading) {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  if (user) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formState.fullName || !formState.email || !formState.password) {
      setError("Please fill in all required fields");
      return;
    }
    if (formState.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (formState.password !== formState.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await signUpWithEmail(formState.email, formState.password, formState.fullName);
      router.push("/dashboard");
    } catch (err: unknown) {
      const error = err as { code?: string; message?: string };
      if (error.code === "auth/email-already-in-use") {
        setError("An account with this email already exists");
      } else {
        setError(error.message || "Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        {/* Heading */}
        <div className="text-center mb-10">
          <AnimatedText
            el="h1"
            text="Create Account"
            className="text-4xl font-heading font-bold text-white tracking-tighter"
          />
          <p className="text-white/60 mt-3">Join SENOTZA to start your project.</p>
        </div>

        {/* ── 3-D Tilt Card wrapper ── */}
        <TiltCard glowColor="200, 80, 192">
          <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
            {error && (
              <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-white/60 text-sm mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formState.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-white/40 focus:outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="reg-email" className="block text-white/60 text-sm mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="reg-email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-white/40 focus:outline-none transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="reg-password" className="block text-white/60 text-sm mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  id="reg-password"
                  name="password"
                  value={formState.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-white/40 focus:outline-none transition-colors"
                  placeholder="Minimum 6 characters"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-white/60 text-sm mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formState.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-white/40 focus:outline-none transition-colors"
                  placeholder="Re-enter password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#4158d0] via-[#c850c0] to-[#ffcc70] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mt-2 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>Create Account <ArrowRight size={16} /></>
                )}
              </button>
            </form>

            <p className="text-center text-white/40 text-sm mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-white hover:text-purple-300 transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </TiltCard>
      </motion.div>
    </main>
  );
}
