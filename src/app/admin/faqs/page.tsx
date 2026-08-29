"use client";

export default function FAQsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">FAQs</h1>
          <p className="text-zinc-400 mt-1">Manage frequently asked questions.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
          Add FAQ
        </button>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 text-center">
        <p className="text-zinc-400">FAQs CRUD interface placeholder.</p>
      </div>
    </div>
  );
}
