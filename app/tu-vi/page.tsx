'use client';

import { useState } from 'react';
import { useUser } from '@/store/UserContext';
import { generateHoroscopeChart, Palace } from '@/utils/horoscopeEngine';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, X } from 'lucide-react';
import Link from 'next/link';

function TuViContent() {
  const { profile } = useUser();
  const [selectedPalace, setSelectedPalace] = useState<Palace | null>(null);

  if (!profile) return null;

  const chart = generateHoroscopeChart(profile.year, profile.month, profile.day, profile.hour);

  return (
    <div className="min-h-screen bg-mystic-900 pb-12">
      <div className="p-4 flex items-center gap-4 border-b border-white/10 bg-mystic-900/80 backdrop-blur-md sticky top-0 z-20">
        <Link href="/">
          <button className="p-2 rounded-full hover:bg-white/10">
            <ChevronLeft className="w-6 h-6 text-gold-400" />
          </button>
        </Link>
        <h1 className="text-xl font-serif font-bold text-white">Lá Số Tử Vi</h1>
      </div>

      <div className="p-4 grid grid-cols-3 gap-3 mt-4">
        {/* Center - Thien Ban */}
        <div className="col-span-3 bg-mystic-800/30 rounded-xl p-4 border border-gold-500/20 text-center mb-4">
          <h2 className="text-gold-500 font-serif text-lg uppercase tracking-widest mb-1">Thiên Bàn</h2>
          <p className="text-white font-bold">{profile.name}</p>
          <p className="text-sm text-gray-400">{profile.day}/{profile.month}/{profile.year}</p>
        </div>

        {/* 12 Cung Grid */}
        {chart.map((palace) => (
          <motion.div
            key={palace.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedPalace(palace)}
            className={`aspect-square rounded-xl border ${
              palace.score > 80 ? 'border-gold-500/40 bg-gold-500/10' : 'border-white/10 bg-white/5'
            } p-2 flex flex-col items-center justify-center text-center cursor-pointer relative overflow-hidden`}
          >
            <span className="text-[10px] uppercase text-gray-400 absolute top-2">{palace.name}</span>
            <div className="font-bold text-lg text-white mt-2">{palace.score}</div>
            {palace.score > 90 && <div className="absolute bottom-1 w-1 h-1 rounded-full bg-gold-500 shadow-[0_0_8px_rgba(255,215,0,0.8)]"></div>}
          </motion.div>
        ))}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedPalace && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPalace(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-mystic-800 border-t border-gold-500/30 w-full max-w-md rounded-t-3xl p-6 pointer-events-auto relative"
            >
              <button 
                onClick={() => setSelectedPalace(null)}
                className="absolute top-4 right-4 p-2 text-gray-400"
              >
                <X className="w-6 h-6" />
              </button>

              <h3 className="text-2xl font-serif text-gold-400 mb-2">{selectedPalace.name}</h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-4xl font-bold text-white">{selectedPalace.score}</span>
                <span className="text-sm text-gray-400">điểm vượng</span>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs uppercase text-gray-500 mb-2">Sao chiếu mệnh</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPalace.stars.map((star, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-white/10 text-xs text-white border border-white/10">
                        {star}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs uppercase text-gray-500 mb-2">Luận giải</h4>
                  <p className="text-gray-200 leading-relaxed">
                    {selectedPalace.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TuViPage() {
  return <TuViContent />;
}
