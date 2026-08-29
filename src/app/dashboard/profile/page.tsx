"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-white">Profile</h1>
      <p className="text-white/60 mt-2">Your account information.</p>

      <div className="mt-8 max-w-lg space-y-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
            {user?.displayName?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div>
            <p className="text-white font-medium text-lg">{user?.displayName || "User"}</p>
            <p className="text-white/40 text-sm">{user?.email}</p>
          </div>
        </div>

        <div>
          <label className="block text-white/60 text-sm mb-2">Display Name</label>
          <input type="text" defaultValue={user?.displayName || ""} disabled
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/60 cursor-not-allowed" />
          <p className="text-white/30 text-xs mt-1">Name is managed through your authentication provider.</p>
        </div>

        <div>
          <label className="block text-white/60 text-sm mb-2">Email</label>
          <input type="email" defaultValue={user?.email || ""} disabled
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/60 cursor-not-allowed" />
        </div>

        <div>
          <label className="block text-white/60 text-sm mb-2">User ID</label>
          <input type="text" defaultValue={user?.uid || ""} disabled
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/40 cursor-not-allowed font-mono text-xs" />
        </div>
      </div>
    </div>
  );
}
