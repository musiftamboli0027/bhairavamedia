import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const menuItems = [
  { label: 'Services', id: 'services-mosaic' },
  { label: 'Work', id: 'work-carousel' },
  { label: 'The Lab', id: 'lab' },
  { label: 'Newsroom', id: 'newsroom' },
  { label: 'Team', id: 'team' },
  { label: 'Contact', id: 'contact' },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Handle header background visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active section based on Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Trigger when section is in the upper part of viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections mapped in our menu
    menuItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });
    
    // Also observe hero explicitly if needed to clear
    const hero = document.getElementById('hero');
    if (hero) observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setIsMenuOpen(false); // Close mobile menu properly

    setTimeout(() => {
      // Force GSAP to recalculate positions
      ScrollTrigger.refresh();

      const element = document.getElementById(sectionId);
      if (!element) return;

      // More reliable way to find the pinned trigger by checking the trigger element's ID
      const pinnedTrigger = ScrollTrigger.getAll().find((t) => {
        return t.pin && t.trigger && (t.trigger as HTMLElement).id === sectionId;
      });

      // Special handling for pinned sections
      const targetScroll = pinnedTrigger 
        ? pinnedTrigger.start // Scroll precisely to where the pin starts
        : element; // Let GSAP ScrollToPlugin calculate the offset natively

      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: targetScroll,
          offsetY: pinnedTrigger ? 0 : 80 // Only apply offsetY if NOT pinned (sticky nav height) 
        },
        ease: 'power3.inOut',
      });
      
      // Update URL hash for SPA best practices without reloading
      window.history.pushState(null, '', `#${sectionId}`);
    }, 150); // Slightly increased delay to ensure mobile menu removal finishes layout update
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-[100] transition-colors duration-500 ${
          isVisible ? 'bg-ink/95 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            <a 
              href="#hero"
              aria-label="Go to homepage"
              onClick={(e) => scrollToSection(e, 'hero')}
              className="flex items-center gap-2.5 transition-transform hover:scale-105 active:scale-95"
            >
              <img 
                src="/logo.webp" 
                alt="Bhairava Media Logo" 
                className="h-14 md:h-16 w-auto object-contain"
                loading="eager"
              />
              <span className="flex flex-col leading-none">
                <span
                  className="font-black uppercase tracking-wider text-base md:text-lg"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    background: 'linear-gradient(135deg, #C9973A 0%, #F0C060 45%, #C9973A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Bhairava
                </span>
                <span className="font-mono-label text-[10px] md:text-[11px] tracking-[0.22em] text-[#B8BDC7]">
                  MEDIA
                </span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10" aria-label="Main Navigation">
              {menuItems.slice(0, 4).map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                  className={`font-mono-label text-xs md:text-sm tracking-widest transition-colors relative group ${
                    activeSection === item.id ? 'text-[#FF4D2E]' : 'text-[#B8BDC7] hover:text-[#FF4D2E]'
                  }`}
                >
                  {item.label}
                  <span 
                    className={`absolute -bottom-1 left-0 h-px bg-[#FF4D2E] transition-all duration-300 ${
                      activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} 
                  />
                </a>
              ))}
            </nav>

            {/* CTA + Menu Button */}
            <div className="flex items-center gap-4 md:gap-8">
              <a 
                href="#contact"
                onClick={(e) => scrollToSection(e, 'contact')}
                aria-label="Start a project"
                className="hidden sm:inline-flex bg-[#FF4D2E] text-white px-5 py-2.5 font-mono-label text-xs tracking-tighter hover:bg-[#ff6b52] transition-colors rounded-none"
              >
                START A PROJECT
              </a>
              <button
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open Menu"
                aria-expanded={isMenuOpen}
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
        aria-hidden={!isMenuOpen}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between px-6 lg:px-12 py-4 border-b border-white/5">
            <div className="flex items-center gap-2.5">
              <img src="/logo.webp" alt="Bhairava Media Logo" className="h-12 w-auto object-contain" />
              <span className="flex flex-col leading-none">
                <span
                  className="font-black uppercase tracking-wider text-base"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    background: 'linear-gradient(135deg, #C9973A 0%, #F0C060 45%, #C9973A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Bhairava
                </span>
                <span className="font-mono-label text-[10px] tracking-[0.22em] text-[#B8BDC7]">
                  MEDIA
                </span>
              </span>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close Menu"
              className="flex items-center gap-2 font-mono-label text-[#F2F2F2] hover:text-[#FF4D2E] transition-colors"
            >
              <X className="w-5 h-5" />
              <span>Close</span>
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <nav className="flex flex-col items-center gap-6" aria-label="Mobile Navigation">
              {menuItems.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                  className={`text-4xl md:text-6xl lg:text-7xl font-bold uppercase transition-colors ${
                    activeSection === item.id ? 'text-[#FF4D2E]' : 'text-[#F2F2F2] hover:text-[#FF4D2E]'
                  }`}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.4s ease ${index * 0.1}s`
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="px-6 lg:px-12 py-6 border-t border-white/5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <a href="mailto:rajesh.w@bhairavamedia.in" className="font-sans text-[#d5cfca] hover:text-white transition-colors">
                rajesh.w@bhairavamedia.in
              </a>
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
