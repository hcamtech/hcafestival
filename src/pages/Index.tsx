import { Suspense, lazy } from "react";
import Navigation from "@/components/festival/Navigation";
import HeroSection from "@/components/festival/HeroSection";

// Lazy load below-the-fold sections
const AboutSection = lazy(() => import("@/components/festival/AboutSection"));
const CelebrationSection = lazy(() => import("@/components/festival/CelebrationSection"));
const InclusivitySection = lazy(() => import("@/components/festival/InclusivitySection"));
const ParticipateSection = lazy(() => import("@/components/festival/ParticipateSection"));
const ClosingSection = lazy(() => import("@/components/festival/ClosingSection"));
const Footer = lazy(() => import("@/components/festival/Footer"));
const SectionDivider = lazy(() => import("@/components/festival/SectionDivider"));
const CornerOrnament = lazy(() => import("@/components/festival/CornerOrnament"));

// Lightweight section loader
const SectionLoader = () => (
  <div className="py-24 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      
      <Suspense fallback={<SectionLoader />}>
        <SectionDivider variant="lotus" />
        
        <div className="relative">
          <CornerOrnament position="top-left" variant="floral" />
          <CornerOrnament position="top-right" variant="floral" />
          <AboutSection />
        </div>
        
        <SectionDivider variant="paisley" />
        
        <div className="relative">
          <CornerOrnament position="top-left" variant="geometric" />
          <CornerOrnament position="top-right" variant="geometric" />
          <CelebrationSection />
          <CornerOrnament position="bottom-left" variant="geometric" />
          <CornerOrnament position="bottom-right" variant="geometric" />
        </div>
        
        <SectionDivider variant="mandala" />
        
        <div className="relative">
          <CornerOrnament position="top-left" variant="paisley" />
          <CornerOrnament position="top-right" variant="paisley" />
          <InclusivitySection />
        </div>
        
        <SectionDivider variant="waves" />
        
        <div className="relative">
          <CornerOrnament position="top-left" variant="floral" />
          <CornerOrnament position="top-right" variant="floral" />
          <ParticipateSection />
          <CornerOrnament position="bottom-left" variant="floral" />
          <CornerOrnament position="bottom-right" variant="floral" />
        </div>
        
        <SectionDivider variant="lotus" />
        
        <div className="relative">
          <CornerOrnament position="top-left" variant="paisley" />
          <CornerOrnament position="top-right" variant="paisley" />
          <ClosingSection />
        </div>
        
        <Footer />
      </Suspense>
    </main>
  );
};

export default Index;
