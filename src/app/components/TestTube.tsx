import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface TestTubeProps {
  color?: string;
  label?: string;
  precipitate?: boolean;
  precipitateColor?: string;
  gasEvolution?: boolean;
  isAnimating?: boolean;
  height?: number;
}

export function TestTube({
  color = "transparent",
  label,
  precipitate = false,
  precipitateColor = "#e5e5e5",
  gasEvolution = false,
  isAnimating = false,
  height = 120,
}: TestTubeProps) {
  const [showGas, setShowGas] = useState(false);

  useEffect(() => {
    if (gasEvolution && isAnimating) {
      setShowGas(true);
      const timer = setTimeout(() => setShowGas(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [gasEvolution, isAnimating]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ height: height + 40, width: 60 }}>
        {/* Test tube glass */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 rounded-b-lg border-2 border-gray-300 bg-white/20 backdrop-blur-sm overflow-hidden"
          style={{ height }}>
          
          {/* Liquid */}
          <motion.div
            className="absolute bottom-0 w-full rounded-b-lg"
            style={{ backgroundColor: color }}
            initial={{ height: 0 }}
            animate={{ height: isAnimating ? "70%" : 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          {/* Precipitate */}
          {precipitate && (
            <motion.div
              className="absolute bottom-0 w-full rounded-b-lg"
              style={{ backgroundColor: precipitateColor }}
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: isAnimating ? "25%" : 0,
                opacity: isAnimating ? 1 : 0,
              }}
              transition={{ delay: 1.2, duration: 0.8 }}
            />
          )}

          {/* Gas bubbles */}
          {showGas && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/60 rounded-full"
                  initial={{
                    bottom: "10%",
                    left: `${20 + Math.random() * 50}%`,
                    opacity: 0,
                  }}
                  animate={{
                    bottom: "100%",
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                  }}
                />
              ))}
            </>
          )}
        </div>

        {/* Test tube rim */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-8 border-2 border-t-0 border-gray-300 bg-white/10 backdrop-blur-sm" />
      </div>

      {label && (
        <p className="text-xs text-center font-medium text-gray-700 max-w-[80px]">
          {label}
        </p>
      )}
    </div>
  );
}
