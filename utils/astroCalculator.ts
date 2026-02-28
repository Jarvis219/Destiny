import { CAN, CHI, CAN_VALUE, CHI_VALUE, MENH_MAP } from '../data/constants';

// Simple Lunar Date Converter (Approximation for demo purposes)
// In a real app, use a library like 'lunisolar' or 'am-lich-js'
// Here we will implement the core logic for Can Chi and Menh which is deterministic

export const getCanChiYear = (year: number) => {
  const canIndex = (year - 4) % 10;
  const chiIndex = (year - 4) % 12;
  
  // Handle negative modulo if year is BC (unlikely but good practice)
  const normalizedCan = canIndex < 0 ? canIndex + 10 : canIndex;
  const normalizedChi = chiIndex < 0 ? chiIndex + 12 : chiIndex;

  return {
    can: CAN[normalizedCan],
    chi: CHI[normalizedChi],
    canIndex: normalizedCan,
    chiIndex: normalizedChi,
    full: `${CAN[normalizedCan]} ${CHI[normalizedChi]}`
  };
};

export const getNguHanh = (year: number) => {
  const { canIndex, chiIndex } = getCanChiYear(year);
  
  const canVal = CAN_VALUE[canIndex as keyof typeof CAN_VALUE];
  const chiVal = CHI_VALUE[chiIndex as keyof typeof CHI_VALUE];
  
  let sum = canVal + chiVal;
  if (sum > 5) sum = sum - 5;
  
  return MENH_MAP[sum as keyof typeof MENH_MAP] || 'Unknown';
};

// Calculate Lunar Date from Solar Date (Simplified Algorithm)
// This is a placeholder. For a real app, we need a full ephemeris.
// We will assume the user inputs Solar date and we calculate Can Chi based on Year/Month/Day/Hour rules.
// Note: Can/Chi of Year changes on Tet (Lunar New Year), not Jan 1st.
// For this MVP, we will approximate using the Solar Year for Can Chi Year calculation 
// but warn the user or assume standard offset.
// A better approach for MVP without heavy libraries:
// Use the standard formula which is generally correct for most of the year except Jan/Feb overlap.
// We will stick to the standard formula for now.

export const calculateHoroscopeProfile = (day: number, month: number, year: number, hour: number) => {
  const canChiYear = getCanChiYear(year);
  const menh = getNguHanh(year);
  
  // Calculate Can Chi Month
  // Rule: Based on Can of Year
  // Giáp, Kỷ -> Bính
  // Ất, Canh -> Mậu
  // Bính, Tân -> Canh
  // Đinh, Nhâm -> Nhâm
  // Mậu, Quý -> Giáp
  const monthStartCanIndex = (canChiYear.canIndex % 5) * 2 + 2; // Formula approximation
  // Month 1 starts at Dần (Index 2) usually? No, Lunar month 1 is Dần.
  // Let's simplify: Just return year info for MVP dashboard
  
  return {
    solarDate: `${day}/${month}/${year}`,
    lunarYear: canChiYear.full,
    element: menh,
    animal: CHI[canChiYear.chiIndex],
    zodiacIndex: canChiYear.chiIndex
  };
};

// Seeded Random Generator
export const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export const getDailyHoroscope = (birthYear: number, currentDay: number) => {
  // Create a seed based on birth year and current day
  const seed = birthYear + currentDay;
  const luckScore = Math.floor(seededRandom(seed) * 100);
  
  return {
    score: luckScore,
    work: Math.floor(seededRandom(seed + 1) * 100),
    love: Math.floor(seededRandom(seed + 2) * 100),
    health: Math.floor(seededRandom(seed + 3) * 100),
    money: Math.floor(seededRandom(seed + 4) * 100),
  };
};

export const generateMonthCalendar = (month: number, year: number) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  const days = [];
  
  for (let i = 1; i <= daysInMonth; i++) {
    const seed = year * 10000 + month * 100 + i;
    const score = Math.floor(seededRandom(seed) * 100);
    let type: 'good' | 'bad' | 'neutral' = 'neutral';
    
    if (score > 75) type = 'good';
    else if (score < 30) type = 'bad';
    
    // Determine Zodiac hour for the day (simplified)
    // Just picking a random "Good Hour" (Hoang Dao) based on seed
    const startHourIndex = Math.floor(seededRandom(seed + 1) * 12);
    const goodHours = [
      CHI[startHourIndex],
      CHI[(startHourIndex + 4) % 12],
      CHI[(startHourIndex + 8) % 12] // Tam Hop usually good
    ];

    days.push({
      day: i,
      score,
      type,
      goodHours: goodHours.join(', ')
    });
  }
  
  return days;
};

export const getPeriodHoroscope = (birthYear: number, period: 'day' | 'month' | 'year', value: number) => {
  const seed = birthYear + (period === 'day' ? value : period === 'month' ? value * 100 : value * 10000);
  
  return {
    score: Math.floor(seededRandom(seed) * 40) + 60,
    work: Math.floor(seededRandom(seed + 1) * 40) + 60,
    money: Math.floor(seededRandom(seed + 2) * 40) + 60,
    love: Math.floor(seededRandom(seed + 3) * 40) + 60,
    health: Math.floor(seededRandom(seed + 4) * 40) + 60,
    advice: period === 'day' 
      ? 'Hôm nay là ngày tốt để bắt đầu những dự định mới.' 
      : period === 'month' 
        ? 'Tháng này vận khí hanh thông, tài lộc dồi dào.' 
        : 'Năm nay là năm bản lề, cần nỗ lực hết mình.'
  };
};
