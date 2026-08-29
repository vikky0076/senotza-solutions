"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, PlusCircle, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const { user, getAuthToken } = useAuth();
  const [inquiries, setInquiries] = useState<{ _id: string, service?: string, createdAt: string, status?: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      const token = getAuthToken();
      if (!token) return;
      try {
        const res = await fetch("/api/inquiries", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setInquiries(data.data || []);
      } catch {}
      setLoading(false);
    };
    fetchInquiries();
  }, [getAuthToken]);

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-white">Dashboard</h1>
      <p className="text-white/60 mt-2">Welcome back, {user?.displayName || "there"}.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-center justify-between mb-4">
            <FileText size={24} className="text-white/40" />
            <span className="text-3xl font-heading font-bold text-white">{inquiries.length}</span>
          </div>
          <p className="text-white/60 text-sm">Total Inquiries</p>
        </div>
        <Link href="/dashboard/inquiries/new"
          className="p-6 rounded-2xl border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors group flex flex-col justify-between">
          <PlusCircle size={24} className="text-primary/60 group-hover:text-primary transition-colors" />
          <div className="mt-4 flex items-center justify-between">
            <p className="text-white font-medium">Start a New Project</p>
            <ArrowRight size={18} className="text-white/40 group-hover:text-white transition-colors" />
          </div>
        </Link>
      </div>

      {/* Recent Inquiries */}
      <div className="mt-10">
        <h2 className="text-xl font-heading font-bold text-white mb-4">Recent Inquiries</h2>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-16 rounded-xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : inquiries.length === 0 ? (
          <div className="p-8 rounded-2xl border border-white/10 text-center">
            <p className="text-white/40">No inquiries yet.</p>
            <Link href="/dashboard/inquiries/new" className="text-primary text-sm mt-2 inline-block hover:underline">
              Submit your first project request →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {inquiries.slice(0, 5).map((inq: { _id: string, service?: string, createdAt: string, status?: string }) => (
              <div key={inq._id} className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <div>
                  <p className="text-white font-medium text-sm">{inq.service || "Project Inquiry"}</p>
                  <p className="text-white/40 text-xs mt-1">{new Date(inq.createdAt).toLocaleDateString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  inq.status === "new" ? "bg-blue-500/20 text-blue-400" :
                  inq.status === "in_progress" ? "bg-yellow-500/20 text-yellow-400" :
                  inq.status === "completed" ? "bg-green-500/20 text-green-400" :
                  "bg-white/10 text-white/60"
                }`}>
                  {inq.status?.replace("_", " ") || "new"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
