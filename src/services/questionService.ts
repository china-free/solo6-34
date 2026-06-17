import { Question, QuestionOption, TrafficSign, SignCategory } from '@/types';
import { trafficSigns } from '@/data/signs';
import { shuffleArray, randomPick, generateId } from '@/utils/shuffle';

export const TOTAL_QUESTIONS = 10;
export const OPTIONS_PER_QUESTION = 4;

export function generateQuestions(): Question[] {
  const selectedSigns = randomPick(trafficSigns, TOTAL_QUESTIONS);
  return selectedSigns.map(sign => createQuestion(sign));
}

function createQuestion(sign: TrafficSign): Question {
  const sameCategorySigns = trafficSigns.filter(
    s => s.category === sign.category && s.id !== sign.id
  );
  const otherCategorySigns = trafficSigns.filter(
    s => s.category !== sign.category
  );

  const neededWrong = OPTIONS_PER_QUESTION - 1;
  let wrongSigns = randomPick(sameCategorySigns, Math.min(2, sameCategorySigns.length, neededWrong));
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

export function getSignByDrawKey(drawKey: string): TrafficSign | undefined {
  return trafficSigns.find(s => s.drawKey === drawKey);
}

export function getSignsByCategory(category: SignCategory): TrafficSign[] {
  return trafficSigns.filter(s => s.category === category);
}
