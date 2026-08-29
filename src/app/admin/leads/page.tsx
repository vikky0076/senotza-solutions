"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import type { Inquiry } from "@/types";

export default function LeadsPage() {
  const { getAuthToken } = useAuth();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    const token = getAuthToken();
    if (!token) return;
    try {
      const res = await fetch("/api/admin/inquiries", { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) setInquiries(data.data);
    } catch {}
    setLoading(false);
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchInquiries();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAuthToken]);

  const updateStatus = async (id: string, status: string) => {
    const token = getAuthToken();
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setInquiries(inquiries.map((inq) => (inq._id === id ? { ...inq, status: status as Inquiry["status"] } : inq)));
      }
    } catch {}
  };

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white">Leads & Inquiries</h1>
      <p className="text-zinc-400 mt-1 mb-6">Manage all project requests.</p>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => <div key={n} className="h-16 bg-zinc-900/50 rounded-lg animate-pulse" />)}
        </div>
      ) : (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-400">
            <thead className="text-xs uppercase bg-zinc-900/80 text-zinc-500 border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Service</th>
                <th className="px-6 py-4 font-medium">Budget</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">No leads found.</td>
                </tr>
              ) : (
                inquiries.map((inq) => (
                  <tr key={inq._id} className="border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-white font-medium">{inq.fullName}</p>
                      <p className="text-xs text-zinc-500">{inq.email}</p>
                      <p className="text-xs text-zinc-500">{inq.phone}</p>
                    </td>
                    <td className="px-6 py-4">{inq.service}</td>
                    <td className="px-6 py-4">{inq.budget}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(inq.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <select
                        value={inq.status}
                        onChange={(e) => updateStatus(inq._id!, e.target.value)}
                        className="bg-zinc-950 border border-zinc-800 text-white text-xs rounded px-2 py-1 focus:ring-1 focus:ring-primary focus:outline-none"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="in_discussion">In Discussion</option>
                        <option value="approved">Approved</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
