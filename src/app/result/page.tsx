'use client';

import { useEffect, useState } from "react";

export default function ResultPage() {
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const simStatus = localStorage.getItem("simulationStatus");
    setStatus(simStatus);
  }, []);

  return (
    <div className="flex h-screen">
      {/* 왼쪽: AI 설명 출력 영역 */}
      <div className="w-1/2 p-6 border-r overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">🧠 AI 시뮬레이션 결과</h1>

        {status === "loading" && (
          <p className="text-gray-600">시뮬레이션을 불러오는 중입니다...</p>
        )}
        {status === "success" && (
          <div className="prose max-w-full">
            <p className="text-green-600">AI 분석 성공! 변수 반영 완료되었습니다.</p>
            <p className="mt-2">여기에 HTML 형태로 AI 결과 텍스트가 들어갈 예정입니다.</p>
          </div>
        )}
        {status === "fail" && (
          <p className="text-red-600">AI 응답에 실패했어요. 다시 시도해 주세요.</p>
        )}
      </div>

      {/* 오른쪽: 그래프 영역 */}
      <div className="w-1/2 p-6 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">📊 시각화 영역</h2>

        {/* 여기에 그래프 컴포넌트들 삽입 예정 */}
        <div className="bg-gray-100 border rounded p-4 text-center text-gray-500">
          그래프 컴포넌트가 여기에 표시됩니다.
        </div>
      </div>
    </div>
  );
}
