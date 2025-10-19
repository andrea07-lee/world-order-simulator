'use client';

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useEffect, useMemo, useState } from 'react';
import type { CountryInfoType } from '@/data/countryInfo';

import type { AdjustmentType } from '@/data/types';

type Props = {
  country: CountryInfoType;
  adjustment?: AdjustmentType;
};


export default function RadarChartComponent({ country, adjustment }: Props) {
  // ✅ 원래 스코어 + 조정값 저장
  const [adjustedScores, setAdjustedScores] = useState<Record<string, number>>(country.radarScores);

  // ✅ adjustment가 바뀔 때마다 반영
  useEffect(() => {
    if (!adjustment) return;

    const updated = { ...country.radarScores };

    Object.entries(adjustment).forEach(([key, change]) => {
      if (key in updated) {
        const k = key as keyof typeof updated;
        const original = (updated[k] as number) ?? 0;
        const adjusted = Math.min(100, Math.max(0, original + change * 100));
        (updated[k] as number) = adjusted;
      }
    });

    setAdjustedScores(updated);
  }, [adjustment, country.radarScores]);

  // ✅ Recharts 포맷으로 변환
  const data = useMemo(
    () =>
      Object.entries(adjustedScores).map(([key, value]) => ({
        variable: key,
        value,
      })),
    [adjustedScores]
  );

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="variable" tick={{ fontSize: 10 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Tooltip />
          <Radar
            name={country.name}
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.5}
            isAnimationActive={true} // ✅ 애니메이션 활성화
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
