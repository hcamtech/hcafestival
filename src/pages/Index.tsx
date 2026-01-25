import HeroSection from "@/components/festival/HeroSection";
import AboutSection from "@/components/festival/AboutSection";
import CelebrationSection from "@/components/festival/CelebrationSection";
import InclusivitySection from "@/components/festival/InclusivitySection";
import ParticipateSection from "@/components/festival/ParticipateSection";
import ClosingSection from "@/components/festival/ClosingSection";
import Footer from "@/components/festival/Footer";
import SectionDivider from "@/components/festival/SectionDivider";
import CornerOrnament from "@/components/festival/CornerOrnament";
import Navigation from "@/components/festival/Navigation";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      
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
    </main>
  );
};

export default Index;
