"use client";

import { useRef, useState, useCallback, ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string; // e.g. "65, 88, 208"  (R, G, B only — used in rgba())
}

export default function TiltCard({
  children,
  className = "",
  glowColor = "120, 80, 255",
}: TiltCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glare, setGlare] = useState<React.CSSProperties>({ opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left; // px from left
    const y = e.clientY - rect.top;  // px from top
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    // Normalize -1 → +1
    const nx = (x - cx) / cx;
    const ny = (y - cy) / cy;

    const rotX = -ny * 18; // tilt up/down
    const rotY = nx * 18;  // tilt left/right

    // Glare angle from mouse position
    const angle = Math.atan2(ny, nx) * (180 / Math.PI);
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setStyle({
      transform: `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 120ms ease-out",
    });

    setGlare({
      opacity: 0.12,
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.5) 0%, transparent 60%)`,
      transform: `rotate(${angle}deg)`,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 500ms ease-out",
    });
    setGlare({ opacity: 0, transition: "opacity 300ms ease" });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`relative select-none ${className}`}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {/* Outer glow bloom */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none -z-10 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, rgba(${glowColor},0.4) 0%, rgba(200,80,192,0.3) 50%, rgba(255,204,112,0.3) 100%)`,
          filter: "blur(28px)",
          opacity: isHovered ? 0.85 : 0.3,
          transition: "opacity 300ms ease",
        }}
      />

      {/* Card surface */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={style}
      >
        {children}

        {/* Glare overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={glare}
        />
      </div>
    </div>
  );
}
