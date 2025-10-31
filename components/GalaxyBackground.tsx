import { motion } from "motion/react";
import { useMemo } from "react";

export const GalaxyBackground = () => {
  // Generate random stars
  const stars = useMemo(
    () =>
      Array.from({ length: 150 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      })),
    []
  );

  // Generate nebula clouds
  const nebulaClouds = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        scale: Math.random() * 1.5 + 0.5,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
      })),
    []
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep space gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0118] via-[#1a0a2e] to-[#0f0a1f]" />

      {/* Animated nebula clouds */}
      {nebulaClouds.map((cloud) => (
        <motion.div
          key={`cloud-${cloud.id}`}
          className="absolute rounded-full blur-3xl opacity-30"
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            width: `${40 * cloud.scale}vw`,
            height: `${40 * cloud.scale}vh`,
            background:
              cloud.id % 3 === 0
                ? "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)"
                : cloud.id % 3 === 1
                ? "radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: cloud.duration,
            delay: cloud.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Large purple nebula */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vh] rounded-full blur-3xl opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Large blue nebula */}
      <motion.div
        className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vh] rounded-full blur-3xl opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.5) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -40, 0],
          y: [0, -25, 0],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Pink nebula accent */}
      <motion.div
        className="absolute top-[40%] right-[20%] w-[50vw] h-[50vh] rounded-full blur-3xl opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.5) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, 20, 0],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Stars layer */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <motion.div
            key={`star-${star.id}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Shooting stars */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 50}%`,
          }}
          animate={{
            x: [0, 200],
            y: [0, 100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 8,
            repeat: Infinity,
            repeatDelay: 15,
            ease: "easeOut",
          }}
        >
          <motion.div
            className="absolute w-20 h-[1px] bg-gradient-to-r from-white to-transparent"
            style={{ left: -20 }}
          />
        </motion.div>
      ))}

      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
