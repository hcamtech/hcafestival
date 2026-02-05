import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/festival/Navigation";
import Footer from "@/components/festival/Footer";
import CornerOrnament from "@/components/festival/CornerOrnament";
import { Button } from "@/components/ui/button";
import { Music, Brush, Mic2, Users2, GraduationCap, Sparkles, Heart, HandHeart } from "lucide-react";

const openFor = [
  { icon: Music, label: "Classical dance artists" },
  { icon: Brush, label: "Folk dance and folk music performers" },
  { icon: Mic2, label: "Theatre, drama, and street plays (Nukkad Natak)" },
  { icon: Mic2, label: "Open mic performers (poetry, storytelling, spoken word)" },
  { icon: GraduationCap, label: "School and college cultural groups" },
  { icon: Sparkles, label: "Independent and emerging artists" },
];

const reflectThemes = [
  "Indian cultural heritage",
  "Social awareness and community themes",
  "Contemporary expressions rooted in tradition",
];

const Participate = () => {
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
        <motion.div className="absolute inset-0 bg-pattern-rangoli opacity-20" style={{ y: lotusY }} />
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
              Join Us
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-4">
              If You Carry a Tradition, This Stage Is for You
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hindustani Cultural Arts Festival invites individuals and groups
              to participate and perform on a national cultural platform.
            </p>
          </motion.div>

          {/* Open for */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto mt-8"
          >
            <h2 className="text-xl font-heading font-semibold text-foreground mb-6 text-center">
              Participation is open for:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {openFor.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
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

          {/* Reflect themes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-3xl mx-auto mt-12 text-center"
          >
            <h2 className="text-xl font-heading font-semibold text-foreground mb-6">
              Performances are encouraged to reflect:
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {reflectThemes.map((theme) => (
                <span
                  key={theme}
                  className="px-5 py-3 bg-muted rounded-full border border-border/50 text-foreground font-medium text-sm"
                >
                  {theme}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Free participation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-3xl mx-auto mt-12 p-8 bg-gradient-to-br from-secondary/10 to-primary/5 rounded-2xl border border-secondary/20 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
              <HandHeart className="w-7 h-7 text-secondary" />
            </div>
            <p className="text-foreground leading-relaxed">
              For <strong>blind artists, specially-abled artists, transgender artists,
              and socially disadvantaged performers</strong>,
              participation is <strong>completely free</strong>.
            </p>
            <p className="text-muted-foreground mt-4 text-sm">
              If you know an artist who may not easily reach us,
              we encourage you to share this opportunity with them.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="max-w-3xl mx-auto mt-12 text-center space-y-6"
          >
            <h2 className="text-xl font-heading font-semibold text-foreground">
              To participate:
            </h2>
            <div className="space-y-2 text-muted-foreground text-lg">
              <p>Fill out the participation form</p>
              <p>Share basic details about your performance</p>
            </div>
            <p className="italic text-foreground font-heading text-lg">
              This is more than an application —
              it is an invitation to be part of a shared cultural journey.
            </p>
            <Link to="/register">
              <Button variant="hero" size="xl" className="mt-4">
                Register to Participate
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 flex items-center justify-center gap-4"
          >
            <span className="h-px w-16 bg-secondary/40" />
            <span className="text-secondary text-2xl">✦</span>
            <span className="h-px w-16 bg-secondary/40" />
          </motion.div>
        </div>

        <CornerOrnament position="bottom-left" variant="paisley" />
        <CornerOrnament position="bottom-right" variant="geometric" />
      </section>

      <Footer />
    </main>
  );
};

export default Participate;
