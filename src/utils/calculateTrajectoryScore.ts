// utils/calculateTrajectoryScore.ts

import { normalize, normalizeInverse } from './normalize';

export function calculateTrajectoryScore(data: any): number {
  const riseFactors = [
    normalize(data.productivity, 20, 80),             // USD/hour
    data.trust,                                       // %
    normalize(data.education, 0.5, 1.0),              // HDI
    normalize(data.ruleOfLaw + 2.5, 0, 5),            // WGI
    data.diplomacy,                                   // already 0–100
    normalize(data.growthRate + 5, 0, 15),            // –5 ~ +10%
  ];

  const declineFactors = [
    normalize(data.debt, 0, 200),                     // % of GDP
    normalizeInverse(data.civilUnrest, 1, 5),         // GPI → 낮을수록 안정
    data.corruption,                                  // CPI 0~100
    normalize(data.externalThreat, 0, 8),             // % of GDP
  ];

  const riseScore = average(riseFactors);
  const declineScore = average(declineFactors);

  const trajectoryRatio = declineScore / (riseScore + declineScore);
  return Math.min(Math.max(trajectoryRatio, 0), 1); // 0~1 사이로 제한
}

function average(arr: number[]): number {
  return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}
