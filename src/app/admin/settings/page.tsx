"use client";

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white">Settings</h1>
      <p className="text-zinc-400 mt-1 mb-6">Admin configuration.</p>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-white font-medium mb-4">Admin Access</h2>
        <p className="text-zinc-400 text-sm mb-4">
          Admin access is controlled via environment variables. To add or remove an admin, modify the <code className="bg-zinc-800 px-1 py-0.5 rounded text-primary">ADMIN_EMAIL</code> variable in your deployment settings.
        </p>
      </div>
    </div>
  );
}
