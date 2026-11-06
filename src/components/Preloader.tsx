import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 600);
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FBF4EA] text-[#1E1E1E]"
        >
          {/* Subtle background grain */}
          <div className="absolute inset-0 bg-paper-grain opacity-60 pointer-events-none" />

          {/* Animated emblem container */}
          <div className="relative flex flex-col items-center z-10 px-6">
            {/* Tagline script reveal */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-script text-3xl md:text-4xl text-[#7E2433] mb-2 tracking-wide"
            >
              Glow Naturally
            </motion.div>

            {/* SVG Logo with Monogram draw + flower blooming */}
            <div className="relative my-2">
              <svg
                width="120"
                height="110"
                viewBox="0 0 100 90"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Flower blossom expanding & blooming */}
                <motion.g
                  transform="translate(48, 42) scale(1.1)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.1, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                >
                  <path d="M0,0 C-10,-24 10,-24 0,0" fill="#F4C6C3" fillOpacity="0.8" />
                  <path d="M0,0 C-10,-24 10,-24 0,0" fill="#EFA9A5" fillOpacity="0.85" transform="rotate(72)" />
                  <path d="M0,0 C-10,-24 10,-24 0,0" fill="#F4C6C3" fillOpacity="0.8" transform="rotate(144)" />
                  <path d="M0,0 C-10,-24 10,-24 0,0" fill="#EFA9A5" fillOpacity="0.85" transform="rotate(216)" />
                  <path d="M0,0 C-10,-24 10,-24 0,0" fill="#F4C6C3" fillOpacity="0.8" transform="rotate(288)" />
                  <circle cx="0" cy="0" r="3" fill="#C8872E" />
                </motion.g>

                {/* S Letter stroke draw */}
                <motion.path
                  d="M 44 26 C 42 16 30 14 24 20 C 18 26 22 36 34 40 C 47 44 50 54 44 64 C 38 74 22 73 16 64 C 13 60 14 58 17 58 C 19 58 21 61 24 64 C 29 67 36 67 40 61 C 44 55 42 47 30 43 C 18 39 12 30 19 20 C 26 10 40 10 47 19 C 48 20 46 25 44 26 Z"
                  fill="#1E1E1E"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                />

                {/* N Letter draw */}
                <motion.path
                  d="M 52 20 L 52 68 L 57 68 L 57 36 L 79 68 L 86 68 L 86 20 L 80 20 L 80 52 L 59 20 Z"
                  fill="#1E1E1E"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.45, duration: 0.7 }}
                />
              </svg>
            </div>

            {/* Wordmark reveal */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: '0.15em' }}
              animate={{ opacity: 1, letterSpacing: '0.28em' }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="font-cinzel text-2xl md:text-3xl font-semibold uppercase text-[#1E1E1E] mt-2"
            >
              ALANKARANA
            </motion.div>

            {/* Subtitle with botanical lines */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="flex items-center gap-3 mt-2"
            >
              <div className="h-[1px] w-8 bg-[#7E2433]/40" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#6B5E51] font-sans">
                Herbal Hair & Skin Care
              </span>
              <div className="h-[1px] w-8 bg-[#7E2433]/40" />
            </motion.div>

            {/* Subtle loading indicator */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ delay: 0.5, duration: 1.3, ease: 'easeInOut' }}
              className="h-[2px] bg-[#7E2433] rounded-full mt-8"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
