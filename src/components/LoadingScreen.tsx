import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoadingComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div 
      className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-4 sm:mb-8 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="absolute -inset-2 bg-yellow-400 -skew-y-3" style={{ zIndex: 0 }} />
        <span className="relative">{progress}%</span>
      </motion.div>
      <div className="w-48 sm:w-64 h-6 sm:h-8 bg-white/20 relative border-2 sm:border-4 border-white">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-yellow-400"
          style={{ width: `${progress}%` }}
        />
      </div>
      <motion.div 
        className="mt-4 sm:mt-8 text-xl sm:text-2xl md:text-3xl font-display"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        LOADING EXPERIENCE
      </motion.div>
    </motion.div>
  );
}