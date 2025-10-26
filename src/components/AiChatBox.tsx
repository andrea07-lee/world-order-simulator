'use client';

import { useState } from "react";

type Props = {
  currentScores: Record<string, number>;
  setCurrentScores: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  onSimulate?: () => void;
  aiExplanation: string;
  setAiExplanation: React.Dispatch<React.SetStateAction<string>>;
};

export default function AiChatBox({
  currentScores,
  setCurrentScores,
  onSimulate,
  aiExplanation,
  setAiExplanation,
}: Props) {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAskAndSimulate = async () => {
    if (!userInput.trim()) return;

    setLoading(true);
    setAiExplanation("");

    try {
      const response = await fetch("/api/gpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ countryData: currentScores, userInput }),
      });

      const result = await response.json();
      setAiExplanation(result.message);
    } catch (err) {
      setAiExplanation("❗️GPT 호출 중 오류가 발생했습니다.");
    }

    setUserInput("");
    setLoading(false);

    if (onSimulate) onSimulate();
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="space-y-3 overflow-y-auto flex-1 pr-1">
        <div className="text-lg font-semibold text-blue-400">🎯 AI Strategy Center</div>
        <div className="text-sm text-gray-400 mb-2">
        You may ask strategic or analytical questions before running the simulation.
Try asking things like:

“How would rising debt and internal conflict affect national stability?”

“What if this country forms a stronger alliance with the U.S.?”

“How can I reduce crisis risk without weakening trade relations?”

“Which factor contributes most to long-term decline in this scenario?”

“Summarize the key threats facing this nation right now.”
        </div>

        {aiExplanation && (
          <div className="flex justify-start">
            <div className="bg-blue-600 text-white p-3 rounded-xl max-w-[70%] whitespace-pre-line shadow">
              {aiExplanation}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-end">
        <textarea
          className="flex-1 p-3 rounded-lg text-sm bg-[#2a2a3a] text-white resize-none h-24 focus:ring focus:ring-blue-500"
          placeholder="Ask to AI"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button
          onClick={handleAskAndSimulate}
          disabled={loading}
          className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg h-fit"
        >
          {loading ? "GPT loading" : "🚀"}
        </button>
      </div>
    </div>
  );
}
