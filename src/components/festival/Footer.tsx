import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const patternY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <footer ref={containerRef} className="bg-primary text-primary-foreground py-16 relative overflow-hidden">
      {/* Layered parallax patterns */}
      <motion.div
        className="absolute inset-0 bg-pattern-lotus opacity-10"
        style={{ y: patternY }}
      />
      <motion.div
        className="absolute inset-0 bg-pattern-cultural opacity-8"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-10, 15]) }}
      />

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-10 right-[10%] w-20 h-20 rounded-full border border-primary-foreground/10"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 30]), rotate: useTransform(scrollYProgress, [0, 1], [0, 20]) }}
      />
      <motion.div
        className="absolute bottom-1/4 left-[8%] w-2 h-2 rounded-full bg-primary-foreground/20"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-10, 20]) }}
      />

      {/* Decorative gradient line */}
      <motion.div
        className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-10, 15]) }}
      />

      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main content */}
          <div className="text-center mb-12">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-heading font-semibold mb-4"
            >
              Hindustani Cultural Arts Festival
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-primary-foreground/80 text-lg italic"
            >
              Celebrating India. Together.
            </motion.p>
          </div>

          {/* Navigation links */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            <a
              href="/#about"
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              About
            </a>
            <a
              href="/#celebration"
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              Experience
            </a>
            <a
              href="/#participate"
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              Participate
            </a>
            <Link
              to="/contact"
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              Contact
            </Link>
          </motion.nav>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex justify-center gap-4 mb-12"
          >
            {[
              { icon: Facebook, label: "Facebook" },
              { icon: Instagram, label: "Instagram" },
              { icon: Twitter, label: "Twitter" },
              { icon: Youtube, label: "YouTube" },
              { icon: Mail, label: "Email" },
            ].map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-primary-foreground/20 mb-8" />

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center text-primary-foreground/60 text-sm"
          >
            © {currentYear} Hindustani Cultural Arts Festival. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
