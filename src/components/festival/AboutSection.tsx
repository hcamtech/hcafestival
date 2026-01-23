import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 bg-muted/30">
      <div className="container px-4">
        <div ref={ref} className="max-w-3xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-secondary font-medium tracking-wider uppercase text-sm mb-4 block"
          >
            Our Vision
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-8"
          >
            About the Festival
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
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
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
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
