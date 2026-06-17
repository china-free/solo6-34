import { Question, QuestionOption, TrafficSign, SignCategory } from '@/types';
import {
  GAME_CONFIG,
  getEnabledSigns,
  getEnabledSignsByCategory,
  getSignByDrawKey,
  getSignsByCategory,
} from '@/data/gameConfig';
import { shuffleArray, randomPick, generateId } from '@/utils/shuffle';

export const TOTAL_QUESTIONS = GAME_CONFIG.TOTAL_QUESTIONS;
export const OPTIONS_PER_QUESTION = GAME_CONFIG.OPTIONS_PER_QUESTION;

export function generateQuestions(): Question[] {
  const pool = getEnabledSigns();
  const selectedSigns = randomPick(pool, Math.min(TOTAL_QUESTIONS, pool.length));
  return selectedSigns.map(sign => createQuestion(sign));
}

function createQuestion(sign: TrafficSign): Question {
  const pool = getEnabledSigns();
  const sameCategorySigns = getEnabledSignsByCategory(sign.category).filter(
    s => s.id !== sign.id
  );
  const otherCategorySigns = pool.filter(
    s => s.category !== sign.category
  );

  const neededWrong = OPTIONS_PER_QUESTION - 1;
  let wrongSigns = randomPick(
    sameCategorySigns,
    Math.min(2, sameCategorySigns.length, neededWrong)
  );
  const remainingNeeded = neededWrong - wrongSigns.length;
  if (remainingNeeded > 0 && otherCategorySigns.length > 0) {
    wrongSigns = [...wrongSigns, ...randomPick(otherCategorySigns, remainingNeeded)];
  }

  const correctOption: QuestionOption = {
    id: generateId(),
    text: sign.name,
    isCorrect: true,
  };

  const wrongOptions: QuestionOption[] = wrongSigns.map(s => ({
    id: generateId(),
    text: s.name,
    isCorrect: false,
  }));

  const options = shuffleArray([correctOption, ...wrongOptions]);

  return {
    id: generateId(),
    sign,
    options,
    correctOptionId: correctOption.id,
  };
}

export { getSignByDrawKey, getSignsByCategory };
