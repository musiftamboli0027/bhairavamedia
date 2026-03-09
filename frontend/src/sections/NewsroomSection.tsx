import { Download, Search, Tag, ExternalLink } from 'lucide-react';

const newsItems = [
  {
    date: "Mar 05, 2026",
    tag: "AWARDS",
    title: "Bhairava Media Named Top Digital Strategy Studio in the Region.",
  },
  {
    date: "Feb 20, 2026",
    tag: "INSIGHTS",
    title: "Engineering the Extraordinary: How we achieved 99 Lighthouse scores for our clients.",
  },
  {
    date: "Feb 12, 2026",
    tag: "VFX",
    title: "The making of 'Neon Dreams': A deep dive into our latest motion campaign.",
  }
];

const NewsroomSection = () => {
  return (
    <section id="newsroom" className="bg-ink py-24 md:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">

        {/* Hero Banner */}
        <div className="w-full h-48 md:h-64 overflow-hidden mb-16 border border-white/10 group">
          <img
            src="/digital_innovation_banner.webp"
            alt="Digital Innovation"
            className="w-full h-full object-cover md:object-contain group-hover:scale-105 transition-transform duration-700 bg-black"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-xl">
            <span className="font-mono-label text-[#FF4D2E] mb-4 block">
              PR NEWSROOM
            </span>

            <h2 className="text-4xl md:text-5xl font-black uppercase text-[#F2F2F2] mb-6">
              Press & Industry Insights
            </h2>

            <p className="text-[#B8BDC7] text-lg">
              Explore our latest updates, thought leadership, and the Media Kit for brand assets.
            </p>
          </div>

          <button className="flex items-center gap-3 bg-white/5 hover:bg-[#FF4D2E] text-[#F2F2F2] px-8 py-4 font-mono-label text-sm transition-colors border border-white/10">
            <Download className="w-4 h-4" />
            DOWNLOAD MEDIA KIT
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-12">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
            <Search className="w-5 h-5" />
          </div>

          <input
            type="text"
            placeholder="Search news by tags (e.g. VFX, Strategy)..."
            className="w-full bg-white/5 border border-white/10 py-5 pl-14 pr-6 text-[#F2F2F2] placeholder-white/20 focus:outline-none focus:border-[#FF4D2E]/50 transition-colors"
          />
        </div>

        {/* News List */}
        <div className="divide-y divide-white/5">
          {newsItems.map((item, idx) => (
            <div
              key={idx}
              className="py-8 flex flex-col md:flex-row md:items-center justify-between group cursor-pointer hover:bg-white/[0.02] transition-colors -mx-6 px-6"
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-xs font-mono text-[#B8BDC7] opacity-60">
                    {item.date}
                  </span>

                  <span className="flex items-center gap-1 text-[10px] font-mono tracking-widest text-[#FF4D2E] border border-[#FF4D2E]/30 px-2 py-0.5">
                    <Tag className="w-2.5 h-2.5" />
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-[#F2F2F2] group-hover:text-[#FF4D2E] transition-colors leading-snug max-w-3xl">
                  {item.title}
                </h3>
              </div>

              <div className="mt-6 md:mt-0 md:pl-12">
                <ExternalLink className="w-6 h-6 text-white/20 group-hover:text-[#FF4D2E] group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>

        {/* Archive Section */}
        <div className="mt-20 pt-16 border-t border-white/5">
          <span className="font-mono-label text-[#d9ed7f] mb-8 block text-center opacity-60">
            ARCHIVE HIGHLIGHTS
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

            {[
              { img: "/cultural_trends_2026.webp", title: "Cultural Trends 2026" },
              { img: "/aesthetic_engine_visual.webp", title: "The Aesthetic Engine" },
              { img: "/annual_studio_review_2026.webp", title: "Annual Studio Review" }
            ].map((item, i) => (

              <div
                key={i}
                className="group relative aspect-[16/9] overflow-hidden border border-white/5 cursor-pointer"
              >

                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  loading="lazy"
                  decoding="async"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-6">

                  <h4 className="text-white font-semibold uppercase tracking-wide text-sm transition-transform duration-300 group-hover:-translate-y-1">
                    {item.title}
                  </h4>

                </div>

              </div>

            ))}

          </div>

          <div className="text-center">
            <button className="font-mono-label text-[#B8BDC7] hover:text-[#FF4D2E] transition-colors underline underline-offset-8">
              EXPLORE FULL ARCHIVE →
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default NewsroomSection;