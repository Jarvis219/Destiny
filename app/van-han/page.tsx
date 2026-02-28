'use client';

import { useUser } from '@/store/UserContext';
import { motion } from 'motion/react';
import { ChevronLeft, Sun, TrendingUp, Briefcase, Heart, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { getDailyHoroscope } from '@/utils/astroCalculator';
import { CHI } from '@/data/constants';

function VanHanContent() {
  const { profile } = useUser();

  if (!profile) return null;

  const currentYear = new Date().getFullYear();
  const age = currentYear - profile.year + 1;
  
  // Use current day for daily horoscope simulation in annual view (just for demo structure)
  // In real app, this would be annual stars calculation (Thai Bach, La Hau, etc.)
  // Let's simulate Annual Stars based on age/gender
  
  const saoNam = ['La Hầu', 'Thổ Tú', 'Thủy Diệu', 'Thái Bạch', 'Thái Dương', 'Vân Hớn', 'Kế Đô', 'Thái Âm', 'Mộc Đức'];
  const saoNu = ['Kế Đô', 'Vân Hớn', 'Mộc Đức', 'Thái Âm', 'Thổ Tú', 'La Hầu', 'Thái Dương', 'Thái Bạch', 'Thủy Diệu'];
  
  const starIndex = (age - 10) % 9;
  const star = profile.gender === 'male' 
    ? saoNam[Math.abs(starIndex)] || 'Thái Bạch' 
    : saoNu[Math.abs(starIndex)] || 'La Hầu';

  const isBadStar = ['La Hầu', 'Kế Đô', 'Thái Bạch'].includes(star);

  return (
    <div className="min-h-screen bg-mystic-900 pb-12">
      <div className="p-4 flex items-center gap-4 border-b border-white/10 bg-mystic-900/80 backdrop-blur-md sticky top-0 z-20">
        <Link href="/">
          <button className="p-2 rounded-full hover:bg-white/10">
            <ChevronLeft className="w-6 h-6 text-gold-400" />
          </button>
        </Link>
        <h1 className="text-xl font-serif font-bold text-white">Vận Hạn Năm {currentYear}</h1>
      </div>

      <div className="p-6 space-y-6">
        {/* Overview Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gold-600/20 to-mystic-800 border border-gold-500/30 rounded-2xl p-6 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50"></div>
          
          <p className="text-gold-200 text-sm uppercase tracking-widest mb-2">Sao Chiếu Mệnh</p>
          <h2 className="text-4xl font-serif font-bold text-white mb-2">{star}</h2>
          <p className={`text-sm ${isBadStar ? 'text-red-400' : 'text-green-400'} font-bold`}>
            {isBadStar ? 'Sao Xấu - Cần đề phòng' : 'Sao Tốt - Vượng khí'}
          </p>
        </motion.div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2 text-blue-300">
              <Briefcase className="w-5 h-5" />
              <span className="font-bold text-sm">Công Danh</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: isBadStar ? '40%' : '80%' }}
                className="h-full bg-blue-500"
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {isBadStar ? 'Năm nay công việc có chút trắc trở, kiên nhẫn.' : 'Thăng tiến tốt, có cơ hội mới.'}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2 text-pink-300">
              <Heart className="w-5 h-5" />
              <span className="font-bold text-sm">Tình Cảm</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '70%' }}
                className="h-full bg-pink-500"
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Gia đạo bình an, tình duyên thuận lợi.
            </p>
          </div>
        </div>

        {/* Warning Section */}
        <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-xl flex gap-4">
          <ShieldAlert className="w-8 h-8 text-red-400 shrink-0" />
          <div>
            <h3 className="text-red-400 font-bold mb-1">Hạn Tam Tai</h3>
            <p className="text-gray-300 text-sm">
              Năm nay bạn {['Thân', 'Tý', 'Thìn'].includes(CHI[(profile.year - 4) % 12]) ? 'phạm' : 'không phạm'} hạn Tam Tai.
              {['Thân', 'Tý', 'Thìn'].includes(CHI[(profile.year - 4) % 12]) && ' Cần chú ý sức khỏe và tiền bạc.'}
            </p>
          </div>
        </div>

        {/* Monthly Breakdown (Simplified) */}
        <div>
          <h3 className="text-gold-400 font-serif text-lg mb-4">Diễn biến các tháng</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6].map(m => (
              <div key={m} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg border border-white/5">
                <span className="text-gray-400 font-bold w-8">T{m}</span>
                <div className="flex-1">
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gold-500" 
                      style={{ width: `${(m * 17) % 60 + 20}%` }} // Deterministic demo value
                    />
                  </div>
                </div>
                <span className="text-xs text-gray-500">Bình thường</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VanHanPage() {
  return <VanHanContent />;
}
