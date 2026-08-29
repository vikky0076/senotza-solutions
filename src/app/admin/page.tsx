"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { FileText, Users, FolderOpen, Clock, CheckCircle, AlertCircle } from "lucide-react";
import type { DashboardStats } from "@/types";

export default function AdminDashboard() {
  const { getAuthToken } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalInquiries: 0, newInquiries: 0, pendingInquiries: 0,
    inProgressProjects: 0, completedProjects: 0, registeredUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const token = getAuthToken();
      if (!token) return;
      try {
        const res = await fetch("/api/admin/stats", { headers: { Authorization: `Bearer ${token}` } });
        const data = await res.json();
        if (data.success) setStats(data.data);
      } catch {}
      setLoading(false);
    };
    fetchStats();
  }, [getAuthToken]);

  const cards = [
    { label: "Total Inquiries", value: stats.totalInquiries, icon: FileText, color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "New Inquiries", value: stats.newInquiries, icon: AlertCircle, color: "text-orange-400", bg: "bg-orange-500/10" },
    { label: "Pending", value: stats.pendingInquiries, icon: Clock, color: "text-yellow-400", bg: "bg-yellow-500/10" },
    { label: "In Progress", value: stats.inProgressProjects, icon: FolderOpen, color: "text-purple-400", bg: "bg-purple-500/10" },
    { label: "Completed", value: stats.completedProjects, icon: CheckCircle, color: "text-green-400", bg: "bg-green-500/10" },
    { label: "Registered Users", value: stats.registeredUsers, icon: Users, color: "text-cyan-400", bg: "bg-cyan-500/10" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white">Dashboard</h1>
      <p className="text-zinc-400 mt-1">Overview of your business metrics.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {cards.map((card) => (
          <div key={card.label} className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center`}>
                <card.icon size={20} className={card.color} />
              </div>
              {loading ? (
                <div className="w-10 h-8 bg-zinc-800 animate-pulse rounded" />
              ) : (
                <span className="text-3xl font-heading font-bold text-white">{card.value}</span>
              )}
            </div>
            <p className="text-zinc-500 text-sm mt-3">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
