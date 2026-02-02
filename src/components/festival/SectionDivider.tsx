import { motion, useInView } from "framer-motion";
import { useRef, forwardRef } from "react";

interface SectionDividerProps {
  variant?: "lotus" | "paisley" | "mandala" | "waves";
  className?: string;
}

const SectionDivider = forwardRef<HTMLDivElement, SectionDividerProps>(
  ({ variant = "lotus", className = "" }, _ref) => {
    const internalRef = useRef(null);
    const isInView = useInView(internalRef, { once: true, margin: "-50px" });

    const patterns = {
      lotus: (
        <svg viewBox="0 0 200 40" className="w-full h-10 md:h-12">
          {/* Center lotus */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ transformOrigin: "100px 20px" }}
          >
            <path
              d="M100 8 Q95 15 100 22 Q105 15 100 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-secondary"
            />
            <path
              d="M94 10 Q92 18 97 24 Q95 16 94 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-secondary/80"
            />
            <path
              d="M106 10 Q108 18 103 24 Q105 16 106 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-secondary/80"
            />
            <path
              d="M88 14 Q88 22 95 26 Q90 20 88 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-secondary/60"
            />
            <path
              d="M112 14 Q112 22 105 26 Q110 20 112 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-secondary/60"
            />
            <circle cx="100" cy="24" r="2" className="fill-primary/40" />
          </motion.g>

          {/* Left decorative line */}
          <motion.line
            x1="20"
            y1="20"
            x2="80"
            y2="20"
            stroke="currentColor"
            strokeWidth="1"
            className="text-secondary/30"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          />
          <motion.circle
            cx="20"
            cy="20"
            r="3"
            className="fill-secondary/40"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.6 }}
          />

          {/* Right decorative line */}
          <motion.line
            x1="120"
            y1="20"
            x2="180"
            y2="20"
            stroke="currentColor"
            strokeWidth="1"
            className="text-secondary/30"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          />
          <motion.circle
            cx="180"
            cy="20"
            r="3"
            className="fill-secondary/40"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.6 }}
          />

          {/* Small diamond accents */}
          <motion.path
            d="M40 20 L43 17 L46 20 L43 23 Z"
            className="fill-primary/30"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.5 }}
          />
          <motion.path
            d="M154 20 L157 17 L160 20 L157 23 Z"
            className="fill-primary/30"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.5 }}
          />
        </svg>
      ),
      paisley: (
        <svg viewBox="0 0 200 40" className="w-full h-10 md:h-12">
          {/* Center paisley */}
          <motion.g
            initial={{ rotate: -10, opacity: 0 }}
            animate={isInView ? { rotate: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ transformOrigin: "100px 20px" }}
          >
            <path
              d="M95 25 Q90 15 100 10 Q110 15 108 25 Q105 30 100 28 Q95 26 95 25"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-secondary"
            />
            <path
              d="M98 22 Q96 18 100 15 Q104 18 103 22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-secondary/60"
            />
            <circle cx="100" cy="18" r="1.5" className="fill-primary/50" />
          </motion.g>

          {/* Decorative curves */}
          <motion.path
            d="M20 20 Q40 15 60 20 Q70 22 80 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-secondary/30"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.8 }}
          />
          <motion.path
            d="M120 20 Q130 18 140 20 Q160 25 180 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-secondary/30"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.8 }}
          />

          {/* Small dots */}
          {[30, 50, 70, 130, 150, 170].map((x, i) => (
            <motion.circle
              key={x}
              cx={x}
              cy={20}
              r="1.5"
              className="fill-secondary/40"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
            />
          ))}
        </svg>
      ),
      mandala: (
        <svg viewBox="0 0 200 40" className="w-full h-10 md:h-12">
          {/* Center mandala element */}
          <motion.g
            initial={{ scale: 0, rotate: -45 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ transformOrigin: "100px 20px" }}
          >
            <circle cx="100" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="1" className="text-secondary" />
            <circle cx="100" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="1" className="text-secondary/60" />
            <circle cx="100" cy="20" r="2" className="fill-primary/50" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <circle
                key={angle}
                cx={100 + 8 * Math.cos((angle * Math.PI) / 180)}
                cy={20 + 8 * Math.sin((angle * Math.PI) / 180)}
                r="1"
                className="fill-secondary/60"
              />
            ))}
          </motion.g>

          {/* Connecting lines */}
          <motion.line
            x1="15"
            y1="20"
            x2="85"
            y2="20"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 2"
            className="text-secondary/30"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.6 }}
          />
          <motion.line
            x1="115"
            y1="20"
            x2="185"
            y2="20"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 2"
            className="text-secondary/30"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.6 }}
          />

          {/* End ornaments */}
          <motion.g
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <circle cx="15" cy="20" r="4" fill="none" stroke="currentColor" strokeWidth="1" className="text-secondary/50" />
            <circle cx="15" cy="20" r="1.5" className="fill-secondary/40" />
          </motion.g>
          <motion.g
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <circle cx="185" cy="20" r="4" fill="none" stroke="currentColor" strokeWidth="1" className="text-secondary/50" />
            <circle cx="185" cy="20" r="1.5" className="fill-secondary/40" />
          </motion.g>
        </svg>
      ),
      waves: (
        <svg viewBox="0 0 200 40" className="w-full h-10 md:h-12">
          {/* Wave pattern */}
          <motion.path
            d="M10 20 Q25 10 40 20 Q55 30 70 20 Q85 10 100 20 Q115 30 130 20 Q145 10 160 20 Q175 30 190 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-secondary/40"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.2 }}
          />
          <motion.path
            d="M10 24 Q25 14 40 24 Q55 34 70 24 Q85 14 100 24 Q115 34 130 24 Q145 14 160 24 Q175 34 190 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-secondary/20"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.2 }}
          />

          {/* Center accent */}
          <motion.circle
            cx="100"
            cy="20"
            r="3"
            className="fill-primary/40"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.8 }}
          />
        </svg>
      ),
    };

    return (
      <div ref={internalRef} className={`w-full max-w-2xl mx-auto px-8 py-4 ${className}`}>
        {patterns[variant]}
      </div>
    );
  }
);

SectionDivider.displayName = "SectionDivider";

export default SectionDivider;
