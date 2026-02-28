'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function Splash() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small timeout to avoid synchronous setState warning and ensure hydration
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-mystic-900 text-gold-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="z-10 flex flex-col items-center"
      >
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 border-2 border-gold-500/30 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-40 h-40 border border-gold-500/20 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <Sparkles className="w-16 h-16 text-gold-400 mb-4" />
        </div>
        
        <h1 className="text-4xl font-serif font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-gold-300 to-gold-600 mt-8">
          TỬ VI
        </h1>
        <h2 className="text-xl font-light tracking-[0.2em] text-gold-200/80 mt-2">
          ĐÔNG PHƯƠNG
        </h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-12 text-xs text-gold-500/50 uppercase tracking-widest"
      >
        Khám phá vận mệnh của bạn
      </motion.p>
    </div>
  );
}
