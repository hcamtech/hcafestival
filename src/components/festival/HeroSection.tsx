import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useMemo, memo } from "react";
import { Button } from "@/components/ui/button";
import festivalLogo from "@/assets/festival-logo.png";

const HeroSection = () => {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Memoize transform values to prevent recalculation
  const transforms = useMemo(() => ({
    logoY: [0, prefersReducedMotion ? 0 : 150],
    bgLogoScale: [1, prefersReducedMotion ? 1 : 1.2],
    bgLogoOpacity: [0.06, 0],
    patternY: [0, prefersReducedMotion ? 0 : 150],
    lotusY: [-30, prefersReducedMotion ? -30 : 80],
    paisleyY: [20, prefersReducedMotion ? 20 : -50],
    decorSmall: [0, prefersReducedMotion ? 0 : 80],
    decorLarge: [0, prefersReducedMotion ? 0 : -60],
    decorCircle: [0, prefersReducedMotion ? 0 : 100],
    decorDot: [0, prefersReducedMotion ? 0 : 70],
    lineTop: [0, prefersReducedMotion ? 0 : 60],
    lineBottom: [0, prefersReducedMotion ? 0 : -40],
  }), [prefersReducedMotion]);

  const logoY = useTransform(scrollYProgress, [0, 1], transforms.logoY);
  const bgLogoScale = useTransform(scrollYProgress, [0, 1], transforms.bgLogoScale);
  const bgLogoOpacity = useTransform(scrollYProgress, [0, 0.5], transforms.bgLogoOpacity);
  const patternY = useTransform(scrollYProgress, [0, 1], transforms.patternY);
  const lotusY = useTransform(scrollYProgress, [0, 1], transforms.lotusY);
  const paisleyY = useTransform(scrollYProgress, [0, 1], transforms.paisleyY);
  const decorSmallY = useTransform(scrollYProgress, [0, 1], transforms.decorSmall);
  const decorLargeY = useTransform(scrollYProgress, [0, 1], transforms.decorLarge);
  const decorCircleY = useTransform(scrollYProgress, [0, 1], transforms.decorCircle);
  const decorDotY = useTransform(scrollYProgress, [0, 1], transforms.decorDot);
  const lineTopY = useTransform(scrollYProgress, [0, 1], transforms.lineTop);
  const lineBottomY = useTransform(scrollYProgress, [0, 1], transforms.lineBottom);
  const decorCircleRotate = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 45]);

  // Animation variants for reduced motion support
  const fadeInUp = {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero pt-16 md:pt-20"
    >
      {/* Layered parallax cultural patterns - use will-change for GPU acceleration */}
      <motion.div
        className="absolute inset-0 bg-pattern-cultural opacity-70 will-change-transform"
        style={{ y: patternY }}
      />
      <motion.div
        className="absolute inset-0 bg-pattern-lotus opacity-40 will-change-transform"
        style={{ y: lotusY }}
      />
      <motion.div
        className="absolute inset-0 bg-pattern-paisley opacity-30 will-change-transform"
        style={{ y: paisleyY }}
      />

      {/* Parallax decorative elements - hidden on mobile for cleaner layout */}
      <motion.div
        className="absolute top-20 left-4 md:left-10 w-20 md:w-32 h-20 md:h-32 rounded-full bg-secondary/5 blur-2xl will-change-transform"
        style={{ y: decorSmallY }}
      />
      <motion.div
        className="absolute bottom-40 right-4 md:right-20 w-32 md:w-48 h-32 md:h-48 rounded-full bg-primary/5 blur-3xl will-change-transform"
        style={{ y: decorLargeY }}
      />
      <motion.div
        className="hidden md:block absolute top-1/3 right-[10%] w-24 h-24 rounded-full border border-secondary/15 will-change-transform"
        style={{ y: decorCircleY, rotate: decorCircleRotate }}
      />
      <motion.div
        className="hidden sm:block absolute bottom-1/4 left-[8%] w-3 h-3 rounded-full bg-secondary/40 will-change-transform"
        style={{ y: decorDotY }}
      />

      {/* Decorative gradient lines */}
      <motion.div
        className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/15 to-transparent will-change-transform"
        style={{ y: lineTopY }}
      />
      <motion.div
        className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent will-change-transform"
        style={{ y: lineBottomY }}
      />

      {/* Background logo with parallax */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
        style={{ scale: bgLogoScale, opacity: bgLogoOpacity }}
      >
        <img
          src={festivalLogo}
          alt=""
          aria-hidden="true"
          className="w-[80vw] max-w-4xl"
          loading="eager"
        />
      </motion.div>

      <div className="container relative z-10 py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main logo with parallax */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6 sm:mb-8"
            style={{ y: logoY }}
          >
            <img
              src={festivalLogo}
              alt="Hindustani Cultural Arts Festival"
              className="w-[80%] sm:w-full max-w-xs sm:max-w-md mx-auto"
              loading="eager"
              fetchPriority="high"
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-heading italic mb-6 sm:mb-8 px-2"
          >
            Where India's traditions come alive
          </motion.p>

          {/* Description */}
          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2"
          >
            A national platform celebrating India's classical & folk arts,
            combined with a vibrant cultural bazaar and festival experience.
            Where art meets celebration, and tradition meets joy.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center relative z-20 px-4"
          >
            <Button variant="hero" size="xl" className="w-full sm:w-auto" asChild>
              <a href="#about">Explore the Festival</a>
            </Button>
            <Button variant="hero-outline" size="xl" className="w-full sm:w-auto" asChild>
              <a href="#participate">Participate as an Artist</a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - skip animation if reduced motion */}
      {!prefersReducedMotion && (
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
      )}
    </section>
  );
};

export default memo(HeroSection);
