"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, LayoutDashboard, Shield } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Process", href: "/process" },
  { name: "Pricing", href: "/pricing" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

const ADMIN_EMAILS = ["vikkyvikky132007@gmail.com", "senotza.a2k@gmail.com"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, loading, logout } = useAuth();

  const isAdmin = user?.email
    ? ADMIN_EMAILS.includes(user.email.toLowerCase())
    : false;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setProfileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-3 px-4 sm:px-6 pointer-events-none"
      >
        <div
          className={`pointer-events-auto flex items-center justify-between transition-all duration-500 ease-in-out w-full max-w-5xl ${
            scrolled
              ? "py-2 px-5 rounded-full bg-black/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "py-2 px-5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-heading font-bold text-lg tracking-wider text-white">
              SENOTZA
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-medium text-white/70 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            {/* Auth Button */}
            {loading ? (
              <div className="ml-3 w-18 h-8 rounded-full bg-white/10 animate-pulse" />
            ) : user ? (
              <div className="relative ml-3">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white text-xs"
                >
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                    {user.displayName?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <span className="hidden lg:inline max-w-[100px] truncate">
                    {user.displayName || "Account"}
                  </span>
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-white/10 bg-zinc-900 shadow-2xl overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-sm text-white font-medium truncate">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-xs text-white/50 truncate">
                          {user.email}
                        </p>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/dashboard"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <LayoutDashboard size={16} /> Dashboard
                        </Link>
                        {isAdmin && (
                          <Link
                            href="/admin"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <Shield size={16} /> Admin Panel
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors w-full text-left"
                        >
                          <LogOut size={16} /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className="ml-3 px-4 py-1.5 text-xs font-medium rounded-full bg-white text-black hover:bg-gray-200 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle — Animated Hamburger to X */}
          <button
            className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative w-6 h-5 flex flex-col justify-between">
              {/* Top line */}
              <span
                className="block w-full h-[2.5px] bg-white rounded-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] origin-center"
                style={{
                  transform: mobileMenuOpen
                    ? "translateY(9px) rotate(45deg)"
                    : "translateY(0) rotate(0)",
                }}
              />
              {/* Middle line */}
              <span
                className="block w-full h-[2.5px] bg-white rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                  opacity: mobileMenuOpen ? 0 : 1,
                  transform: mobileMenuOpen ? "scaleX(0)" : "scaleX(1)",
                }}
              />
              {/* Bottom line */}
              <span
                className="block w-full h-[2.5px] bg-white rounded-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] origin-center"
                style={{
                  transform: mobileMenuOpen
                    ? "translateY(-9px) rotate(-45deg)"
                    : "translateY(0) rotate(0)",
                }}
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center pt-20 pb-10"
          >
            <div className="flex flex-col items-center gap-6 text-xl font-heading w-full">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {user ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + navLinks.length * 0.05 }}
                  >
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-white hover:text-primary transition-colors"
                    >
                      Dashboard
                    </Link>
                  </motion.div>
                  {isAdmin && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.15 + navLinks.length * 0.05,
                      }}
                    >
                      <Link
                        href="/admin"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-white hover:text-primary transition-colors"
                      >
                        Admin
                      </Link>
                    </motion.div>
                  )}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.2 + navLinks.length * 0.05,
                    }}
                    className="mt-4"
                  >
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="px-8 py-3 rounded-full border border-white/20 text-white font-medium text-lg hover:bg-white/10 transition-colors"
                    >
                      Sign Out
                    </button>
                  </motion.div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + navLinks.length * 0.05 }}
                  className="mt-4"
                >
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-8 py-3 rounded-full bg-white text-black font-medium text-lg hover:bg-gray-200 transition-colors"
                  >
                    Login
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
