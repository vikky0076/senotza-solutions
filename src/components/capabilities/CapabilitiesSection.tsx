"use client";

import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CapabilityData } from "./CapabilityCard";
import CapabilityCard from "./CapabilityCard";
import AnimatedText from "@/components/animations/AnimatedText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const capabilitiesData: CapabilityData[] = [
  {
    id: "01",
    title: "Website Development",
    category: "Engineering",
    description: "Fast, responsive and conversion-focused digital experiences built around your business goals.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "02",
    title: "Web Applications",
    category: "Engineering",
    description: "Complex, scalable, and intuitive web applications designed to solve modern business challenges.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "03",
    title: "Portfolio Designs",
    category: "Design",
    description: "Elegant and creative personal brand presences that showcase your work and unique identity.",
    image: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "04",
    title: "Business Websites",
    category: "Engineering",
    description: "Professional corporate websites that establish trust and clearly communicate your value proposition.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "05",
    title: "Landing Pages",
    category: "Marketing",
    description: "High-conversion landing pages engineered to turn your visitors into qualified leads and customers.",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "06",
    title: "UI/UX Design",
    category: "Design",
    description: "User-centric design systems and intuitive interfaces that create engaging digital experiences.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "07",
    title: "Branding & Logos",
    category: "Identity",
    description: "Distinctive brand identities and visual systems that capture the essence of your business.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "08",
    title: "Content Writing",
    category: "Content",
    description: "Strategic content creation that communicates your message clearly and engages your target audience.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "09",
    title: "SEO",
    category: "Marketing",
    description: "Data-driven search engine optimization strategies to increase your visibility and organic growth.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
  },
];

export default function CapabilitiesSection() {
  const outerSectionRef = useRef<HTMLElement>(null);
  const stickyContentRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!outerSectionRef.current || !stickyContentRef.current || reducedMotion) return;

    const ctx = gsap.context(() => {
      const cardCount = capabilitiesData.length;
      const anglePerCard = 360 / cardCount;
      const totalRotation = -(cardCount - 1) * anglePerCard; // -320deg to bring Card 09 to front

      const cards = gsap.utils.toArray<HTMLElement>(".capability-card");
      const overlays = gsap.utils.toArray<HTMLElement>(".capability-overlay");
      const images = gsap.utils.toArray<HTMLElement>(".capability-image");
      const titles = gsap.utils.toArray<HTMLElement>(".capability-title");
      const categories = gsap.utils.toArray<HTMLElement>(".capability-category");
      const descriptions = gsap.utils.toArray<HTMLElement>(".capability-description");
      const arrows = gsap.utils.toArray<HTMLElement>(".capability-arrow");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerSectionRef.current,
          start: "top top",
          end: () => `+=${window.innerWidth < 768 ? 6000 : window.innerWidth < 1024 ? 7500 : 9000}`,
          pin: stickyContentRef.current,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;

            // Map progress to 9 equal segments: 0-0.11->0, 0.11-0.22->1, ... 0.88-1.0->8
            const calculatedIndex = Math.min(
              cardCount - 1,
              Math.floor(progress * cardCount)
            );
            
            if (calculatedIndex !== activeIndex) {
              setActiveIndex(calculatedIndex);
            }

            // Animation progress: orbit completes at 90%, holds 90-100%
            const animProgress = Math.min(progress / 0.9, 1);
            const currentContinuousIndex = animProgress * (cardCount - 1);

            // ── Per-card visual updates ──
            cards.forEach((card, i) => {
              const distance = Math.abs(currentContinuousIndex - i);

              // ── ZOOM: active 1.08, nearby 0.88-0.98, far 0.78 ──
              const scale = gsap.utils.clamp(
                0.78,
                1.08,
                gsap.utils.mapRange(0, 2, 1.08, 0.78, Math.min(distance, 2))
              );

              // ── OPACITY: active 1, nearby 0.65-0.85, far 0.35 ──
              const opacity = gsap.utils.clamp(
                0.35,
                1,
                gsap.utils.mapRange(0, 2, 1, 0.35, Math.min(distance, 2))
              );

              gsap.set(card, { scale, opacity });

              // ── IMAGE ZOOM: active 1.06, inactive 1.0 ──
              if (images[i]) {
                const imgScale = gsap.utils.clamp(
                  1,
                  1.06,
                  gsap.utils.mapRange(0, 1, 1.06, 1, Math.min(distance, 1))
                );
                gsap.set(images[i], { scale: imgScale });
              }

              // ── OVERLAY: active 0, far 1 ──
              if (overlays[i]) {
                const overlayOpacity = gsap.utils.clamp(
                  0,
                  1,
                  gsap.utils.mapRange(0, 1.5, 0, 0.6, Math.min(distance, 1.5))
                );
                gsap.set(overlays[i], { opacity: overlayOpacity });
              }

              // ── CONTENT ANIMATION: title, category, description, arrow ──
              const contentOpacityActive = gsap.utils.clamp(
                0.4,
                1,
                gsap.utils.mapRange(0, 0.8, 1, 0.4, Math.min(distance, 0.8))
              );
              const titleY = gsap.utils.clamp(
                0,
                8,
                gsap.utils.mapRange(0, 0.8, 0, 8, Math.min(distance, 0.8))
              );

              if (titles[i]) {
                gsap.set(titles[i], { opacity: contentOpacityActive, y: titleY });
              }
              if (categories[i]) {
                gsap.set(categories[i], { opacity: gsap.utils.clamp(0.3, 1, contentOpacityActive - 0.1) });
              }
              if (descriptions[i]) {
                gsap.set(descriptions[i], { opacity: gsap.utils.clamp(0.25, 1, contentOpacityActive - 0.15) });
              }
              if (arrows[i]) {
                gsap.set(arrows[i], { opacity: gsap.utils.clamp(0.3, 1, contentOpacityActive - 0.1) });
              }
            });
          }
        }
      });

      if (orbitRef.current) {
        // Master timeline: orbit rotates for 90%, then holds for 10%
        tl.to(orbitRef.current, {
          rotateY: totalRotation,
          ease: "none",
          duration: 0.9
        })
        .to({}, { duration: 0.1 }); // Hold Card 09 in front
      }
      
    }, outerSectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section className="w-full bg-[#0a0a0a] py-24" id="capabilities">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-white tracking-tighter">
              Our Capabilities
            </h2>
            <p className="text-white/60 text-lg lg:text-xl mt-4 max-w-xl">
              Comprehensive digital solutions engineered for scale and designed for impact.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {capabilitiesData.map((cap) => (
              <div key={cap.id} className="capability-card-wrapper w-full">
                <CapabilityCard data={cap} isActive={true} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Orbit radius matched to smaller card size
  const radius = 400;

  return (
    <section 
      ref={outerSectionRef} 
      className="capabilities-scroll-section relative w-full bg-[#0a0a0a]"
      id="capabilities"
    >
      <div 
        ref={stickyContentRef}
        className="capabilities-sticky-content w-full h-screen overflow-hidden flex flex-col justify-center relative"
      >

        {/* 3D orbit scene — exact center of viewport */}
        <div className="orbit-scene absolute inset-0">
          <div 
            className="absolute left-1/2 top-[62%] pointer-events-none scene"
            style={{ 
              perspective: "1200px",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div 
              ref={orbitRef}
              className="orbit relative origin-center"
              style={{
                transformStyle: "preserve-3d",
                width: "320px",
                height: "430px",
              }}
            >
              {capabilitiesData.map((cap, index) => {
                const angle = (360 / capabilitiesData.length) * index;
                
                return (
                  <div
                    key={cap.id}
                    className="capability-card-wrapper absolute inset-0 pointer-events-auto origin-center"
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <CapabilityCard 
                      data={cap} 
                      isActive={activeIndex === index} 
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
