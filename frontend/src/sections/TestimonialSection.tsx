import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TestimonialSectionProps {
  className?: string;
}

const TestimonialSection = ({ className = '' }: TestimonialSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLHeadingElement>(null);
  const attributionRef = useRef<HTMLParagraphElement>(null);
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
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(bgRef.current,
        { scale: 1.06, opacity: 0.5 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // Quote words entrance
      if (quoteRef.current) {
        const words = quoteRef.current.querySelectorAll('.word');
        scrollTl.fromTo(words,
          { y: 40, opacity: 0, rotateX: 18 },
          { y: 0, opacity: 1, rotateX: 0, stagger: 0.03, ease: 'none' },
          0.08
        );
      }

      scrollTl.fromTo(attributionRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.20
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
        { scale: 1.04, opacity: 0, ease: 'power2.in' },
        0.70
      );

      if (quoteRef.current) {
        const words = quoteRef.current.querySelectorAll('.word');
        scrollTl.fromTo(words,
          { y: 0, opacity: 1 },
          { y: '-14vh', opacity: 0, stagger: 0.02, ease: 'power2.in' },
          0.70
        );
      }

      scrollTl.fromTo(attributionRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
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

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Split quote into words
  const quote = "They turned a tight timeline into a campaign that felt effortless.";
  const words = quote.split(' ').map((word, i) => (
    <span key={i} className="word inline-block mr-[0.3em]">
      {word}
    </span>
  ));

  return (
    <section
      ref={sectionRef}
      id="testimonial"
      className={`section-pinned ${className}`}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.5 }}
      >
        <img
          src="/testimonial_atmosphere.webp"
          alt="Testimonial background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 vignette-overlay" />
      </div>

      {/* Top Center Label */}
      <span
        ref={topLabelRef}
        className="absolute top-[6vh] left-1/2 -translate-x-1/2 font-mono-label text-[#B8BDC7] z-10 gsap-anim"
        style={{ opacity: 0 }}
      >
        CLIENT WORDS
      </span>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6">
        <h2
          ref={quoteRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black uppercase text-center text-[#F2F2F2] max-w-[980px] leading-[1.1]"
          style={{ perspective: '1000px' }}
        >
          {words}
        </h2>
        <p
          ref={attributionRef}
          className="mt-8 text-sm md:text-base text-[#B8BDC7] text-center gsap-anim"
          style={{ opacity: 0 }}
        >
          - Marketing Director, Lifestyle Brand
        </p>
      </div>

      {/* Bottom Left Label */}
      <span
        ref={bottomLeftRef}
        className="absolute bottom-[7vh] left-[6vw] font-mono-label text-[#B8BDC7] z-10 gsap-anim"
        style={{ opacity: 0 }}
      >
        SOURCE: ANNUAL REVIEW
      </span>

      {/* Bottom Right CTA */}
      <button
        ref={bottomRightRef}
        onClick={scrollToContact}
        className="absolute bottom-[7vh] right-[6vw] font-mono-label text-[#FF4D2E] hover:text-[#ff6b52] transition-colors z-10 underline underline-offset-4 gsap-anim"
        style={{ opacity: 0 }}
      >
        START A PROJECT
      </button>
    </section>
  );
};

export default TestimonialSection;
