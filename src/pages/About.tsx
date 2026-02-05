import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navigation from "@/components/festival/Navigation";
import Footer from "@/components/festival/Footer";
import CornerOrnament from "@/components/festival/CornerOrnament";

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const patternY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const lotusY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <main ref={containerRef} className="min-h-screen relative">
      <Navigation />

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div className="absolute inset-0 bg-pattern-cultural opacity-30" style={{ y: patternY }} />
        <motion.div className="absolute inset-0 bg-pattern-lotus opacity-20" style={{ y: lotusY }} />
      </div>

      <section className="pt-32 pb-24 relative">
        <CornerOrnament position="top-left" variant="floral" />
        <CornerOrnament position="top-right" variant="geometric" />

        <div className="container px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-secondary font-medium tracking-wider uppercase text-sm mb-4 block">
              Our Vision
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-4">
              About the Festival
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto space-y-8 text-lg text-muted-foreground leading-relaxed"
          >
            <p>
              The Hindustani Cultural Arts Festival is born from a simple yet profound belief:
              that India's classical and folk arts deserve a dignified national platform where
              artists are honoured, not just featured.
            </p>

            <p>
              We exist to give visibility and recognition to the masters and practitioners
              of our ancient art forms — from the soulful notes of Hindustani classical music
              to the vibrant rhythms of folk dances that tell the stories of our land.
            </p>

            <p>
              This festival is also a bridge — connecting the youth of today with the cultural
              roots that define us. Here, culture is not nostalgia locked in museums or textbooks.
              It is a living, breathing practice. Something to be felt, experienced, and celebrated.
            </p>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 flex items-center justify-center gap-4"
          >
            <span className="h-px w-16 bg-secondary/40" />
            <span className="text-secondary text-2xl">✦</span>
            <span className="h-px w-16 bg-secondary/40" />
          </motion.div>
        </div>

        <CornerOrnament position="bottom-left" variant="paisley" />
        <CornerOrnament position="bottom-right" variant="paisley" />
      </section>

      <Footer />
    </main>
  );
};

export default About;
