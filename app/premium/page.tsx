'use client';

import { useUser, UserProvider } from '@/store/UserContext';
import { motion } from 'motion/react';
import { ChevronLeft, Gem, Coffee, Construction } from 'lucide-react';
import Link from 'next/link';

function PremiumContent() {
  const { profile } = useUser();

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-mystic-900 pb-12 flex flex-col">
      <div className="p-4 flex items-center gap-4 border-b border-white/10 bg-mystic-900/80 backdrop-blur-md sticky top-0 z-20">
        <Link href="/">
          <button className="p-2 rounded-full hover:bg-white/10">
            <ChevronLeft className="w-6 h-6 text-gold-400" />
          </button>
        </Link>
        <h1 className="text-xl font-serif font-bold text-white">Gói Cao Cấp</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gold-500/20 blur-3xl rounded-full"></div>
          <Gem className="w-32 h-32 text-gold-400 relative z-10 animate-pulse" />
          <div className="absolute -bottom-2 -right-2 bg-mystic-800 rounded-full p-2 border border-gold-500/50">
            <Construction className="w-8 h-8 text-orange-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-serif font-bold text-gold-300">
            Tính năng đang "Bế Quan"
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Các cao nhân đang ngày đêm luyện công để hoàn thiện bí kíp này. 
            Tuy nhiên, do "ngân lượng" có hạn nên tiến độ hơi chậm một chút... 🐢
          </p>
          <p className="text-sm text-gray-400 italic">
            (Chờ donate trà sữa để code tiếp 🧋)
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-xs pt-8"
        >
          <button 
            className="w-full bg-white/5 border border-gold-500/30 text-gold-400 font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-gold-500/10 transition-colors cursor-not-allowed opacity-80"
          >
            <Coffee className="w-5 h-5" />
            <span>Mời Dev ly cà phê (Sắp có)</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default function PremiumPage() {
  return (
    <UserProvider>
      <PremiumContent />
    </UserProvider>
  );
}
