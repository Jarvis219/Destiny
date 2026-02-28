'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useUser } from '@/store/UserContext';
import { CHI } from '@/data/constants';
import { ChevronRight, User } from 'lucide-react';
import CustomSelect from './CustomSelect';

export default function Onboarding() {
  const { setProfile } = useUser();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male' as 'male' | 'female',
    day: 1,
    month: 1,
    year: 1990,
    hour: 0 // Ty
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit
      setProfile(formData);
      // No need to push router, parent component will re-render
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => ({ label: (currentYear - i).toString(), value: currentYear - i }));
  const days = Array.from({ length: 31 }, (_, i) => ({ label: (i + 1).toString(), value: i + 1 }));
  const months = Array.from({ length: 12 }, (_, i) => ({ label: `T${i + 1}`, value: i + 1 }));
  const hours = CHI.map((chi, index) => ({ label: `Giờ ${chi}`, value: index }));

  return (
    <div className="min-h-screen flex flex-col p-6 pt-12 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-serif text-gold-400 mb-2">Nhập thông tin</h1>
        <p className="text-mystic-200 text-sm">Để luận giải chính xác lá số của bạn</p>
      </motion.div>

      <div className="flex-1">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="text-gold-200 text-sm uppercase tracking-wider">Họ và tên</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-500/50" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-mystic-800/50 border border-gold-500/20 rounded-xl py-4 pl-10 pr-4 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all"
                  placeholder="Nhập tên của bạn"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gold-200 text-sm uppercase tracking-wider">Giới tính</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setFormData({ ...formData, gender: 'male' })}
                  className={`py-4 rounded-xl border transition-all ${
                    formData.gender === 'male'
                      ? 'bg-gold-500/20 border-gold-500 text-gold-400'
                      : 'bg-mystic-800/50 border-gold-500/10 text-gray-400'
                  }`}
                >
                  Nam
                </button>
                <button
                  onClick={() => setFormData({ ...formData, gender: 'female' })}
                  className={`py-4 rounded-xl border transition-all ${
                    formData.gender === 'female'
                      ? 'bg-gold-500/20 border-gold-500 text-gold-400'
                      : 'bg-mystic-800/50 border-gold-500/10 text-gray-400'
                  }`}
                >
                  Nữ
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="text-gold-200 text-sm uppercase tracking-wider mb-2 block">Ngày sinh (Dương lịch)</label>
              <div className="grid grid-cols-3 gap-3">
                <CustomSelect
                  value={formData.day}
                  onChange={(val) => setFormData({ ...formData, day: val })}
                  options={days}
                  placeholder="Ngày"
                />
                <CustomSelect
                  value={formData.month}
                  onChange={(val) => setFormData({ ...formData, month: val })}
                  options={months}
                  placeholder="Tháng"
                />
                <CustomSelect
                  value={formData.year}
                  onChange={(val) => setFormData({ ...formData, year: val })}
                  options={years}
                  placeholder="Năm"
                />
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <CustomSelect
              label="Giờ sinh"
              value={formData.hour}
              onChange={(val) => setFormData({ ...formData, hour: val })}
              options={hours}
              placeholder="Chọn giờ sinh"
            />
          </motion.div>
        )}
      </div>

      <div className="mt-8 flex justify-between items-center">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="text-gray-400 px-4 py-2"
          >
            Quay lại
          </button>
        ) : <div></div>}
        
        <button
          onClick={handleNext}
          className="bg-gradient-to-r from-gold-600 to-gold-400 text-mystic-900 font-bold py-3 px-8 rounded-full shadow-lg shadow-gold-500/20 flex items-center gap-2 active:scale-95 transition-transform"
        >
          {step === 3 ? 'Xem Tử Vi' : 'Tiếp tục'}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {step === 1 && (
        <button 
          onClick={() => {
            setFormData({
              name: 'Nguyễn Văn A',
              gender: 'male',
              day: 15,
              month: 8,
              year: 1995,
              hour: 4 // Thin
            });
            setStep(3);
          }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-500 underline"
        >
          Dùng thử (Demo User)
        </button>
      )}
      
      {/* Progress Dots */}
      <div className="absolute top-6 right-6 flex gap-2">
        {[1, 2, 3].map(i => (
          <div 
            key={i} 
            className={`w-2 h-2 rounded-full transition-colors ${step >= i ? 'bg-gold-500' : 'bg-mystic-700'}`}
          />
        ))}
      </div>
    </div>
  );
}
