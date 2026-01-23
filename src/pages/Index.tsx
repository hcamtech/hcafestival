import HeroSection from "@/components/festival/HeroSection";
import AboutSection from "@/components/festival/AboutSection";
import CelebrationSection from "@/components/festival/CelebrationSection";
import InclusivitySection from "@/components/festival/InclusivitySection";
import ParticipateSection from "@/components/festival/ParticipateSection";
import ClosingSection from "@/components/festival/ClosingSection";
import Footer from "@/components/festival/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <CelebrationSection />
      <InclusivitySection />
      <ParticipateSection />
      <ClosingSection />
      <Footer />
    </main>
  );
};

export default Index;
