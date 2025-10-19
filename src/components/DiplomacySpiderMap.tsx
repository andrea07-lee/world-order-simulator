'use client';

// File: src/components/DiplomacySpiderMap.tsx
// Desc: Korea-centric diplomatic spider map with CSV auto-parser (baseline includes USA+CHN+JPN+RUS+IND)

import React, { useMemo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ===== Types =====
export type IndicatorKey =
  | 'military'
  | 'treaty'
  | 'trade'
  | 'students'
  | 'votes'
  | 'culture'
  | 'composite';

type Country = {
  code: string;
  name: string;
  name_kr: string;
};

type LinkDatum = {
  from: string;
  to: string;
  indicators: Record<IndicatorKey, number | null>;
  notes?: Partial<Record<IndicatorKey, string>>;
};

type DataSet = {
  center: Country;
  neighbors: Country[];
  links: LinkDatum[];
};

// ===== Props =====
export type DiplomacySpiderMapProps = {
  className?: string;
  showUploader?: boolean; // default true
  maxWidth?: number; // px
  adjustment?: Record<string, number>; // ✅ 추가: 외부에서 조정값 받기
  countryCode: string;
};

// ===== USA baseline + 이웃 4개(중/일/러/인) — 실제 정규화 값 반영 =====
// 수치 출처: 네가 준 2024 CSV(행 단위 수치)로 정규화한 결과
const BASE: DataSet = {
  center: { code: 'KOR', name: 'South Korea', name_kr: '대한민국' },
  neighbors: [
    { code: 'USA', name: 'United States', name_kr: '미국' },
    { code: 'CHN', name: 'China', name_kr: '중국' },
    { code: 'JPN', name: 'Japan', name_kr: '일본' },
    { code: 'RUS', name: 'Russia', name_kr: '러시아' },
    { code: 'IND', name: 'India', name_kr: '인도' },
  ],
  links: [
    // --- USA (합의한 2024 테이블 기반) ---
    {
      from: 'KOR',
      to: 'USA',
      indicators: {
        treaty: 0.7366666666666667,
        military: 0.4776,
        trade: 0.4594666666666667,
        students: 0.41010138888888886,
        votes: 0.46,
        culture: null,
        composite: null,
      },
      notes: {
        treaty: '동맹⦁정상회담⦁UN 투표일치 기반(2024)',
        military: '합동훈련≈40회, 방위비분담 14억달러, 무기수출 7.28억달러',
        trade: '무역 2,396억달러, FDI 11,384억달러, 무역비중 평균 9.9%',
        students: '유학생 KR→US 39,491명, US→KR 3,400명, 관광 170만명',
        votes: 'UN 총회 투표일치율 46%(2024)',
      },
    },
    // --- CHN (CSV 정규화 반영) ---
    {
      from: 'KOR',
      to: 'CHN',
      indicators: {
        treaty: 0.2733333333333333,
        military: 0,
        trade: 0.4105666666666667,
        students: 0.52,
        votes: 0.22,
        culture: 0.5411111111111111,
        composite: null,
      },
      notes: {
        treaty: '동맹 0, 정상회담 12/20, UN 22%',
        military: '합동훈련 0/50, 무기거래 0/1000(M$)',
        trade: '무역 2,866억$, FDI_in 36억$, 비중 19.7%',
        students: '유학 31,000, 관광 250만, 이민 100만+',
        votes: 'UN 22%',
        culture: '행사 220, 미디어 6억$, 자매 70',
      },
    },
    // --- JPN (CSV 정규화 반영) ---
    {
      from: 'KOR',
      to: 'JPN',
      indicators: {
        treaty: 0.58,
        military: 0.075, // (5~10) 중앙값 7.5 → /50
        trade: 0.11856666666666667,
        students: 0.339,
        votes: 0.84,
        culture: 0.6138888888888889,
        composite: null,
      },
      notes: {
        treaty: '동맹X, 정상회담 18/20, UN 84%',
        military: '합동훈련 5~10회(중간 7.5), 무기거래 0M$',
        trade: '무역 865억$, FDI_in 250억$, 비중 5.1%',
        students: '유학 2,700, 관광 930만, 이민 6만',
        votes: 'UN 84%',
        culture: '행사 300+, 미디어 7억$, 자매 65',
      },
    },
    // --- RUS (CSV 정규화 반영) ---
    {
      from: 'KOR',
      to: 'RUS',
      indicators: {
        treaty: 0.22666666666666666,
        military: 0,
        trade: 0.03900000000000001,
        students: 0.08766666666666667,
        votes: 0.18,
        culture: 0.18555555555555556,
        composite: null,
      },
      notes: {
        treaty: '동맹 0, 정상회담 10/20, UN 18%',
        military: '합동훈련 0/50, 무기거래 0/1000(M$)',
        trade: '무역 214억$, FDI_in 18억$, 비중 2.2%',
        students: '유학 4,800, 관광 15만, 이민 20만',
        votes: 'UN 18%',
        culture: '행사 120, 미디어 0.5억$, 자매 32',
      },
    },
    // --- IND (CSV 정규화 반영) ---
    {
      from: 'KOR',
      to: 'IND',
      indicators: {
        treaty: 0.2633333333333333,
        military: 0.12,
        trade: 0.058033333333333336,
        students: 0.021,
        votes: 0.34,
        culture: 0.17833333333333334,
        composite: null,
      },
      notes: {
        treaty: '동맹 0, 정상회담 9/20, UN 34%',
        military: '합동훈련 2/50, 무기거래 200/1000(M$)',
        trade: '무역 278억$, FDI_in 100억$, 비중 3.4%',
        students: '유학 2,500, 관광 13만, 이민 2.5만',
        votes: 'UN 34%',
        culture: '행사 105, 미디어 2억$, 자매 15',
      },
    },
  ],
};

// ===== CSV → Indicators mapping =====
const K2C: Record<string, Country> = {
  미국: { code: 'USA', name: 'United States', name_kr: '미국' },
  중국: { code: 'CHN', name: 'China', name_kr: '중국' },
  일본: { code: 'JPN', name: 'Japan', name_kr: '일본' },
  러시아: { code: 'RUS', name: 'Russia', name_kr: '러시아' },
  인도: { code: 'IND', name: 'India', name_kr: '인도' },
  // ▶ 새로운 국가를 CSV로 추가하려면 위 맵과 BASE.neighbors에 엔트리 확장 필요
};

const DOM = {
  treaty: { summitMax: 20, voteMax: 100 },
  military: { drillsMax: 50, armsMMax: 1000 }, // M$ arms trade
  trade: { totalMax: 5000, fdiInMax: 20000, shareMax: 30 }, // 억달러
  people: { studentsMax: 100000, touristsMax: 10000000, migrantsMax: 1000000 },
  culture: { eventsMax: 500, mediaEokMax: 10, sisterMax: 120 }, // 억달러
};

// ===== Helpers =====
function clampNumFromText(raw: string): number | null {
  if (!raw) return null;
  const s = String(raw).trim();
  const range = s.match(/(\d+(?:\.\d+)?)\s*~\s*(\d+(?:\.\d+)?)/);
  if (range) return (parseFloat(range[1]) + parseFloat(range[2])) / 2;
  const plus = s.match(/(\d+(?:\.\d+)?)\s*\+$/);
  if (plus) return parseFloat(plus[1]);
  const m = s.replace(/,/g, '').match(/(\d+(?:\.\d+)?)/);
  return m ? parseFloat(m[1]) : null;
}

function allianceBinary(val: string): number {
  if (!val) return 0;
  const s = val.toLowerCase();
  if (s.includes('동맹x')) return 0;
  if (s.includes('상호방위') || s.includes('동맹')) return 1;
  return 0;
}

function parseFDIInboundToKorea(val: string): number | null {
  if (!val) return null;
  const m = val.replace(/,/g, '').match(/→한국\s*(\d+(?:\.\d+)?)/);
  if (m) return parseFloat(m[1]);
  return clampNumFromText(val);
}

function avg(nums: Array<number | null | undefined>): number | null {
  const arr = nums.filter((x): x is number => typeof x === 'number' && isFinite(x));
  if (!arr.length) return null;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function norm(x: number | null, max: number): number | null {
  if (x == null) return null;
  return Math.max(0, Math.min(1, x / max));
}

function buildLinkFromGrouped(countryKr: string, group: Record<string, { 단위: string; 수치: string }>): LinkDatum | null {
  const neigh = K2C[countryKr];
  if (!neigh) return null;

  const ally = allianceBinary(group?.['동맹여부']?.수치 ?? '');
  const summits = clampNumFromText(group?.['정상회담 횟수(10년)']?.수치 ?? '');
  const votePct = clampNumFromText(group?.['UN총회 투표 일치율']?.수치 ?? '');
  const treaty = avg([ally, norm(summits, DOM.treaty.summitMax), norm(votePct, DOM.treaty.voteMax)]);

  const drills = clampNumFromText(group?.['합동 군사훈련 횟수']?.수치 ?? '');
  const armsM = clampNumFromText(group?.['무기거래액']?.수치 ?? '');
  const military = avg([norm(drills, DOM.military.drillsMax), norm(armsM, DOM.military.armsMMax)]);

  const totalTrade = clampNumFromText(group?.['무역 총액(상품+서비스)']?.수치 ?? '');
  const fdiIn = parseFDIInboundToKorea(group?.['FDI 잔액']?.수치 ?? '');
  const sharePct = clampNumFromText(group?.['상호수출입 비중']?.수치 ?? '');
  const trade = avg([norm(totalTrade, DOM.trade.totalMax), norm(fdiIn, DOM.trade.fdiInMax), norm(sharePct, DOM.trade.shareMax)]);

  const students = clampNumFromText(group?.['상대국 유학생 수']?.수치 ?? '');
  const tourists = clampNumFromText(group?.['관광객 수 합산']?.수치 ?? '');
  const migrants = clampNumFromText(group?.['이민자·영주권자 수']?.수치 ?? '');
  const studentsIdx = avg([norm(students, DOM.people.studentsMax), norm(tourists, DOM.people.touristsMax), norm(migrants, DOM.people.migrantsMax)]);

  const votesIdx = norm(votePct, DOM.treaty.voteMax);

  const events = clampNumFromText(group?.['공동 문화행사 수']?.수치 ?? '');
  const mediaEok = clampNumFromText(group?.['미디어·콘텐츠 교류']?.수치 ?? '');
  const sister = clampNumFromText(group?.['자매도시 수']?.수치 ?? '');
  const culture = avg([norm(events, DOM.culture.eventsMax), norm(mediaEok, DOM.culture.mediaEokMax), norm(sister, DOM.culture.sisterMax)]);

  const notes: LinkDatum['notes'] = {
    treaty: `동맹:${ally} 정상:${summits ?? '-'} / ${DOM.treaty.summitMax} UN:${votePct ?? '-'}%`,
    military: `훈련:${drills ?? '-'} / ${DOM.military.drillsMax} 무기:${armsM ?? '-'}M$ / ${DOM.military.armsMMax}`,
    trade: `무역:${totalTrade ?? '-'} FDI_in:${fdiIn ?? '-'} 비중:${sharePct ?? '-'}%`,
    students: `유학:${students ?? '-'} 관광:${tourists ?? '-'} 이민:${migrants ?? '-'}`,
    votes: `UN:${votePct ?? '-'}%`,
    culture: `행사:${events ?? '-'} 미디어:${mediaEok ?? '-'} 자매:${sister ?? '-'}`,
  };

  return {
    from: 'KOR',
    to: neigh.code,
    indicators: {
      military: military ?? null,
      treaty: treaty ?? null,
      trade: trade ?? null,
      students: studentsIdx ?? null,
      votes: votesIdx ?? null,
      culture: culture ?? null,
      composite: null,
    },
    notes,
  };
}

function parseCSV(text: string) {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (!lines.length) return [] as any[];
  const header = lines[0].split(',').map((h) => h.trim());
  const rows = lines.slice(1).map((ln) => {
    const cols = ln.split(',').map((c) => c.trim());
    const obj: any = {};
    header.forEach((h, i) => (obj[h] = cols[i] ?? ''));
    return obj as { 국가: string; 범주: string; 지표명: string; 단위: string; 수치: string; 연도: string };
  });
  return rows;
}

function groupByCountryAndIndicator(rows: ReturnType<typeof parseCSV>) {
  const grouped: Record<string, Record<string, { 단위: string; 수치: string }>> = {};
  rows.forEach((r) => {
    const c = r.국가?.trim();
    if (!K2C[c]) return; // 등록된 이웃만 반영 (새 국가 추가 시 K2C/BASE.neighbors 확장)
    if (!grouped[c]) grouped[c] = {} as any;
    grouped[c][r.지표명?.trim()] = { 단위: r.단위, 수치: r.수치 };
  });
  return grouped;
}

// ===== Range-based normalizer (identity for 0..1 inputs) =====
function buildNorm(data: DataSet) {
  const keys: IndicatorKey[] = ['military', 'treaty', 'trade', 'students', 'votes', 'culture'];
  const already01: Record<IndicatorKey, boolean> = {
    military: false,
    treaty: false,
    trade: false,
    students: false,
    votes: false,
    culture: false,
    composite: false
  };

  keys.forEach((k) => {
    const vals = data.links.map((l) => l.indicators[k]).filter((x): x is number => typeof x === 'number');
    if (vals.length) {
      const minV = Math.min(...vals);
      const maxV = Math.max(...vals);
      already01[k] = minV >= 0 && maxV <= 1;
    }
  });

  const range: Record<IndicatorKey, { min: number; max: number } | null> = {
    military: null,
    treaty: null,
    trade: null,
    students: null,
    votes: null,
    culture: null,
    composite: null
  };

  keys.forEach((k) => {
    if (already01[k]) return;
    const vals = data.links.map((l) => l.indicators[k]).filter((x): x is number => typeof x === 'number');
    if (vals.length) range[k] = { min: Math.min(...vals), max: Math.max(...vals) };
  });

  return (k: IndicatorKey, raw: number | null | undefined) => {
    if (k === 'composite') return 0;
    if (raw == null) return 0;
    if (already01[k]) return raw;
    const rr = range[k];
    if (!rr || rr.max === rr.min) return 0.5;
    return (raw - rr.min) / (rr.max - rr.min);
  };
}

function colorScale(x: number) {
  const hue = 220 - 220 * x;
  return `hsl(${hue} 85% 50%)`;
}

function dimColor(hexOrHsl: string, factor = 0.4) {
  return `color-mix(in hsl, ${hexOrHsl} ${Math.round(factor * 100)}%, transparent)`;
}

function radialPositions(n: number, radius: number, cx: number, cy: number) {
  const step = (Math.PI * 2) / n;
  return new Array(n).fill(0).map((_, i) => {
    const a = -Math.PI / 2 + i * step;
    return { x: cx + radius * Math.cos(a), y: cy + radius * Math.sin(a) };
  });
}

const Tooltip: React.FC<{ visible: boolean; x: number; y: number; children: React.ReactNode }> = ({ visible, x, y, children }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.15 }}
        className="pointer-events-none absolute z-50 -translate-x-1/2 rounded-xl bg-black/80 px-3 py-2 text-xs text-white shadow-xl backdrop-blur"
        style={{ left: x, top: y }}>
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

function runSelfTests(ds: DataSet) {
  const out: string[] = [];
  let ok = true;

  if (ds.neighbors.length === 0) {
    ok = false;
    out.push('[FAIL] neighbors array is empty');
  } else {
    out.push(`[PASS] neighbors: ${ds.neighbors.length}`);
  }

  const keys: IndicatorKey[] = ['military', 'treaty', 'trade', 'students', 'votes', 'culture'];
  ds.links.forEach((l) => {
    const hasFrom = l.from === ds.center.code;
    const hasTo = ds.neighbors.some((n) => n.code === l.to);
    if (!hasFrom || !hasTo) {
      ok = false;
      out.push(`[FAIL] link ${l.from}->${l.to} invalid`);
    }
    keys.forEach((k) => {
      const v = l.indicators[k];
      if (v != null && (typeof v !== 'number' || v < 0 || v > 1))
        out.push(`[WARN] ${l.to}:${k} out of 0..1 (${v})`);
    });
  });

  if (ok) out.push('[PASS] shape OK');
  return { ok, out };
}

export default function DiplomacySpiderMap({
  className,
  showUploader = true,
  maxWidth = 980,
  adjustment,
}: DiplomacySpiderMapProps) {
  const [selected, setSelected] = useState<IndicatorKey>('military');
  const [hover, setHover] = useState<{ x: number; y: number; content: React.ReactNode } | null>(null);
  const [data, setData] = useState<DataSet>(() => ({ ...BASE, links: [...BASE.links] }));
  const [preview, setPreview] = useState<Array<{
    to: string;
    treaty: number | null;
    military: number | null;
    trade: number | null;
    students: number | null;
    votes: number | null;
    culture: number | null;
  }>>([]);

  // ✅ adjustment가 바뀔 때 반영
  useEffect(() => {
    if (!adjustment) return;
    setData((prev) => {
      const adjustedLinks = prev.links.map((link) => {
        if (link.to !== 'USA') return link;
        const updatedIndicators = { ...link.indicators };
        (Object.keys(adjustment) as IndicatorKey[]).forEach((key) => {
          if (key in updatedIndicators) {
            updatedIndicators[key] = Math.min(1, Math.max(0, (updatedIndicators[key] ?? 0) + adjustment[key]!));
          }
        });
        return { ...link, indicators: updatedIndicators };
      });
      return { ...prev, links: adjustedLinks };
    });
  }, [adjustment]);

  const normFn = useMemo(() => buildNorm(data), [data]);

  const composite = (l: LinkDatum) => {
    const ks: IndicatorKey[] = ['military', 'treaty', 'trade', 'students', 'votes', 'culture'];
    const vals = ks.map((k) => l.indicators[k]).filter((v): v is number => typeof v === 'number');
    return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
  };

  const W = 880, H = 580, cx = W / 2, cy = H / 2, r = Math.min(W, H) * 0.34;
  const positions = useMemo(() => radialPositions(data.neighbors.length, r, cx, cy), [data.neighbors.length]);

  const nodeMap = useMemo(() => {
    const m = new Map<string, { x: number; y: number; c: Country }>();
    m.set(data.center.code, { x: cx, y: cy, c: data.center });
    data.neighbors.forEach((n, i) => {
      const p = positions[i];
      m.set(n.code, { x: p.x, y: p.y, c: n });
    });
    return m;
  }, [positions, data.center, data.neighbors]);

  const linkVisuals = useMemo(() =>
    data.links.map((l) => {
      const from = nodeMap.get(l.from)!;
      const to = nodeMap.get(l.to)!;
      const score = selected === 'composite' ? composite(l) : normFn(selected, l.indicators[selected] ?? null);
      const width = 1 + score * 7;
      const color = colorScale(score);
      return { l, from, to, score, width, color };
    }),
    [nodeMap, selected, data.links, normFn]
  );

  const legends: { key: IndicatorKey; label: string }[] = [
    { key: 'military', label: '군사' },
    { key: 'treaty', label: '협정/조약' },
    { key: 'trade', label: '무역/투자' },
    { key: 'students', label: '인적교류' },
    { key: 'votes', label: 'UN 투표일치' },
    { key: 'culture', label: '문화/사회' },
    { key: 'composite', label: '종합(가중치=동일)' },
  ];

  const tests = useMemo(() => runSelfTests(data), [data]);

  // ===== CSV handler =====
  const handleCSV = async (file: File) => {
    const text = await file.text();
    const rows = parseCSV(text);
    const grouped = groupByCountryAndIndicator(rows);

    const updated: LinkDatum[] = [...BASE.links]; // 기존(USA+4개)에서 시작 → 업로드한 국가만 교체
    const accPreview: any[] = [];

    ['중국', '일본', '러시아', '인도'].forEach((kr) => {
      const g = grouped[kr];
      if (!g) return;
      const link = buildLinkFromGrouped(kr, g);
      if (!link) return;

      // 같은 국가 코드 있으면 교체
      for (let i = updated.length - 1; i >= 0; i--)
        if (updated[i].to === link.to) updated.splice(i, 1);

      updated.push(link);
      accPreview.push({
        to: link.to,
        treaty: link.indicators.treaty,
        military: link.indicators.military,
        trade: link.indicators.trade,
        students: link.indicators.students,
        votes: link.indicators.votes,
        culture: link.indicators.culture
      });
    });

    // 정렬 (USA, CHN, JPN, RUS, IND)
    const order: Record<string, number> = { USA: 0, CHN: 1, JPN: 2, RUS: 3, IND: 4 };
    updated.sort((a, b) => (order[a.to] ?? 99) - (order[b.to] ?? 99));

    setData((d) => ({ ...d, links: updated }));
    setPreview(accPreview);
  };

  return (
    <div
      className={['mx-auto w-full', className].filter(Boolean).join(' ')}
      style={{ maxWidth }}>
      {/* Controls */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {legends.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSelected(key)}
            className={
              'rounded-full border px-3 py-1 text-sm transition ' +
              (selected === key
                ? 'border-black bg-black text-white'
                : 'border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100')
            }
          >
            {label}
          </button>
        ))}
        {showUploader && (
          <label className="ml-auto inline-flex cursor-pointer items-center gap-2 text-sm">
            <span className="rounded-full border px-2 py-1">CSV 업로드</span>
            <input
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleCSV(f);
              }}
            />
          </label>
        )}
      </div>

      {/* Canvas */}
      <div className="relative rounded-2xl border bg-white p-2 shadow-sm">
        <svg viewBox={`0 0 ${880} ${580}`} className="h-[560px] w-full">
          {[0.25, 0.5, 0.75, 1].map((rr, i) => (
            <circle
              key={i}
              cx={440}
              cy={290}
              r={Math.min(880, 580) * 0.34 * rr}
              className="fill-none stroke-neutral-200"
              strokeDasharray="4 6"
            />
          ))}

          {linkVisuals.map(({ l, from, to, score, width, color }) => {
            const isDim = selected !== 'composite' && score < 0.05;
            const stroke = isDim ? dimColor(color, 0.25) : color;
            return (
              <g key={`${l.from}-${l.to}`}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={stroke}
                  strokeWidth={width}
                  strokeLinecap="round"
                  onMouseEnter={(e) => {
                    const rect = (e.target as SVGLineElement).ownerSVGElement!.getBoundingClientRect();
                    setHover({
                      x: e.clientX - rect.left,
                      y: e.clientY - rect.top - 12,
                      content: (
                        <div>
                          <div className="font-semibold">{data.center.name_kr} ↔ {nodeMap.get(l.to)!.c.name_kr}</div>
                          <div className="mt-1 text-[11px] leading-4 text-neutral-200">선택 지표: {legends.find((x) => x.key === selected)?.label}</div>
                          <div className="mt-1 text-xs">점수(정규화): {(score * 100).toFixed(0)} / 100</div>
                          {l.notes?.[selected] && (<div className="mt-1 text-[11px] text-neutral-300">{l.notes[selected]}</div>)}
                        </div>
                      )
                    });
                  }}
                  onMouseLeave={() => setHover(null)}
                />
                <circle cx={to.x} cy={to.y} r={Math.max(2, width / 2)} fill={color} opacity={0.9} />
              </g>
            );
          })}

          {/* nodes */}
          <g>
            <circle cx={440} cy={290} r={18} className="fill-black" />
            <text x={440} y={262} textAnchor="middle" className="select-none text-[12px] fill-neutral-700">{data.center.name}</text>
            <text x={440} y={330} textAnchor="middle" className="select-none text-[13px] fill-neutral-900 font-semibold">{data.center.name_kr}</text>
          </g>

          {data.neighbors.map((n, i) => {
            const p = positions[i];
            return (
              <g key={n.code}>
                <circle cx={p.x} cy={p.y} r={12} className="fill-white stroke-neutral-400" />
                <text x={p.x} y={p.y - 16} textAnchor="middle" className="select-none text-[11px] fill-neutral-700">{n.name}</text>
                <text x={p.x} y={p.y + 24} textAnchor="middle" className="select-none text-[12px] fill-neutral-900 font-medium">{n.name_kr}</text>
              </g>
            );
          })}
        </svg>

        {/* Color legend */}
        <div className="pointer-events-none absolute bottom-3 left-1/2 w-[70%] -translate-x-1/2 select-none">
          <div className="flex items-center gap-2">
            <div className="text-xs text-neutral-500">약함</div>
            <div
              className="h-2 flex-1 rounded-full"
              style={{
                background: `linear-gradient(90deg, hsl(220 85% 50%) 0%, hsl(110 85% 50%) 50%, hsl(0 85% 50%) 100%)`
              }}
            />
            <div className="text-xs text-neutral-500">강함</div>
          </div>
        </div>

        <Tooltip visible={!!hover} x={hover?.x ?? 0} y={hover?.y ?? 0}>{hover?.content}</Tooltip>
      </div>

      {/* Preview (CSV 업로드 시 표시) */}
      {preview.length > 0 && (
        <div className="mt-4 overflow-x-auto">
          <div className="mb-1 text-xs text-neutral-500">업로드된 CSV에서 계산된 정규화 값(0~1)</div>
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b bg-neutral-50">
                <th className="px-2 py-1">국가</th>
                <th className="px-2 py-1">협정</th>
                <th className="px-2 py-1">군사</th>
                <th className="px-2 py-1">무역</th>
                <th className="px-2 py-1">인적</th>
                <th className="px-2 py-1">UN</th>
                <th className="px-2 py-1">문화</th>
              </tr>
            </thead>
            <tbody>
              {preview.map((p) => (
                <tr key={p.to} className="border-b last:border-none">
                  <td className="px-2 py-1">{p.to}</td>
                  <td className="px-2 py-1">{p.treaty?.toFixed(3) ?? '-'}</td>
                  <td className="px-2 py-1">{p.military?.toFixed(3) ?? '-'}</td>
                  <td className="px-2 py-1">{p.trade?.toFixed(3) ?? '-'}</td>
                  <td className="px-2 py-1">{p.students?.toFixed(3) ?? '-'}</td>
                  <td className="px-2 py-1">{p.votes?.toFixed(3) ?? '-'}</td>
                  <td className="px-2 py-1">{p.culture?.toFixed(3) ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Self-test */}
      <details className="mt-3 cursor-pointer rounded-xl border bg-neutral-50 p-3 text-sm text-neutral-700">
        <summary className="font-semibold">Self-test</summary>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {tests.out.map((t, i) => (
            <li
              key={i}
              className={t.startsWith('[FAIL]') ? 'text-red-600' : t.startsWith('[WARN]') ? 'text-amber-600' : 'text-emerald-700'}>{t}</li>
          ))}
        </ul>
      </details>
    </div>
  );
}