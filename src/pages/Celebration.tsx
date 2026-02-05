import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navigation from "@/components/festival/Navigation";
import Footer from "@/components/festival/Footer";
import CornerOrnament from "@/components/festival/CornerOrnament";
import { Music, Brush, Mic2, Utensils, Palette, Gamepad2, Heart } from "lucide-react";

const highlights = [
  { icon: Music, label: "Classical and folk dance performances" },
  { icon: Music, label: "Folk and traditional music" },
  { icon: Mic2, label: "Cultural storytelling and theatre" },
  { icon: Utensils, label: "Authentic regional food" },
  { icon: Palette, label: "Handmade artisan products" },
  { icon: Gamepad2, label: "Games, rides, and joyful festival moments for families and youth" },
];

const Celebration = () => {
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
        <motion.div className="absolute inset-0 bg-pattern-rangoli opacity-30" style={{ y: patternY }} />
        <motion.div className="absolute inset-0 bg-pattern-lotus opacity-20" style={{ y: lotusY }} />
      </div>

      <section className="pt-32 pb-24 relative">
        <CornerOrnament position="top-left" variant="geometric" />
        <CornerOrnament position="top-right" variant="floral" />

        <div className="container px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-secondary font-medium tracking-wider uppercase text-sm mb-4 block">
              Experience
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-4">
              A Festival That Celebrates India, Together
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto space-y-6 text-lg text-muted-foreground leading-relaxed"
          >
            <p>
              Hindustani Cultural Arts Festival is a celebration of India's living culture —
              where classical traditions, folk expressions, and community joy come together.
            </p>
            <p>
              From powerful stage performances to a vibrant cultural bazaar,
              the festival creates a space where people don't just watch culture —
              they experience it.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl mx-auto mt-12"
          >
            <h2 className="text-xl font-heading font-semibold text-foreground mb-6 text-center">
              Across the festival grounds, you'll find:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.08 }}
                  className="flex items-start gap-3 p-4 bg-card/80 rounded-xl border border-border/50"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-secondary" />
                  </div>
                  <span className="text-foreground font-medium text-sm leading-relaxed pt-2">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-3xl mx-auto mt-12 space-y-6 text-lg text-muted-foreground leading-relaxed text-center"
          >
            <p>
              This is a place where generations meet,
              where traditions feel alive,
              and where celebration goes beyond entertainment.
            </p>
            <p className="italic font-heading text-foreground">
              Hindustani Cultural Arts Festival is not about rushing through performances —
              it's about pausing, feeling, and celebrating together.
            </p>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-16 flex items-center justify-center gap-4"
          >
            <span className="h-px w-16 bg-secondary/40" />
            <span className="text-secondary text-2xl">✦</span>
            <span className="h-px w-16 bg-secondary/40" />
          </motion.div>
        </div>

        <CornerOrnament position="bottom-left" variant="floral" />
        <CornerOrnament position="bottom-right" variant="geometric" />
      </section>

      <Footer />
    </main>
  );
};

export default Celebration;
