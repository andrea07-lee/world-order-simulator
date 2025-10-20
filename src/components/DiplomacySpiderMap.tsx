'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CountryInfoType } from '@/data/countryInfo';

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
  flag: string;
};

type LinkDatum = {
  from: string;
  to: string;
  indicators: {
    military: number;
    treaty: number;
    trade: number;
    students: number;
    votes: number;
    culture: number;
    composite?: number | null;  // ✅ 여기 추가 또는 ? 로 optional 처리
  };
};

type DataSet = {
  center: Country;
  neighbors: Country[];
  links: LinkDatum[];
};

export type DiplomacySpiderMapProps = {
  className?: string;
  maxWidth?: number;
  countryCode: string;
  country: CountryInfoType;
};

// ===== 국가 목록 =====
const COUNTRIES: Country[] = [
  { code: 'KOR', name: 'South Korea', name_kr: '대한민국', flag: '🇰🇷' },
  { code: 'USA', name: 'United States', name_kr: '미국', flag: '🇺🇸' },
  { code: 'CHN', name: 'China', name_kr: '중국', flag: '🇨🇳' },
  { code: 'JPN', name: 'Japan', name_kr: '일본', flag: '🇯🇵' },
  { code: 'RUS', name: 'Russia', name_kr: '러시아', flag: '🇷🇺' },
  { code: 'GBR', name: 'United Kingdom', name_kr: '영국', flag: '🇬🇧' },
];

// ===== 색상 및 좌표 계산 함수 =====
function colorScale(x: number) {
  const hue = 220 - 220 * x;
  return `hsl(${hue} 85% 50%)`;
}
function dimColor(c: string, f = 0.4) {
  return `color-mix(in hsl, ${c} ${Math.round(f * 100)}%, transparent)`;
}
function radialPositions(n: number, r: number, cx: number, cy: number) {
  const step = (Math.PI * 2) / n;
  return Array.from({ length: n }, (_, i) => ({
    x: cx + r * Math.cos(-Math.PI / 2 + i * step),
    y: cy + r * Math.sin(-Math.PI / 2 + i * step),
  }));
}

// ===== 실제 관계 데이터 (AI 생성본) =====
const RELATION_DATA: LinkDatum[] = [
  {"from":"KOR","to":"USA","indicators":{"military":0.92,"treaty":0.83,"trade":0.61,"students":0.73,"votes":0.82,"culture":0.64}},
  {"from":"KOR","to":"CHN","indicators":{"military":0.18,"treaty":0.47,"trade":0.78,"students":0.48,"votes":0.36,"culture":0.52}},
  {"from":"KOR","to":"JPN","indicators":{"military":0.44,"treaty":0.42,"trade":0.72,"students":0.59,"votes":0.68,"culture":0.62}},
  {"from":"KOR","to":"RUS","indicators":{"military":0.09,"treaty":0.21,"trade":0.32,"students":0.18,"votes":0.27,"culture":0.25}},
  {"from":"KOR","to":"GBR","indicators":{"military":0.36,"treaty":0.58,"trade":0.46,"students":0.44,"votes":0.71,"culture":0.49}},
  {"from":"USA","to":"KOR","indicators":{"military":0.91,"treaty":0.82,"trade":0.63,"students":0.67,"votes":0.83,"culture":0.55}},
  {"from":"USA","to":"CHN","indicators":{"military":0.08,"treaty":0.35,"trade":0.74,"students":0.57,"votes":0.22,"culture":0.38}},
  {"from":"USA","to":"JPN","indicators":{"military":0.93,"treaty":0.86,"trade":0.62,"students":0.54,"votes":0.81,"culture":0.66}},
  {"from":"USA","to":"RUS","indicators":{"military":0.07,"treaty":0.19,"trade":0.27,"students":0.25,"votes":0.13,"culture":0.29}},
  {"from":"USA","to":"GBR","indicators":{"military":0.83,"treaty":0.91,"trade":0.58,"students":0.61,"votes":0.88,"culture":0.81}},
  {"from":"CHN","to":"KOR","indicators":{"military":0.17,"treaty":0.43,"trade":0.81,"students":0.49,"votes":0.39,"culture":0.54}},
  {"from":"CHN","to":"USA","indicators":{"military":0.09,"treaty":0.31,"trade":0.76,"students":0.52,"votes":0.23,"culture":0.36}},
  {"from":"CHN","to":"JPN","indicators":{"military":0.19,"treaty":0.41,"trade":0.63,"students":0.47,"votes":0.32,"culture":0.48}},
  {"from":"CHN","to":"RUS","indicators":{"military":0.74,"treaty":0.83,"trade":0.69,"students":0.41,"votes":0.72,"culture":0.45}},
  {"from":"CHN","to":"GBR","indicators":{"military":0.12,"treaty":0.39,"trade":0.59,"students":0.46,"votes":0.34,"culture":0.42}},
  {"from":"JPN","to":"KOR","indicators":{"military":0.46,"treaty":0.39,"trade":0.75,"students":0.57,"votes":0.65,"culture":0.63}},
  {"from":"JPN","to":"USA","indicators":{"military":0.94,"treaty":0.88,"trade":0.59,"students":0.53,"votes":0.84,"culture":0.68}},
  {"from":"JPN","to":"CHN","indicators":{"military":0.21,"treaty":0.38,"trade":0.65,"students":0.48,"votes":0.29,"culture":0.49}},
  {"from":"JPN","to":"RUS","indicators":{"military":0.07,"treaty":0.14,"trade":0.27,"students":0.23,"votes":0.18,"culture":0.24}},
  {"from":"JPN","to":"GBR","indicators":{"military":0.53,"treaty":0.61,"trade":0.51,"students":0.63,"votes":0.73,"culture":0.65}},
  {"from":"RUS","to":"KOR","indicators":{"military":0.09,"treaty":0.19,"trade":0.31,"students":0.17,"votes":0.26,"culture":0.22}},
  {"from":"RUS","to":"USA","indicators":{"military":0.08,"treaty":0.17,"trade":0.29,"students":0.22,"votes":0.12,"culture":0.28}},
  {"from":"RUS","to":"CHN","indicators":{"military":0.76,"treaty":0.85,"trade":0.72,"students":0.38,"votes":0.75,"culture":0.47}},
  {"from":"RUS","to":"JPN","indicators":{"military":0.06,"treaty":0.11,"trade":0.21,"students":0.19,"votes":0.16,"culture":0.20}},
  {"from":"RUS","to":"GBR","indicators":{"military":0.08,"treaty":0.18,"trade":0.28,"students":0.26,"votes":0.19,"culture":0.27}},
  {"from":"GBR","to":"KOR","indicators":{"military":0.38,"treaty":0.57,"trade":0.46,"students":0.43,"votes":0.68,"culture":0.51}},
  {"from":"GBR","to":"USA","indicators":{"military":0.85,"treaty":0.93,"trade":0.60,"students":0.62,"votes":0.90,"culture":0.83}},
  {"from":"GBR","to":"CHN","indicators":{"military":0.11,"treaty":0.37,"trade":0.61,"students":0.49,"votes":0.31,"culture":0.41}},
  {"from":"GBR","to":"JPN","indicators":{"military":0.51,"treaty":0.63,"trade":0.53,"students":0.61,"votes":0.71,"culture":0.66}},
  {"from":"GBR","to":"RUS","indicators":{"military":0.07,"treaty":0.19,"trade":0.26,"students":0.28,"votes":0.20,"culture":0.25}}
];

// ===== Tooltip =====
const Tooltip: React.FC<{ visible: boolean; x: number; y: number; children: React.ReactNode }> = ({
  visible,
  x,
  y,
  children,
}) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.15 }}
        className="pointer-events-none absolute z-50 -translate-x-1/2 rounded-xl bg-black/80 px-3 py-2 text-xs text-white shadow-xl backdrop-blur"
        style={{ left: x, top: y }}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

// ===== Main Component =====
export default function DiplomacySpiderMap({ className, maxWidth = 980, countryCode }: DiplomacySpiderMapProps) {
  const [selected, setSelected] = useState<IndicatorKey>('military');
  const [hover, setHover] = useState<{ x: number; y: number; content: React.ReactNode } | null>(
    null
  );

  // 현재 선택된 국가 데이터 필터링
  const dataLinks = useMemo(() => RELATION_DATA.filter((l) => l.from === countryCode), [countryCode]);
  const center = COUNTRIES.find((c) => c.code === countryCode) || COUNTRIES[0];
  const neighbors = COUNTRIES.filter((c) => c.code !== countryCode);

  const W = 880;
  const H = 580;
  const cx = W / 2;
  const cy = H / 2 + 20;
  const r = Math.min(W, H) * 0.34;

  const positions = useMemo(() => radialPositions(neighbors.length, r, cx, cy), [neighbors.length]);

  const nodeMap = useMemo(() => {
    const m = new Map<string, { x: number; y: number; c: Country }>();
    m.set(center.code, { x: cx, y: cy, c: center });
    neighbors.forEach((n, i) => {
      const p = positions[i];
      m.set(n.code, { x: p.x, y: p.y, c: n });
    });
    return m;
  }, [positions, center, neighbors]);

  const linkVisuals = useMemo(
    () =>
      dataLinks
        .filter((l) => nodeMap.has(l.to))
        .map((l) => {
          const from = nodeMap.get(l.from)!;
          const to = nodeMap.get(l.to)!;
          const score = l.indicators[selected] ?? 0;
          const width = 1 + score * 7;
          const color = colorScale(score);
          return { l, from, to, score, width, color };
        }),
    [dataLinks, nodeMap, selected]
  );

  const legends = [
    { key: 'military', label: '군사' },
    { key: 'treaty', label: '협정/조약' },
    { key: 'trade', label: '무역/투자' },
    { key: 'students', label: '인적교류' },
    { key: 'votes', label: 'UN 투표일치' },
    { key: 'culture', label: '문화/사회' },
  ];

  return (
    <div className={['mx-auto w-full', className].filter(Boolean).join(' ')} style={{ maxWidth }}>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {legends.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSelected(key as IndicatorKey)}
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
      </div>

      <div className="relative rounded-2xl border bg-white p-2 shadow-sm">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-[560px] w-full">
          {[0.25, 0.5, 0.75, 1].map((rr, i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r * rr}
              className="fill-none stroke-neutral-200"
              strokeDasharray="4 6"
            />
          ))}

          {linkVisuals.map(({ l, from, to, score, width, color }) => (
            <g key={`${l.from}-${l.to}`}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={dimColor(color, score < 0.1 ? 0.2 : 0.8)}
                strokeWidth={width}
                strokeLinecap="round"
                onMouseEnter={(e) => {
                  const rect = (e.target as SVGLineElement).ownerSVGElement!.getBoundingClientRect();
                  setHover({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top - 12,
                    content: (
                      <div>
                        <div className="font-semibold">
                          {center.flag} {center.name_kr} ↔ {nodeMap.get(l.to)?.c.flag}{' '}
                          {nodeMap.get(l.to)?.c.name_kr}
                        </div>
                        <div className="mt-1 text-xs">
                          {legends.find((x) => x.key === selected)?.label}: {(score * 100).toFixed(0)}
                        </div>
                      </div>
                    ),
                  });
                }}
                onMouseLeave={() => setHover(null)}
              />
            </g>
          ))}

          {/* 국가 노드 */}
          {Array.from(nodeMap.values()).map(({ x, y, c }) => (
            <g key={c.code} transform={`translate(${x},${y})`}>
              {c.code === center.code ? (
                <>
                  <circle r={18} fill="black" />
                  <text y={-28} textAnchor="middle" className="fill-neutral-700 text-[12px]">
                    {c.name}
                  </text>
                  <text
                    y={38}
                    textAnchor="middle"
                    className="fill-neutral-900 text-[13px] font-semibold"
                  >
                    {c.name_kr}
                  </text>
                </>
              ) : (
                <>
                  <circle r={6} fill="white" stroke="black" />
                  <text y={-16} textAnchor="middle" className="text-[14px]">
                    {c.flag}
                  </text>
                  <text y={12} textAnchor="middle" className="fill-neutral-800 text-[11px]">
                    {c.name_kr}
                  </text>
                </>
              )}
            </g>
          ))}
        </svg>

        <Tooltip visible={!!hover} x={hover?.x ?? 0} y={hover?.y ?? 0}>
          {hover?.content}
        </Tooltip>

        {/* 색상 스펙트럼 */}
        <div className="absolute bottom-3 left-1/2 w-[70%] -translate-x-1/2 select-none">
          <div className="flex items-center gap-2">
            <div className="text-xs text-neutral-500">약함</div>
            <div
              className="h-2 flex-1 rounded-full"
              style={{
                background:
                  'linear-gradient(90deg,hsl(220 85% 50%) 0%,hsl(110 85% 50%) 50%,hsl(0 85% 50%) 100%)',
              }}
            />
            <div className="text-xs text-neutral-500">강함</div>
          </div>
        </div>
      </div>
    </div>
  );
}
