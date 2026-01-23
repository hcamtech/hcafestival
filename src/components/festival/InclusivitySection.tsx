import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Users, Star, HandHeart } from "lucide-react";

const InclusivitySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="inclusivity" className="py-24 md:py-32 bg-primary/5 relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="container px-4 relative">
        <div ref={ref} className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-secondary font-medium tracking-wider uppercase text-sm mb-4 block"
            >
              Everyone Belongs
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6"
            >
              A Stage for All
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              True culture knows no barriers. Our festival welcomes every voice, 
              every story, every tradition that makes India rich.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-start gap-4 p-6 bg-background rounded-xl border border-border/50"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-1">Classical & Folk Artists</h3>
                <p className="text-muted-foreground text-sm">Masters and practitioners of traditional art forms</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-start gap-4 p-6 bg-background rounded-xl border border-border/50"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-1">School & College Performers</h3>
                <p className="text-muted-foreground text-sm">Young talent carrying forward our traditions</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-start gap-4 p-6 bg-background rounded-xl border border-border/50"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-1">Solo & Group Performers</h3>
                <p className="text-muted-foreground text-sm">From intimate recitals to grand ensembles</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-start gap-4 p-6 bg-background rounded-xl border border-border/50"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <HandHeart className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-1">Differently-Abled Artists</h3>
                <p className="text-muted-foreground text-sm">Celebrating talent beyond all limitations</p>
              </div>
            </motion.div>
          </div>

          {/* Special highlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="p-8 bg-gradient-to-br from-secondary/10 to-primary/5 rounded-2xl border border-secondary/20 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6">
              <HandHeart className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-4">
              Empowering Differently-Abled Artisans
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Differently-abled artisans are provided <strong className="text-foreground">free stall spaces</strong> to 
              showcase and sell their handcrafted products. This is not charity — it is 
              recognition of their skill, creativity, and the dignity they deserve.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InclusivitySection;
