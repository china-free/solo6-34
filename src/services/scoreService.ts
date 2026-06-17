import { AnswerRecord } from '@/types';

export const BASE_SCORE = 10;
export const TIME_BONUS_SCORE = 5;
export const TIME_BONUS_WINDOW_MS = 3000;

export function calculateScore(isCorrect: boolean, timeTaken: number, bonusWindow: number) {
  if (!isCorrect) {
    return { score: 0, earnedBonus: false };
  }
  const earnedBonus = timeTaken < bonusWindow;
  const score = BASE_SCORE + (earnedBonus ? TIME_BONUS_SCORE : 0);
  return { score, earnedBonus };
}

export function summarizeResults(records: AnswerRecord[]) {
  const totalQuestions = records.length;
  const correctCount = records.filter(r => r.isCorrect).length;
  const totalScore = records.reduce((sum, r) => sum + r.earnedScore, 0);
  const bonusCount = records.filter(r => r.earnedBonus).length;
  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  return {
    totalQuestions,
    correctCount,
    totalScore,
    bonusCount,
    accuracy,
  };
}
