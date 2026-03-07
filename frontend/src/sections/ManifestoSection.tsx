import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ManifestoSectionProps {
  className?: string;
}

const ManifestoSection = ({ className = '' }: ManifestoSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const topLabelRef = useRef<HTMLSpanElement>(null);

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
      // Left image panel slides in from left
      scrollTl.fromTo(leftPanelRef.current,
        { x: '-55vw', scale: 1.08, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // Right panel slides in from right
      scrollTl.fromTo(rightPanelRef.current,
        { x: '55vw', opacity: 1 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Headline characters entrance
      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll('.char');
        scrollTl.fromTo(chars,
          { y: 60, opacity: 0, rotateY: 18 },
          { y: 0, opacity: 1, rotateY: 0, stagger: 0.01, ease: 'none' },
        0.08);
      }

      // Body copy entrance
      scrollTl.fromTo(bodyRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      );

      // CTA entrance
      scrollTl.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.18
      );

      // Top label entrance
      scrollTl.fromTo(topLabelRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // SETTLE (30% - 70%) - Elements hold position

      // EXIT (70% - 100%)
      scrollTl.fromTo(leftPanelRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(rightPanelRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll('.char');
        scrollTl.fromTo(chars,
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0, stagger: 0.005, ease: 'power2.in' },
          0.70
        );
      }

      scrollTl.fromTo(bodyRef.current,
        { y: 0, opacity: 1 },
        { y: '6vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(ctaRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(topLabelRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Split headline into characters
  const headline = "BHAIRAVA MEDIA REPRESENTS STRENGTH.";
  const chars = headline.split('').map((char, i) => (
    <span key={i} className="char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
      {char}
    </span>
  ));

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className={`section-pinned ${className}`}
    >
      {/* Left Image Panel */}
      <div
        ref={leftPanelRef}
        className="absolute left-0 top-0 w-1/2 h-full overflow-hidden"
        style={{ opacity: 0 }}
      >
        <img
          src="/about_team.jpg"
          alt="Bhairava Team"
          className="w-full h-full object-cover grayscale opacity-40 group-hover:scale-105 transition-transform duration-[2s] ease-out"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0B0D10]/30" />
      </div>

      {/* Vertical Rule */}
      <div className="absolute left-1/2 top-0 w-px h-full hairline z-10" />

      {/* Right Text Panel */}
      <div
        ref={rightPanelRef}
        className="absolute right-0 top-0 w-1/2 h-full bg-ink flex flex-col justify-center px-[7vw]"
      >
        {/* Top Label */}
        <span
          ref={topLabelRef}
          className="absolute top-[6vh] left-[7vw] font-mono-label text-[#B8BDC7]"
          style={{ opacity: 0 }}
        >
          ABOUT BHAIRAVA
        </span>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase text-[#F2F2F2] max-w-[34vw] leading-[1.0]"
          style={{ perspective: '1000px', opacity: 0 }}
        >
          {chars}
        </h2>

        {/* Body Copy */}
        <p
          ref={bodyRef}
          className="mt-8 text-base md:text-lg text-[#B8BDC7] max-w-[34vw] leading-relaxed"
          style={{ opacity: 0 }}
        >
          A marketing agency with a slow site is a brand contradiction. From insight to execution, we craft campaigns that feel inevitable. The code should be as clean as the vision is bold.
        </p>

        {/* CTA Row */}
        <div
          ref={ctaRef}
          className="mt-10 flex items-center gap-6"
          style={{ opacity: 0 }}
        >
          <button
            onClick={() => scrollToSection('team')}
            className="font-mono-label text-[#F2F2F2] hover:text-[#FF4D2E] transition-colors underline underline-offset-4"
          >
            Meet the team
          </button>
          <button
            onClick={() => scrollToSection('services-mosaic')}
            className="font-mono-label text-[#FF4D2E] hover:text-[#ff6b52] transition-colors"
          >
            Explore services →
          </button>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
