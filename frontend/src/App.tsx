import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from './sections/HeroSection';
import ManifestoSection from './sections/ManifestoSection';
import ServicesMosaic from './sections/ServicesMosaic';
import WorkCarousel from './sections/WorkCarousel';
import CampaignSpotlight from './sections/CampaignSpotlight';
import ProcessSection from './sections/ProcessSection';
import TeamGrid from './sections/TeamGrid';
import TestimonialSection from './sections/TestimonialSection';
import ContactFooter from './sections/ContactFooter';
import Navigation from './sections/Navigation';
import EngineeringStandards from './sections/EngineeringStandards';
import InnovationLab from './sections/InnovationLab';
import NewsroomSection from './sections/NewsroomSection';
import { VortexSection } from './sections/VortexSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Refresh ScrollTrigger on mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-ink">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Sections */}
      <main className="relative">
        <HeroSection className="z-10" />
        <ManifestoSection className="z-20" />
        <EngineeringStandards />
        <ServicesMosaic className="z-30" />
        <WorkCarousel className="z-40" />
        <VortexSection />
        <InnovationLab />
        <CampaignSpotlight className="z-50" />
        <ProcessSection className="z-60" />
        <NewsroomSection />
        <TeamGrid className="z-70" />
        <TestimonialSection className="z-80" />
        <ContactFooter className="z-90" />
      </main>
    </div>
  );
}

export default App;
