import { seededRandom } from './astroCalculator';

export interface Palace {
  id: number;
  name: string;
  score: number;
  description: string;
  stars: string[];
}

const PALACE_NAMES = [
  'Mệnh', 'Phụ Mẫu', 'Phúc Đức', 'Điền Trạch', 'Quan Lộc', 'Nô Bộc',
  'Thiên Di', 'Tật Ách', 'Tài Bạch', 'Tử Tức', 'Phu Thê', 'Huynh Đệ'
];

const GOOD_STARS = ['Tử Vi', 'Thiên Cơ', 'Thái Dương', 'Vũ Khúc', 'Thiên Đồng', 'Liêm Trinh'];
const BAD_STARS = ['Kình Dương', 'Đà La', 'Hỏa Tinh', 'Linh Tinh', 'Địa Không', 'Địa Kiếp'];

export const generateHoroscopeChart = (year: number, month: number, day: number, hour: number): Palace[] => {
  const seedBase = year * 10000 + month * 100 + day + hour;
  
  return PALACE_NAMES.map((name, index) => {
    const palaceSeed = seedBase + index;
    const score = Math.floor(seededRandom(palaceSeed) * 40) + 60; // 60-100 range for demo positivity
    
    // Pick random stars
    const hasGoodStar = seededRandom(palaceSeed * 2) > 0.3;
    const hasBadStar = seededRandom(palaceSeed * 3) > 0.7;
    
    const stars = [];
    if (hasGoodStar) stars.push(GOOD_STARS[Math.floor(seededRandom(palaceSeed * 4) * GOOD_STARS.length)]);
    if (hasBadStar) stars.push(BAD_STARS[Math.floor(seededRandom(palaceSeed * 5) * BAD_STARS.length)]);
    if (stars.length === 0) stars.push('Tuần');

    let description = '';
    if (score > 90) description = 'Cung này cực thịnh, mọi sự hanh thông.';
    else if (score > 80) description = 'Vận khí tốt, có quý nhân phù trợ.';
    else if (score > 70) description = 'Bình hòa, cần nỗ lực sẽ thành công.';
    else description = 'Có chút trắc trở, cần cẩn trọng.';

    return {
      id: index,
      name,
      score,
      description,
      stars
    };
  });
};
