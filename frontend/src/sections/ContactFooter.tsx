import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContactFooterProps {
  className?: string;
}

const ContactFooter = ({ className = '' }: ContactFooterProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState(() => {
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
    return {
      name: '',
      email: '',
      company: '',
      budget: '',
      message: '',
      _honeypot: '',
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || ''
    };
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Left content animation
      gsap.fromTo(leftContentRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 0.4
          }
        }
      );

      // Right image animation
      gsap.fromTo(rightImageRef.current,
        { x: '6vw', scale: 1.03, opacity: 0 },
        {
          x: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 0.4
          }
        }
      );

      // Form fields animation
      if (formRef.current) {
        const fields = formRef.current.querySelectorAll('.form-field');
        gsap.fromTo(fields,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 0.4
            }
          }
        );
      }

    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData._honeypot) return; // Silent fail for bots
    
    // Handle form submission (Push to CRM/API as per doc)
    console.log('Pushing to CRM with UTM Data:', formData);
    alert('Thank you for reaching out! We will get back to you within 48 hours.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative bg-ink ${className}`}
    >
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Content */}
        <div
          ref={leftContentRef}
          className="flex-1 flex flex-col justify-center px-6 lg:px-16 py-16 lg:py-24"
          style={{ opacity: 0 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase text-[#F2F2F2] mb-6">
            Let's Build Your Next Story.
          </h2>
          <p className="text-base md:text-lg text-[#B8BDC7] mb-10 max-w-md">
            Tell us what you're launching. We'll respond within 48 hours.
          </p>

          {/* Contact Info */}
          <div className="flex flex-col gap-4 mb-10">
            <a href="mailto:hello@bhairava.media" className="flex items-center gap-3 text-[#F2F2F2] hover:text-[#FF4D2E] transition-colors">
              <Mail className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-sm">hello@bhairava.media</span>
            </a>
            <a href="tel:+910000000000" className="flex items-center gap-3 text-[#F2F2F2] hover:text-[#FF4D2E] transition-colors">
              <Phone className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-sm">+91 00000 00000</span>
            </a>
            <div className="flex items-center gap-3 text-[#B8BDC7]">
              <MapPin className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-sm">Pune, India — Working worldwide</span>
            </div>
          </div>

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* UTM & Honeypot */}
            <input type="text" name="_honeypot" value={formData._honeypot} onChange={handleChange} className="hidden" tabIndex={-1} autoComplete="off" />
            <input type="hidden" name="utm_source" value={formData.utm_source} />
            <input type="hidden" name="utm_medium" value={formData.utm_medium} />
            <input type="hidden" name="utm_campaign" value={formData.utm_campaign} />
            
            <div className="form-field" style={{ opacity: 0 }}>
              <label className="block font-mono-label text-[#B8BDC7] mb-2">NAME</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-white/20 py-2 text-[#F2F2F2] focus:border-[#FF4D2E] focus:outline-none transition-colors"
              />
            </div>
            <div className="form-field" style={{ opacity: 0 }}>
              <label className="block font-mono-label text-[#B8BDC7] mb-2">EMAIL</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-white/20 py-2 text-[#F2F2F2] focus:border-[#FF4D2E] focus:outline-none transition-colors"
              />
            </div>
            <div className="form-field" style={{ opacity: 0 }}>
              <label className="block font-mono-label text-[#B8BDC7] mb-2">COMPANY</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 py-2 text-[#F2F2F2] focus:border-[#FF4D2E] focus:outline-none transition-colors"
              />
            </div>
            <div className="form-field" style={{ opacity: 0 }}>
              <label className="block font-mono-label text-[#B8BDC7] mb-2">BUDGET RANGE</label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 py-2 text-[#F2F2F2] focus:border-[#FF4D2E] focus:outline-none transition-colors"
              >
                <option value="" className="bg-[#0B0D10]">Select budget range</option>
                <option value="10k-25k" className="bg-[#0B0D10]">$10,000 - $25,000</option>
                <option value="25k-50k" className="bg-[#0B0D10]">$25,000 - $50,000</option>
                <option value="50k-100k" className="bg-[#0B0D10]">$50,000 - $100,000</option>
                <option value="100k+" className="bg-[#0B0D10]">$100,000+</option>
              </select>
            </div>
            <div className="form-field" style={{ opacity: 0 }}>
              <label className="block font-mono-label text-[#B8BDC7] mb-2">MESSAGE</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full bg-transparent border-b border-white/20 py-2 text-[#F2F2F2] focus:border-[#FF4D2E] focus:outline-none transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="form-field bg-[#FF4D2E] hover:bg-[#ff6b52] text-white font-mono-label py-4 px-8 transition-colors"
              style={{ opacity: 0 }}
            >
              SEND MESSAGE
            </button>
          </form>
        </div>

        {/* Right Image */}
        <div
          ref={rightImageRef}
          className="hidden lg:block w-[45%] relative"
          style={{ opacity: 0 }}
        >
          <img
            src="/contact_office.jpg"
            alt="Our office"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D10]/50 to-transparent" />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Bhairava Media" className="h-10 w-auto" />
            <span className="text-[#B8BDC7] text-sm">© 2026 Bhairava Media. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[#B8BDC7] hover:text-[#FF4D2E] transition-colors">
              <Instagram className="w-5 h-5" strokeWidth={1.5} />
            </a>
            <a href="#" className="text-[#B8BDC7] hover:text-[#FF4D2E] transition-colors">
              <Linkedin className="w-5 h-5" strokeWidth={1.5} />
            </a>
            <a href="#" className="text-[#B8BDC7] hover:text-[#FF4D2E] transition-colors">
              <Twitter className="w-5 h-5" strokeWidth={1.5} />
            </a>
            <a href="#" className="text-[#B8BDC7] hover:text-[#FF4D2E] transition-colors">
              <Youtube className="w-5 h-5" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default ContactFooter;
