import { useRef, useLayoutEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'
import { Vortex } from '../components/ui/vortex'

gsap.registerPlugin(ScrollTrigger)

interface ContactFooterProps {
  className?: string
}

const ContactFooter = ({ className = '' }: ContactFooterProps) => {
  const sectionRef = useRef<HTMLElement>(null)
  const leftContentRef = useRef<HTMLDivElement>(null)
  const rightImageRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const [formData, setFormData] = useState(() => {
    const params =
      typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams()

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
    }
  })

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftContentRef.current,
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
      )

      gsap.fromTo(
        rightImageRef.current,
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
      )

      if (formRef.current) {
        const fields = formRef.current.querySelectorAll('.form-field')

        gsap.fromTo(
          fields,
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
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData._honeypot) return

    console.log('Form Data:', formData)

    alert('Thank you for reaching out! We will get back within 48 hours.')
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section ref={sectionRef} id="contact" className={`relative bg-ink ${className}`}>
      <div className="min-h-screen flex flex-col lg:flex-row">

        {/* LEFT SIDE */}
        <div
          ref={leftContentRef}
          className="flex-1 flex flex-col justify-center px-6 lg:px-16 py-16 lg:py-24"
          style={{ opacity: 0 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase text-[#F2F2F2] mb-6">
            Let's Build Your Next Story.
          </h2>

          <p className="text-base md:text-lg text-[#B8BDC7] mb-10 max-w-md">
            Have something existing to launch? 
            Tell us about it. we'll get back to within 48 hours.
          </p>

          {/* CONTACT INFO */}

          <div className="flex flex-col gap-4 mb-10">

            <a
              href="mailto:Rajesh.W@Bhairavamedia.in"
              className="flex items-center gap-3 text-[#F2F2F2] hover:text-[#FF4D2E] transition-colors"
            >
              <Mail className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-sm">Rajesh.W@Bhairavamedia.in</span>
            </a>

            <a
              href="tel:+919359095541"
              className="flex items-center gap-3 text-[#F2F2F2] hover:text-[#FF4D2E] transition-colors"
            >
              <Phone className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-sm">+91 9359095541</span>
            </a>

            <div className="flex items-center gap-3 text-[#B8BDC7]">
              <MapPin className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-sm">Pune, India - Serving Clients Worldwide</span>
            </div>

          </div>

          {/* FORM */}

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">

            <input type="text" name="_honeypot" value={formData._honeypot} onChange={handleChange} className="hidden" />

            <input type="hidden" name="utm_source" value={formData.utm_source} />
            <input type="hidden" name="utm_medium" value={formData.utm_medium} />
            <input type="hidden" name="utm_campaign" value={formData.utm_campaign} />

            {/* NAME */}

            <div className="form-field">

              <label className="block font-mono-label text-[#B8BDC7] mb-2">
                NAME
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-white/20 py-3 text-[#F2F2F2] focus:border-[#FF4D2E] focus:outline-none"
              />

            </div>

            {/* EMAIL */}

            <div className="form-field">

              <label className="block font-mono-label text-[#B8BDC7] mb-2">
                EMAIL
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-white/20 py-3 text-[#F2F2F2] focus:border-[#FF4D2E] focus:outline-none"
              />

            </div>

            {/* COMPANY */}

            <div className="form-field">

              <label className="block font-mono-label text-[#B8BDC7] mb-2">
                COMPANY
              </label>

              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 py-3 text-[#F2F2F2] focus:border-[#FF4D2E] focus:outline-none"
              />

            </div>

            {/* BUDGET */}

            <div className="form-field">

              <label className="block font-mono-label text-[#B8BDC7] mb-2">
                BUDGET RANGE
              </label>

              <div className="relative">
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-b border-white/20 py-3 pr-8 focus:border-[#FF4D2E] focus:outline-none appearance-none cursor-pointer ${
                    formData.budget === '' ? 'text-[#F2F2F2]/40' : 'text-[#F2F2F2]'
                  }`}
                >

                  <option value="" disabled hidden>
                    Select budget range
                  </option>

                  <option value="10k-25k" className="bg-[#111] text-[#F2F2F2]">$10,000 - $25,000</option>
                  <option value="25k-50k" className="bg-[#111] text-[#F2F2F2]">$25,000 - $50,000</option>
                  <option value="50k-100k" className="bg-[#111] text-[#F2F2F2]">$50,000 - $100,000</option>
                  <option value="100k+" className="bg-[#111] text-[#F2F2F2]">$100,000+</option>

                </select>

                {/* Custom chevron arrow */}
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#B8BDC7]">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>

            </div>

            {/* MESSAGE */}

            <div className="form-field">

              <label className="block font-mono-label text-[#B8BDC7] mb-2">
                MESSAGE
              </label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full bg-transparent border-b border-white/20 py-3 text-[#F2F2F2] focus:border-[#FF4D2E] focus:outline-none resize-none"
              />

            </div>

            <button
              type="submit"
              className="form-field bg-[#FF4D2E] hover:bg-[#ff6b52] text-white font-mono-label py-4 px-8 transition-colors"
            >
              SEND MESSAGE
            </button>

          </form>

        </div>

        {/* RIGHT SIDE */}

        <div
          ref={rightImageRef}
          className="hidden lg:block w-[45%] relative overflow-hidden bg-black"
          style={{ opacity: 0 }}
        >

          <Vortex
            backgroundColor="black"
            rangeY={800}
            particleCount={300}
            baseHue={200}
            className="flex items-center flex-col justify-center w-full h-full"
          >

            <h2 className="text-white text-3xl md:text-5xl font-black uppercase text-center mb-4">
              BHAIRAVA CORE
            </h2>

            <p className="text-white/70 text-xs md:text-sm max-w-xs text-center">
              Powering the next generation of creative assets through high-speed data architecture.
            </p>

          </Vortex>

        </div>

      </div>

      {/* FOOTER */}

      <footer className="border-t border-white/10 py-8 px-6 lg:px-16">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-4">

            <img src="/logo.webp" alt="Bhairava Media" className="h-10" />

            <span className="text-[#B8BDC7] text-sm">
              © 2026 Bhairava Media. All rights reserved.
            </span>

          </div>

          <div className="flex gap-4">

            <Instagram className="w-5 h-5 text-[#B8BDC7] hover:text-[#FF4D2E]" />
            <Linkedin className="w-5 h-5 text-[#B8BDC7] hover:text-[#FF4D2E]" />
            <Twitter className="w-5 h-5 text-[#B8BDC7] hover:text-[#FF4D2E]" />
            <Youtube className="w-5 h-5 text-[#B8BDC7] hover:text-[#FF4D2E]" />

          </div>

        </div>

      </footer>

    </section>
  )
}

export default ContactFooter