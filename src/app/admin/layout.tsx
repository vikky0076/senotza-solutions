"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard, Users, FileText, FolderOpen, Wrench, HelpCircle,
  Settings, LogOut, ChevronLeft, Menu, X, Shield,
} from "lucide-react";

const ADMIN_EMAILS = ["vikkyvikky132007@gmail.com", "senotza.a2k@gmail.com"];

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Leads", href: "/admin/leads", icon: FileText },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Projects", href: "/admin/projects", icon: FolderOpen },
  { name: "Services", href: "/admin/services", icon: Wrench },
  { name: "FAQ", href: "/admin/faqs", icon: HelpCircle },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout, getAuthToken } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
        return;
      }
      // Server-side admin check
      const checkAdmin = async () => {
        const token = getAuthToken();
        if (!token) { router.push("/"); return; }
        try {
          const res = await fetch("/api/auth/admin-check", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          if (data.success && data.data?.isAdmin) {
            setAuthorized(true);
          } else {
            router.push("/dashboard");
          }
        } catch {
          router.push("/dashboard");
        }
        setChecking(false);
      };
      checkAdmin();
    }
  }, [user, loading, router, getAuthToken]);

  if (loading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-white/40 text-sm">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col fixed left-0 top-0 bottom-0 border-r border-zinc-800 bg-zinc-950 z-40">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-zinc-800">
          <Shield size={20} className="text-primary" />
          <span className="font-heading font-bold text-lg text-white tracking-wider">SENOTZA</span>
          <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary font-mono">ADMIN</span>
        </div>

        <nav className="flex flex-col gap-1 p-4 flex-grow">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                }`}>
                <link.icon size={18} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-zinc-800 p-4">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors">
            <ChevronLeft size={18} /> Back to Site
          </Link>
          <button onClick={logout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors w-full">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-2">
          <Shield size={18} className="text-primary" />
          <span className="font-heading font-bold text-white">ADMIN</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/50" onClick={() => setSidebarOpen(false)}>
          <aside className="w-64 h-full bg-zinc-950 border-r border-zinc-800 pt-14 p-4" onClick={(e) => e.stopPropagation()}>
            <nav className="flex flex-col gap-1">
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link key={link.href} href={link.href} onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      isActive ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                    }`}>
                    <link.icon size={18} />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-14 lg:pt-0 min-h-screen">
        {/* Top Bar */}
        <div className="hidden lg:flex items-center justify-between h-14 px-8 border-b border-zinc-800">
          <p className="text-zinc-400 text-sm">
            {sidebarLinks.find((l) => l.href === pathname)?.name || "Admin"}
          </p>
          <div className="flex items-center gap-3">
            <span className="text-zinc-500 text-sm">{user?.email}</span>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
              {user?.displayName?.charAt(0)?.toUpperCase() || "A"}
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
