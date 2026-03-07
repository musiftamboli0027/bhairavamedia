import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const InnovationLab = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for content
      gsap.fromTo(".lab-content",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="lab" 
      className="relative bg-ink py-24 md:py-32 overflow-hidden border-t border-white/5"
    >
      {/* Background Image Overlay */}
      <div className="absolute inset-0 -z-10 opacity-30 img-skeleton pointer-events-none">
        <img 
          src="/core_innovation.webp" 
          alt="Bhairava Innovation" 
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-transparent to-ink" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/50 to-ink" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
        <div className="lab-content max-w-2xl z-10" style={{ opacity: 0 }}>
          <span className="font-mono-label text-[#FF4D2E] mb-4 block">THE LAB</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase text-[#F2F2F2] mb-8 leading-tight">
            The Bhairava<br />Core
          </h2>
          <p className="text-lg text-[#B8BDC7] leading-relaxed mb-8">
            Our Innovation Hub is where heavy creative assets meet light code. This space serves as our technical engine, driving high-performance digital experiences and strategic breakthroughs.
          </p>
          <div className="flex flex-col sm:flex-row gap-8">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#FF4D2E] transition-colors">
                <span className="text-sm font-mono text-[#B8BDC7] group-hover:text-[#FF4D2E]">01</span>
              </div>
              <span className="text-[#F2F2F2] font-bold uppercase tracking-widest text-sm">VFX Showreel</span>
            </div>
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#FF4D2E] transition-colors">
                <span className="text-sm font-mono text-[#B8BDC7] group-hover:text-[#FF4D2E]">02</span>
              </div>
              <span className="text-[#F2F2F2] font-bold uppercase tracking-widest text-sm">Motion Prototypes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnovationLab;
