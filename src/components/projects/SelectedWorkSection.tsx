"use client";

import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface ProjectType {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

const projects: ProjectType[] = [
  {
    id: 1,
    title: "Gram Shiksha",
    category: "Education Platform",
    description: "An interactive learning portal designed to bridge the digital divide in rural education.",
    image: "/images/projects/gram-shiksha.webp",
    tags: ["Web Application", "Education"],
    link: "/projects/business-web-app"
  },
  {
    id: 2,
    title: "Skillora",
    category: "Learning Platform",
    description: "An AI-powered skill assessment and personalization curriculum development environment.",
    image: "/images/projects/skillora.webp",
    tags: ["Web Application", "UI/UX"],
    link: "/projects/dashboard-ui"
  },
  {
    id: 3,
    title: "Expense Tracking System",
    category: "Web Application",
    description: "A modern expense management experience designed for simple financial tracking.",
    image: "/images/projects/expense-tracking.webp",
    tags: ["Dashboard", "Database"],
    link: "/projects/business-web-app"
  },
  {
    id: 4,
    title: "SENOTZA Portfolio",
    category: "Creative Website",
    description: "Our current interactive portfolio showcases state of the art web technologies and 3D scenes.",
    image: "/images/projects/senotza.webp",
    tags: ["Portfolio", "3D"],
    link: "/projects/senotza-v1"
  }
];

export const SelectedWorkHeader = () => (
  <div className="w-full text-center max-w-3xl mb-8 flex flex-col items-center">
    <span className="font-mono text-[10px] sm:text-xs text-primary font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
      Selected Work
    </span>
    <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-bold text-white tracking-tighter mt-4 leading-tight">
      A curated selection of projects that showcase our craft.
    </h2>
    <p className="text-white/60 text-sm sm:text-base md:text-lg mt-3 max-w-lg mx-auto font-light leading-relaxed">
      Explore a selection of digital experiences, web applications, websites and creative solutions built by SENOTZA SOLUTIONS.
    </p>
  </div>
);

export const ProjectTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2 border-t border-white/5">
    {tags.map((tag) => (
      <span
        key={tag}
        className="text-[9px] sm:text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-white/50 border border-white/10"
      >
        {tag}
      </span>
    ))}
  </div>
);

export const ProjectCTA = ({ link, isActive }: { link: string; isActive: boolean }) => (
  <Link
    href={link}
    className={`flex items-center gap-1 text-[11px] sm:text-xs font-mono text-primary font-semibold select-none group transition-transform ${
      isActive ? "pointer-events-auto" : "pointer-events-none"
    }`}
  >
    <span>View Project</span>
    <ArrowUpRight
      size={14}
      className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
    />
  </Link>
);

export const ProjectMeta = ({
  title,
  description,
  tags,
  link,
  isActive,
  textRef,
}: {
  title: string;
  description: string;
  tags: string[];
  link: string;
  isActive: boolean;
  textRef: (el: HTMLDivElement | null) => void;
}) => (
  <div ref={textRef} className="flex flex-col space-y-3">
    <div className="flex justify-between items-end">
      <div>
        <h3 className="text-lg sm:text-2xl lg:text-3xl font-heading font-bold text-white tracking-tight">
          {title}
        </h3>
        <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-lg font-light leading-relaxed">
          {description}
        </p>
      </div>
      <ProjectCTA link={link} isActive={isActive} />
    </div>
    <ProjectTags tags={tags} />
  </div>
);

export const ProjectImage = ({
  image,
  title,
  imgRef,
  isActive,
}: {
  image: string;
  title: string;
  imgRef: (el: HTMLDivElement | null) => void;
  isActive: boolean;
}) => (
  <div
    ref={imgRef}
    className="relative w-full h-[60%] sm:h-[65%] rounded-xl overflow-hidden border border-white/10 bg-black/40 shadow-inner group"
  >
    <Image
      src={image}
      alt={title}
      fill
      className={`object-cover transition-transform duration-700 ease-out ${
        isActive ? "group-hover:scale-[1.04]" : ""
      }`}
      sizes="(max-width: 768px) 100vw, 850px"
      priority={isActive}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
  </div>
);

export const ProjectCard = ({
  project,
  index,
  isActive,
  cardsRef,
  imagesRef,
  textsRef,
}: {
  project: ProjectType;
  index: number;
  isActive: boolean;
  cardsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
  imagesRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
  textsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
}) => {
  const innerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive || !innerRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const normX = x / (rect.width / 2);
    const normY = y / (rect.height / 2);

    const rotateXRate = -3.5 * normY;
    const rotateYRate = 3.5 * normX;

    gsap.to(innerRef.current, {
      rotateX: rotateXRate,
      rotateY: rotateYRate,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    if (!innerRef.current) return;
    gsap.to(innerRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <div
      ref={(el) => {
        if (cardsRef.current) cardsRef.current[index] = el;
      }}
      className="absolute w-[88vw] max-w-[360px] md:w-[65vw] md:max-w-[600px] lg:w-[70vw] lg:max-w-[900px] h-[440px] md:h-[500px] lg:h-[540px] pointer-events-none origin-center"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <div
        ref={innerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`w-full h-full rounded-[2rem] border border-white/10 bg-zinc-900/90 backdrop-blur-md p-5 sm:p-7 lg:p-9 flex flex-col justify-between transition-all duration-300 ${
          isActive
            ? "pointer-events-auto shadow-[0_30px_100px_rgba(0,0,0,0.85)] border-white/20 select-text cursor-default"
            : "shadow-lg cursor-default select-none"
        }`}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <div className="flex justify-between items-center w-full">
          <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-wider text-primary uppercase">
            {project.category}
          </span>
          <span className="font-mono text-white/30 text-xs font-bold">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <ProjectImage
          image={project.image}
          title={project.title}
          imgRef={(el) => {
            if (imagesRef.current) imagesRef.current[index] = el;
          }}
          isActive={isActive}
        />

        <ProjectMeta
          title={project.title}
          description={project.description}
          tags={project.tags}
          link={project.link}
          isActive={isActive}
          textRef={(el) => {
            if (textsRef.current) textsRef.current[index] = el;
          }}
        />
      </div>
    </div>
  );
};

export const ProjectStack = ({
  activeIndex,
  cardsRef,
  imagesRef,
  textsRef,
}: {
  activeIndex: number;
  cardsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
  imagesRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
  textsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
}) => {
  return (
    <div
      className="relative flex items-center justify-center w-[88vw] max-w-[360px] md:w-[65vw] md:max-w-[600px] lg:w-[70vw] lg:max-w-[900px] h-[440px] md:h-[500px] lg:h-[540px]"
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
      }}
    >
      {projects.map((project, i) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={i}
          isActive={activeIndex === i}
          cardsRef={cardsRef}
          imagesRef={imagesRef}
          textsRef={textsRef}
        />
      ))}
    </div>
  );
};

export default function SelectedWorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const textsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current || !stickyRef.current || reducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current;
      const images = imagesRef.current;
      const texts = textsRef.current;

      const mm = gsap.matchMedia();

      // DESKTOP
      mm.add("(min-width: 768px)", () => {
        cards.forEach((card, i) => {
          if (!card) return;
          if (i === 0) {
            gsap.set(card, { opacity: 1, scale: 1, y: 0, z: 80, rotateX: 0, rotateY: 0 });
          } else if (i === 1) {
            gsap.set(card, { opacity: 0.65, scale: 0.94, y: 15, z: 20, rotateX: -5, rotateY: 0 });
          } else if (i === 2) {
            gsap.set(card, { opacity: 0.35, scale: 0.88, y: 30, z: -40, rotateX: -10, rotateY: 0 });
          } else {
            gsap.set(card, { opacity: 0, scale: 0.82, y: 45, z: -100, rotateX: -15, rotateY: 0 });
          }
        });

        images.forEach((img, i) => {
          if (!img) return;
          if (i === 0) gsap.set(img, { scale: 1.06, y: -12 });
          else gsap.set(img, { scale: 1, y: 0 });
        });

        texts.forEach((text, i) => {
          if (!text) return;
          if (i === 0) gsap.set(text, { opacity: 1, y: 0 });
          else gsap.set(text, { opacity: 0, y: 15 });
        });

        const scrollLength = window.innerHeight * 3;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${scrollLength}`,
            pin: stickyRef.current,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const calculatedIndex = Math.min(
                projects.length - 1,
                Math.floor(progress * projects.length)
              );
              if (calculatedIndex !== activeIndexRef.current) {
                activeIndexRef.current = calculatedIndex;
                setActiveIndex(calculatedIndex);
              }
            },
          },
        });

        for (let i = 0; i < projects.length - 1; i++) {
          const startTrans = i + 0.70;

          tl.to(cards[i], {
            opacity: 0,
            scale: 1.08,
            y: -150,
            z: 160,
            rotateX: 10,
            ease: "power2.inOut",
            duration: 0.3,
          }, startTrans);

          tl.to(images[i], {
            scale: 1,
            y: 0,
            ease: "power2.inOut",
            duration: 0.3,
          }, startTrans);

          tl.to(texts[i], {
            opacity: 0,
            y: -15,
            ease: "power2.inOut",
            duration: 0.3,
          }, startTrans);

          tl.to(cards[i + 1], {
            opacity: 1,
            scale: 1,
            y: 0,
            z: 80,
            rotateX: 0,
            ease: "power2.inOut",
            duration: 0.3,
          }, startTrans);

          tl.to(images[i + 1], {
            scale: 1.06,
            y: -12,
            ease: "power2.inOut",
            duration: 0.3,
          }, startTrans);

          tl.to(texts[i + 1], {
            opacity: 1,
            y: 0,
            ease: "power2.inOut",
            duration: 0.3,
          }, startTrans);

          if (i + 2 < projects.length) {
            tl.to(cards[i + 2], {
              opacity: 0.65,
              scale: 0.94,
              y: 15,
              z: 20,
              rotateX: -5,
              ease: "power2.inOut",
              duration: 0.3,
            }, startTrans);
          }

          if (i + 3 < projects.length) {
            tl.to(cards[i + 3], {
              opacity: 0.35,
              scale: 0.88,
              y: 30,
              z: -40,
              rotateX: -10,
              ease: "power2.inOut",
              duration: 0.3,
            }, startTrans);
          }

          if (i + 4 < projects.length) {
            tl.to(cards[i + 4], {
              opacity: 0,
              scale: 0.82,
              y: 45,
              z: -100,
              rotateX: -15,
              ease: "power2.inOut",
              duration: 0.3,
            }, startTrans);
          }
        }
      });

      // MOBILE
      mm.add("(max-width: 767px)", () => {
        cards.forEach((card, i) => {
          if (!card) return;
          if (i === 0) {
            gsap.set(card, { opacity: 1, scale: 1, y: 0 });
          } else if (i === 1) {
            gsap.set(card, { opacity: 0.7, scale: 0.95, y: 12 });
          } else {
            gsap.set(card, { opacity: 0, scale: 0.9, y: 24 });
          }
        });

        images.forEach((img, i) => {
          if (!img) return;
          gsap.set(img, { scale: 1, y: 0 });
        });

        texts.forEach((text, i) => {
          if (!text) return;
          if (i === 0) gsap.set(text, { opacity: 1, y: 0 });
          else gsap.set(text, { opacity: 0, y: 15 });
        });

        const scrollLengthMobile = window.innerHeight * 2.5;

        const tlMobile = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${scrollLengthMobile}`,
            pin: stickyRef.current,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const calculatedIndex = Math.min(
                projects.length - 1,
                Math.floor(progress * projects.length)
              );
              if (calculatedIndex !== activeIndexRef.current) {
                activeIndexRef.current = calculatedIndex;
                setActiveIndex(calculatedIndex);
              }
            },
          },
        });

        for (let i = 0; i < projects.length - 1; i++) {
          const startTrans = i + 0.70;

          tlMobile.to(cards[i], {
            opacity: 0,
            scale: 0.96,
            y: -100,
            ease: "power1.inOut",
            duration: 0.3,
          }, startTrans);

          tlMobile.to(texts[i], {
            opacity: 0,
            y: -15,
            ease: "power1.inOut",
            duration: 0.3,
          }, startTrans);

          tlMobile.to(cards[i + 1], {
            opacity: 1,
            scale: 1,
            y: 0,
            ease: "power1.inOut",
            duration: 0.3,
          }, startTrans);

          tlMobile.to(texts[i + 1], {
            opacity: 1,
            y: 0,
            ease: "power1.inOut",
            duration: 0.3,
          }, startTrans);

          if (i + 2 < projects.length) {
            tlMobile.to(cards[i + 2], {
              opacity: 0.7,
              scale: 0.95,
              y: 12,
              ease: "power1.inOut",
              duration: 0.3,
            }, startTrans);
          }

          if (i + 3 < projects.length) {
            tlMobile.to(cards[i + 3], {
              opacity: 0,
              scale: 0.9,
              y: 24,
              ease: "power1.inOut",
              duration: 0.3,
            }, startTrans);
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section className="w-full bg-[#0a0a0a] py-24" id="projects">
        <div className="container mx-auto px-4 sm:px-6">
          <SelectedWorkHeader />
          <div className="flex flex-col space-y-12 max-w-4xl mx-auto mt-16">
            {projects.map((project, i) => (
              <div
                key={project.id}
                className="w-full rounded-[2rem] border border-white/10 bg-zinc-900/90 p-6 sm:p-8 flex flex-col justify-between"
              >
                <div className="flex justify-between items-center w-full mb-4">
                  <span className="font-mono text-xs font-semibold tracking-wider text-primary uppercase">
                    {project.category}
                  </span>
                  <span className="font-mono text-white/30 text-xs font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative w-full h-64 sm:h-[400px] rounded-xl overflow-hidden border border-white/10 bg-black/40 mb-6 font-sans">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 850px"
                  />
                </div>

                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-white/60 text-sm mt-2 max-w-xl font-light leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <Link
                      href={project.link}
                      className="flex items-center gap-1 text-xs font-mono text-primary font-semibold hover:underline"
                    >
                      <span>View Project</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                  <ProjectTags tags={project.tags} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="selected-work-section relative w-full bg-[#0a0a0a]"
      id="projects"
    >
      <div
        ref={stickyRef}
        className="selected-work-sticky w-full h-screen overflow-hidden flex flex-col justify-center relative select-none"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_100%)] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 z-10 flex flex-col items-center justify-between h-[85vh] py-8">
          <SelectedWorkHeader />

          <ProjectStack
            activeIndex={activeIndex}
            cardsRef={cardsRef}
            imagesRef={imagesRef}
            textsRef={textsRef}
          />
        </div>
      </div>
    </section>
  );
}
