import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Music, Mic2, Brush, Users2, GraduationCap, Sparkles } from "lucide-react";

const participantTypes = [
  { icon: Music, label: "Classical musicians" },
  { icon: Brush, label: "Folk artists & dancers" },
  { icon: Mic2, label: "Traditional storytellers" },
  { icon: Users2, label: "Cultural groups" },
  { icon: GraduationCap, label: "School & college performers" },
  { icon: Sparkles, label: "Emerging talents" },
];

const ParticipateSection = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const patternY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section
      id="participate"
      ref={containerRef}
      className="py-24 md:py-32 bg-background relative overflow-hidden"
    >
      {/* Layered parallax patterns */}
      <motion.div
        className="absolute inset-0 bg-pattern-cultural opacity-60"
        style={{ y: patternY }}
      />
      <motion.div
        className="absolute inset-0 bg-pattern-rangoli opacity-40"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-15, 25]) }}
      />
      <motion.div
        className="absolute inset-0 bg-pattern-paisley opacity-25"
        style={{ y: useTransform(scrollYProgress, [0, 1], [10, -20]) }}
      />

      {/* Floating decorative elements - responsive */}
      <motion.div
        className="hidden md:block absolute top-16 right-[8%] w-20 md:w-28 h-20 md:h-28 rounded-full border border-secondary/15"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 70]), rotate: useTransform(scrollYProgress, [0, 1], [0, 40]) }}
      />
      <motion.div
        className="hidden sm:block absolute bottom-1/4 left-[6%] w-16 md:w-20 h-16 md:h-20 rounded-full bg-secondary/10 blur-xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-15, 45]) }}
      />
      <motion.div
        className="hidden md:block absolute top-1/3 left-[10%] w-3 h-3 rounded-full bg-secondary/40"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
      />
      <motion.div
        className="hidden md:block absolute bottom-1/3 right-[12%] w-2 h-2 rounded-full bg-primary/30"
        style={{ y: useTransform(scrollYProgress, [0, 1], [10, -25]) }}
      />

      {/* Decorative lines */}
      <motion.div
        className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 30]) }}
      />
      <motion.div
        className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"
        style={{ y: useTransform(scrollYProgress, [0, 1], [20, -20]) }}
      />

      <div className="container px-4 relative">
        <div ref={ref} className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-secondary font-medium tracking-wider uppercase text-sm mb-4 block"
          >
            Join Us
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6"
          >
            Who Can Participate
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground font-heading italic mb-12"
          >
            If you carry a tradition, this stage is for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {participantTypes.map((type, index) => (
              <motion.div
                key={type.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                className="flex items-center gap-2 px-5 py-3 bg-muted rounded-full border border-border/50 cursor-default"
              >
                <type.icon className="w-4 h-4 text-primary" />
                <span className="text-foreground font-medium text-sm">{type.label}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link to="/register">
              <Button variant="hero" size="xl">
                Participate in the Festival
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ParticipateSection;
