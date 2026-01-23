import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="participate" className="py-24 md:py-32 bg-background">
      <div className="container px-4">
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
                className="flex items-center gap-2 px-5 py-3 bg-muted rounded-full border border-border/50"
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
          >
            <Button variant="hero" size="xl">
              Participate in the Festival
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ParticipateSection;
