import { motion, useScroll, useTransform, useInView, useReducedMotion } from "framer-motion";
import { useRef, forwardRef, useMemo } from "react";
import festivalLogo from "@/assets/festival-logo.png";

const ClosingSection = forwardRef<HTMLElement, object>((_props, _ref) => {
  const internalRef = useRef(null);
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(internalRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const transforms = useMemo(() => ({
    pattern: [-30, prefersReducedMotion ? -30 : 30],
    cultural: [-20, prefersReducedMotion ? -20 : 40],
    paisley: [15, prefersReducedMotion ? 15 : -25],
    blobLeft: [-40, prefersReducedMotion ? -40 : 40],
    blobRight: [40, prefersReducedMotion ? 40 : -40],
    circle: [0, prefersReducedMotion ? 0 : 60],
    blur: [-15, prefersReducedMotion ? -15 : 35],
    dotTop: [-15, prefersReducedMotion ? -15 : 25],
    dotBottom: [20, prefersReducedMotion ? 20 : -30],
    lineTop: [-20, prefersReducedMotion ? -20 : 30],
    lineBottom: [15, prefersReducedMotion ? 15 : -25],
  }), [prefersReducedMotion]);

  const patternY = useTransform(scrollYProgress, [0, 1], transforms.pattern);
  const culturalY = useTransform(scrollYProgress, [0, 1], transforms.cultural);
  const paisleyY = useTransform(scrollYProgress, [0, 1], transforms.paisley);
  const logoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, prefersReducedMotion ? 1 : 1.05]);

  return (
    <section
      id="closing"
      ref={containerRef}
      className="py-24 md:py-32 bg-primary/5 relative overflow-hidden"
    >
      {/* Layered parallax patterns */}
      <motion.div
        className="absolute inset-0 bg-pattern-lotus opacity-50 will-change-transform"
        style={{ y: patternY }}
      />
      <motion.div
        className="absolute inset-0 bg-pattern-cultural opacity-35 will-change-transform"
        style={{ y: culturalY }}
      />
      <motion.div
        className="absolute inset-0 bg-pattern-paisley opacity-25 will-change-transform"
        style={{ y: paisleyY }}
      />

      {/* Decorative floating elements with parallax */}
      <motion.div
        className="absolute top-1/2 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl will-change-transform"
        style={{
          y: useTransform(scrollYProgress, [0, 1], transforms.blobLeft),
          x: useTransform(scrollYProgress, [0, 1], [-20, prefersReducedMotion ? -20 : 20]),
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl will-change-transform"
        style={{
          y: useTransform(scrollYProgress, [0, 1], transforms.blobRight),
          x: useTransform(scrollYProgress, [0, 1], [20, prefersReducedMotion ? 20 : -20]),
        }}
      />

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 right-[10%] w-24 h-24 rounded-full border border-secondary/15 will-change-transform"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], transforms.circle), 
          rotate: useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 35]) 
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-[8%] w-16 h-16 rounded-full bg-primary/5 blur-lg will-change-transform"
        style={{ y: useTransform(scrollYProgress, [0, 1], transforms.blur) }}
      />

      {/* Subtle floating dots */}
      <motion.div
        className="absolute top-1/4 right-1/3 w-2 h-2 rounded-full bg-secondary/40 will-change-transform"
        style={{ y: useTransform(scrollYProgress, [0, 1], transforms.dotTop) }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-3 h-3 rounded-full bg-primary/30 will-change-transform"
        style={{ y: useTransform(scrollYProgress, [0, 1], transforms.dotBottom) }}
      />

      {/* Decorative gradient lines */}
      <motion.div
        className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/15 to-transparent will-change-transform"
        style={{ y: useTransform(scrollYProgress, [0, 1], transforms.lineTop) }}
      />
      <motion.div
        className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent will-change-transform"
        style={{ y: useTransform(scrollYProgress, [0, 1], transforms.lineBottom) }}
      />

      <div className="container px-4 relative">
        <div ref={internalRef} className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-12"
            style={{ scale: logoScale }}
          >
            <img
              src={festivalLogo}
              alt="Hindustani Cultural Arts Festival"
              className="w-48 md:w-64 mx-auto opacity-80"
              loading="lazy"
            />
          </motion.div>

          <motion.blockquote
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl lg:text-3xl font-heading text-foreground leading-relaxed mb-8"
          >
            "In every note of music, every step of dance, every stroke of art —
            there lives the soul of a civilization. The Hindustani Cultural Arts Festival
            is our humble offering to keep that soul alive."
          </motion.blockquote>

          <motion.p
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-muted-foreground leading-relaxed mb-12"
          >
            Here, art, culture, community, and celebration come together.
            Not as separate threads, but as one vibrant tapestry woven by the
            hands of countless artists, artisans, and dreamers who believe
            that our heritage is our greatest treasure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-4"
          >
            <motion.span
              className="h-px w-12 bg-secondary/40"
              initial={{ width: 0 }}
              animate={isInView ? { width: 48 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            />
            <span className="text-secondary text-xl">✦</span>
            <motion.span
              className="h-px w-12 bg-secondary/40"
              initial={{ width: 0 }}
              animate={isInView ? { width: 48 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
});

ClosingSection.displayName = "ClosingSection";

export default ClosingSection;
