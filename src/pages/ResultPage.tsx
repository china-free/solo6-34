import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@/store/gameStore';
import { summarizeResults } from '@/services/scoreService';
import { GAME_CONFIG } from '@/data/gameConfig';
import { TrafficSignCanvas } from '@/components/TrafficSignCanvas';
import {
  Trophy,
  RotateCcw,
  Home,
  CheckCircle2,
  XCircle,
  Zap,
  Award,
  Percent,
  Sparkles,
  Star,
} from 'lucide-react';
import { clsx } from 'clsx';

export function ResultPage() {
  const navigate = useNavigate();
  const { answers, resetGame, startGame } = useGameStore();
  const TOTAL_QUESTIONS = GAME_CONFIG.TOTAL_QUESTIONS;
  const TIME_BONUS_SCORE = GAME_CONFIG.TIME_BONUS_SCORE;

  const summary = useMemo(() => summarizeResults(answers), [answers]);

  const handlePlayAgain = () => {
    startGame();
    navigate('/game');
  };

  const handleGoHome = () => {
    resetGame();
    navigate('/');
  };

  const getGrade = () => {
    const { accuracy, totalScore } = summary;
    if (totalScore >= 140 && accuracy >= 90) {
      return {
        emoji: '🏆',
        title: '交通标志专家！',
        desc: '太棒了！你对交通标志了如指掌，是真正的老司机！',
        color: 'from-amber-400 via-yellow-500 to-orange-500',
        bgColor: 'from-amber-50 via-yellow-50 to-orange-50',
        borderColor: 'border-amber-200',
      };
    }
    if (accuracy >= 80) {
      return {
        emoji: '🎉',
        title: '成绩优秀！',
        desc: '非常不错！大部分标志都能准确识别，继续保持！',
        color: 'from-green-400 via-emerald-500 to-teal-500',
        bgColor: 'from-green-50 via-emerald-50 to-teal-50',
        borderColor: 'border-green-200',
      };
    }
    if (accuracy >= 60) {
      return {
        emoji: '👍',
        title: '合格通过！',
        desc: '还不错，但还有一些标志需要加强记忆哦~',
        color: 'from-blue-400 via-indigo-500 to-violet-500',
        bgColor: 'from-blue-50 via-indigo-50 to-violet-50',
        borderColor: 'border-blue-200',
      };
    }
    return {
      emoji: '💪',
      title: '继续努力！',
      desc: '多多练习，相信下次一定会有更好的成绩！',
      color: 'from-rose-400 via-red-500 to-pink-500',
      bgColor: 'from-rose-50 via-red-50 to-pink-50',
      borderColor: 'border-rose-200',
    };
  };

  const grade = getGrade();

  if (answers.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600 mb-4">还没有游戏记录哦~</p>
          <button
            onClick={handleGoHome}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition"
          >
            回到首页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${grade.bgColor} py-8 md:py-12 px-4`}>
      <div className="max-w-2xl mx-auto">
        <div
          className={`bg-white rounded-3xl shadow-2xl p-8 md:p-10 mb-8 border-2 ${grade.borderColor} relative overflow-hidden`}
        >
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none">
            <div className={`absolute top-8 right-8 w-40 h-40 rounded-full bg-gradient-to-br ${grade.color} blur-3xl`} />
          </div>

          <div className="relative text-center mb-8">
            <div className="text-7xl md:text-8xl mb-4 animate-bounce-once">
              {grade.emoji}
            </div>
            <h1
              className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${grade.color} bg-clip-text text-transparent mb-3`}
            >
              {grade.title}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
              {grade.desc}
            </p>
          </div>

          <div className={`relative w-48 h-48 mx-auto mb-8`}>
            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${grade.color} opacity-10 animate-pulse`} />
            <div className="absolute inset-4 rounded-full bg-white shadow-2xl flex flex-col items-center justify-center border-4 border-gray-50">
              <div className="flex items-center gap-1 mb-1">
                <Trophy size={24} className="text-amber-500" />
              </div>
              <span
                className={`text-5xl md:text-6xl font-black bg-gradient-to-r ${grade.color} bg-clip-text text-transparent tabular-nums`}
              >
                {summary.totalScore}
              </span>
              <span className="text-gray-500 text-sm mt-1 font-medium">总分</span>
            </div>
          </div>

          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100 text-center">
              <div className="flex justify-center mb-2">
                <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                  <Percent size={20} className="text-white" />
                </div>
              </div>
              <p className="text-3xl font-black text-blue-800 tabular-nums">
                {summary.accuracy}
                <span className="text-lg">%</span>
              </p>
              <p className="text-xs text-blue-600 font-medium mt-1">正确率</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100 text-center">
              <div className="flex justify-center mb-2">
                <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">
                  <CheckCircle2 size={20} className="text-white" />
                </div>
              </div>
              <p className="text-3xl font-black text-green-800 tabular-nums">
                {summary.correctCount}
                <span className="text-lg text-green-500 font-normal">/{TOTAL_QUESTIONS}</span>
              </p>
              <p className="text-xs text-green-600 font-medium mt-1">答对数</p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-100 text-center">
              <div className="flex justify-center mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <Zap size={20} className="text-white" fill="currentColor" />
                </div>
              </div>
              <p className="text-3xl font-black text-amber-800 tabular-nums">
                {summary.bonusCount}
              </p>
              <p className="text-xs text-amber-600 font-medium mt-1">快速奖励</p>
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-2xl p-4 border border-rose-100 text-center">
              <div className="flex justify-center mb-2">
                <div className="w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center">
                  <XCircle size={20} className="text-white" />
                </div>
              </div>
              <p className="text-3xl font-black text-rose-800 tabular-nums">
                {summary.totalQuestions - summary.correctCount}
              </p>
              <p className="text-xs text-rose-600 font-medium mt-1">答错数</p>
            </div>
          </div>

          <div className="relative flex items-center justify-center gap-4 mb-2">
            <div className="flex -space-x-1">
              {Array.from({ length: Math.min(5, Math.floor(summary.totalScore / 30)) }).map((_, i) => (
                <Star
                  key={i}
                  size={28}
                  className="text-amber-400 drop-shadow"
                  fill="currentColor"
                />
              ))}
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border border-purple-200">
              <Sparkles size={16} className="text-purple-600" />
              <span className="text-sm font-bold text-purple-700">
                {summary.totalScore >= 120 ? '五星驾驶员' :
                 summary.totalScore >= 90 ? '四星驾驶员' :
                 summary.totalScore >= 60 ? '三星驾驶员' :
                 summary.totalScore >= 30 ? '二星驾驶员' : '一星新手'}
              </span>
              <Award size={16} className="text-pink-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">📋</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">答题详情</h2>
            <span className="ml-auto text-sm text-gray-400 font-medium">
              共 {summary.totalQuestions} 题
            </span>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {answers.map((answer, i) => (
              <div
                key={answer.questionId}
                className={clsx(
                  'flex items-center gap-4 p-4 rounded-2xl border-2 transition-all',
                  {
                    'bg-gradient-to-r from-green-50 to-emerald-50/50 border-green-200':
                      answer.isCorrect,
                    'bg-gradient-to-r from-red-50 to-rose-50/50 border-red-200':
                      !answer.isCorrect,
                  }
                )}
              >
                <div
                  className={clsx(
                    'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-white shadow-sm',
                    {
                      'bg-green-500': answer.isCorrect,
                      'bg-red-500': !answer.isCorrect,
                    }
                  )}
                >
                  {answer.isCorrect ? (
                    <CheckCircle2 size={22} strokeWidth={2.5} />
                  ) : (
                    <XCircle size={22} strokeWidth={2.5} />
                  )}
                </div>

                <div className="flex-shrink-0 bg-white rounded-xl p-1.5 shadow-sm border border-gray-100">
                  <TrafficSignCanvas
                    drawKey={answer.drawKey}
                    size={56}
                    animated={false}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-400">
                      第{i + 1}题
                    </span>
                    {answer.earnedBonus && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-bold border border-amber-200">
                        <Zap size={12} fill="currentColor" />
                        神速 +{TIME_BONUS_SCORE}
                      </span>
                    )}
                  </div>
                  <p className="font-bold text-gray-800 truncate mb-1">
                    {answer.signName}
                  </p>
                  {!answer.isCorrect && answer.selectedText && (
                    <p className="text-xs text-red-600 truncate">
                      你的答案：<span className="line-through opacity-80">{answer.selectedText}</span>
                    </p>
                  )}
                </div>

                <div className="flex-shrink-0 text-right">
                  <p
                    className={clsx(
                      'text-2xl font-black tabular-nums',
                      {
                        'text-green-600': answer.isCorrect,
                        'text-red-400': !answer.isCorrect,
                      }
                    )}
                  >
                    +{answer.earnedScore}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {(answer.timeTaken / 1000).toFixed(1)}s
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={handlePlayAgain}
            className="group py-5 px-8 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white rounded-2xl font-bold text-lg shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <div className="relative flex items-center justify-center gap-3">
              <RotateCcw size={24} />
              <span>再来一局</span>
            </div>
          </button>

          <button
            onClick={handleGoHome}
            className="group py-5 px-8 bg-white hover:bg-gray-50 text-gray-800 rounded-2xl font-bold text-lg shadow-xl border-2 border-gray-200 hover:border-gray-300 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex items-center justify-center gap-3">
              <Home size={24} className="text-gray-600 group-hover:text-blue-600 transition" />
              <span>返回首页</span>
            </div>
          </button>
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          交通安全，从我做起 🚦 文明驾驶，平安出行
        </p>
      </div>
    </div>
  );
}
