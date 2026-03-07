import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TeamGridProps {
  className?: string;
}

const TeamGrid = ({ className = '' }: TeamGridProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const topLeftRef = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      // Top-left portrait from top
      scrollTl.fromTo(topLeftRef.current,
        { y: '-60vh', opacity: 0, scale: 1.05 },
        { y: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Top-right portrait from right
      scrollTl.fromTo(topRightRef.current,
        { x: '60vw', opacity: 0, scale: 1.05 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Bottom-right portrait from bottom
      scrollTl.fromTo(bottomRightRef.current,
        { y: '60vh', opacity: 0, scale: 1.05 },
        { y: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Bottom-left text from left
      scrollTl.fromTo(bottomLeftRef.current,
        { x: '-60vw', opacity: 1 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Headline words entrance
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        scrollTl.fromTo(words,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.06, ease: 'none' },
          0.12
        );
      }

      // SETTLE (30% - 70%) - Hold position

      // EXIT (70% - 100%)
      scrollTl.fromTo(topLeftRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(topRightRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(bottomRightRef.current,
        { y: 0, opacity: 1 },
        { y: '18vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(bottomLeftRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        scrollTl.fromTo(words,
          { opacity: 1 },
          { opacity: 0, stagger: 0.03, ease: 'power2.in' },
          0.75
        );
      }

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="team"
      className={`section-pinned ${className}`}
    >
      {/* Top Left Portrait */}
      <div
        ref={topLeftRef}
        className="absolute left-0 top-0 w-1/2 h-1/2 overflow-hidden img-skeleton"
        style={{ opacity: 0 }}
      >
        <img
          src="/DM 1.webp"
          alt="Team Member"
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#0B0D10]/30" />
      </div>

      {/* Top Right Landscape with Diagonal Text (Red Area) */}
      <div
        ref={topRightRef}
        className="absolute right-0 top-0 w-1/2 h-1/2 overflow-hidden bg-black group"
        style={{ opacity: 0 }}
      >
        <img
          src="/three-positive-business-people-talking-office-lobby.webp"
          alt="Team Collaboration"
          className="w-full h-full object-cover opacity-60 transition-opacity duration-700 group-hover:opacity-100"
          loading="lazy"
          decoding="async"
        />
        
        {/* Unique Diagonal Animated Text */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[20%] left-[-10%] rotate-[-12deg] whitespace-nowrap animate-pulse">
            <span className="text-white/20 text-4xl font-black uppercase tracking-[1em]">CORE ENGINE SYSTEM</span>
          </div>
          <div className="absolute top-[50%] right-[-10%] rotate-[-12deg] whitespace-nowrap opacity-10">
            <span className="text-white text-6xl font-black uppercase tracking-[0.5em]">DATA FLOW</span>
          </div>
          <div className="absolute bottom-[20%] left-[5%] rotate-[-12deg] whitespace-nowrap animate-bounce duration-[3s]">
            <span className="text-[#FF4D2E]/20 text-2xl font-mono uppercase tracking-[0.2em] font-bold">STRENGTH // INNOVATION</span>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-[#0B0D10]/30" />
      </div>

      {/* Bottom Left Text Tile */}
      <div
        ref={bottomLeftRef}
        className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-charcoal flex flex-col justify-center px-8 lg:px-16"
      >
        <h3
          ref={headlineRef}
          className="text-2xl md:text-3xl lg:text-4xl font-black uppercase text-[#F2F2F2] mb-4"
          style={{ opacity: 0 }}
        >
          <span className="word inline-block">Built</span>{' '}
          <span className="word inline-block">By</span>{' '}
          <span className="word inline-block">Real</span>{' '}
          <span className="word inline-block">People.</span>
        </h3>
        <p className="text-sm md:text-base text-[#B8BDC7] max-w-sm leading-relaxed mb-6">
          Strategists, designers, writers, and makers—working as one team.
        </p>
        <button className="font-mono-label text-[#FF4D2E] hover:text-[#ff6b52] transition-colors underline underline-offset-4 text-left">
          See open roles
        </button>
      </div>

      {/* Bottom Right Image Tile (Green Area) */}
      <div
        ref={bottomRightRef}
        className="absolute right-0 bottom-0 w-1/2 h-1/2 overflow-hidden bg-black group"
        style={{ opacity: 0 }}
      >
        <img
          src="/team_collaboration_v3.webp"
          alt="Bhairava Collaboration"
          className="w-full h-full object-cover opacity-70 group-hover:scale-110 transition-all duration-[1s]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-tl from-transparent to-[#0B0D10]/40" />
      </div>

      {/* Center Cross Rules */}
      <div className="absolute left-1/2 top-0 w-px h-full hairline z-10 pointer-events-none" />
      <div className="absolute left-0 top-1/2 w-full h-px hairline z-10 pointer-events-none" />
    </section>
  );
};

export default TeamGrid;
