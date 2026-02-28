import { getNguHanh, getCanChiYear } from './astroCalculator';

// Ngu Hanh Relationships
// Kim (1) -> Thủy (2) -> Mộc (5) -> Hỏa (3) -> Thổ (4) -> Kim (1)
// Sinh: 1->2, 2->5, 5->3, 3->4, 4->1
// Khắc: 1->5, 5->4, 4->2, 2->3, 3->1

const NGU_HANH_INDEX = {
  'Kim': 1,
  'Thủy': 2,
  'Hỏa': 3,
  'Thổ': 4,
  'Mộc': 5
};

const checkSinhKhac = (menh1: string, menh2: string) => {
  const v1 = NGU_HANH_INDEX[menh1 as keyof typeof NGU_HANH_INDEX];
  const v2 = NGU_HANH_INDEX[menh2 as keyof typeof NGU_HANH_INDEX];

  // Check Sinh
  if ((v1 === 1 && v2 === 2) || (v1 === 2 && v2 === 5) || (v1 === 5 && v2 === 3) || (v1 === 3 && v2 === 4) || (v1 === 4 && v2 === 1)) return { type: 'Sinh', score: 100, msg: 'Tương Sinh (Rất tốt)' };
  if ((v2 === 1 && v1 === 2) || (v2 === 2 && v1 === 5) || (v2 === 5 && v1 === 3) || (v2 === 3 && v1 === 4) || (v2 === 4 && v1 === 1)) return { type: 'Sinh', score: 90, msg: 'Tương Sinh (Tốt)' };

  // Check Khắc
  if ((v1 === 1 && v2 === 5) || (v1 === 5 && v2 === 4) || (v1 === 4 && v2 === 2) || (v1 === 2 && v2 === 3) || (v1 === 3 && v2 === 1)) return { type: 'Khắc', score: 20, msg: 'Tương Khắc (Xấu)' };
  if ((v2 === 1 && v1 === 5) || (v2 === 5 && v1 === 4) || (v2 === 4 && v1 === 2) || (v2 === 2 && v1 === 3) || (v2 === 3 && v1 === 1)) return { type: 'Khắc', score: 20, msg: 'Tương Khắc (Xấu)' };

  return { type: 'Bình', score: 50, msg: 'Bình Hòa' };
};

export const calculateCompatibility = (year1: number, year2: number) => {
  const menh1 = getNguHanh(year1);
  const menh2 = getNguHanh(year2);
  
  const canChi1 = getCanChiYear(year1);
  const canChi2 = getCanChiYear(year2);

  const nguHanhResult = checkSinhKhac(menh1, menh2);
  
  // Simple Can Chi check (Tam Hop / Tu Hanh Xung)
  // Tam Hop: (Chi1 - Chi2) % 4 == 0
  // Tu Hanh Xung: (Chi1 - Chi2) % 6 == 0 (simplified)
  
  let chiScore = 50;
  let chiMsg = 'Bình thường';
  
  const diff = Math.abs(canChi1.chiIndex - canChi2.chiIndex);
  
  if (diff === 4 || diff === 8) {
    chiScore = 100;
    chiMsg = 'Tam Hợp (Rất tốt)';
  } else if (diff === 6) {
    chiScore = 0;
    chiMsg = 'Lục Xung (Xấu)';
  } else if (diff === 3 || diff === 9) {
      // Tu Hanh Xung groups often considered roughly 3 apart in square, but 6 is direct clash.
      // Let's keep it simple.
      chiScore = 40;
      chiMsg = 'Không hợp lắm';
  }

  const totalScore = Math.floor((nguHanhResult.score * 0.6) + (chiScore * 0.4));
  
  return {
    score: totalScore,
    menh1,
    menh2,
    canChi1: canChi1.full,
    canChi2: canChi2.full,
    details: {
      nguHanh: nguHanhResult.msg,
      canChi: chiMsg
    },
    advice: totalScore > 70 ? 'Hai bạn rất hợp nhau, duyên tiền định.' : totalScore > 40 ? 'Có chút xung khắc nhưng có thể hóa giải bằng sự nhường nhịn.' : 'Xung khắc mạnh, cần cân nhắc kỹ hoặc tìm cách hóa giải phong thủy.'
  };
};
