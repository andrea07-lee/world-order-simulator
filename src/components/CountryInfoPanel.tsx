'use client';

import { GiniChart } from './GiniChart';
import Image from 'next/image';
import VariableBar from './VariableBar';
import type { CountryInfoType } from '@/data/countryInfo';
import { Card, CardContent } from '@/components/ui/card';

type Props = {
  country: CountryInfoType;
};

export default function CountryInfoPanel({ country: c }: Props) {
  return (
    <div className="flex flex-col w-full h-full space-y-4 pr-2 overflow-y-auto">
      {/* 국가 개요 */}
      <Card>
        <CardContent className="space-y-2 pt-4">
          <h2 className="text-lg font-semibold">📌 국가 개요</h2>
          <div className="flex items-center gap-2">
            <Image src={c.flag} alt="flag" width={32} height={20} />
            <span className="text-gray-700 text-sm">Capital: {c.capital}</span>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Population: {c.population}</p>
            <p>Area: {c.area}</p>
            <p>Language: {c.language}</p>
            <p>Religion: {c.religion}</p>
          </div>
          <p className="text-xs text-gray-500">{c.summary}</p>
        </CardContent>
      </Card>

      {/* 경제 지표 */}
      <Card>
        <CardContent className="space-y-2 pt-4">
          <h2 className="text-lg font-semibold">📈 경제 지표</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
            <li>GDP: {c.gdp}</li>
            <li>1인당 GDP: {c.gdpPerCapita}</li>
            <li>실업률: {c.unemployment}</li>
            <li>국가 부채율: {c.debtRatio}</li>
            <li>무역 규모: {c.tradeVolume}</li>
            <li>무역 의존도: {c.tradeDependency}</li>
          </ul>
        </CardContent>
      </Card>

      {/* 사회 구조 지표 */}
      <Card>
        <CardContent className="space-y-2 pt-4">
          <h2 className="text-lg font-semibold">🏙 사회 구조 지표</h2>
          <ul className="text-gray-700 space-y-1 text-sm">
            <li>고령화율: {c.agingRate}</li>
            <li>도시화율: {c.urbanizationRate}</li>
            <li>지니계수: {c.gini}</li>
            <li>고등교육 진학률: {c.higherEdRate}</li>
          </ul>
        </CardContent>
      </Card>

      {/* 지정학 정보 */}
      <Card>
        <CardContent className="space-y-2 pt-4">
          <h2 className="text-lg font-semibold">🌐 지정학 정보</h2>
          <p className="text-green-600 text-sm">우호국: {c.allies.join(', ')}</p>
          <p className="text-red-500 text-sm">적대국: {c.enemies.join(', ')}</p>
          <p className="text-sm">외교 정렬: {c.alignment}</p>
          <p className="text-sm">안보 위협 등급: {c.securityThreatLevel}</p>
        </CardContent>
      </Card>

      {/* 정치/사회 정세 */}
      <Card>
        <CardContent className="space-y-2 pt-4">
          <h2 className="text-lg font-semibold">🧭 정치/사회 정세</h2>
          <p className="text-sm">정권 상태: <span className="font-semibold">{c.regimeStatus}</span></p>
        </CardContent>
      </Card>

      {/* 변수 상태 */}
      <Card>
        <CardContent className="space-y-2 pt-4">
          <h2 className="text-lg font-semibold">📊 현재 변수 상태</h2>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(c.currentScores).map(([key, val]) => (
              <VariableBar key={key} label={key} value={val} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
