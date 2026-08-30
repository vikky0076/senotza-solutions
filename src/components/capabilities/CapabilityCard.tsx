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
    /* Outer gradient card — reveals gradient border + glow on hover only */
    <div
      className={cn(
        "group/card",
        "w-[62vw] max-w-[220px] sm:w-[190px] md:w-[220px] lg:w-[220px]",
        "h-auto aspect-[3/4] sm:h-[270px] md:h-[290px] lg:h-[290px]",
        "rounded-[20px] p-[2px]",
        "transition-all duration-300",
        "hover:shadow-[0px_0px_30px_1px_rgba(0,255,117,0.30)]",
        "backface-hidden",
        "border border-white/10 hover:border-transparent",
        className
      )}
      style={{
        background: "transparent",
        backfaceVisibility: "hidden",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundImage = "linear-gradient(163deg, #00ff75 0%, #3700ff 100%)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundImage = "none"; }}
    >
      {/* Inner card — dark background, scales on hover to reveal gradient */}
      <div
        className={cn(
          "capability-card relative flex flex-col justify-between",
          "w-full h-full",
          "rounded-[18px] bg-[#1a1a1a] overflow-hidden",
          "transition-all duration-200",
          "group-hover/card:scale-[0.98] group-hover/card:rounded-[20px]",
          isActive ? "bg-[#1a1a1a]" : "",
        )}
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

        {/* Card number badge — top-left corner */}
        <span className="absolute top-2.5 left-2.5 font-mono text-[9px] text-white/70 font-medium bg-black/30 px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/10 z-20">
          {data.id}
        </span>
      </div>
    </div>
  );
}
