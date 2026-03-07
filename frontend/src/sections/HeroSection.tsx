import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VaporizeTextCycle, { Tag } from '../components/ui/vapour-text-effect';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const topLabelRef = useRef<HTMLSpanElement>(null);
  const bottomLeftRef = useRef<HTMLSpanElement>(null);
  const bottomRightRef = useRef<HTMLSpanElement>(null);

  // Auto-play entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Background entrance with a slight zoom-out reveal
      tl.fromTo(bgRef.current,
        { scale: 1.15, opacity: 0, filter: 'blur(10px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.6 },
        0
      );

      // Subheadline
      tl.fromTo(subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.8
      );

      // CTA
      tl.fromTo(ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        1
      );

      // Micro labels
      tl.fromTo(topLabelRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.5
      );

      tl.fromTo(bottomLeftRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6 },
        0.6
      );

      tl.fromTo(bottomRightRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6 },
        0.6
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=80%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([headlineRef.current, subRef.current, ctaRef.current, topLabelRef.current, bottomLeftRef.current, bottomRightRef.current], {
              opacity: 1, y: 0, x: 0
            });
            gsap.set(bgRef.current, { scale: 1, y: 0 });
          }
        }
      });

      // Headline exit
      scrollTl.fromTo(headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-22vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      // Subheadline exit
      scrollTl.fromTo(subRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      // CTA exit
      scrollTl.fromTo(ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '-15vh', opacity: 0, ease: 'power2.in' },
        0.74
      );

      // Background parallax exit
      scrollTl.fromTo(bgRef.current,
        { scale: 1, y: 0 },
        { scale: 1.06, y: '-6vh', ease: 'none' },
        0.70
      );

      // Micro labels exit
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

      scrollTl.fromTo(topLabelRef.current,
        { y: 0, opacity: 1 },
        { y: -30, opacity: 0, ease: 'power2.in' },
        0.75
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToWork = () => {
    const element = document.getElementById('work-carousel');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`section-pinned ${className}`}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full z-0 img-skeleton"
        style={{ opacity: 0 }}
      >
        <img
          src="/company_presentation.webp"
          alt="Bhairava Media Team"
          className="w-full h-full object-cover grayscale opacity-40"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        {/* Vignette overlay */}
        <div className="absolute inset-0 vignette-overlay" />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70" />
      </div>

      {/* Top Center Label */}
      <span
        ref={topLabelRef}
        className="absolute top-[6vh] left-1/2 -translate-x-1/2 font-mono-label text-[#B8BDC7] z-10"
        style={{ opacity: 0 }}
      >
        Creative Studio / Digital Strategy
      </span>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6">
        <div ref={headlineRef} className="relative group w-full flex justify-center">
            {/* Vapour effect replaces static text */}
            <div className="h-[250px] w-full max-w-[1100px] flex items-center justify-center relative z-10 bg-transparent">
                <VaporizeTextCycle
                    texts={["Stories That Move People", "Digital Edge Engineering", "Creative Strategy Group"]}
                    font={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "clamp(2rem, 6.5vw, 5.5rem)",
                        fontWeight: 900
                    }}
                    color="rgb(242, 242, 242)"
                    spread={7}
                    density={10}
                    animation={{
                        vaporizeDuration: 2.5,
                        fadeInDuration: 1.2,
                        waitDuration: 2
                    }}
                    direction="left-to-right"
                    alignment="center"
                    tag={Tag.H1}
                />
            </div>
          {/* Subtle glow behind text for visibility */}
          <div className="absolute inset-0 -inset-x-20 bg-black/40 blur-[120px] rounded-full opacity-60 group-hover:opacity-80 transition-opacity duration-1000 pointer-events-none" />
        </div>

        <p
          ref={subRef}
          className="mt-6 md:mt-8 text-base md:text-lg text-[#B8BDC7] text-center max-w-xl bg-black/40 backdrop-blur-md px-6 py-3 rounded-lg border border-white/5 drop-shadow-xl"
          style={{ opacity: 0 }}
        >
          Strategy-led creative for brands that want to be remembered.
        </p>

        <div className="relative mt-10 group">
          <button
            ref={ctaRef}
            onClick={scrollToWork}
            className="relative overflow-hidden font-mono-label text-[#FF4D2E] hover:text-white transition-all duration-300 underline underline-offset-4 px-8 py-4 bg-black/60 hover:bg-[#FF4D2E] backdrop-blur-xl rounded-full border border-[#FF4D2E]/30 group-hover:scale-105"
            style={{ opacity: 0 }}
          >
            <span className="relative z-10">View selected work</span>
            {/* Shimmer effect */}
            <div className="absolute inset-0 w-[40%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[200%] group-hover:animate-[shimmer_2s_infinite]" />
          </button>
        </div>
      </div>

      {/* Bottom Left Label */}
      <span
        ref={bottomLeftRef}
        className="absolute bottom-[7vh] left-[6vw] font-mono-label text-[#B8BDC7] z-10"
        style={{ opacity: 0 }}
      >
        BHAIRAVA MEDIA
      </span>

      {/* Bottom Right Label */}
      <span
        ref={bottomRightRef}
        className="absolute bottom-[7vh] right-[6vw] font-mono-label text-[#B8BDC7] z-10"
        style={{ opacity: 0 }}
      >
        SCROLL TO EXPLORE
      </span>
    </section>
  );
};

export default HeroSection;
