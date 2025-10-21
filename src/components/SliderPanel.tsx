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
  // 🔹 step/format per indicator
  stepOf: (key: FilterKey) => number;
  formatOf: (key: FilterKey, v: number) => string;
  // 🔹 Added: user-friendly display labels
  labelMap?: Record<FilterKey, string>;
};

export default function SliderPanel({
  filterKeys,
  thresholds,
  enabled,
  globalRange,
  onToggle,
  onChange,
  onReset,
  stepOf,
  formatOf,
  labelMap,
}: Props) {
  return (
    <div className="space-y-6 p-4 bg-neutral-800/70 rounded-xl text-white">
      {filterKeys.map((k) => {
        const g = globalRange[k];
        const on = enabled[k];
        const step = stepOf(k);

        // 🔹 Snap range to step
        const min = Math.floor((g.min ?? 0) / step) * step;
        const max = Math.ceil((g.max ?? 0) / step) * step;

        // 🔹 Snap current value
        const raw = thresholds[k] ?? g.min;
        const value = Math.min(max, Math.max(min, Math.round(raw / step) * step));

        return (
          <div key={k} className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={on}
                onChange={(e) => onToggle(k, e.target.checked)}
              />
              {/* 🔹 Use labelMap for human-readable names */}
              <span className="text-sm font-semibold">
                {labelMap?.[k] ?? k}
              </span>
            </label>

            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={value}
              onChange={(e) => {
                const next = Math.round(Number(e.target.value) / step) * step;
                onChange(k, next);
              }}
              className="w-full"
              disabled={!on}
            />

            {/* 🔹 '범위' → 'Range' */}
            <div className="text-xs opacity-80">
              {on
                ? `≥ ${formatOf(k, value)}  (Range: ${formatOf(k, min)} ~ ${formatOf(k, max)})`
                : `Disabled  (Range: ${formatOf(k, min)} ~ ${formatOf(k, max)})`}
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
