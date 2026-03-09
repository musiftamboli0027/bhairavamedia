import { useEffect, useRef, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Above the fold - keep static imports to avoid CLS
import HeroSection from './sections/HeroSection';
import Navigation from './sections/Navigation';

// Below the fold - Lazy Load Components
const ManifestoSection = lazy(() => import('./sections/ManifestoSection'));
const ServicesMosaic = lazy(() => import('./sections/ServicesMosaic'));
const WorkCarousel = lazy(() => import('./sections/WorkCarousel'));
const CampaignSpotlight = lazy(() => import('./sections/CampaignSpotlight'));
const ProcessSection = lazy(() => import('./sections/ProcessSection'));
const TeamGrid = lazy(() => import('./sections/TeamGrid'));
const TestimonialSection = lazy(() => import('./sections/TestimonialSection'));
const ContactFooter = lazy(() => import('./sections/ContactFooter'));
const EngineeringStandards = lazy(() => import('./sections/EngineeringStandards'));
const NewsroomSection = lazy(() => import('./sections/NewsroomSection'));

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
        
        {/* Lazy Loaded Sections with Suspense Boundary */}
        <Suspense fallback={<div className="min-h-screen bg-ink flex items-center justify-center text-white">Loading...</div>}>
          <ManifestoSection className="z-20" />
          <EngineeringStandards />
          <ServicesMosaic className="z-30" />
          <WorkCarousel className="z-40" />
          <CampaignSpotlight className="z-50" />
          <ProcessSection className="z-60" />
          <NewsroomSection />
          <TeamGrid className="z-70" />
          <TestimonialSection className="z-80" />
          <ContactFooter className="z-90" />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
