import { useGameStore } from '@/store/gameStore';
import { GAME_CONFIG } from '@/data/gameConfig';
import { Check, Circle } from 'lucide-react';

export function ProgressIndicator() {
  const { currentQuestionIndex, answers } = useGameStore();
  const TOTAL_QUESTIONS = GAME_CONFIG.TOTAL_QUESTIONS;

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {Array.from({ length: TOTAL_QUESTIONS }).map((_, i) => {
        const answered = answers[i];
        const isCurrent = i === currentQuestionIndex;
        const isPast = i < currentQuestionIndex;
        const isCorrect = answered?.isCorrect;

        return (
          <div
            key={i}
            className="relative"
          >
            {answered ? (
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-all ${
                  isCorrect
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}
              >
                {isCorrect ? (
                  <Check size={16} strokeWidth={3} />
                ) : (
                  <span className="text-sm font-bold">×</span>
                )}
              </div>
            ) : isCurrent ? (
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg ring-4 ring-blue-200 animate-pulse">
                <span className="text-sm font-bold">{i + 1}</span>
              </div>
            ) : isPast ? (
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">{i + 1}</span>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                <Circle size={8} className="text-gray-400" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
