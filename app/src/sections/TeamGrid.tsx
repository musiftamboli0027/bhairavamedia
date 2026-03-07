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
        className="absolute left-0 top-0 w-1/2 h-1/2 overflow-hidden"
        style={{ opacity: 0 }}
      >
        <img
          src="/team_portrait_01.jpg"
          alt="Team member"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#0B0D10]/30" />
      </div>

      {/* Top Right Portrait */}
      <div
        ref={topRightRef}
        className="absolute right-0 top-0 w-1/2 h-1/2 overflow-hidden"
        style={{ opacity: 0 }}
      >
        <img
          src="/team_portrait_02.jpg"
          alt="Team member"
          className="w-full h-full object-cover"
        />
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

      {/* Bottom Right Portrait */}
      <div
        ref={bottomRightRef}
        className="absolute right-0 bottom-0 w-1/2 h-1/2 overflow-hidden"
        style={{ opacity: 0 }}
      >
        <img
          src="/team_portrait_03.jpg"
          alt="Team member"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tl from-transparent to-[#0B0D10]/30" />
      </div>

      {/* Center Cross Rules */}
      <div className="absolute left-1/2 top-0 w-px h-full hairline z-10 pointer-events-none" />
      <div className="absolute left-0 top-1/2 w-full h-px hairline z-10 pointer-events-none" />
    </section>
  );
};

export default TeamGrid;
