import { motion, useScroll, useTransform, useInView, useReducedMotion } from "framer-motion";
import { useRef, useMemo } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Memoize transforms for performance
  const transforms = useMemo(() => ({
    patternMain: [-50, prefersReducedMotion ? -50 : 50],
    patternCultural: [-30, prefersReducedMotion ? -30 : 30],
    patternPaisley: [20, prefersReducedMotion ? 20 : -20],
    decorCircle: [0, prefersReducedMotion ? 0 : 45],
    decorY: [30, prefersReducedMotion ? 30 : -30],
    decorBubble: [-20, prefersReducedMotion ? -20 : 40],
    decorBlur: [10, prefersReducedMotion ? 10 : -30],
    decorDot: [-10, prefersReducedMotion ? -10 : 30],
    lineY: [-15, prefersReducedMotion ? -15 : 25],
  }), [prefersReducedMotion]);

  const patternY = useTransform(scrollYProgress, [0, 1], transforms.patternMain);
  const patternCulturalY = useTransform(scrollYProgress, [0, 1], transforms.patternCultural);
  const patternPaisleyY = useTransform(scrollYProgress, [0, 1], transforms.patternPaisley);
  const decorRotate = useTransform(scrollYProgress, [0, 1], transforms.decorCircle);
  const decorY = useTransform(scrollYProgress, [0, 1], transforms.decorY);
  const decorBubbleY = useTransform(scrollYProgress, [0, 1], transforms.decorBubble);
  const decorBlurY = useTransform(scrollYProgress, [0, 1], transforms.decorBlur);
  const decorDotY = useTransform(scrollYProgress, [0, 1], transforms.decorDot);
  const lineY = useTransform(scrollYProgress, [0, 1], transforms.lineY);

  const fadeInUp = {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 md:py-32 bg-muted/30 relative overflow-hidden"
    >
      {/* Layered parallax pattern backgrounds */}
      <motion.div
        className="absolute inset-0 bg-pattern-lotus opacity-60 will-change-transform"
        style={{ y: patternY }}
      />
      <motion.div
        className="absolute inset-0 bg-pattern-cultural opacity-40 will-change-transform"
        style={{ y: patternCulturalY }}
      />
      <motion.div
        className="absolute inset-0 bg-pattern-paisley opacity-25 will-change-transform"
        style={{ y: patternPaisleyY }}
      />

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 right-10 w-24 h-24 rounded-full border border-secondary/20 will-change-transform"
        style={{ y: decorY, rotate: decorRotate }}
      />
      <motion.div
        className="absolute bottom-32 left-16 w-16 h-16 rounded-full bg-secondary/10 will-change-transform"
        style={{ y: decorBubbleY }}
      />
      <motion.div
        className="absolute top-1/3 left-[8%] w-20 h-20 rounded-full bg-primary/5 blur-xl will-change-transform"
        style={{ y: decorBlurY }}
      />
      <motion.div
        className="absolute bottom-1/4 right-[12%] w-3 h-3 rounded-full bg-secondary/40 will-change-transform"
        style={{ y: decorDotY }}
      />

      {/* Decorative gradient lines */}
      <motion.div
        className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/15 to-transparent will-change-transform"
        style={{ y: lineY }}
      />

      <div className="container px-4 relative">
        <div ref={ref} className="max-w-3xl mx-auto text-center">
          <motion.span
            {...fadeInUp}
            animate={isInView ? fadeInUp.animate : fadeInUp.initial}
            transition={{ duration: 0.5 }}
            className="text-secondary font-medium tracking-wider uppercase text-sm mb-4 block"
          >
            Our Vision
          </motion.span>

          <motion.h2
            {...fadeInUp}
            animate={isInView ? fadeInUp.animate : fadeInUp.initial}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-8"
          >
            About the Festival
          </motion.h2>

          <motion.div
            {...fadeInUp}
            animate={isInView ? fadeInUp.animate : fadeInUp.initial}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 text-lg text-muted-foreground leading-relaxed"
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

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 flex items-center justify-center gap-4"
          >
            <span className="h-px w-16 bg-secondary/40" />
            <span className="text-secondary text-2xl">✦</span>
            <span className="h-px w-16 bg-secondary/40" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
