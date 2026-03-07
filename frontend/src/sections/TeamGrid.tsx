import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TeamGridProps {
  className?: string;
}

const TeamGrid = ({ className = "" }: TeamGridProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  const topLeftRef = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);

  const headlineRef = useRef<HTMLHeadingElement>(null);
  const topRightHeadlineRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=130%",
            pin: true,
            scrub: 0.6
          }
        });

        tl.fromTo(topLeftRef.current, { y: "-60vh", opacity: 0 }, { y: 0, opacity: 1 }, 0);

        tl.fromTo(topRightRef.current, { x: "60vw", opacity: 0 }, { x: 0, opacity: 1 }, 0);

        tl.fromTo(bottomRightRef.current, { y: "60vh", opacity: 0 }, { y: 0, opacity: 1 }, 0);

        tl.fromTo(bottomLeftRef.current, { x: "-60vw", opacity: 0 }, { x: 0, opacity: 1 }, 0.05);

        /* Bottom Left Text Animation */

        if (headlineRef.current) {
          const words = headlineRef.current.querySelectorAll(".word");

          tl.fromTo(
            words,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.08,
              ease: "power2.out"
            },
            0.15
          );
        }

        /* Top Right Text Animation */

        if (topRightHeadlineRef.current) {
          const words = topRightHeadlineRef.current.querySelectorAll(".word");

          tl.fromTo(
            words,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.08,
              ease: "power2.out"
            },
            0.2
          );
        }

        /* Exit animation */

        tl.to(topLeftRef.current, { y: "-18vh", opacity: 0 }, 0.75);
        tl.to(topRightRef.current, { x: "18vw", opacity: 0 }, 0.75);
        tl.to(bottomRightRef.current, { y: "18vh", opacity: 0 }, 0.75);
        tl.to(bottomLeftRef.current, { x: "-18vw", opacity: 0 }, 0.75);
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          [topLeftRef.current, topRightRef.current, bottomLeftRef.current, bottomRightRef.current],
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            scrollTrigger: {
              trigger: section,
              start: "top 80%"
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
      id="team"
      className={`relative min-h-screen bg-ink overflow-hidden ${className}`}
    >
      <div className="flex flex-col lg:block h-full w-full">

        {/* Top Left Image */}

        <div
          ref={topLeftRef}
          className="relative lg:absolute left-0 top-0 w-full lg:w-1/2 h-[35vh] lg:h-1/2"
        >
          <img
            src="/DM 1.webp"
            className="w-full h-full object-cover"
            alt="team"
          />
        </div>

        {/* Top Right Text */}

        <div
          ref={topRightRef}
          className="relative lg:absolute right-0 top-0 w-full lg:w-1/2 h-[35vh] lg:h-1/2 bg-black flex items-center"
        >
          <div className="px-10 lg:px-16">

            <h3
              ref={topRightHeadlineRef}
              className="text-3xl lg:text-4xl font-black uppercase text-white mb-4"
            >
              <span className="word inline-block">Thinkers,</span>{" "}
              <span className="word inline-block">Creators,</span>{" "}
              <span className="word inline-block">Builders—</span>
            </h3>

            <p className="text-[#B8BDC7] max-w-sm">
              Moving brands forward together.
            </p>

          </div>
        </div>

        {/* Bottom Left Text */}

        <div
          ref={bottomLeftRef}
          className="relative lg:absolute left-0 bottom-0 w-full lg:w-1/2 h-auto lg:h-1/2 bg-charcoal flex flex-col justify-center px-10 lg:px-16 py-12"
        >
          <h3
            ref={headlineRef}
            className="text-3xl lg:text-4xl font-black uppercase text-white mb-4"
          >
            <span className="word inline-block">Built</span>{" "}
            <span className="word inline-block">By</span>{" "}
            <span className="word inline-block">Real</span>{" "}
            <span className="word inline-block">People.</span>
          </h3>

          <p className="text-[#B8BDC7] max-w-sm mb-6">
            Strategists, designers, writers, and makers—working as one team.
          </p>

          <button className="text-[#FF4D2E] underline">
            See open roles
          </button>
        </div>

        {/* Bottom Right Image */}

        <div
          ref={bottomRightRef}
          className="relative lg:absolute right-0 bottom-0 w-full lg:w-1/2 h-[35vh] lg:h-1/2"
        >
          <img
            src="/team_collaboration_v3.webp"
            className="w-full h-full object-cover"
            alt="team work"
          />
        </div>
      </div>
    </section>
  );
};

export default TeamGrid;