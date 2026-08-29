"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import type { UserProfile } from "@/types";

export default function UsersPage() {
  const { getAuthToken } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = getAuthToken();
      if (!token) return;
      try {
        const res = await fetch("/api/admin/users", { headers: { Authorization: `Bearer ${token}` } });
        const data = await res.json();
        if (data.success) setUsers(data.data);
      } catch {}
      setLoading(false);
    };
    fetchUsers();
  }, [getAuthToken]);

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white">Registered Users</h1>
      <p className="text-zinc-400 mt-1 mb-6">Manage all users registered on the platform.</p>

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
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-zinc-500">No users found.</td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u._id} className="border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors">
                    <td className="px-6 py-4 text-white font-medium">{u.name}</td>
                    <td className="px-6 py-4">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${u.role === "admin" ? "bg-primary/20 text-primary" : "bg-zinc-800 text-zinc-300"}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(u.createdAt).toLocaleDateString()}</td>
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
