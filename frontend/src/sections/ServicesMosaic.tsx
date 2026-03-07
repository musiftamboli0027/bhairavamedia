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
      // Only run pin animation on desktop
      const mm = gsap.matchMedia();
      
      mm.add("(min-width: 1024px)", () => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=100%',
            pin: true,
            scrub: 0.6,
          }
        });

        scrollTl.fromTo(topLeftRef.current, { x: '-60vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.fromTo(bottomRightRef.current, { x: '60vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.fromTo(topRightRef.current, { y: '-60vh', opacity: 1 }, { y: 0, opacity: 1, ease: 'none' }, 0.05);
        scrollTl.fromTo(bottomLeftRef.current, { y: '60vh', opacity: 1 }, { y: 0, opacity: 1, ease: 'none' }, 0.05);
        scrollTl.fromTo(centerLabelRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, ease: 'none' }, 0.15);

        // Exit
        scrollTl.to(topLeftRef.current, { x: '-18vw', opacity: 0 }, 0.7);
        scrollTl.to(bottomRightRef.current, { x: '18vw', opacity: 0 }, 0.7);
        scrollTl.to(topRightRef.current, { y: '-18vh', opacity: 0 }, 0.7);
        scrollTl.to(bottomLeftRef.current, { y: '18vh', opacity: 0 }, 0.7);
        scrollTl.to(centerLabelRef.current, { opacity: 0 }, 0.75);
      });

      mm.add("(max-width: 1023px)", () => {
        // Simple fade in for mobile
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
      id="services-mosaic"
      className={`relative min-h-screen lg:section-pinned bg-ink overflow-hidden ${className}`}
    >
      <div className="flex flex-col lg:block h-full w-full">
        {/* Top Left Tile */}
        <div
          ref={topLeftRef}
          className="relative lg:absolute left-0 top-0 w-full lg:w-1/2 h-[30vh] lg:h-1/2 overflow-hidden"
          style={{ opacity: 0 }}
        >
          <img
            src="/team_collaboration_v3.webp"
            alt="Bhairava Strategy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#0B0D10]/40" />
        </div>

        {/* Top Right Tile */}
        <div
          ref={topRightRef}
          className="relative lg:absolute right-0 top-0 w-full lg:w-1/2 h-auto lg:h-1/2 bg-charcoal flex flex-col justify-center px-8 lg:px-16 py-12 lg:py-0"
        >
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase text-[#F2F2F2] mb-4">
            Strategy & Scale.
          </h3>
          <p className="text-sm md:text-base text-[#B8BDC7] max-w-sm leading-relaxed">
            Digital Marketing, Performance, and PR—engineered for exponential growth and cultural impact.
          </p>
        </div>

        {/* Bottom Left Tile */}
        <div
          ref={bottomLeftRef}
          className="relative lg:absolute left-0 bottom-0 w-full lg:w-1/2 h-auto lg:h-1/2 bg-ink flex flex-col justify-center px-8 lg:px-16 py-12 lg:py-0 order-last lg:order-none"
        >
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase text-[#F2F2F2] mb-4">
            Creative Engine.
          </h3>
          <p className="text-sm md:text-base text-[#B8BDC7] max-w-sm leading-relaxed">
            Web Development and a full Creative Suite—integrating Lottie, Rive, and WebGL for high-end digital experiences.
          </p>
        </div>

        {/* Bottom Right Tile */}
        <div
          ref={bottomRightRef}
          className="relative lg:absolute right-0 bottom-0 w-full lg:w-1/2 h-[30vh] lg:h-1/2 overflow-hidden"
          style={{ opacity: 0 }}
        >
          <img
            src="/core_tech_visual.webp"
            alt="Creative Engine"
            className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700 bg-white/[0.02]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-tl from-transparent to-[#0B0D10]/40" />
        </div>
      </div>

      {/* Center Cross Rules (Desktop Only) */}
      <div className="hidden lg:block absolute left-1/2 top-0 w-px h-full hairline z-10 pointer-events-none" />
      <div className="hidden lg:block absolute left-0 top-1/2 w-full h-px hairline z-10 pointer-events-none" />

      {/* Center Label (Desktop Only) */}
      <span
        ref={centerLabelRef}
        className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono-label text-[#F2F2F2] bg-[#0B0D10] px-4 py-2 z-20"
        style={{ opacity: 0 }}
      >
        SOLUTIONS
      </span>
    </section>
  );
};

export default ServicesMosaic;
