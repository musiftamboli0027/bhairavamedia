import { Vortex } from "@/components/ui/vortex";

export function VortexSection() {
  return (
    <div className="w-full mx-auto h-screen overflow-hidden bg-black flex items-center justify-center">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={200}
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-white text-4xl md:text-7xl font-bold text-center tracking-tighter">
          BHAIRAVA CORE
        </h2>
        <p className="text-white/70 text-base md:text-xl max-w-xl mt-6 text-center font-light leading-relaxed">
          Experience the high-speed data architecture that powers our media ecosystems. 
          The edge of innovation, built for extreme performance.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-6 mt-10">
          <button className="px-8 py-3 bg-white text-black font-semibold hover:bg-white/90 transition-all rounded-full text-sm uppercase tracking-widest">
            Explore Core
          </button>
          <button className="px-8 py-3 text-white border border-white/20 hover:bg-white/5 transition-all rounded-full text-sm uppercase tracking-widest">
            Our Strategy
          </button>
        </div>
      </Vortex>
    </div>
  );
}
