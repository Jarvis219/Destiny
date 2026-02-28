'use client';

import { useState } from 'react';
import { useUser } from '@/store/UserContext';
import { generateMonthCalendar } from '@/utils/astroCalculator';
import { motion } from 'motion/react';
import { ChevronLeft, Calendar as CalendarIcon, ChevronRight } from 'lucide-react';
import Link from 'next/link';

function NgayTotContent() {
  const { profile } = useUser();
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState<any>(null);

  if (!profile) return null;

  const calendar = generateMonthCalendar(month, year);

  const handlePrevMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
    setSelectedDay(null);
  };

  return (
    <div className="min-h-screen bg-mystic-900 pb-12">
      <div className="p-4 flex items-center gap-4 border-b border-white/10 bg-mystic-900/80 backdrop-blur-md sticky top-0 z-20">
        <Link href="/">
          <button className="p-2 rounded-full hover:bg-white/10">
            <ChevronLeft className="w-6 h-6 text-gold-400" />
          </button>
        </Link>
        <h1 className="text-xl font-serif font-bold text-white">Lịch Vạn Niên</h1>
      </div>

      <div className="p-4">
        {/* Month Selector */}
        <div className="flex items-center justify-between mb-6 bg-mystic-800/50 p-4 rounded-xl border border-white/5">
          <button onClick={handlePrevMonth} className="p-2 hover:bg-white/10 rounded-full">
            <ChevronLeft className="w-5 h-5 text-gold-400" />
          </button>
          <div className="text-center">
            <h2 className="text-lg font-bold text-white">Tháng {month}, {year}</h2>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Năm {year % 2 === 0 ? 'Bính Ngọ' : 'Đinh Mùi'}</p>
          </div>
          <button onClick={handleNextMonth} className="p-2 hover:bg-white/10 rounded-full">
            <ChevronRight className="w-5 h-5 text-gold-400" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(d => (
            <div key={d} className="text-center text-xs text-gray-500 font-bold py-2">{d}</div>
          ))}
          
          {/* Padding for start of month (simplified, assuming start on Mon for demo or random) */}
          {/* In real app, calculate day of week for 1st of month */}
          {Array.from({ length: new Date(year, month - 1, 1).getDay() }).map((_, i) => (
            <div key={`pad-${i}`} />
          ))}

          {calendar.map((day) => (
            <motion.button
              key={day.day}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedDay(day)}
              className={`aspect-square rounded-lg flex flex-col items-center justify-center relative ${
                selectedDay?.day === day.day 
                  ? 'bg-gold-500 text-mystic-900 font-bold' 
                  : day.type === 'good' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : day.type === 'bad' 
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                      : 'bg-white/5 text-gray-300'
              }`}
            >
              <span className="text-sm">{day.day}</span>
              {day.type === 'good' && <span className="w-1 h-1 rounded-full bg-green-400 mt-1"></span>}
              {day.type === 'bad' && <span className="w-1 h-1 rounded-full bg-red-400 mt-1"></span>}
            </motion.button>
          ))}
        </div>

        {/* Selected Day Detail */}
        {selectedDay && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-mystic-800 border border-gold-500/20 rounded-xl p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-serif text-gold-400">Ngày {selectedDay.day}</h3>
                <p className="text-sm text-gray-400">Tháng {month} năm {year}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                selectedDay.type === 'good' ? 'bg-green-500/20 text-green-400' :
                selectedDay.type === 'bad' ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'
              }`}>
                {selectedDay.type === 'good' ? 'Hoàng Đạo' : selectedDay.type === 'bad' ? 'Hắc Đạo' : 'Bình Thường'}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs uppercase text-gray-500 mb-1">Giờ tốt</h4>
                <p className="text-white">{selectedDay.goodHours}</p>
              </div>
              
              <div>
                <h4 className="text-xs uppercase text-gray-500 mb-1">Việc nên làm</h4>
                <p className="text-gray-300 text-sm">
                  {selectedDay.type === 'good' 
                    ? 'Khai trương, cưới hỏi, xuất hành, ký kết hợp đồng.' 
                    : selectedDay.type === 'bad' 
                      ? 'Tránh việc quan trọng, cẩn thận đi lại.' 
                      : 'Làm việc bình thường, tu dưỡng tâm tính.'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function NgayTotPage() {
  return <NgayTotContent />;
}
