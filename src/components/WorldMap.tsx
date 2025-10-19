'use client';

import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Graticule,
} from 'react-simple-maps';

// ✅ ISO3 코드가 포함된 GeoJSON URL
const geoUrl =
  'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson';

type Props = {
  onSelectCountry: (countryName: string) => void;
  highlightedIso3?: Set<string>;
  filterActive?: boolean; // 필터 ON/OFF
  highlightColor?: string;
  baseColor?: string;
};

// ✅ ISO3 코드 추출 함수
function getIso3(props: Record<string, any>): string {
  const code =
    props.ISO_A3 ||
    props.ISO3 ||
    props.ADM0_A3 ||
    props['ISO3166-1-Alpha-3'] ||
    props.id ||
    '';
  return String(code).trim().toUpperCase();
}

// ✅ 국가 이름 추출 함수
function getName(props: Record<string, any>): string {
  return props.ADMIN || props.name || props.NAME || 'Unknown';
}

// ✅ 메인 WorldMap 컴포넌트
export default function WorldMap({
  onSelectCountry,
  highlightedIso3 = new Set<string>(),
  filterActive = false,
  highlightColor = '#3b82f6',
  baseColor = '#f3f4f6',
}: Props) {
  const [tooltip, setTooltip] = useState({
    visible: false,
    name: '',
    x: 0,
    y: 0,
  });

  return (
    <div className="relative w-full h-full bg-white">
      {/* 🟡 툴팁 */}
      {tooltip.visible && (
        <div
          className="fixed pointer-events-none z-50 px-2 py-1 text-xs rounded-md bg-black/60 text-white shadow"
          style={{ top: tooltip.y + 8, left: tooltip.x + 12 }}
        >
          {tooltip.name}
        </div>
      )}

      {/* 🗺️ 지도 */}
      <ComposableMap
        projection="geoNaturalEarth1"
        width={980}
        height={520}
        style={{ width: '100%', height: '100%' }}
      >
        <ZoomableGroup minZoom={1} maxZoom={8}>
          <Graticule stroke="#ececec" strokeWidth={0.5} />

          <Geographies geography={geoUrl}>
            {({ geographies }) => {
              // ✅ 첫 번째 Feature 구조 디버깅용 로그
              if (geographies.length > 0) {
                console.log(
                  '첫번째 GeoJSON feature properties:',
                  geographies[0].properties
                );
              }

              return geographies.map((geo) => {
                const props = geo.properties as Record<string, any>;
                const name = getName(props);
                const iso3 = getIso3(props);

                const isHighlighted = highlightedIso3.has(iso3);
                const fill = isHighlighted ? highlightColor : baseColor;
                const stroke = isHighlighted ? '#1d4ed8' : '#d1d5db';
                const opacity = filterActive
                  ? isHighlighted
                    ? 1
                    : 0.45
                  : 1;

                if (isHighlighted) {
                  console.log(`🎯 매칭됨: ${name} (${iso3})`);
                }

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => onSelectCountry(name)}
                    onMouseEnter={(e) => {
                      const evt = e as React.MouseEvent;
                      setTooltip({
                        visible: true,
                        name,
                        x: evt.clientX,
                        y: evt.clientY,
                      });
                    }}
                    onMouseMove={(e) => {
                      const evt = e as React.MouseEvent;
                      setTooltip((t) => ({
                        ...t,
                        x: evt.clientX,
                        y: evt.clientY,
                      }));
                    }}
                    onMouseLeave={() =>
                      setTooltip((t) => ({ ...t, visible: false }))
                    }
                    fill={fill}
                    stroke={stroke}
                    style={{
                      default: {
                        outline: 'none',
                        cursor: 'pointer',
                        opacity,
                        transition:
                          'fill 150ms ease, opacity 150ms ease, stroke 150ms ease',
                      },
                      hover: {
                        fill: isHighlighted ? '#2563eb' : '#e5e7eb',
                        stroke: isHighlighted ? '#1e40af' : '#c5cbd3',
                        outline: 'none',
                        cursor: 'pointer',
                        opacity: 1,
                      },
                      pressed: {
                        fill: isHighlighted ? '#1d4ed8' : '#dcdcdc',
                        stroke: isHighlighted ? '#1e40af' : '#a3a3a3',
                        outline: 'none',
                        cursor: 'pointer',
                        opacity: 1,
                      },
                    }}
                  />
                );
              });
            }}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
