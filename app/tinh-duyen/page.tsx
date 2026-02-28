'use client';

import { useState } from 'react';
import { useUser } from '@/store/UserContext';
import { calculateCompatibility } from '@/utils/compatibilityEngine';
import { motion } from 'motion/react';
import { ChevronLeft, Heart, Sparkles } from 'lucide-react';
import Link from 'next/link';
import CustomSelect from '@/components/CustomSelect';

function TinhDuyenContent() {
  const { profile } = useUser();
  const [partnerYear, setPartnerYear] = useState(1995);
  const [result, setResult] = useState<any>(null);

  if (!profile) return null;

  const handleCheck = () => {
    const res = calculateCompatibility(profile.year, partnerYear);
    setResult(res);
  };

  const years = Array.from({length: 60}, (_, i) => {
    const y = 1970 + i;
    return { label: y.toString(), value: y };
  });

  return (
    <div className="min-h-screen bg-mystic-900 pb-12">
      <div className="p-4 flex items-center gap-4 border-b border-white/10 bg-mystic-900/80 backdrop-blur-md sticky top-0 z-20">
        <Link href="/">
          <button className="p-2 rounded-full hover:bg-white/10">
            <ChevronLeft className="w-6 h-6 text-gold-400" />
          </button>
        </Link>
        <h1 className="text-xl font-serif font-bold text-white">Tình Duyên</h1>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-8 px-4">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">♂️</span>
            </div>
            <p className="text-sm font-bold">{profile.year}</p>
          </div>

          <Heart className="w-8 h-8 text-pink-500 animate-pulse" />

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-pink-500/20 border border-pink-500 flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">♀️</span>
            </div>
            <div className="w-24 mx-auto">
              <CustomSelect
                value={partnerYear}
                onChange={(val) => setPartnerYear(val)}
                options={years}
                className="text-sm"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleCheck}
          className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-pink-500/20 mb-8"
        >
          Xem Kết Quả
        </button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6"
          >
            <div className="text-center">
              <div className="inline-block p-4 rounded-full border-4 border-gold-500/30 mb-2">
                <span className="text-4xl font-bold text-gold-400">{result.score}%</span>
              </div>
              <p className="text-gray-400 text-sm uppercase tracking-widest">Độ hòa hợp</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-black/20 rounded-lg">
                <span className="text-gray-400 text-sm">Ngũ Hành</span>
                <span className={`font-bold ${result.details.nguHanh.includes('Tốt') ? 'text-green-400' : 'text-red-400'}`}>
                  {result.details.nguHanh}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-black/20 rounded-lg">
                <span className="text-gray-400 text-sm">Can Chi</span>
                <span className={`font-bold ${result.details.canChi.includes('Tốt') ? 'text-green-400' : 'text-yellow-400'}`}>
                  {result.details.canChi}
                </span>
              </div>
            </div>

            <div className="bg-gold-500/10 border border-gold-500/20 p-4 rounded-xl">
              <div className="flex gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-gold-400" />
                <h4 className="font-bold text-gold-400">Lời khuyên</h4>
              </div>
              <p className="text-sm text-gray-200 leading-relaxed">
                {result.advice}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function TinhDuyenPage() {
  return <TinhDuyenContent />;
}
