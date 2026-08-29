"use client";

export default function ProjectsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Projects</h1>
          <p className="text-zinc-400 mt-1">Manage portfolio case studies.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
          Add Project
        </button>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 text-center">
        <p className="text-zinc-400">Project CRUD interface placeholder.</p>
        <p className="text-zinc-500 text-sm mt-2">In a real app, this would be a full data grid with a modal form for Next.js API integration.</p>
      </div>
    </div>
  );
}
