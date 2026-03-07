import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServicesMosaicProps {
  className?: string;
}

const ServicesMosaic = ({ className = '' }: ServicesMosaicProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const topLeftRef = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);
  const centerLabelRef = useRef<HTMLSpanElement>(null);

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
      // Top-left image from left
      scrollTl.fromTo(topLeftRef.current,
        { x: '-60vw', opacity: 0, scale: 1.06 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Bottom-right image from right
      scrollTl.fromTo(bottomRightRef.current,
        { x: '60vw', opacity: 0, scale: 1.06 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Top-right text from top
      scrollTl.fromTo(topRightRef.current,
        { y: '-60vh', opacity: 1 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Bottom-left text from bottom
      scrollTl.fromTo(bottomLeftRef.current,
        { y: '60vh', opacity: 1 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Center label
      scrollTl.fromTo(centerLabelRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none' },
        0.15
      );

      // SETTLE (30% - 70%) - Hold position

      // EXIT (70% - 100%)
      scrollTl.fromTo(topLeftRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(bottomRightRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(topRightRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(bottomLeftRef.current,
        { y: 0, opacity: 1 },
        { y: '18vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(centerLabelRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services-mosaic"
      className={`section-pinned ${className}`}
    >
      {/* Top Left Image Tile */}
      <div
        ref={topLeftRef}
        className="absolute left-0 top-0 w-1/2 h-1/2 overflow-hidden"
        style={{ opacity: 0 }}
      >
        <img
          src="/corporate_meeting.jpg"
          alt="Bhairava Strategy"
          className="w-full h-full object-cover grayscale opacity-30 group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#0B0D10]/40" />
      </div>

      {/* Top Right Text Tile */}
      <div
        ref={topRightRef}
        className="absolute right-0 top-0 w-1/2 h-1/2 bg-charcoal flex flex-col justify-center px-8 lg:px-16"
      >
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase text-[#F2F2F2] mb-4">
          Strategy & Scale.
        </h3>
        <p className="text-sm md:text-base text-[#B8BDC7] max-w-sm leading-relaxed">
          Digital Marketing, Performance, and PR—engineered for exponential growth and cultural impact.
        </p>
      </div>

      {/* Bottom Left Text Tile */}
      <div
        ref={bottomLeftRef}
        className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-ink flex flex-col justify-center px-8 lg:px-16"
      >
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase text-[#F2F2F2] mb-4">
          Creative Engine.
        </h3>
        <p className="text-sm md:text-base text-[#B8BDC7] max-w-sm leading-relaxed">
          Web Development and a full Creative Suite—integrating Lottie, Rive, and WebGL for high-end digital experiences.
        </p>
      </div>

      {/* Bottom Right Image Tile */}
      <div
        ref={bottomRightRef}
        className="absolute right-0 bottom-0 w-1/2 h-1/2 overflow-hidden"
        style={{ opacity: 0 }}
      >
        <img
          src="/mosaic_bottom_right.jpg"
          alt="Bhairava Creative"
          className="w-full h-full object-cover grayscale opacity-30 group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-tl from-transparent to-[#0B0D10]/40" />
      </div>

      {/* Center Cross Rules */}
      <div className="absolute left-1/2 top-0 w-px h-full hairline z-10 pointer-events-none" />
      <div className="absolute left-0 top-1/2 w-full h-px hairline z-10 pointer-events-none" />

      {/* Center Label */}
      <span
        ref={centerLabelRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono-label text-[#F2F2F2] bg-[#0B0D10] px-4 py-2 z-20"
        style={{ opacity: 0 }}
      >
        SOLUTIONS
      </span>
    </section>
  );
};

export default ServicesMosaic;
