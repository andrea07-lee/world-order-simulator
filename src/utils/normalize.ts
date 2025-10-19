// utils/normalize.ts

// 비례 정규화 (0~100)
export function normalize(value: number, min: number, max: number): number {
    return ((value - min) / (max - min)) * 100;
  }
  
  // 역비례 정규화 (낮을수록 좋음)
  export function normalizeInverse(value: number, min: number, max: number): number {
    return ((max - value) / (max - min)) * 100;
  }
  