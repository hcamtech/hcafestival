import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navigation from "@/components/festival/Navigation";
import Footer from "@/components/festival/Footer";
import CornerOrnament from "@/components/festival/CornerOrnament";
import { Heart, Users, Star, HandHeart, Eye, Sparkles, UserCheck } from "lucide-react";

const welcomeGroups = [
  { icon: Star, label: "Classical and folk performers" },
  { icon: Users, label: "School and college students" },
  { icon: Heart, label: "Solo and group artists" },
  { icon: Eye, label: "Blind artists" },
  { icon: HandHeart, label: "Physically and specially-abled artists" },
  { icon: Sparkles, label: "Transgender artists" },
  { icon: UserCheck, label: "Socially under-represented creative communities" },
];

const Inclusivity = () => {
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
        <motion.div className="absolute inset-0 bg-pattern-paisley opacity-30" style={{ y: patternY }} />
        <motion.div className="absolute inset-0 bg-pattern-cultural opacity-20" style={{ y: lotusY }} />
      </div>

      <section className="pt-32 pb-24 relative">
        <CornerOrnament position="top-left" variant="paisley" />
        <CornerOrnament position="top-right" variant="paisley" />

        <div className="container px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-secondary font-medium tracking-wider uppercase text-sm mb-4 block">
              Everyone Belongs
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-4">
              A Stage Where Every Voice Belongs
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto space-y-6 text-lg text-muted-foreground leading-relaxed text-center"
          >
            <p>
              Culture becomes meaningful only when everyone is welcome.
            </p>
            <p>
              Hindustani Cultural Arts Festival is built as an open, respectful platform
              where diversity is not highlighted — it is natural.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl mx-auto mt-12"
          >
            <h2 className="text-xl font-heading font-semibold text-foreground mb-6 text-center">
              We welcome artists and participants from all backgrounds, including:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {welcomeGroups.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.08 }}
                  className="flex items-center gap-3 p-4 bg-card/80 rounded-xl border border-border/50"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground font-medium text-sm">{item.label}</span>
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
            <p className="italic font-heading text-foreground text-xl">
              Here, no one is invited as an exception.
              Everyone is invited as an equal.
            </p>
            <p>
              Special provisions are made to ensure accessibility, dignity,
              and comfort for artists who need it —
              so that talent, not limitation, takes center stage.
            </p>
            <p>
              This festival believes that culture grows stronger
              when more voices are heard and respected.
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
        <CornerOrnament position="bottom-right" variant="floral" />
      </section>

      <Footer />
    </main>
  );
};

export default Inclusivity;
