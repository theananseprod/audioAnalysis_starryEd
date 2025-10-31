import { motion } from "motion/react";

export const AudioWaveform = ({ isPlaying = true }: { isPlaying?: boolean }) => {
  const bars = Array.from({ length: 40 }, (_, i) => i);

  return (
    <div className="flex items-center justify-center gap-1 h-32">
      {bars.map((bar) => (
        <motion.div
          key={bar}
          className="w-1 bg-gradient-to-t from-[#8B5CF6] via-[#A78BFA] to-[#EC4899] rounded-full"
          initial={{ height: 8 }}
          animate={
            isPlaying
              ? {
                  height: [
                    Math.random() * 60 + 20,
                    Math.random() * 80 + 30,
                    Math.random() * 60 + 20,
                    Math.random() * 100 + 20,
                    Math.random() * 60 + 20,
                  ],
                }
              : { height: 8 }
          }
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: bar * 0.03,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
