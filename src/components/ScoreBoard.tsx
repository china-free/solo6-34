import { Trophy, Target, Zap } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import { TOTAL_QUESTIONS } from '@/services/questionService';

export function ScoreBoard() {
  const { totalScore, currentQuestionIndex, bonusCount, correctCount } = useGameStore();

  return (
    <div className="grid grid-cols-3 gap-3 w-full">
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-200/60 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Trophy size={16} className="text-amber-600" />
          <span className="text-xs font-medium text-amber-700 uppercase tracking-wide">
            总分
          </span>
        </div>
        <div className="text-3xl font-bold text-amber-800 tabular-nums">
          {totalScore}
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200/60 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Target size={16} className="text-blue-600" />
          <span className="text-xs font-medium text-blue-700 uppercase tracking-wide">
            进度
          </span>
        </div>
        <div className="text-3xl font-bold text-blue-800 tabular-nums">
          {currentQuestionIndex + 1}
          <span className="text-lg text-blue-500 font-normal">/{TOTAL_QUESTIONS}</span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200/60 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Zap size={16} className="text-emerald-600" />
          <span className="text-xs font-medium text-emerald-700 uppercase tracking-wide">
            答对/奖励
          </span>
        </div>
        <div className="text-3xl font-bold text-emerald-800 tabular-nums">
          {correctCount}
          <span className="text-lg text-emerald-500 font-normal"> / {bonusCount}</span>
        </div>
      </div>
    </div>
  );
}
