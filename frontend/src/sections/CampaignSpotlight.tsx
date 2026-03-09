import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CampaignSpotlightProps {
  className?: string;
}

const CampaignSpotlight = ({ className = '' }: CampaignSpotlightProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const topLabelRef = useRef<HTMLSpanElement>(null);
  const bottomLeftRef = useRef<HTMLSpanElement>(null);
  const bottomRightRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(bgRef.current,
        { scale: 1.08, y: '8vh', opacity: 0.6 },
        { scale: 1, y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(headlineRef.current,
        { y: 50, opacity: 0, rotateX: 25 },
        { y: 0, opacity: 1, rotateX: 0, ease: 'none' },
        0.08
      );

      scrollTl.fromTo(subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      scrollTl.fromTo(topLabelRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      );

      scrollTl.fromTo(bottomLeftRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.15
      );

      scrollTl.fromTo(bottomRightRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // SETTLE (30% - 70%) - Hold position

      // EXIT (70% - 100%)
      scrollTl.fromTo(bgRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.05, opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(subRef.current,
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(topLabelRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(bottomLeftRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(bottomRightRef.current,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.75
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="campaign-spotlight"
      className={`section-pinned ${className}`}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.6 }}
      >
        <img
          src="/annual_studio_review_2026.webp"
          alt="Midnight Drop Campaign"
          className="w-full h-full object-cover brightness-[0.7]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 vignette-overlay" />
      </div>

      {/* Top Center Label */}
      <span
        ref={topLabelRef}
        className="absolute top-[6vh] left-1/2 -translate-x-1/2 font-mono-label text-[#B8BDC7] z-10 gsap-anim"
        style={{ opacity: 0 }}
      >
        FEATURED PROJECT
      </span>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6">
        <h2
          ref={headlineRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase text-center text-[#F2F2F2] gsap-anim"
          style={{ perspective: '1000px', opacity: 0 }}
        >
          Midnight Drop
        </h2>
        <p
          ref={subRef}
          className="mt-6 text-base md:text-lg text-[#B8BDC7] text-center max-w-xl gsap-anim"
          style={{ opacity: 0 }}
        >
          A city-wide launch built for feeds, stories, and real-world buzz.
        </p>
      </div>

      {/* Bottom Left Label */}
      <span
        ref={bottomLeftRef}
        className="absolute bottom-[7vh] left-[6vw] font-mono-label text-[#B8BDC7] z-10 gsap-anim"
        style={{ opacity: 0 }}
      >
        CAMPAIGN 2026
      </span>

      {/* Bottom Right CTA */}
      <button
        ref={bottomRightRef}
        aria-label="View Case Study"
        className="absolute bottom-[7vh] right-[6vw] font-mono-label text-[#FF4D2E] hover:text-[#ff6b52] transition-colors z-10 underline underline-offset-4 gsap-anim"
        style={{ opacity: 0 }}
      >
        VIEW CASE STUDY
      </button>
    </section>
  );
};

export default CampaignSpotlight;
