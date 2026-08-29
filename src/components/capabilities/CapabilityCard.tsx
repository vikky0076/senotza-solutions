import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CapabilityData {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

interface CapabilityCardProps {
  data: CapabilityData;
  isActive: boolean;
  className?: string;
}

export default function CapabilityCard({ data, isActive, className }: CapabilityCardProps) {
  return (
    <div 
      className={cn(
        "capability-card relative flex flex-col justify-between",
        "w-[62vw] max-w-[220px] sm:w-[190px] md:w-[220px] lg:w-[220px]",
        "h-auto aspect-[3/4] sm:h-[270px] md:h-[290px] lg:h-[290px]",
        "rounded-[18px] bg-white/5 border border-white/10 overflow-hidden",
        "backface-hidden",
        isActive ? "border-white/25 bg-white/8 shadow-[0_0_20px_rgba(255,255,255,0.04)]" : "",
        className
      )}
      style={{ backfaceVisibility: "hidden" }}
    >
      {/* Image area — occupies ~57% of card height */}
      <div className="relative w-full h-[57%] overflow-hidden z-0">
        <Image 
          src={data.image} 
          alt={data.title} 
          fill 
          className="object-cover capability-image origin-center"
          sizes="(max-width: 768px) 82vw, 320px"
          priority={data.id === "01" || data.id === "02"}
        />
        {/* Gradient overlay at bottom of image to blend into content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
        <div className="absolute inset-0 bg-black/40 capability-overlay" />
      </div>

      {/* Content area — occupies ~43% of card height */}
      <div className="relative z-10 flex flex-col justify-between flex-1 p-3 md:p-4">
        {/* Top row: ID badge + arrow */}
        <div className="flex justify-between items-start mb-3">
          <span className="capability-category font-mono text-[11px] text-white/50 uppercase tracking-widest font-semibold">
            {data.category}
          </span>
          <div className={cn(
            "capability-arrow w-6 h-6 rounded-full border flex items-center justify-center",
            isActive ? "bg-white border-white text-black" : "bg-white/5 border-white/15 text-white/50"
          )}>
            <ArrowUpRight size={12} />
          </div>
        </div>

        {/* Title + description */}
        <div className="flex flex-col gap-2 mt-auto">
          <h3 className="capability-title text-sm md:text-base font-heading font-bold text-white leading-snug">
            {data.title}
          </h3>
          <p className="capability-description text-[10px] md:text-xs leading-relaxed line-clamp-2 text-white/40">
            {data.description}
          </p>
        </div>
      </div>

      {/* Card number badge — bottom-right corner */}
      <span className="absolute top-2.5 left-2.5 font-mono text-[9px] text-white/70 font-medium bg-black/30 px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/10 z-20">
        {data.id}
      </span>
    </div>
  );
}
