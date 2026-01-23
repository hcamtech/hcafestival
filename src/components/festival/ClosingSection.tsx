import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import festivalLogo from "@/assets/festival-logo.png";

const ClosingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-primary/5 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container px-4 relative">
        <div ref={ref} className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <img
              src={festivalLogo}
              alt="Hindustani Cultural Arts Festival"
              className="w-48 md:w-64 mx-auto opacity-80"
            />
          </motion.div>

          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl lg:text-3xl font-heading text-foreground leading-relaxed mb-8"
          >
            "In every note of music, every step of dance, every stroke of art — 
            there lives the soul of a civilization. The Hindustani Cultural Arts Festival 
            is our humble offering to keep that soul alive."
          </motion.blockquote>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
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
            <span className="h-px w-12 bg-secondary/40" />
            <span className="text-secondary text-xl">✦</span>
            <span className="h-px w-12 bg-secondary/40" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ClosingSection;
