import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import festivalLogo from "@/assets/festival-logo.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero bg-pattern-cultural">
      {/* Background logo with low opacity */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.img
          src={festivalLogo}
          alt=""
          aria-hidden="true"
          className="w-[80vw] max-w-4xl opacity-[0.06]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.06, scale: 1 }}
          transition={{ duration: 1.5 }}
        />
      </div>

      <div className="container relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main logo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <img
              src={festivalLogo}
              alt="Hindustani Cultural Arts Festival"
              className="w-full max-w-md mx-auto"
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground font-heading italic mb-8"
          >
            Where India's traditions come alive
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            A national platform celebrating India's classical & folk arts, 
            combined with a vibrant cultural bazaar and festival experience. 
            Where art meets celebration, and tradition meets joy.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="hero" size="xl" asChild>
              <a href="#about">Explore the Festival</a>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <a href="#participate">Participate as an Artist</a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-primary/50 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
