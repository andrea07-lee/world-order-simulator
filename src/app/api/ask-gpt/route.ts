'use server';

import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { userInput } = await req.json();

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: process.env.NEXT_PUBLIC_OPENAI_GPT_ID || 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `
너는 국제 정치와 외교 분석을 담당하는 전략 AI야. 한국어로 질문했을 때는 한국어로 답변하고, 영어로 질문할 경우 무조건 영어로 답변해라.

사용자의 질문에 대해 반드시 아래 관점을 고려해 설명하라:
1. 정치 구조 변화 (ex. 정권 붕괴, 양당제 불안정, 헌정 중단 가능성)
2. 경제적 충격 (ex. 자본 유출, 통화 불안, 수출 감소)
3. 외교/안보 파장 (ex. 한미동맹 약화, 북한 도발 가능성, UN 대응)
4. 역사적 유사 사례 (가능하면 연도와 국가를 언급)

그리고 아래 JSON 구조로만 응답하라:

{
  "explanation": "정치/외교 분석가처럼 전략적이고 구체적으로 2문장 이상 설명하라. 전문적 어투를 유지하고 요약은 절대 하지 마라.",
  "adjustments": {
    // RadarChart 관련
    "trustInGov": -4,
    "civilUnrest": +3,
    "debtLevel": +2,

    // PowerTrajectoryGraph 관련 (0~100 범위 내 지표 점수)
    "trajectoryScore": -7,

    // DiplomacySpiderMap 관련 (국가별 지표 변화량, -1.0 ~ +1.0)
    "diplomacy_military_USA": -0.2,
    "diplomacy_trade_CHN": +0.3,
    "diplomacy_students_JPN": -0.1
  }
}

조건:
- 반드시 위 형식에 맞춰 JSON만 반환하라.
- 설명에는 코드블럭( \`\`\` )이나 인사말을 절대 포함하지 마라.
- 구조를 무시하거나 누락된 필드는 오류로 간주한다.
            `.trim()
          },
          {
            role: 'user',
            content: userInput
          }
        ],
        temperature: 0.7
      })
    });

    const data = await openaiRes.json();

    if (!openaiRes.ok) {
      console.error('❌ OpenAI API 오류:', openaiRes.status, data);
      return new Response(JSON.stringify({ error: 'OpenAI API 오류', status: openaiRes.status }), { status: 500 });
    }

    const content = data.choices?.[0]?.message?.content;

    try {
      const parsed = JSON.parse(content);
      return new Response(JSON.stringify(parsed), { status: 200 });
    } catch (err) {
      console.error('🚨 JSON 파싱 오류:', err);
      return new Response(JSON.stringify({ error: 'GPT 응답 파싱 실패', raw: content }), { status: 500 });
    }
  } catch (err) {
    console.error('🚨 GPT 연결 자체 실패:', err);
    return new Response(JSON.stringify({ error: 'GPT 연결 오류', details: err }), { status: 500 });
  }
}
