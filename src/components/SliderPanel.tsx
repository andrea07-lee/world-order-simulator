'use client';

import type { FilterKey } from '@/data/types';

type MinMax = { min: number; max: number };

type Props = {
  filterKeys: FilterKey[];
  thresholds: Record<FilterKey, number>;
  enabled: Record<FilterKey, boolean>;
  globalRange: Record<FilterKey, MinMax>;
  onToggle: (key: FilterKey, on: boolean) => void;
  onChange: (key: FilterKey, value: number) => void;
  onReset?: () => void;
  // 지표별 step/format
  stepOf: (key: FilterKey) => number;
  formatOf: (key: FilterKey, v: number) => string;
};

export default function SliderPanel({
  filterKeys, thresholds, enabled, globalRange, onToggle, onChange, onReset, stepOf, formatOf,
}: Props) {
  return (
    <div className="space-y-6 p-4 bg-neutral-800/70 rounded-xl text-white">
      {filterKeys.map((k) => {
        const g = globalRange[k];
        const on = enabled[k];
        const step = stepOf(k);

        // 범위를 step에 맞춰 스냅
        const min = Math.floor((g.min ?? 0) / step) * step;
        const max = Math.ceil((g.max ?? 0) / step) * step;

        // 현재 값도 스냅
        const raw = thresholds[k] ?? g.min;
        const value = Math.min(max, Math.max(min, Math.round(raw / step) * step));

        return (
          <div key={k} className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={on} onChange={(e) => onToggle(k, e.target.checked)} />
              <span className="text-sm font-semibold">{k}</span>
            </label>

            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={value}
              onChange={(e) => {
                const next = Math.round(Number(e.target.value) / step) * step;
                onChange(k, next); // 비교는 raw 값으로 그대로
              }}
              className="w-full"
              disabled={!on}
            />

            <div className="text-xs opacity-80">
              {on
                ? `≥ ${formatOf(k, value)}  (범위: ${formatOf(k, min)} ~ ${formatOf(k, max)})`
                : `비활성화됨  (범위: ${formatOf(k, min)} ~ ${formatOf(k, max)})`}
            </div>
          </div>
        );
      })}

      <div className="pt-2 flex gap-2">
        <button
          className="px-3 py-1 bg-gray-200 text-black rounded hover:bg-gray-300"
          onClick={onReset}
        >
          Reset all
        </button>
      </div>
    </div>
  );
}
