'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Papa from 'papaparse';

import WorldMap from '@/components/WorldMap';
import WorldMapToggle from '@/components/WorldMapToggle';
import CountryInfoPanel from '@/components/CountryInfoPanel';
import { typedCountryInfo } from '@/data/countryInfo';
import type { CountryInfoType } from '@/data/countryInfo';
import RadarChart from '@/components/RadarChart';
import PowerTrajectoryGraph from '@/components/PowerTrajectoryGraph';
import AiChatBox from '@/components/AiChatBox';
import SliderPanel from '@/components/SliderPanel';
import DiplomacySpiderMap from '@/components/DiplomacySpiderMap';
import type { FilterKey } from '@/data/types';

const FILTER_KEYS: FilterKey[] = [
  'democracy_index',
  'trade_pct_gdp',
  'gdp_ppp_current_intl',
  'military_expenditure_pct_gdp',
  'population_total',
];

const FILTER_LABELS: Record<FilterKey, string> = {
  democracy_index: "Democracy Index",
  trade_pct_gdp: "Trade (% of GDP)",
  gdp_ppp_current_intl: "GDP (PPP, current international $)",
  military_expenditure_pct_gdp: "Military Expenditure (% of GDP)",
  population_total: "Population (Total)",
};


const SLIDER_STEP: Partial<Record<FilterKey, number>> = {
  population_total: 10_000_000,
  gdp_ppp_current_intl: 100_000_000_000,
  trade_pct_gdp: 5,
  military_expenditure_pct_gdp: 0.1,
  democracy_index: 0.1,
};

const LABEL_FORMAT: Partial<Record<FilterKey, (v: number) => string>> = {
  population_total: (v: number) => `${Math.round(v / 1_000_000)} million`,
  gdp_ppp_current_intl: (v: number) => `${(v / 1_000_000_000_000).toFixed(1)} trillion $`,
  trade_pct_gdp: (v: number) => `${v.toFixed(0)}%`,
  military_expenditure_pct_gdp: (v: number) => `${v.toFixed(1)}%`,
  democracy_index: (v: number) => v.toFixed(1),
};


export default function Home() {
  const [indicators, setIndicators] = useState<any[]>([]);

  // ✅ CSV 로드
  useEffect(() => {
    Papa.parse('/country_data_full.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (result: Papa.ParseResult<any>) => {
        const clean = result.data
          .filter((row) => row['Country Code'])
          .map((row) => {
            if (row['gdp_ppp_current_intl$'] !== undefined) {
              row['gdp_ppp_current_intl'] = row['gdp_ppp_current_intl$'];
              delete row['gdp_ppp_current_intl$'];
            }
            return row;
          });
        console.log('✅ CSV 로드 완료, 샘플:', clean.slice(0, 5));
        setIndicators(clean);
      },
    });
  }, []);

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [inputValues, setInputValues] = useState<Record<string, number>>({});
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [aiExplanation, setAiExplanation] = useState('');

  const countryData: CountryInfoType | null = selectedCountry
    ? typedCountryInfo[selectedCountry]
    : null;

  // ✅ 슬라이더 범위 계산
  const globalRange = useMemo(() => {
    if (indicators.length === 0) {
      return Object.fromEntries(
        FILTER_KEYS.map((k) => [k, { min: 0, max: 0 }])
      ) as Record<FilterKey, { min: number; max: number }>;
    }

    const init = Object.fromEntries(
      FILTER_KEYS.map((k) => [k, { min: Infinity, max: -Infinity }])
    ) as Record<FilterKey, { min: number; max: number }>;

    for (const row of indicators) {
      for (const k of FILTER_KEYS) {
        const v = row[k as keyof typeof row] as number | undefined;
        if (typeof v !== 'number') continue;
        if (v < init[k].min) init[k].min = v;
        if (v > init[k].max) init[k].max = v;
      }
    }

    if (init.population_total.max > 1_500_000_000)
      init.population_total.max = 1_500_000_000;
    if (init.gdp_ppp_current_intl.max > 35_000_000_000_000)
      init.gdp_ppp_current_intl.max = 35_000_000_000_000;
    if (init.trade_pct_gdp.max > 300) init.trade_pct_gdp.max = 300;
    if (init.military_expenditure_pct_gdp.max > 15)
      init.military_expenditure_pct_gdp.max = 15;
    if (init.democracy_index.max > 10) init.democracy_index.max = 10;

    for (const k of FILTER_KEYS) {
      if (!Number.isFinite(init[k].min)) init[k].min = 0;
      if (!Number.isFinite(init[k].max)) init[k].max = 0;
    }

    return init;
  }, [indicators]);

  // ✅ thresholds (슬라이더 값)
  const [thresholds, setThresholds] = useState({} as Record<FilterKey, number>);
  useEffect(() => {
    const t = {} as Record<FilterKey, number>;
    for (const k of FILTER_KEYS) t[k] = globalRange[k]?.min ?? 0;
    setThresholds(t);
  }, [globalRange]);

  // ✅ 어떤 필터 켰는지
  const [enabled, setEnabled] = useState(() => {
    const e = {} as Record<FilterKey, boolean>;
    for (const k of FILTER_KEYS) e[k] = true;
    return e;
  });

  const activeKeys = useMemo(
    () => FILTER_KEYS.filter((k) => enabled[k]),
    [enabled]
  );
  const filterActive = activeKeys.length > 0;

  // ✅ 조건 맞는 국가만 highlight
  const highlightedIso3 = useMemo(() => {
    if (!filterActive) return new Set<string>();
    const set = new Set<string>();
    const excluded = new Set([
      'WLD',
      'EAR',
      'EAS',
      'EAP',
      'ECA',
      'EUU',
      'HIC',
      'IBD',
      'IBT',
      'IDA',
      'IDB',
      'IDN',
      'IDX',
      'LCN',
      'LMY',
      'LTE',
      'MEA',
      'MIC',
      'NAC',
      'OED',
      'SAS',
      'SSA',
      'UMC',
    ]);

    for (const row of indicators) {
      let ok = true;
      for (const k of activeKeys) {
        const v = row[k as keyof typeof row] as number | undefined;
        if (typeof v !== 'number' || v < thresholds[k]) {
          ok = false;
          break;
        }
      }
      const code = String(row['Country Code']).trim().toUpperCase();
      if (ok && code && !excluded.has(code)) {
        set.add(code);
      }
    }

    console.log('🎯 Highlighted ISO3 Set:', Array.from(set).slice(0, 20));
    return set;
  }, [indicators, activeKeys, thresholds, filterActive]);

  // ---- 선택한 국가 ----
  const handleCountrySelect = (name: string) => {
    console.log('🗺️ 클릭한 나라 이름:', name);
    setSelectedCountry(name);
    const selected = typedCountryInfo[name];
    if (selected) {
      const numericScores = Object.fromEntries(
        Object.entries(selected.currentScores).map(([key, val]) => [
          key,
          parseFloat(val),
        ])
      );
      setInputValues(numericScores);
    } else {
      setInputValues({});
    }
  };

  // ---- 화면 컨트롤 ----
  const handleSimulate = () => setIsChatExpanded(true);
  const handleMinimize = () => setIsChatExpanded(false);
  const handleBack = () => {
    setSelectedCountry(null);
    setInputValues({});
    setAiExplanation('');
    setIsChatExpanded(false);
  };

  if (indicators.length === 0) {
    return <div className="p-6">Loading data...</div>;
  }

  return (
    <div className="w-screen h-screen overflow-hidden">
      {!selectedCountry ? (
        <div className="grid grid-cols-12 gap-4 w-full h-full p-4">
          <div className="col-span-8 h-full rounded-xl overflow-hidden bg-neutral-900">
          <WorldMap
          onSelectCountry={handleCountrySelect}
          highlightedIso3={highlightedIso3}
          filterActive={filterActive}
          />

          </div>

          <div className="col-span-4 h-full overflow-y-auto">
            <div className="p-3 text-sm text-gray-700">
              <div className="font-semibold">Filter</div>
              <div className="opacity-70">
              Highlights countries meeting the selected threshold conditions.
              </div>
            </div>

            <SliderPanel
              filterKeys={FILTER_KEYS}
              thresholds={thresholds}
              enabled={enabled}
              globalRange={globalRange}
              onToggle={(key, on) =>
                setEnabled((prev) => ({ ...prev, [key]: on }))
              }
              onChange={(key, val) =>
                setThresholds((prev) => ({ ...prev, [key]: val }))
              }
              onReset={() => {
                const t = {} as Record<FilterKey, number>;
                const e = {} as Record<FilterKey, boolean>;
                for (const k of FILTER_KEYS) {
                  t[k] = globalRange[k].min;
                  e[k] = false;
                }
                setThresholds(t);
                setEnabled(e);
              }}
              stepOf={(k) => SLIDER_STEP[k] ?? 1}
              formatOf={(k, v) =>
                (LABEL_FORMAT[k] ?? ((x: number) => String(x)))(v)
              }
              labelMap={FILTER_LABELS}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="absolute top-4 left-4 z-50">
            <button
              onClick={handleBack}
              className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
            >
              ← back
            </button>
          </div>

          {!isChatExpanded ? (
            <div className="grid grid-cols-12 gap-4 w-full h-full px-6 py-4">
              <div className="col-span-3 overflow-y-auto">
                {countryData && <CountryInfoPanel country={countryData} />}
              </div>
              <div className="col-span-6 overflow-y-auto space-y-6 px-4">
              {countryData &&
                <PowerTrajectoryGraph country={countryData} width={900} height={400} />}
                {countryData && <RadarChart country={countryData} />}
                <div className="rounded-xl border bg-white">
                 {countryData && 
                  <DiplomacySpiderMap
                    className="p-2"
                    showUploader={true}
                    maxWidth={900}
                    country={countryData}
                    countryCode={countryData.iso}
                  />}
                </div>
                <button
                  onClick={handleSimulate}
                  className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  🔍 Expand analysis
                </button>
              </div>
              <div className="col-span-3 bg-gray-50 border-l border-gray-300 p-6 flex flex-col overflow-y-auto">
                <AiChatBox
                  currentScores={inputValues}
                  setCurrentScores={setInputValues}
                  aiExplanation={aiExplanation}
                  setAiExplanation={setAiExplanation}
                  onSimulate={handleSimulate}
                />
              </div>
            </div>
          ) : (
            <div className="flex w-full h-full">
              <motion.div
                className="w-1/2 p-6 overflow-y-auto bg-white"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-6">
                  {countryData &&
                  <PowerTrajectoryGraph country={countryData} width={900} height={400} />}
                  {countryData && <RadarChart country={countryData} />}
                  <div className="rounded-xl border bg-white">
                   {countryData && 
                    <DiplomacySpiderMap 
                      className="p-2"
                      showUploader={true}
                      maxWidth={900}
                      countryCode={countryData.iso || 'KOR'}
                      country={countryData}
                    />}
                  </div>
                </div>
                <button
                  onClick={handleMinimize}
                  className="mt-6 px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
                >
                  ← Simplified view
                </button>
              </motion.div>
              <motion.div
                className="w-1/2 bg-[#1e1e2e] text-white p-6 flex flex-col overflow-y-auto"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <AiChatBox
                  currentScores={inputValues}
                  setCurrentScores={setInputValues}
                  aiExplanation={aiExplanation}
                  setAiExplanation={setAiExplanation}
                />
              </motion.div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
