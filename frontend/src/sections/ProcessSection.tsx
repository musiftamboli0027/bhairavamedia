import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Palette, Rocket, Zap, Target, Users, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProcessSectionProps {
  className?: string;
}

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'Audience, competition, context, constraints.',
    icon: Search
  },
  {
    number: '02',
    title: 'Design',
    description: 'Concepts, prototypes, copy, visuals.',
    icon: Palette
  },
  {
    number: '03',
    title: 'Deliver',
    description: 'Launch, learn, optimize, scale.',
    icon: Rocket
  }
];

const principles = [
  { title: 'Fast feedback loops', icon: Zap },
  { title: 'Platform-native craft', icon: Target },
  { title: 'Data-informed, taste-led', icon: Users },
  { title: 'Clear ownership', icon: Shield }
];

const ProcessSection = ({ className = '' }: ProcessSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.4
          }
        }
      );

      // Image animation
      gsap.fromTo(imageRef.current,
        { scale: 1.05, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 0.4
          }
        }
      );

      // Cards animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.process-card');
        gsap.fromTo(cards,
          { y: 60, opacity: 0, rotateX: 12 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              end: 'top 50%',
              scrub: 0.4
            }
          }
        );
      }

      // Principles animation
      if (principlesRef.current) {
        const items = principlesRef.current.querySelectorAll('.principle-item');
        gsap.fromTo(items,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: principlesRef.current,
              start: 'top 80%',
              end: 'top 60%',
              scrub: 0.4
            }
          }
        );
      }

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className={`relative bg-ink py-24 md:py-32 ${className}`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20" style={{ opacity: 0 }}>
          <span className="font-mono-label text-[#FF4D2E] mb-4 block">
            OUR PROCESS
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase text-[#F2F2F2] mb-6">
            From Brief to Breakthrough
          </h2>
          <p className="text-base md:text-lg text-[#B8BDC7] max-w-2xl mx-auto">
            A simple, repeatable system that keeps creativity sharp and delivery predictable.
          </p>
        </div>

        {/* Process Image */}
        <div 
          ref={imageRef}
          className="w-full h-64 md:h-96 overflow-hidden mb-16 border border-white/10 group"
          style={{ opacity: 0 }}
        >
          <img 
            src="/core_innovation.webp" 
            alt="Bhairava Breakthrough" 
            className="w-full h-full object-contain p-4 transition-transform duration-1000 group-hover:scale-105"
          />
        </div>

        {/* Steps Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        >
          {steps.map((step) => (
            <div
              key={step.number}
              className="process-card bg-charcoal border border-white/10 p-8 hover:border-[#FF4D2E]/50 transition-colors"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl font-black text-[#FF4D2E]">{step.number}</span>
                <step.icon className="w-6 h-6 text-[#B8BDC7]" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold uppercase text-[#F2F2F2] mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-[#B8BDC7] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Principles */}
        <div ref={principlesRef} className="border-t border-white/10 pt-12">
          <span className="font-mono-label text-[#B8BDC7] mb-8 block text-center">
            OUR PRINCIPLES
          </span>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="principle-item flex items-center gap-3"
                style={{ opacity: 0 }}
              >
                <principle.icon className="w-5 h-5 text-[#FF4D2E] flex-shrink-0" strokeWidth={1.5} />
                <span className="text-sm text-[#F2F2F2]">{principle.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
