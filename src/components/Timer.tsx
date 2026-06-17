import { useEffect } from 'react';
import { useCountdown } from '@/hooks/useCountdown';
import { Zap } from 'lucide-react';

interface TimerProps {
  duration: number;
  isActive: boolean;
  onExpire?: () => void;
  keyReset?: number;
}

export function Timer({ duration, isActive, onExpire, keyReset }: TimerProps) {
  const { remaining, progress, start, stop, reset } = useCountdown({
    duration,
    autoStart: false,
    onComplete: onExpire,
  });

  useEffect(() => {
    reset();
    if (isActive) {
      start();
    } else {
      stop();
    }
  }, [isActive, keyReset, start, stop, reset]);

  const seconds = Math.ceil(remaining / 1000);
  const progressPercent = Math.max(0, Math.min(100, progress * 100));

  const getBarColor = () => {
    if (progress > 0.66) return 'from-green-400 to-emerald-500';
    if (progress > 0.33) return 'from-yellow-400 to-amber-500';
    return 'from-red-400 to-rose-500';
  };

  const getTextColor = () => {
    if (progress > 0.66) return 'text-emerald-600';
    if (progress > 0.33) return 'text-amber-600';
    return 'text-rose-600';
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Zap
            size={18}
            className={isActive && remaining > 0 ? 'text-amber-500 animate-pulse' : 'text-gray-400'}
            fill={isActive && remaining > 0 ? 'currentColor' : 'none'}
          />
          <span className="text-sm font-medium text-gray-600">
            时间奖励窗口
          </span>
        </div>
        <div className={`font-bold text-lg tabular-nums ${getTextColor()}`}>
          {seconds.toFixed(1)}s
        </div>
      </div>
      <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden shadow-inner">
        <div
          className={`h-full bg-gradient-to-r ${getBarColor()} rounded-full transition-all duration-75 ease-linear relative`}
          style={{ width: `${progressPercent}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-shimmer" />
        </div>
      </div>
      {!isActive && remaining <= 0 && (
        <p className="mt-2 text-xs text-gray-400 text-center">
          时间奖励窗口已关闭
        </p>
      )}
    </div>
  );
}
