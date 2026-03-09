import { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface WorkCarouselProps {
  className?: string;
}

const projects = [
  {
    id: 1,
    title: "Neon Launch",
    category: "Brand + Performance",
    tags: ["Campaign Strategy", "Paid Social", "Creative Production"],
    description:
      "A product drop built around nightlife culture-designed to sell out in 48 hours.",
    image: "/technical_innovation.webp",
  },
  {
    id: 2,
    title: "City Rebrand",
    category: "Identity + Web",
    tags: ["Visual Identity", "Web Design", "Copy"],
    description:
      "Turning a local service into a category leader with bold typography and a clear story.",
    image: "/branding_project_vibe.webp",
  },
  {
    id: 3,
    title: "Editorial Series",
    category: "Content + Social",
    tags: ["Content Strategy", "Video", "Community"],
    description: "A month-long narrative that turned viewers into advocates.",
    image: "/editorial_video_vibe.webp",
  },
];

const WorkCarousel = ({ className = "" }: WorkCarouselProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=110%",
            pin: true,
            scrub: 0.7,
            onUpdate: (self) => {
              const progress = self.progress;

              if (progress < 0.4) setActiveIndex(0);
              else if (progress < 0.7) setActiveIndex(1);
              else setActiveIndex(2);
            },
          },
        });

        if (trackRef.current) {
          tl.fromTo(trackRef.current, { x: "100vw" }, { x: 0 }, 0);

          tl.to(trackRef.current, { x: "-120vw" }, 0.7);
        }

        if (leftPanelRef.current) {
          tl.fromTo(
            leftPanelRef.current,
            { x: "-20vw", opacity: 0 },
            { x: 0, opacity: 1 },
            0.1
          );

          tl.to(
            leftPanelRef.current,
            { x: "-10vw", opacity: 0 },
            0.8
          );
        }
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work-carousel"
      className={`relative bg-[#0B0D10] py-20 lg:py-0 ${className}`}
    >
      {/* MOBILE VERSION */}
      <div className="lg:hidden max-w-6xl mx-auto px-6 space-y-14">

        <span className="font-mono-label text-[#B8BDC7] block">
          SELECTED WORK
        </span>

        {projects.map((project) => (
          <div key={project.id} className="space-y-5">

            <img
              src={project.image}
              alt={project.title}
              className="w-full h-[240px] object-cover rounded-md"
            />

            <h3 className="text-2xl font-black uppercase text-[#F2F2F2]">
              {project.title}
            </h3>

            <p className="font-mono-label text-[#FF4D2E]">
              {project.category}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 border border-white/20 text-[#B8BDC7]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-[#B8BDC7] text-sm leading-relaxed">
              {project.description}
            </p>
          </div>
        ))}
      </div>

      {/* DESKTOP VERSION */}
      <div className="hidden lg:block section-pinned">

        {/* LEFT PANEL */}
        <div
          ref={leftPanelRef}
          className="absolute left-0 top-0 w-[38vw] h-full bg-[#0B0D10] z-10 flex flex-col justify-center px-[6vw]"
          style={{ opacity: 0 }}
        >
          <span className="absolute top-[8vh] left-[6vw] font-mono-label text-[#B8BDC7]">
            SELECTED WORK
          </span>

          <div className="relative">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`transition-all duration-500 ${
                  activeIndex === index
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 absolute top-0 left-0"
                }`}
              >
                <h3 className="text-4xl font-black uppercase text-[#F2F2F2] mb-2">
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

                <p className="text-[#B8BDC7] leading-relaxed max-w-[26vw]">
                  {project.description}
                </p>
              </div>
            ))}
          </div>

          <button className="mt-10 font-mono-label text-[#FF4D2E] underline">
            Read the case study
          </button>

          <div className="absolute bottom-[8vh] left-[6vw] font-mono-label text-[#B8BDC7]">
            0{activeIndex + 1} / 0{projects.length}
          </div>
        </div>

        {/* RIGHT IMAGE TRACK */}
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
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D10]/60 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkCarousel;