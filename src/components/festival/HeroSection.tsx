import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import festivalLogo from "@/assets/festival-logo.png";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const logoY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const bgLogoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const bgLogoOpacity = useTransform(scrollYProgress, [0, 0.5], [0.06, 0]);

  const patternY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const lotusY = useTransform(scrollYProgress, [0, 1], [-30, 80]);
  const paisleyY = useTransform(scrollYProgress, [0, 1], [20, -50]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero pt-16 md:pt-20"
    >
      {/* Layered parallax cultural patterns */}
      <motion.div
        className="absolute inset-0 bg-pattern-cultural opacity-70"
        style={{ y: patternY }}
      />
      <motion.div
        className="absolute inset-0 bg-pattern-lotus opacity-40"
        style={{ y: lotusY }}
      />
      <motion.div
        className="absolute inset-0 bg-pattern-paisley opacity-30"
        style={{ y: paisleyY }}
      />

      {/* Parallax decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-secondary/5 blur-2xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 80]) }}
      />
      <motion.div
        className="absolute bottom-40 right-20 w-48 h-48 rounded-full bg-primary/5 blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -60]) }}
      />
      <motion.div
        className="absolute top-1/3 right-[10%] w-24 h-24 rounded-full border border-secondary/15"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]), rotate: useTransform(scrollYProgress, [0, 1], [0, 45]) }}
      />
      <motion.div
        className="absolute bottom-1/4 left-[8%] w-3 h-3 rounded-full bg-secondary/40"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 70]) }}
      />

      {/* Decorative gradient lines */}
      <motion.div
        className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/15 to-transparent"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 60]) }}
      />
      <motion.div
        className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -40]) }}
      />

      {/* Background logo with parallax */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ scale: bgLogoScale, opacity: bgLogoOpacity }}
      >
        <img
          src={festivalLogo}
          alt=""
          aria-hidden="true"
          className="w-[80vw] max-w-4xl"
        />
      </motion.div>

      <div className="container relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main logo with parallax */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
            style={{ y: logoY }}
          >
            <img
              src={festivalLogo}
              alt="Hindustani Cultural Arts Festival"
              className="w-full max-w-md mx-auto"
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground font-heading italic mb-8"
          >
            Where India's traditions come alive
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            A national platform celebrating India's classical & folk arts,
            combined with a vibrant cultural bazaar and festival experience.
            Where art meets celebration, and tradition meets joy.
          </motion.p>

          {/* CTA Buttons - No parallax transform to keep them interactive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center relative z-20"
          >
            <Button variant="hero" size="xl" asChild>
              <a href="#about">Explore the Festival</a>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <a href="#participate">Participate as an Artist</a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-primary/50 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
