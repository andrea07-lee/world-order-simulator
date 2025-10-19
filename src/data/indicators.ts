// src/data/indicators.ts
import raw from './indicators.json';
import type { CanonicalIndicators } from './types';

const toNum = (v: unknown): number | undefined => {
  if (v === null || v === undefined) return undefined;
  if (typeof v === 'number') return v;
  const s = String(v).trim();
  if (!s) return undefined;
  const cleaned = s.replace(/[^0-9.\-]/g, '');
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : undefined;
};

type RawRow = Record<string, unknown>;

export const indicators: CanonicalIndicators[] = (raw as RawRow[]).map((r) => ({
  iso3: String(r['Country Code'] ?? r['iso3'] ?? '').trim(),
  country: String(r['Country Name'] ?? r['country'] ?? '').trim(),
  year: toNum(r['year'] ?? r['Year']),

  population_total: toNum(r['population_total']),
  gdp_ppp_current_intl: toNum(r['gdp_ppp_current_intl$'] ?? r['gdp_ppp_current_intl']), // $ 처리
  trade_pct_gdp: toNum(r['trade_pct_gdp']),
  military_expenditure_pct_gdp: toNum(r['military_expenditure_pct_gdp']),
  co2_tonnes_per_capita: toNum(r['co2_tonnes_per_capita']),  // ← 추가
  democracy_index: toNum(r['democracy_index']),
  hdi: toNum(r['hdi']),                                       // ← 추가
}));
