import { clsx } from 'clsx';
import { CheckCircle2, XCircle, Zap } from 'lucide-react';

interface FeedbackOverlayProps {
  show: boolean;
  isCorrect: boolean;
  score: number;
  earnedBonus: boolean;
  correctAnswer: string;
  onContinue: () => void;
  isLast: boolean;
}

export function FeedbackOverlay({
  show,
  isCorrect,
  score,
  earnedBonus,
  correctAnswer,
  onContinue,
  isLast,
}: FeedbackOverlayProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onContinue}
      />

      <div
        className={clsx(
          'relative w-full max-w-sm rounded-3xl p-8 shadow-2xl transform animate-pop-in',
          {
            'bg-gradient-to-br from-green-50 to-emerald-100 border-4 border-green-300':
              isCorrect,
            'bg-gradient-to-br from-red-50 to-rose-100 border-4 border-red-300':
              !isCorrect,
          }
        )}
      >
        <div className="flex flex-col items-center text-center">
          <div
            className={clsx(
              'w-24 h-24 rounded-full flex items-center justify-center mb-5 shadow-lg animate-bounce-once',
              {
                'bg-green-500': isCorrect,
                'bg-red-500': !isCorrect,
              }
            )}
          >
            {isCorrect ? (
              <CheckCircle2 size={56} className="text-white" strokeWidth={2.5} />
            ) : (
              <XCircle size={56} className="text-white" strokeWidth={2.5} />
            )}
          </div>

          <h2
            className={clsx('text-3xl font-bold mb-3', {
              'text-green-700': isCorrect,
              'text-red-700': !isCorrect,
            })}
          >
            {isCorrect ? '回答正确！' : '回答错误'}
          </h2>

          <div className="flex items-center gap-2 mb-4">
            <span
              className={clsx(
                'text-5xl font-black tabular-nums',
                {
                  'text-green-600': isCorrect,
                  'text-red-500': !isCorrect,
                }
              )}
            >
              {isCorrect ? `+${score}` : '+0'}
            </span>
            <span className="text-xl text-gray-600 font-medium">分</span>
          </div>

          {earnedBonus && (
            <div className="flex items-center gap-2 mb-5 px-5 py-2.5 bg-amber-100 rounded-full border-2 border-amber-300 animate-pulse">
              <Zap size={20} className="text-amber-600" fill="currentColor" />
              <span className="font-bold text-amber-700">
                神速答题！额外 +5 分奖励
              </span>
            </div>
          )}

          {!isCorrect && (
            <div className="w-full p-5 bg-white/70 rounded-2xl mb-6 border-2 border-white">
              <p className="text-sm text-gray-600 mb-2 font-medium">
                正确答案是：
              </p>
              <p className="text-xl font-bold text-green-700">
                {correctAnswer}
              </p>
            </div>
          )}

          <button
            onClick={onContinue}
            className={clsx(
              'w-full py-4 px-8 rounded-2xl text-white font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg',
              {
                'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700':
                  isCorrect,
                'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700':
                  !isCorrect,
              }
            )}
          >
            {isLast ? '查看最终成绩 🏆' : '下一题 →'}
          </button>
        </div>
      </div>
    </div>
  );
}
