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
      {/* Country Overview */}
      <Card>
        <CardContent className="space-y-2 pt-4">
          <h2 className="text-lg font-semibold">📌 Country Overview</h2>
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

      {/* Economic Indicators */}
      <Card>
        <CardContent className="space-y-2 pt-4">
          <h2 className="text-lg font-semibold">📈 Economic Indicators</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
            <li>GDP: {c.gdp}</li>
            <li>GDP per Capita: {c.gdpPerCapita}</li>
            <li>Unemployment Rate: {c.unemployment}</li>
            <li>National Debt Ratio: {c.debtRatio}</li>
            <li>Total Trade Volume: {c.tradeVolume}</li>
            <li>Trade Dependency: {c.tradeDependency}</li>
          </ul>
        </CardContent>
      </Card>

      {/* Social Structure Indicators */}
      <Card>
        <CardContent className="space-y-2 pt-4">
          <h2 className="text-lg font-semibold">🏙 Social Structure Indicators</h2>
          <ul className="text-gray-700 space-y-1 text-sm">
            <li>Aging Rate: {c.agingRate}</li>
            <li>Urbanization Rate: {c.urbanizationRate}</li>
            <li>Gini Coefficient: {c.gini}</li>
            <li>Higher Education Enrollment: {c.higherEdRate}</li>
          </ul>
        </CardContent>
      </Card>

      {/* Geopolitical Information */}
      <Card>
        <CardContent className="space-y-2 pt-4">
          <h2 className="text-lg font-semibold">🌐 Geopolitical Information</h2>
          <p className="text-green-600 text-sm">Allies: {c.allies.join(', ')}</p>
          <p className="text-red-500 text-sm">Adversaries: {c.enemies.join(', ')}</p>
          <p className="text-sm">Diplomatic Alignment: {c.alignment}</p>
          <p className="text-sm">Security Threat Level: {c.securityThreatLevel}</p>
        </CardContent>
      </Card>

      {/* Political / Social Landscape */}
      <Card>
        <CardContent className="space-y-2 pt-4">
          <h2 className="text-lg font-semibold">🧭 Political / Social Landscape</h2>
          <p className="text-sm">
            Regime Status: <span className="font-semibold">{c.regimeStatus}</span>
          </p>
        </CardContent>
      </Card>

      {/* Current Variable Status */}
      <Card>
        <CardContent className="space-y-2 pt-4">
          <h2 className="text-lg font-semibold">📊 Current Variable Status</h2>
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
