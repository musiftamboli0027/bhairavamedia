import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  const menuItems = [
    { label: 'Work', id: 'work-carousel' },
    { label: 'Services', id: 'services-mosaic' },
    { label: 'The Lab', id: 'lab' },
    { label: 'Newsroom', id: 'newsroom' },
    { label: 'Team', id: 'team' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      {/* Fixed Header */}
      <header 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          isVisible ? 'bg-ink/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 transition-transform hover:scale-105 active:scale-95"
            >
              <img 
                src="/logo.webp" 
                alt="Bhairava Media" 
                className="h-14 md:h-16 w-auto" 
                loading="eager"
              />
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {menuItems.slice(0, 4).map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="font-mono-label text-xs md:text-sm tracking-widest text-[#B8BDC7] hover:text-[#FF4D2E] transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#FF4D2E] transition-all group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* CTA + Menu Button */}
            <div className="flex items-center gap-4 md:gap-8">
              <button 
                onClick={() => scrollToSection('contact')}
                className="hidden sm:inline-flex bg-[#FF4D2E] text-white px-5 py-2.5 font-mono-label text-xs tracking-tighter hover:bg-[#ff6b52] transition-colors rounded-none"
              >
                START A PROJECT
              </button>
              <button
                onClick={() => setIsMenuOpen(true)}
                className="flex items-center gap-2 group"
              >
                <div className="flex flex-col gap-1.5 items-end">
                  <div className="w-6 h-0.5 bg-white group-hover:bg-[#FF4D2E] transition-colors" />
                  <div className="w-4 h-0.5 bg-white group-hover:bg-[#FF4D2E] transition-colors" />
                </div>
                <span className="hidden md:inline font-mono-label text-xs tracking-widest text-white group-hover:text-[#FF4D2E] transition-colors">MENU</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[200] bg-ink transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Menu Header */}
          <div className="flex items-center justify-between px-6 lg:px-12 py-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <img src="/logo.webp" alt="Bhairava Media" className="h-12 w-auto" />
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 font-mono-label text-[#F2F2F2] hover:text-[#FF4D2E] transition-colors"
            >
              <X className="w-5 h-5" />
              <span>Close</span>
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 flex items-center justify-center">
            <nav className="flex flex-col items-center gap-6">
              {menuItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase text-[#F2F2F2] hover:text-[#FF4D2E] transition-colors"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.4s ease ${index * 0.1}s`
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Menu Footer */}
          <div className="px-6 lg:px-12 py-6 border-t border-white/5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-sans text-[#d5cfca]">
                rajesh.w@bhairavamedia.in
              </span>
              <span className="font-sans text-[#70ee4d]">
                Pune, India — Working worldwide
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
