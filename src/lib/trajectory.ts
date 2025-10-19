import { normalizeValue } from './normalize';
import { maxValueMap } from './maxValueMap';

export function calculateTrajectoryIndex(data: Record<string, number>): number {
  const scores: Record<string, number> = {};

  for (const key in data) {
    if (key === 'unrestIndex') {
      scores[key] = 100 - normalizeValue(data[key], maxValueMap[key]);
    } else if (key === 'innovationRank' || key === 'economicComplexityRank') {
      scores[key] = normalizeValue(data[key], maxValueMap[key], true);
    } else {
      scores[key] = normalizeValue(data[key], maxValueMap[key]);
    }
  }

  const index =
    0.10 * (scores.gdp + scores.growthRate) +
    0.075 * (scores.militarySpending + scores.armsExport) +
    0.075 * (scores.innovationRank + scores.productivity) +
    0.05 * (scores.higherEdRate + scores.avgYearsSchooling) +
    0.05 * (scores.globalCompetitiveness + scores.economicComplexityRank) +
    0.05 * (scores.tradeVolume + scores.tradeDependency) +
    0.035 * (scores.financialStability + scores.forexReserve) +
    0.03 * scores.currencyShare +
    0.0233 * scores.trustInGov +
    0.0233 * scores.ruleOfLaw +
    0.0233 * scores.unrestIndex +
    0.03 * scores.diplomacyScore;

  return Math.round(index * 100) / 100;
}