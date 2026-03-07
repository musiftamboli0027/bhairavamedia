import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Zap, Shield, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const standards = [
  {
    icon: Zap,
    title: "Performance First",
    items: ["LCP < 1.2s Benchmark", "WebP/AVIF Asset Optimization", "Edge Delivery (Vercel/CDN)", "Lazy Loading Core"]
  },
  {
    icon: Cpu,
    title: "Creative Engine",
    items: ["Lottie & Rive UI Motion", "GSAP Scroll Sequencing", "Three.js Interactive Models", "Hardware Accelerated VFX"]
  },
  {
    icon: Shield,
    title: "Security & Standards",
    items: ["SSL/TLS Encryption", "HSTS & CSP Headers", "Honeypot Anti-Spam", "AA Accessibility (WCAG)"]
  },
  {
    icon: Globe,
    title: "Marketing Tech",
    items: ["Dynamic XML Sitemaps", "JSON-LD Schema Markup", "OpenGraph Automation", "UTM Tracking Integration"]
  }
];

const EngineeringStandards = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            end: 'top 65%',
            scrub: 0.5
          }
        }
      );

      // Cards animation
      const cards = containerRef.current?.querySelectorAll('.standard-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              end: 'top 40%',
              scrub: 0.5
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="bg-[#0B0D10] py-24 md:py-32 border-y border-white/5"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div ref={titleRef} className="mb-16">
          <span className="font-mono-label text-[#FF4D2E] mb-4 block">TECHNICAL MANIFESTO</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-[#F2F2F2]">
            Engineering the Extraordinary
          </h2>
          <p className="mt-6 text-[#B8BDC7] max-w-2xl text-lg">
            A marketing agency with a slow site is a brand contradiction. We build with a standard of excellence that leads by example.
          </p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {standards.map((s, idx) => (
            <div key={idx} className="standard-card border border-white/10 p-8 bg-ink/50 backdrop-blur-sm hover:border-[#FF4D2E]/30 transition-colors">
              <s.icon className="w-8 h-8 text-[#FF4D2E] mb-6" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-[#F2F2F2] mb-4 uppercase tracking-tight">{s.title}</h3>
              <ul className="space-y-2">
                {s.items.map((item, i) => (
                  <li key={i} className="text-sm text-[#B8BDC7] flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#FF4D2E] rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngineeringStandards;
