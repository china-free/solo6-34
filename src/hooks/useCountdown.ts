import { useState, useEffect, useRef, useCallback } from 'react';

interface UseCountdownOptions {
  duration: number;
  autoStart?: boolean;
  onComplete?: () => void;
  onTick?: (remaining: number) => void;
}

export function useCountdown({
  duration,
  autoStart = true,
  onComplete,
  onTick,
}: UseCountdownOptions) {
  const [remaining, setRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const durationRef = useRef(duration);

  const clear = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    clear();
    durationRef.current = duration;
    startTimeRef.current = Date.now();
    setRemaining(duration);
    setIsRunning(true);
    onTick?.(duration);

    intervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const newRemaining = Math.max(0, durationRef.current - elapsed);
      setRemaining(newRemaining);
      onTick?.(newRemaining);

      if (newRemaining <= 0) {
        clear();
        setIsRunning(false);
        onComplete?.();
      }
    }, 50);
  }, [duration, clear, onComplete, onTick]);

  const stop = useCallback(() => {
    clear();
    setIsRunning(false);
  }, [clear]);

  const reset = useCallback(() => {
    clear();
    setRemaining(duration);
    setIsRunning(false);
  }, [clear, duration]);

  useEffect(() => {
    if (autoStart) {
      start();
    }
    return clear;
  }, [autoStart, start, clear]);

  return {
    remaining,
    isRunning,
    progress: duration > 0 ? remaining / duration : 0,
    start,
    stop,
    reset,
  };
}
