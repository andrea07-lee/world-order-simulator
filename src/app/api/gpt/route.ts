import { NextRequest } from "next/server";
import { OpenAI } from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

// ✅ OpenAI 클라이언트 생성
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { countryData, userInput } = await req.json();

    // ✅ 타입 명시적으로 선언!
    const messages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: `
너는 국제 정치와 외교 시뮬레이션을 설명하는 전략 AI야.한국어로 질문했을 때는 한국어로 답변하고, 영어로 질문할 경우 무조건 영어로 답변해라.

사용자가 이해하기 쉽도록 정치, 경제, 외교 측면에서 일어날 수 있는 변화를
**단계적으로**, **명확하게**, **쉽고 직관적인 언어로** 설명해야 해.

설명할 때는 다음 세 가지를 중심으로 이야기하라:
1. 정치적 변화 (예: 지도자 교체, 사회적 갈등, 여론 분열 등)
2. 경제적 영향 (예: 물가 불안, 기업 투자 위축, 국민 체감 변화 등)
3. 외교/안보 파장 (예: 주변국 반응, 외교 관계 흔들림, 군사적 긴장 등)

가능하다면 과거 사례를 짧게 언급해 이해를 돕되,
절대 어려운 수치나 기술적인 용어를 쓰지 말고,
**중학생도 이해할 수 있을 정도의 설명**을 제공해.

말투는 전문가이지만, 마치 뉴스 해설처럼 **친절하고 논리적인 어조**로 설명할 것.
        `.trim(),
      },
      {
        role: "user",
        content: `
현재 국가 데이터:
${JSON.stringify(countryData, null, 2)}

질문:
${userInput}
        `.trim(),
      }
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
      temperature: 0.7,
    });

    const responseMessage = completion.choices[0].message?.content || "GPT 응답 없음";

    return new Response(JSON.stringify({ message: responseMessage }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("🔥 GPT API 호출 실패:", error);
    return new Response(
      JSON.stringify({ error: "GPT 호출 실패", details: error }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
