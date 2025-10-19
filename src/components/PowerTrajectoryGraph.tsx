'use client';

import { useMemo } from 'react';
import { realWorldScores } from '@/data/realWorldScores';
import { calculateTrajectoryIndex } from '@/lib/trajectory'; // 0~100 반환
import { parseValue } from '@/lib/parser';
import { countryInfo } from '@/data/countryInfo';

// ✅ 타입 정의
type Point = {
  x: number;
  y: number;
  year?: number;
  future?: boolean;
};

type Props = {
  points?: Point[];
  width?: number;
  height?: number;
};

// ✅ 국가 파워 궤적 그래프
export default function PowerTrajectoryGraph({
  points = [],
  width = 900,
  height = 400,
}: Props) {
  // 국가 데이터 선택
  const raw = countryInfo['South Korea'];

  // ✅ 국가 데이터 파싱 및 정규화
  const parsed = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(raw).map(([k, v]) => {
          if (typeof v === 'string' || typeof v === 'number') {
            return [k, parseValue(v, k)];
          } else {
            return [k, 0]; // string[] 등은 0으로 처리
          }
        })
      ),
    [raw]
  );

  // ✅ 점수 계산 (0~1 스케일)
  const score = calculateTrajectoryIndex(parsed) / 100;

  // ✅ 곡선 기본 크기 설정
  const curveWidth = 300;
  const curveHeight = 120;

  // ✅ 곡선 좌표 생성 (cos 기반 완만한 곡선)
  const curvepoints: Point[] = [];
  for (let x = 0; x <= curveWidth; x += 5) {
    const ratio = x / curveWidth; // 0~1
    const y = 0.5 * (1 - Math.cos(ratio * 2 * Math.PI)) * curveHeight;
    points.push({ x, y: curveHeight - y }); // SVG는 아래로 갈수록 y 증가
  }

  // ✅ SVG path 생성
  const path = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(' ');

  // ✅ 현재 점 위치 계산
  const pointX = score * curveWidth;
  const pointY =
    curveHeight - 0.5 * (1 - Math.cos(score * 2 * Math.PI)) * curveHeight;

  // ✅ 구간별 점 색상 지정
  const getDotColor = (s: number) => {
    if (s <= 0.33) return '#3b82f6'; // Rise
    if (s <= 0.66) return '#6b7280'; // Peak
    return '#ef4444'; // Decline
  };

  // ✅ 렌더링
  return (
    <div className="w-full max-w-md p-4 border rounded bg-white shadow">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">
        국가 파워 궤적 곡선
      </h3>

      <svg width={curveWidth} height={curveHeight + 30}>
        {/* x축 */}
        <line
          x1={0}
          y1={curveHeight}
          x2={curveWidth}
          y2={curveHeight}
          stroke="#ddd"
          strokeWidth={1}
        />
        {/* y축 (선택적) */}
        <line
          x1={curveWidth / 2}
          y1={0}
          x2={curveWidth / 2}
          y2={curveHeight}
          stroke="#eee"
          strokeWidth={1}
        />

        {/* 궤적 곡선 */}
        <path d={path} fill="none" stroke="#ccc" strokeWidth={3} />

        {/* 현재 위치 점 */}
        <circle
          cx={pointX}
          cy={pointY}
          r={7}
          fill={getDotColor(score)}
          stroke="white"
          strokeWidth={2}
        />

        {/* 구간 라벨 */}
        <text x={0} y={curveHeight + 20} fontSize={12} fill="#3b82f6">
          Rise
        </text>
        <text
          x={curveWidth / 2 - 15}
          y={curveHeight + 20}
          fontSize={12}
          fill="#6b7280"
        >
          Peak
        </text>
        <text
          x={curveWidth - 50}
          y={curveHeight + 20}
          fontSize={12}
          fill="#ef4444"
        >
          Decline
        </text>
      </svg>

      <p className="mt-2 text-sm text-gray-700">
        현재 위치 점수:{' '}
        <span className="font-bold text-blue-700">
          {(score * 100).toFixed(1)} / 100
        </span>
      </p>
    </div>
  );
}
