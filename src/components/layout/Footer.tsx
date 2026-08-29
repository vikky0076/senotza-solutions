import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Col */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col gap-4">
            <Link href="/" className="font-heading font-bold text-2xl tracking-wider text-white">
              SENOTZA<br />SOLUTIONS
            </Link>
            <p className="text-white/60 font-medium">Access to Knowledge</p>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold mb-2">Quick Links</h4>
            <Link href="/about" className="text-white/60 hover:text-white transition-colors w-fit">About Us</Link>
            <Link href="/projects" className="text-white/60 hover:text-white transition-colors w-fit">Our Work</Link>
            <Link href="/process" className="text-white/60 hover:text-white transition-colors w-fit">Process</Link>
            <Link href="/pricing" className="text-white/60 hover:text-white transition-colors w-fit">Pricing</Link>
          </div>
          
          {/* Services Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold mb-2">Services</h4>
            <Link href="/services" className="text-white/60 hover:text-white transition-colors w-fit">Web Development</Link>
            <Link href="/services" className="text-white/60 hover:text-white transition-colors w-fit">Web Applications</Link>
            <Link href="/services" className="text-white/60 hover:text-white transition-colors w-fit">UI/UX Design</Link>
            <Link href="/services" className="text-white/60 hover:text-white transition-colors w-fit">Branding & SEO</Link>
          </div>
          
          {/* Contact Col */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold mb-2">Contact</h4>
            <a href="tel:+919943349064" className="text-white/60 hover:text-white transition-colors flex items-center gap-1 w-fit">
              +91 99433 49064 <ArrowUpRight size={14} className="opacity-50" />
            </a>
            <a href="mailto:senotza.a2k@gmail.com" className="text-white/60 hover:text-white transition-colors flex items-center gap-1 w-fit break-all">
              senotza.a2k@gmail.com <ArrowUpRight size={14} className="opacity-50" />
            </a>
            <p className="text-white/60 mt-2">
              Kallakurichi, Tamil Nadu, India
            </p>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/10 text-white/40 text-sm">
          <p>© {currentYear} SENOTZA SOLUTIONS. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
