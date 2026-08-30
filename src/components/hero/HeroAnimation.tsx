"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const STORY_MESSAGES = [
  {
    subtitle: "WELCOME TO",
    title: ["SENOTZA SOLUTIONS"]
  },
  {
    subtitle: "WE BUILD",
    title: ["DIGITAL EXPERIENCES."]
  },
  {
    subtitle: "WE CREATE",
    title: ["WEBSITES.", "WEB APPLICATIONS.", "DIGITAL PRODUCTS."]
  },
  {
    subtitle: "OUR CAPABILITIES",
    title: ["WEB DEVELOPMENT.", "UI/UX DESIGN.", "BRANDING.", "CONTENT.", "SEO."]
  },
  {
    subtitle: "BUILT WITH",
    title: ["PERFORMANCE.", "PRECISION.", "CREATIVITY."]
  },
  {
    subtitle: "OUR WORK",
    title: ["REAL PROJECTS.", "REAL SOLUTIONS.", "REAL IMPACT."]
  },
  {
    subtitle: "FROM IDEA",
    title: ["TO DIGITAL EXPERIENCE."]
  },
  {
    subtitle: "YOUR VISION.",
    title: ["OUR TECHNOLOGY."]
  },
  {
    subtitle: "LET'S BUILD",
    title: ["SOMETHING GREAT."]
  },
  {
    subtitle: "SENOTZA SOLUTIONS",
    title: ["DIGITAL SOLUTIONS,", "ENGINEERED TO IMPACT."]
  }
];

export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (prefersReducedMotion) {
      // Just show static text
      gsap.set(".anim-letter", { opacity: 1, y: 0, scale: 1 });
      return;
    }

    // Creating GSAP timeline for the current message
    const tl = gsap.timeline({ 
      onComplete: () => {
        // Render the next message and GSAP will automatically re-run the effect
        setCurrentIndex((prev) => (prev + 1) % STORY_MESSAGES.length);
      }
    });
    
    const subtitleLetters = containerRef.current?.querySelectorAll(".subtitle-letter") || [];
    const titleLetters = containerRef.current?.querySelectorAll(".title-letter") || [];
    
    // Total reset state 
    tl.set(".anim-letter", {
      opacity: 0,
      y: 18,
      scale: 0.97,
      display: "inline-block" // Ensure transform works
    });

    // 1. Enter Subtitle
    if (subtitleLetters.length > 0) {
      tl.to(subtitleLetters, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.out",
      });
    }

    // 2. Enter Main Title
    tl.to(titleLetters, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.04,
      ease: "power3.out",
    }, subtitleLetters.length > 0 ? "-=0.2" : "+=0"); 

    // 3. HOLD FOR 3 SECONDS
    tl.to({}, { duration: 3 });
    
    // 4. Disappear in reverse (Main Title)
    tl.to(titleLetters, {
      opacity: 0,
      y: -12,
      scale: 0.98,
      duration: 0.5,
      stagger: { each: 0.03, from: "end" },
      ease: "power2.inOut",
    }); 

    // 5. Disappear Subtitle
    if (subtitleLetters.length > 0) {
      tl.to(subtitleLetters, {
        opacity: 0,
        y: -12,
        scale: 0.98,
        duration: 0.5,
        stagger: { each: 0.03, from: "end" },
        ease: "power2.inOut",
      }, "-=0.3");
    }

    // 6. Short pause before next message
    tl.to({}, { duration: 0.3 });

    return () => {
      tl.kill();
    };
  }, [currentIndex]); // Rerun GSAP whenever the actual message content changes

  const renderWords = (text: string, className: string) => {
    return text.split(" ").map((word, wIdx, wArr) => (
      <span key={`word-${wIdx}`} className="inline-flex overflow-hidden">
        {word.split("").map((char, cIdx) => (
          <span
            key={`char-${cIdx}`}
            className={`anim-letter ${className} opacity-0 inline-block whitespace-pre`}
            style={{ willChange: "transform, opacity" }}
          >
            {char}
          </span>
        ))}
        {wIdx < wArr.length - 1 && (
          <span className="inline-block w-[0.25em]">&nbsp;</span>
        )}
      </span>
    ));
  };

  const currentMsg = STORY_MESSAGES[currentIndex];

  return (
    <div className="w-full h-full lg:h-auto flex flex-col justify-center min-h-[300px] md:min-h-[380px] lg:min-h-[450px] px-8 sm:px-12 md:px-16 lg:px-20 text-black selection:bg-black/10">
      <div 
        ref={containerRef} 
        className="flex flex-col items-start w-full"
      >
        <div className="font-heading font-medium tracking-widest text-black/50 mb-2 sm:mb-4 lg:mb-5 uppercase" style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)"}}>
          {renderWords(currentMsg.subtitle, "subtitle-letter")}
        </div>
        <div className="font-heading font-bold leading-[1.05] tracking-tight text-black flex flex-col" style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)"}}>
          {currentMsg.title.map((line, idx) => (
            <div key={idx}>{renderWords(line, "title-letter")}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
