'use client';

import { useState } from 'react';
import { useUser, UserProvider } from '@/store/UserContext';
import { getPeriodHoroscope } from '@/utils/astroCalculator';
import { motion } from 'motion/react';
import { ChevronLeft, Briefcase, Heart, DollarSign, Activity, Sun } from 'lucide-react';
import Link from 'next/link';

function ThoiGianContent() {
  const { profile } = useUser();
  const [activeTab, setActiveTab] = useState<'day' | 'month' | 'year'>('day');

  if (!profile) return null;

  const now = new Date();
  // Simple values for seeding
  const timeValue = activeTab === 'day' ? now.getDate() : activeTab === 'month' ? now.getMonth() + 1 : now.getFullYear();
  
  const data = getPeriodHoroscope(profile.year, activeTab, timeValue);

  const tabs = [
    { id: 'day', label: 'Hôm Nay' },
    { id: 'month', label: 'Tháng Này' },
    { id: 'year', label: 'Năm Nay' }
  ];

  const metrics = [
    { label: 'Công Việc', value: data.work, icon: <Briefcase className="w-5 h-5 text-blue-400" />, color: 'bg-blue-500' },
    { label: 'Tài Lộc', value: data.money, icon: <DollarSign className="w-5 h-5 text-yellow-400" />, color: 'bg-yellow-500' },
    { label: 'Tình Cảm', value: data.love, icon: <Heart className="w-5 h-5 text-pink-400" />, color: 'bg-pink-500' },
    { label: 'Sức Khỏe', value: data.health, icon: <Activity className="w-5 h-5 text-green-400" />, color: 'bg-green-500' },
  ];

  return (
    <div className="min-h-screen bg-mystic-900 pb-12">
      <div className="p-4 flex items-center gap-4 border-b border-white/10 bg-mystic-900/80 backdrop-blur-md sticky top-0 z-20">
        <Link href="/">
          <button className="p-2 rounded-full hover:bg-white/10">
            <ChevronLeft className="w-6 h-6 text-gold-400" />
          </button>
        </Link>
        <h1 className="text-xl font-serif font-bold text-white">Luận Giải Thời Vận</h1>
      </div>

      <div className="p-4">
        {/* Tabs */}
        <div className="flex bg-mystic-800/50 p-1 rounded-xl mb-6 border border-white/5">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                activeTab === tab.id 
                  ? 'bg-gold-500 text-mystic-900 shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Score */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <div className="relative inline-block">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="60"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-white/10"
              />
              <circle
                cx="64"
                cy="64"
                r="60"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={377}
                strokeDashoffset={377 - (377 * data.score) / 100}
                className="text-gold-500 transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-white">{data.score}</span>
              <span className="text-xs text-gray-400 uppercase">Điểm Vận</span>
            </div>
          </div>
          <p className="mt-4 text-gold-200 italic px-8">&quot;{data.advice}&quot;</p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 gap-4">
          {metrics.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-4"
            >
              <div className="p-3 bg-white/5 rounded-full">
                {metric.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-white">{metric.label}</span>
                  <span className="text-gray-400">{metric.value}/100</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    className={`h-full ${metric.color}`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Action Items */}
        <div className="mt-8 grid grid-cols-2 gap-4">
           <div className="bg-green-900/20 border border-green-500/20 p-4 rounded-xl">
             <h4 className="text-green-400 font-bold mb-2 text-sm uppercase">Nên Làm</h4>
             <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
               <li>Xuất hành hướng Đông</li>
               <li>Ký kết hợp đồng</li>
               <li>Thăm hỏi người thân</li>
             </ul>
           </div>
           <div className="bg-red-900/20 border border-red-500/20 p-4 rounded-xl">
             <h4 className="text-red-400 font-bold mb-2 text-sm uppercase">Nên Tránh</h4>
             <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
               <li>Tranh cãi, kiện tụng</li>
               <li>Đi xa về khuya</li>
               <li>Đầu tư mạo hiểm</li>
             </ul>
           </div>
        </div>
      </div>
    </div>
  );
}

export default function ThoiGianPage() {
  return (
    <UserProvider>
      <ThoiGianContent />
    </UserProvider>
  );
}
