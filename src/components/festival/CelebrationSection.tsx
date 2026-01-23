import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Utensils, Palette, Gamepad2, Tent } from "lucide-react";

const experiences = [
  {
    icon: Utensils,
    title: "Regional Delicacies",
    description: "Authentic cuisines from across India — from street food favourites to royal recipes.",
  },
  {
    icon: Palette,
    title: "Artisan Marketplace",
    description: "Handmade treasures crafted by skilled artisans — textiles, pottery, jewellery, and more.",
  },
  {
    icon: Gamepad2,
    title: "Traditional Games",
    description: "Rediscover the games of our childhood — pitthu, kho-kho, gilli-danda, and more.",
  },
  {
    icon: Tent,
    title: "Festival Rides",
    description: "Family-friendly attractions including the iconic giant jhula and carousel rides.",
  },
];

const CelebrationSection = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const patternY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section
      id="celebration"
      ref={containerRef}
      className="py-24 md:py-32 bg-background relative overflow-hidden"
    >
      {/* Parallax pattern */}
      <motion.div
        className="absolute inset-0 bg-pattern-rangoli"
        style={{ y: patternY }}
      />

      {/* Decorative accents */}
      <motion.div
        className="absolute top-1/4 left-0 w-64 h-1 bg-gradient-to-r from-secondary/20 to-transparent"
        style={{ x: useTransform(scrollYProgress, [0, 1], [-100, 50]) }}
      />
      <motion.div
        className="absolute bottom-1/3 right-0 w-48 h-1 bg-gradient-to-l from-primary/20 to-transparent"
        style={{ x: useTransform(scrollYProgress, [0, 1], [100, -50]) }}
      />

      <div className="container px-4 relative">
        <div ref={ref} className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-secondary font-medium tracking-wider uppercase text-sm mb-4 block"
            >
              Experience
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6"
            >
              Culture Meets Celebration
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              The festival is more than performances on a stage. It's an immersive experience
              where culture is not just watched, but lived and enjoyed.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group p-8 bg-card rounded-xl border border-border/50 shadow-soft hover:shadow-elevated transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-lg bg-secondary/20 flex items-center justify-center mb-5 group-hover:bg-secondary/30 group-hover:scale-110 transition-all duration-300">
                  <exp.icon className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                  {exp.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center mt-12 text-lg text-muted-foreground italic"
          >
            A carnival of culture. A celebration of heritage. A festival for all.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default CelebrationSection;
