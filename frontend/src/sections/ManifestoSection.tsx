"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ManifestoSectionProps {
  className?: string;
}

const ManifestoSection = ({ className = "" }: ManifestoSectionProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftPanelRef = useRef<HTMLDivElement | null>(null);
  const rightPanelRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const bodyRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const topLabelRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      mm.add("(min-width: 1024px)", () => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=130%",
            pin: true,
            scrub: 0.6
          }
        });

        if (leftPanelRef.current) {
          scrollTl.fromTo(
            leftPanelRef.current,
            { x: "-55vw", opacity: 0 },
            { x: 0, opacity: 1, ease: "none" },
            0
          );
        }

        if (rightPanelRef.current) {
          scrollTl.fromTo(
            rightPanelRef.current,
            { x: "55vw", opacity: 1 },
            { x: 0, opacity: 1, ease: "none" },
            0
          );
        }

        if (headlineRef.current) {
          const chars = headlineRef.current.querySelectorAll(".char");

          scrollTl.fromTo(
            chars,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.01, ease: "none" },
            0.08
          );
        }

        if (bodyRef.current) {
          scrollTl.fromTo(
            bodyRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1 },
            0.12
          );
        }

        if (ctaRef.current) {
          scrollTl.fromTo(
            ctaRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1 },
            0.18
          );
        }

        if (topLabelRef.current) {
          scrollTl.fromTo(
            topLabelRef.current,
            { y: -20, opacity: 0 },
            { y: 0, opacity: 1 },
            0.1
          );
        }

        const panels = [leftPanelRef.current, rightPanelRef.current].filter(Boolean);

        scrollTl.to(panels, { x: "-18vw", opacity: 0 }, 0.7);
      });

      mm.add("(max-width: 1023px)", () => {
        const targets = [
          topLabelRef.current,
          headlineRef.current,
          bodyRef.current,
          ctaRef.current
        ].filter(Boolean);

        gsap.fromTo(
          targets,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, section);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const headline = "BHAIRAVA MEDIA REPRESENTS STRENGTH.";

const chars = headline.split(" ").map((word, wordIndex) => (
  <span key={wordIndex} className="inline-block mr-2 whitespace-nowrap">
    {word.split("").map((char, charIndex) => (
      <span key={charIndex} className="char inline-block">
        {char}
      </span>
    ))}
  </span>
));

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className={`relative min-h-screen bg-[#0B0D10] overflow-hidden ${className}`}
    >
      <div className="flex flex-col lg:flex-row h-full w-full">

        {/* LEFT PANEL */}
        <div
          ref={leftPanelRef}
          className="relative lg:absolute left-0 top-0 w-full lg:w-1/2 h-[40vh] lg:h-full overflow-hidden"
          style={{ opacity: 0 }}
        >
          <img
            src="/team_office_bright.webp"
            alt="Bhairava Team"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* CENTER LINE */}
        <div className="hidden lg:block absolute left-1/2 top-0 w-px h-full bg-white/10 z-10" />

        {/* RIGHT PANEL */}
        <div
          ref={rightPanelRef}
          className="relative lg:absolute right-0 top-0 w-full lg:w-1/2 flex flex-col justify-center px-6 lg:px-[7vw] py-16 lg:py-0"
        >
          <span
            ref={topLabelRef}
            className="text-[#B8BDC7] mb-6 block"
            style={{ opacity: 0 }}
          >
            ABOUT BHAIRAVA
          </span>

          <h2
            ref={headlineRef}
className="text-3xl md:text-4xl lg:text-5xl font-black uppercase text-[#F2F2F2] leading-tight break-keep"            style={{ opacity: 0 }}
          >
            {chars}
          </h2>

          <p
            ref={bodyRef}
            className="mt-8 text-lg text-[#B8BDC7] max-w-xl"
            style={{ opacity: 0 }}
          >
            A marketing agency with a slow site is a brand contradiction. From
            insight to execution, we craft campaigns that feel inevitable.
          </p>

          <div
            ref={ctaRef}
            className="mt-10 flex gap-6"
            style={{ opacity: 0 }}
          >
            <button
              onClick={() => scrollToSection("team")}
              className="text-white underline"
            >
              Meet the team
            </button>

            <button
              onClick={() => scrollToSection("services-mosaic")}
              className="text-[#FF4D2E]"
            >
              Explore services →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;