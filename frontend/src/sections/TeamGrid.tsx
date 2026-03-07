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
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.6,
          }
        });

        scrollTl.fromTo(topLeftRef.current, { y: '-60vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.fromTo(topRightRef.current, { x: '60vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.fromTo(bottomRightRef.current, { y: '60vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.fromTo(bottomLeftRef.current, { x: '-60vw', opacity: 1 }, { x: 0, opacity: 1, ease: 'none' }, 0.05);

        if (headlineRef.current) {
          const words = headlineRef.current.querySelectorAll('.word');
          scrollTl.fromTo(words, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, ease: 'none' }, 0.12);
        }

        // Exit
        scrollTl.to(topLeftRef.current, { y: '-18vh', opacity: 0 }, 0.70);
        scrollTl.to(topRightRef.current, { x: '18vw', opacity: 0 }, 0.70);
        scrollTl.to(bottomRightRef.current, { y: '18vh', opacity: 0 }, 0.70);
        scrollTl.to(bottomLeftRef.current, { x: '-18vw', opacity: 0 }, 0.70);
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo([topLeftRef.current, topRightRef.current, bottomLeftRef.current, bottomRightRef.current],
          { y: 30, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            stagger: 0.1,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="team"
      className={`relative min-h-screen lg:section-pinned bg-ink overflow-hidden ${className}`}
    >
      <div className="flex flex-col lg:block h-full w-full">
        {/* Top Left Portrait */}
        <div
          ref={topLeftRef}
          className="relative lg:absolute left-0 top-0 w-full lg:w-1/2 h-[35vh] lg:h-1/2 overflow-hidden"
          style={{ opacity: 0 }}
        >
          <img
            src="/DM 1.webp"
            alt="Team Member"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#0B0D10]/30" />
        </div>

        {/* Top Right Landscape with Diagonal Text (Red Area) */}
        <div
          ref={topRightRef}
          className="relative lg:absolute right-0 top-0 w-full lg:w-1/2 h-[35vh] lg:h-1/2 overflow-hidden bg-black group"
          style={{ opacity: 0 }}
        >
          <img
            src="/three-positive-business-people-talking-office-lobby.webp"
            alt="Team Collaboration"
            className="w-full h-full object-cover opacity-60 transition-opacity duration-700 group-hover:opacity-100"
            loading="lazy"
          />
          
          {/* Unique Diagonal Animated Text */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[20%] left-[-10%] rotate-[-12deg] whitespace-nowrap animate-pulse">
              <span className="text-white/20 text-2xl md:text-4xl font-black uppercase tracking-[0.5em] md:tracking-[1em]">CORE ENGINE SYSTEM</span>
            </div>
            <div className="absolute top-[50%] right-[-10%] rotate-[-12deg] whitespace-nowrap opacity-10">
              <span className="text-white text-4xl md:text-6xl font-black uppercase tracking-[0.2em] md:tracking-[0.5em]">DATA FLOW</span>
            </div>
            <div className="absolute bottom-[20%] left-[5%] rotate-[-12deg] whitespace-nowrap animate-bounce duration-[3s]">
              <span className="text-[#FF4D2E]/20 text-sm md:text-2xl font-mono uppercase tracking-[0.2em] font-bold">STRENGTH // INNOVATION</span>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-[#0B0D10]/30" />
        </div>

        {/* Bottom Left Text Tile */}
        <div
          ref={bottomLeftRef}
          className="relative lg:absolute left-0 bottom-0 w-full lg:w-1/2 h-auto lg:h-1/2 bg-charcoal flex flex-col justify-center px-8 lg:px-16 py-12 lg:py-0 order-last lg:order-none"
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
          className="relative lg:absolute right-0 bottom-0 w-full lg:w-1/2 h-[35vh] lg:h-1/2 overflow-hidden bg-black group"
          style={{ opacity: 0 }}
        >
          <img
            src="/team_collaboration_v3.webp"
            alt="Bhairava Collaboration"
            className="w-full h-full object-cover opacity-70 group-hover:scale-110 transition-all duration-[1s]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-tl from-transparent to-[#0B0D10]/40" />
        </div>
      </div>

      {/* Center Cross Rules (Desktop Only) */}
      <div className="hidden lg:block absolute left-1/2 top-0 w-px h-full hairline z-10 pointer-events-none" />
      <div className="hidden lg:block absolute left-0 top-1/2 w-full h-px hairline z-10 pointer-events-none" />
    </section>
  );
};

export default TeamGrid;
