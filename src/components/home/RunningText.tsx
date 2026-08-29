"use client";

const words = [
  "Wow Factor",
  "Stand Out",
  "Captivate",
  "Innovative",
  "Best Visuals",
  "Engaging",
  "Interactive",
  "WebGL",
  "Cinematic",
  "Storytelling",
];

export default function RunningText() {
  // Duplicate the list 4x to guarantee seamless infinite scrolling
  const repeatedWords = [...words, ...words, ...words, ...words];

  return (
    <section className="relative w-full overflow-hidden bg-black py-6 sm:py-8">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* ── Row 1: scrolls LEFT ── */}
      <div className="flex whitespace-nowrap animate-marquee-left">
        {repeatedWords.map((word, i) => (
          <span
            key={`left-${i}`}
            className="inline-flex items-center mx-2 sm:mx-3 px-5 sm:px-7 py-2 sm:py-2.5 rounded-full bg-white text-black text-sm sm:text-base font-semibold tracking-wide uppercase shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:bg-white/90 hover:scale-105 transition-transform duration-300 cursor-default select-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-black/30 mr-3 shrink-0" />
            {word}
          </span>
        ))}
      </div>

      {/* ── Row 2: scrolls RIGHT (reverse) ── */}
      <div className="flex whitespace-nowrap animate-marquee-right mt-3 sm:mt-4">
        {repeatedWords.map((word, i) => (
          <span
            key={`right-${i}`}
            className="inline-flex items-center mx-2 sm:mx-3 px-5 sm:px-7 py-2 sm:py-2.5 rounded-full bg-white/10 text-white border border-white/20 text-sm sm:text-base font-semibold tracking-wide uppercase shrink-0 hover:bg-white/20 hover:scale-105 transition-transform duration-300 cursor-default select-none backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 mr-3 shrink-0" />
            {word}
          </span>
        ))}
      </div>
    </section>
  );
}
