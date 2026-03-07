import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WorkCarouselProps {
  className?: string;
}

const projects = [
  {
    id: 1,
    title: 'Neon Launch',
    category: 'Brand + Performance',
    tags: ['Campaign Strategy', 'Paid Social', 'Creative Production'],
    description: 'A product drop built around nightlife culture—designed to sell out in 48 hours.',
    image: '/strategic_planning.jpg'
  },
  {
    id: 2,
    title: 'City Rebrand',
    category: 'Identity + Web',
    tags: ['Visual Identity', 'Web Design', 'Copy'],
    description: 'Turning a local service into a category leader with bold typography and clear story.',
    image: '/corporate_meeting.jpg'
  },
  {
    id: 3,
    title: 'Editorial Series',
    category: 'Content + Social',
    tags: ['Content Strategy', 'Video', 'Community'],
    description: 'A month-long narrative that turned viewers into advocates.',
    image: '/team_collaboration.jpg'
  }
];

const WorkCarousel = ({ className = '' }: WorkCarouselProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=110%',
          pin: true,
          scrub: 0.7,
          onUpdate: (self) => {
            // Update active index based on scroll progress
            const progress = self.progress;
            if (progress < 0.4) setActiveIndex(0);
            else if (progress < 0.7) setActiveIndex(1);
            else setActiveIndex(2);
          }
        }
      });

      // ENTRANCE (0% - 30%): Track slides in from right
      scrollTl.fromTo(track,
        { x: '100vw' },
        { x: 0, ease: 'none' },
        0
      );

      // Left panel entrance
      scrollTl.fromTo(leftPanelRef.current,
        { x: '-20vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // SETTLE (30% - 70%): Hold at first slide

      // EXIT (70% - 100%): Track moves left showing other slides
      scrollTl.fromTo(track,
        { x: 0 },
        { x: '-120vw', ease: 'none' },
        0.70
      );

      // Left panel exit
      scrollTl.fromTo(leftPanelRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.80
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work-carousel"
      className={`section-pinned ${className}`}
    >
      {/* Left Info Panel */}
      <div
        ref={leftPanelRef}
        className="absolute left-0 top-0 w-[38vw] h-full bg-ink z-10 flex flex-col justify-center px-[6vw]"
        style={{ opacity: 0 }}
      >
        {/* Section Label */}
        <span className="absolute top-[8vh] left-[6vw] font-mono-label text-[#B8BDC7]">
          SELECTED WORK
        </span>

        {/* Project Info */}
        <div className="relative">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`transition-all duration-500 ${
                activeIndex === index 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4 absolute top-0 left-0'
              }`}
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase text-[#F2F2F2] mb-2">
                {project.title}
              </h3>
              <p className="font-mono-label text-[#FF4D2E] mb-4">
                {project.category}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 border border-white/20 text-[#B8BDC7]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm md:text-base text-[#B8BDC7] leading-relaxed max-w-[26vw]">
                {project.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className="mt-10 font-mono-label text-[#FF4D2E] hover:text-[#ff6b52] transition-colors underline underline-offset-4">
          Read the case study
        </button>

        {/* Counter */}
        <div className="absolute bottom-[8vh] left-[6vw] font-mono-label text-[#B8BDC7]">
          0{activeIndex + 1} / 0{projects.length}
        </div>
      </div>

      {/* Right Image Stage */}
      <div className="absolute right-0 top-0 w-[62vw] h-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex h-full"
          style={{ width: `${projects.length * 62}vw` }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative w-[62vw] h-full flex-shrink-0"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D10]/60 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkCarousel;
