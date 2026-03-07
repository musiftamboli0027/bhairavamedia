import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const menuItems = [
    { label: 'Work', id: 'work-carousel' },
    { label: 'Solutions', id: 'services-mosaic' },
    { label: 'The Lab', id: 'lab' },
    { label: 'Newsroom', id: 'newsroom' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      {/* Fixed Header */}
      <header 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0 shadow-lg' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="bg-ink/80 backdrop-blur-md border-b border-white/5">
          <div className="flex items-center justify-between px-6 lg:px-12 py-4">
            {/* Logo */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 transition-opacity hover:opacity-80"
            >
              <img src="/logo.png" alt="Bhairava Media" className="h-12 w-auto" />
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="font-mono-label text-[#B8BDC7] hover:text-[#FF4D2E] transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CTA + Menu Button */}
            <div className="flex items-center gap-6">
              <button 
                onClick={() => scrollToSection('contact')}
                className="hidden sm:block font-mono-label text-[#FF4D2E] hover:text-[#ff6b52] transition-colors"
              >
                Start a project
              </button>
              <button
                onClick={() => setIsMenuOpen(true)}
                className="flex items-center gap-2 font-mono-label text-[#F2F2F2] hover:text-[#FF4D2E] transition-colors"
              >
                <Menu className="w-5 h-5" />
                <span className="hidden sm:inline">Menu</span>
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
              <img src="/logo.png" alt="Bhairava Media" className="h-12 w-auto" />
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
              <span className="font-mono-label text-[#B8BDC7]">
                hello@bhairava.media
              </span>
              <span className="font-mono-label text-[#B8BDC7]">
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
