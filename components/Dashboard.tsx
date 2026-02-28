'use client';

import { useUser } from '@/store/UserContext';
import { calculateHoroscopeProfile } from '@/utils/astroCalculator';
import { motion } from 'motion/react';
import { Calendar, Heart, Star, Sun, Moon, Info } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const { profile } = useUser();

  if (!profile) return null;

  const astroProfile = calculateHoroscopeProfile(profile.day, profile.month, profile.year, profile.hour);

  const features = [
    {
      title: 'Lá Số Tử Vi',
      desc: 'Luận giải 12 cung mệnh',
      icon: <Star className="w-6 h-6 text-purple-300" />,
      color: 'from-purple-900/50 to-purple-800/50',
      href: '/tu-vi'
    },
    {
      title: 'Tình Duyên',
      desc: 'Xem hợp tuổi, xung khắc',
      icon: <Heart className="w-6 h-6 text-pink-300" />,
      color: 'from-pink-900/50 to-pink-800/50',
      href: '/tinh-duyen'
    },
    {
      title: 'Ngày Tốt Xấu',
      desc: 'Lịch vạn niên, giờ hoàng đạo',
      icon: <Calendar className="w-6 h-6 text-emerald-300" />,
      color: 'from-emerald-900/50 to-emerald-800/50',
      href: '/ngay-tot'
    },
    {
      title: 'Vận Hạn Thời Gian',
      desc: 'Dự báo Ngày / Tháng / Năm',
      icon: <Sun className="w-6 h-6 text-orange-300" />,
      color: 'from-orange-900/50 to-orange-800/50',
      href: '/thoi-gian'
    },
    {
      title: 'Gói Cao Cấp',
      desc: 'Mở khóa tính năng VIP',
      icon: <span className="text-xl">💎</span>,
      color: 'from-gold-600/50 to-gold-500/50',
      href: '/premium'
    }
  ];

  return (
    <div className="min-h-screen p-6 pb-24">
      {/* Header */}
      <header className="flex justify-between items-start mb-8 pt-4">
        <div>
          <h2 className="text-gold-200 text-sm uppercase tracking-wider mb-1">Xin chào,</h2>
          <h1 className="text-2xl font-serif font-bold text-white">{profile.name || 'Quý khách'}</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-gold-500/20 border border-gold-500/50 flex items-center justify-center">
          <span className="text-lg">☯️</span>
        </div>
      </header>

      {/* Main Info Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card rounded-2xl p-6 mb-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <span className="text-8xl font-serif">{astroProfile.animal}</span>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 text-xs font-bold border border-gold-500/20">
              {astroProfile.lunarYear}
            </span>
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/20">
              Mệnh {astroProfile.element}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <p className="text-gray-400 text-xs uppercase">Ngày Dương</p>
              <p className="text-white font-mono text-lg">{astroProfile.solarDate}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase">Tuổi Âm</p>
              <p className="text-white font-mono text-lg">{new Date().getFullYear() - profile.year + 1}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-2 gap-4">
        {features.map((feature, idx) => (
          <Link href={feature.href} key={idx}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-gradient-to-br ${feature.color} border border-white/5 p-4 rounded-2xl h-full flex flex-col justify-between hover:border-gold-500/30 transition-colors`}
            >
              <div className="mb-4 bg-black/20 w-10 h-10 rounded-full flex items-center justify-center">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-300">{feature.desc}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Daily Quote/Tip */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 p-4 rounded-xl bg-mystic-800/50 border border-white/5 flex gap-4 items-start"
      >
        <Info className="w-5 h-5 text-gold-500 shrink-0 mt-1" />
        <div>
          <h4 className="text-gold-400 font-bold text-sm mb-1">Lời khuyên hôm nay</h4>
          <p className="text-gray-300 text-sm italic">&quot;Họa phúc khôn lường, tâm an vạn sự an. Hãy giữ tâm thái bình tĩnh trước mọi biến động.&quot;</p>
        </div>
      </motion.div>
    </div>
  );
}
