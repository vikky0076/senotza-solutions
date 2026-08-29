"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

export default function InquiriesPage() {
  const { getAuthToken } = useAuth();
  const [inquiries, setInquiries] = useState<{ _id: string, service?: string, description?: string, budget?: string, createdAt: string, status?: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      const token = getAuthToken();
      if (!token) return;
      try {
        const res = await fetch("/api/inquiries", { headers: { Authorization: `Bearer ${token}` } });
        const data = await res.json();
        if (data.success) setInquiries(data.data || []);
      } catch {}
      setLoading(false);
    };
    fetchInquiries();
  }, [getAuthToken]);

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-white">My Inquiries</h1>
      <p className="text-white/60 mt-2">Track the status of your project requests.</p>

      <div className="mt-8">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((n) => <div key={n} className="h-20 rounded-xl bg-white/5 animate-pulse" />)}
          </div>
        ) : inquiries.length === 0 ? (
          <div className="p-12 rounded-2xl border border-white/10 text-center">
            <p className="text-white/40 text-lg">No inquiries submitted yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {inquiries.map((inq: { _id: string, service?: string, description?: string, budget?: string, createdAt: string, status?: string }) => (
              <div key={inq._id} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-white font-medium">{inq.service || "Project Inquiry"}</h3>
                    <p className="text-white/40 text-sm mt-1 line-clamp-2">{inq.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-white/40">
                      <span>Budget: {inq.budget || "N/A"}</span>
                      <span>{new Date(inq.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium ${
                    inq.status === "new" ? "bg-blue-500/20 text-blue-400" :
                    inq.status === "contacted" ? "bg-purple-500/20 text-purple-400" :
                    inq.status === "in_discussion" ? "bg-orange-500/20 text-orange-400" :
                    inq.status === "approved" ? "bg-teal-500/20 text-teal-400" :
                    inq.status === "in_progress" ? "bg-yellow-500/20 text-yellow-400" :
                    inq.status === "completed" ? "bg-green-500/20 text-green-400" :
                    inq.status === "rejected" ? "bg-red-500/20 text-red-400" :
                    "bg-white/10 text-white/60"
                  }`}>
                    {(inq.status || "new").replace(/_/g, " ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
