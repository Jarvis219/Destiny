'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/store/UserContext';
import { motion } from 'motion/react';
import { ChevronLeft, Save, User, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import CustomSelect from '@/components/CustomSelect';
import { CHI } from '@/data/constants';
import { useRouter } from 'next/navigation';

function ProfileContent() {
  const { profile, setProfile, clearProfile } = useUser();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male' as 'male' | 'female',
    day: 1,
    month: 1,
    year: 1990,
    hour: 0
  });

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  if (!profile) return null;

  const handleSave = () => {
    setProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm('Bạn có chắc chắn muốn xóa dữ liệu và nhập lại từ đầu?')) {
      clearProfile();
      router.push('/');
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => ({ label: (currentYear - i).toString(), value: currentYear - i }));
  const days = Array.from({ length: 31 }, (_, i) => ({ label: (i + 1).toString(), value: i + 1 }));
  const months = Array.from({ length: 12 }, (_, i) => ({ label: `T${i + 1}`, value: i + 1 }));
  const hours = CHI.map((chi, index) => ({ label: `Giờ ${chi}`, value: index }));

  return (
    <div className="min-h-screen bg-mystic-900 pb-12">
      <div className="p-4 flex items-center justify-between border-b border-white/10 bg-mystic-900/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <Link href="/">
            <button className="p-2 rounded-full hover:bg-white/10">
              <ChevronLeft className="w-6 h-6 text-gold-400" />
            </button>
          </Link>
          <h1 className="text-xl font-serif font-bold text-white">Hồ Sơ</h1>
        </div>
        <button 
          onClick={handleReset}
          className="p-2 text-red-400 hover:bg-red-500/10 rounded-full"
          title="Nhập lại từ đầu"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gold-500/10 border-2 border-gold-500/50 flex items-center justify-center relative">
            <User className="w-12 h-12 text-gold-400" />
            <div className="absolute bottom-0 right-0 bg-mystic-800 rounded-full p-1 border border-gold-500/30">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
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

          <div className="space-y-2">
            <CustomSelect
              label="Giờ sinh"
              value={formData.hour}
              onChange={(val) => setFormData({ ...formData, hour: val })}
              options={hours}
              placeholder="Chọn giờ sinh"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-gold-600 to-gold-400 text-mystic-900 font-bold py-4 rounded-xl shadow-lg shadow-gold-500/20 flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            {isSaved ? (
              <>
                <span className="text-lg">✓</span> Đã Lưu
              </>
            ) : (
              <>
                <Save className="w-5 h-5" /> Lưu Thay Đổi
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return <ProfileContent />;
}
