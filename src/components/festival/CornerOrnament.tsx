import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface CornerOrnamentProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  variant?: "floral" | "geometric" | "paisley";
  className?: string;
}

const CornerOrnament = ({ position, variant = "floral", className = "" }: CornerOrnamentProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  const getPositionClasses = () => {
    switch (position) {
      case "top-left":
        return "top-0 left-0";
      case "top-right":
        return "top-0 right-0 -scale-x-100";
      case "bottom-left":
        return "bottom-0 left-0 -scale-y-100";
      case "bottom-right":
        return "bottom-0 right-0 -scale-x-100 -scale-y-100";
    }
  };

  const ornaments = {
    floral: (
      <svg viewBox="0 0 80 80" className="w-16 h-16 md:w-20 md:h-20">
        {/* Main corner curve */}
        <motion.path
          d="M0 0 L0 60 Q0 40 20 30 Q40 20 60 0 L0 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-secondary/30"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        />
        
        {/* Inner decorative curve */}
        <motion.path
          d="M0 0 L0 40 Q0 25 15 18 Q30 10 45 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-secondary/20"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        />

        {/* Floral element */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{ transformOrigin: "15px 15px" }}
        >
          <circle cx="15" cy="15" r="6" fill="none" stroke="currentColor" strokeWidth="1" className="text-secondary/50" />
          <circle cx="15" cy="15" r="3" className="fill-primary/30" />
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <circle
              key={angle}
              cx={15 + 6 * Math.cos((angle * Math.PI) / 180)}
              cy={15 + 6 * Math.sin((angle * Math.PI) / 180)}
              r="1"
              className="fill-secondary/40"
            />
          ))}
        </motion.g>

        {/* Leaf accent */}
        <motion.path
          d="M25 30 Q30 25 35 30 Q30 35 25 30"
          fill="currentColor"
          className="text-secondary/20"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.8 }}
        />
        <motion.path
          d="M35 20 Q40 15 45 20 Q40 25 35 20"
          fill="currentColor"
          className="text-secondary/15"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.9 }}
        />

        {/* Dots along the curve */}
        {[
          { x: 5, y: 50 },
          { x: 10, y: 38 },
          { x: 50, y: 5 },
          { x: 38, y: 10 },
        ].map((dot, i) => (
          <motion.circle
            key={i}
            cx={dot.x}
            cy={dot.y}
            r="1.5"
            className="fill-secondary/30"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
          />
        ))}
      </svg>
    ),
    geometric: (
      <svg viewBox="0 0 80 80" className="w-16 h-16 md:w-20 md:h-20">
        {/* Geometric corner lines */}
        <motion.path
          d="M0 60 L0 0 L60 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-secondary/30"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.8 }}
        />
        <motion.path
          d="M0 45 L0 0 L45 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-secondary/20"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        {/* Diamond pattern */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <path d="M15 15 L20 10 L25 15 L20 20 Z" fill="none" stroke="currentColor" strokeWidth="1" className="text-secondary/40" />
          <path d="M17 15 L20 12 L23 15 L20 18 Z" className="fill-primary/30" />
        </motion.g>

        {/* Step pattern */}
        <motion.path
          d="M30 0 L30 10 L40 10 L40 20 L50 20 L50 30 L60 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-secondary/25"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
        <motion.path
          d="M0 30 L10 30 L10 40 L20 40 L20 50 L30 50 L30 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-secondary/25"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        {/* Corner dots */}
        {[
          { x: 5, y: 5 },
          { x: 10, y: 5 },
          { x: 5, y: 10 },
        ].map((dot, i) => (
          <motion.circle
            key={i}
            cx={dot.x}
            cy={dot.y}
            r="2"
            className="fill-secondary/30"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
          />
        ))}
      </svg>
    ),
    paisley: (
      <svg viewBox="0 0 80 80" className="w-16 h-16 md:w-20 md:h-20">
        {/* Main paisley */}
        <motion.path
          d="M20 50 Q5 35 15 20 Q25 5 40 10 Q55 15 50 35 Q45 55 25 55 Q15 55 20 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-secondary/40"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2 }}
        />
        
        {/* Inner paisley detail */}
        <motion.path
          d="M25 42 Q15 32 22 22 Q30 12 40 18 Q48 24 44 38 Q40 48 28 46 Q22 45 25 42"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-secondary/25"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Center dot */}
        <motion.circle
          cx="32"
          cy="28"
          r="4"
          className="fill-primary/30"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.8 }}
        />

        {/* Decorative dots inside */}
        {[
          { x: 28, y: 38 },
          { x: 38, y: 32 },
          { x: 26, y: 22 },
        ].map((dot, i) => (
          <motion.circle
            key={i}
            cx={dot.x}
            cy={dot.y}
            r="1.5"
            className="fill-secondary/30"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.9 + i * 0.1 }}
          />
        ))}

        {/* Corner accent curves */}
        <motion.path
          d="M0 0 Q10 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-secondary/30"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}
        />
        <motion.path
          d="M0 0 Q5 0 5 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-secondary/20"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.6 }}
        />
      </svg>
    ),
  };

  return (
    <div
      ref={ref}
      className={`absolute pointer-events-none ${getPositionClasses()} ${className}`}
    >
      {ornaments[variant]}
    </div>
  );
};

export default CornerOrnament;
