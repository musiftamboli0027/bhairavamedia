import { useEffect, useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VaporizeTextCycle, { Tag } from "../components/ui/vapour-text-effect";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = "" }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const bottomLeftRef = useRef<HTMLSpanElement>(null);
  const bottomRightRef = useRef<HTMLSpanElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 768);
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      if (bgRef.current) {
        tl.fromTo(
          bgRef.current,
          { scale: 1.15, opacity: 0, filter: "blur(10px)" },
          { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.6 },
          0
        );
      }

      if (subRef.current) {
        tl.fromTo(
          subRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          0.8
        );
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          1
        );
      }

      if (bottomLeftRef.current) {
        tl.fromTo(
          bottomLeftRef.current,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6 },
          0.6
        );
      }

      if (bottomRightRef.current) {
        tl.fromTo(
          bottomRightRef.current,
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6 },
          0.6
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll animation
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=80%",
          pin: true,
          scrub: 0.6,
        },
      });

      if (headlineRef.current) {
        scrollTl.to(
          headlineRef.current,
          { y: "-22vh", opacity: 0 },
          0.7
        );
      }

      if (subRef.current) {
        scrollTl.to(
          subRef.current,
          { y: "-18vh", opacity: 0 },
          0.72
        );
      }

      if (ctaRef.current) {
        scrollTl.to(
          ctaRef.current,
          { y: "-15vh", opacity: 0 },
          0.74
        );
      }

      if (bgRef.current) {
        scrollTl.to(
          bgRef.current,
          { scale: 1.06, y: "-6vh", ease: "none" },
          0.7
        );
      }

      if (bottomLeftRef.current) {
        scrollTl.to(
          bottomLeftRef.current,
          { x: "-10vw", opacity: 0 },
          0.75
        );
      }

      if (bottomRightRef.current) {
        scrollTl.to(
          bottomRightRef.current,
          { x: "10vw", opacity: 0 },
          0.75
        );
      }
    }, section);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const scrollToWork = () => {
    const element = document.getElementById("work-carousel");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`section-pinned relative overflow-hidden ${className}`}
    >
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full z-0" style={{ opacity: 0 }}>
        <img
          src="/DM 2.webp"
          alt="Bhairava Media Hub"
          className="w-full h-full object-cover opacity-80"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70" />
      </div>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6">

        <div ref={headlineRef} className="relative w-full flex justify-center text-center">
          <div className="h-[240px] sm:h-[280px] md:h-[320px] w-full max-w-[1100px] flex items-center justify-center">
            <VaporizeTextCycle
              texts={[
                "Stories That Move People",
                "Digital Edge Engineering",
                "Creative Strategy Group",
              ]}
              font={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(1.4rem, 7vw, 5rem)",
                fontWeight: 900,
              }}
              color="rgb(242,242,242)"
              spread={isMobile ? 4 : 7}
              density={isMobile ? 6 : 10}
              animation={{
                vaporizeDuration: 2.5,
                fadeInDuration: 1.2,
                waitDuration: 2,
              }}
              direction="left-to-right"
              alignment="center"
              tag={Tag.H1}
            />
          </div>

          <div className="absolute inset-0 bg-black/40 blur-[120px] rounded-full opacity-60 pointer-events-none" />
        </div>

        <p
          ref={subRef}
          className="mt-6 md:mt-8 text-sm md:text-lg text-[#B8BDC7] text-center max-w-xl bg-black/40 backdrop-blur-md px-6 py-3 rounded-lg border border-white/5"
          style={{ opacity: 0 }}
        >
          Strategy-led creative for brands that want to be remembered.
        </p>

        <div className="relative mt-10">
          <button
            ref={ctaRef}
            onClick={scrollToWork}
            className="font-mono-label text-[#FF4D2E] hover:text-white transition-all duration-300 underline underline-offset-4 px-8 py-4 bg-black/60 hover:bg-[#FF4D2E] backdrop-blur-xl rounded-full border border-[#FF4D2E]/30"
            style={{ opacity: 0 }}
          >
            View selected work
          </button>
        </div>
      </div>

      {/* Bottom Labels */}
      <span
        ref={bottomLeftRef}
        className="absolute bottom-[7vh] left-[6vw] text-xs tracking-widest text-[#B8BDC7] z-10 gsap-anim"
        style={{ opacity: 0 }}
      >
        BHAIRAVA MEDIA
      </span>

      <span
        ref={bottomRightRef}
        className="absolute bottom-[7vh] right-[6vw] text-xs tracking-widest text-[#B8BDC7] z-10 gsap-anim"
        style={{ opacity: 0 }}
      >
        SCROLL TO EXPLORE
      </span>
    </section>
  );
};

export default HeroSection;