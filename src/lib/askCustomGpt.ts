export async function askCustomGpt(userInput: string): Promise<{
  explanation: string;
  adjustments: Record<string, number>;
}> {
  try {
    const res = await fetch('/api/ask-gpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userInput }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('❌ 서버 응답 오류:', data);
      return {
        explanation: 'GPT 연결 오류: ' + (data.error || '알 수 없는 오류'),
        adjustments: {},
      };
    }

    return data;
  } catch (err) {
    console.error('❌ API 호출 실패:', err);
    return {
      explanation: 'GPT 호출 실패: 네트워크 또는 서버 문제',
      adjustments: {},
    };
  }
}
