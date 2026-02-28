// Constants for Horoscope Calculations

export const CAN = [
  'Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'
];

export const CHI = [
  'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'
];

export const NGU_HANH = [
  'Kim', 'Thủy', 'Hỏa', 'Thổ', 'Mộc'
];

export const CUNG_MENH_NAM = [
  'Khảm', 'Ly', 'Cấn', 'Đoài', 'Càn', 'Khôn', 'Tốn', 'Chấn', 'Khôn'
];

export const CUNG_MENH_NU = [
  'Cấn', 'Càn', 'Đoài', 'Cấn', 'Ly', 'Khảm', 'Khôn', 'Chấn', 'Tốn'
];

// Mapping for Ngu Hanh calculation based on Can Chi
// Value = (Can Value + Chi Value) % 5
// If result > 5, subtract 5.
// Can Values:
// Giáp, Ất = 1
// Bính, Đinh = 2
// Mậu, Kỷ = 3
// Canh, Tân = 4
// Nhâm, Quý = 5
export const CAN_VALUE = {
  0: 1, 1: 1, // Giáp, Ất
  2: 2, 3: 2, // Bính, Đinh
  4: 3, 5: 3, // Mậu, Kỷ
  6: 4, 7: 4, // Canh, Tân
  8: 5, 9: 5  // Nhâm, Quý
};

// Chi Values:
// Tý, Sửu, Ngọ, Mùi = 0
// Dần, Mão, Thân, Dậu = 1
// Thìn, Tỵ, Tuất, Hợi = 2
export const CHI_VALUE = {
  0: 0, 1: 0, 6: 0, 7: 0,
  2: 1, 3: 1, 8: 1, 9: 1,
  4: 2, 5: 2, 10: 2, 11: 2
};

// Result mapping to Element (Menh)
// 1 = Kim, 2 = Thủy, 3 = Hỏa, 4 = Thổ, 5 = Mộc
export const MENH_MAP = {
  1: 'Kim',
  2: 'Thủy',
  3: 'Hỏa',
  4: 'Thổ',
  5: 'Mộc'
};

export const ZODIAC_ANIMALS = [
  'Rat', 'Ox', 'Tiger', 'Cat', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'
];

export const ZODIAC_ICONS = [
  '🐭', '🐮', '🐯', '🐱', '🐲', '🐍', '🐴', '🐐', '🐵', '🐔', '🐶', '🐷'
];
