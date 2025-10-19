// src/components/WorldMapToggle.tsx
'use client';

import React, { useState, useRef, useMemo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Graticule,
  Sphere,
  ProjectionConfig
} from 'react-simple-maps';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type Props = {
  onSelectCountry: (countryName: string) => void;
  highlightedIso3?: Set<string>;
  hideSwitch?: boolean;
};

export default function WorldMapToggle({ onSelectCountry }: Props) {
  // 모드 상태
  const [mode, setMode] = useState<'flat' | 'globe'>('flat');
  // 회전 각도: [lon, lat, roll]
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);
  // 드래그 추적용 ref
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  // projectionConfig: scale + rotate
  const projectionConfig = useMemo<ProjectionConfig>(() => ({
    scale: mode === 'flat' ? 160 : 250,
    rotate: rotation,             // 항상 3-튜플
  }), [mode, rotation]);

  // 마우스 드래그 시작
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mode !== 'globe') return;
    dragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  // 드래그 중 회전 업데이트
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    setRotation(([lon, lat, roll]) => [
      (lon + dx * 0.5) % 360,
      Math.max(-90, Math.min(90, lat - dy * 0.5)),
      roll
    ]);
  };

  // 드래그 종료
  const endDrag = () => { dragging.current = false; };

  return (
    <div
      className="relative w-full h-full"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
    >
      {/* 페이지에서 한 개만 남긴 토글 버튼 */}
      <div className="absolute top-4 left-4 z-50">
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setMode(m => (m === 'flat' ? 'globe' : 'flat'))}
        >
          {mode === 'flat' ? 'Switch to Globe' : 'Switch to Flat Map'}
        </button>
      </div>

      <ComposableMap
        projection={mode === 'flat' ? 'geoNaturalEarth1' : 'geoOrthographic'}
        projectionConfig={projectionConfig}
        style={{ width: '100%', height: '100%' }}
      >
        <ZoomableGroup
          zoomSensitivity={0.5}
          disablePanning={mode === 'globe'}  // Globe 모드에선 SVG 자체 드래그로 회전 처리
        >
          {/* Globe 모드: 구체와 격자 */}
          {mode === 'globe' && (
            <>
              <Sphere
                id="sphere"
                fill="#e0f7fa"
                stroke="#ccc"
                strokeWidth={0.5}
              />
              <Graticule stroke="#aaa" strokeWidth={0.3} />
            </>
          )}
          {/* Flat 모드: 연한 회색 격자 */}
          {mode === 'flat' && <Graticule stroke="#ececec" strokeWidth={0.5} />}

          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const name =
                  geo.properties.name ||
                  (geo.properties as any).NAME ||
                  'Unknown';
                const baseStyle = {
                  id: geo.rsmKey,
                  outline: 'none' as const,
                  cursor: 'pointer' as const,
                };
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => onSelectCountry(name)}
                    style={{
                      default: {
                        ...baseStyle,
                        fill: mode === 'flat' ? '#f9f9f9' : '#b3e5fc',
                        stroke: mode === 'flat' ? '#cccccc' : '#0288d1',
                        strokeWidth: 0.7,
                        opacity: mode === 'flat' ? 1 : 0.8,
                      },
                      hover: {
                        ...baseStyle,
                        fill: mode === 'flat' ? '#e8e8e8' : '#03a9f4',
                        stroke: mode === 'flat' ? '#bbbbbb' : '#0277bd',
                        strokeWidth: 1,
                        opacity: 1,
                      },
                      pressed: {
                        ...baseStyle,
                        fill: mode === 'flat' ? '#dcdcdc' : '#01579b',
                        stroke: mode === 'flat' ? '#aaaaaa' : '#01579b',
                        strokeWidth: 1.2,
                        opacity: 1,
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
