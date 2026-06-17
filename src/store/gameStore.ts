import { create } from 'zustand';
import {
  GameState,
  GameStatus,
  Question,
  AnswerRecord,
} from '@/types';
import { generateQuestions } from '@/services/questionService';
import { calculateScore, TIME_BONUS_WINDOW_MS } from '@/services/scoreService';

interface GameActions {
  startGame: () => void;
  submitAnswer: (optionId: string) => void;
  nextQuestion: () => void;
  resetGame: () => void;
  getCurrentQuestion: () => Question | null;
}

type GameStore = GameState & GameActions;

const initialState: GameState = {
  status: GameStatus.IDLE,
  currentQuestionIndex: 0,
  questions: [],
  answers: [],
  totalScore: 0,
  questionStartTime: 0,
  timeBonusWindow: TIME_BONUS_WINDOW_MS,
  correctCount: 0,
  bonusCount: 0,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  startGame() {
    const questions = generateQuestions();
    set({
      status: GameStatus.PLAYING,
      currentQuestionIndex: 0,
      questions,
      answers: [],
      totalScore: 0,
      questionStartTime: Date.now(),
      correctCount: 0,
      bonusCount: 0,
    });
  },

  submitAnswer(optionId: string) {
    const state = get();
    if (state.status !== GameStatus.PLAYING) return;

    const currentQuestion = state.questions[state.currentQuestionIndex];
    if (!currentQuestion) return;

    const timeTaken = Date.now() - state.questionStartTime;
    const selectedOption = currentQuestion.options.find(o => o.id === optionId);
    const isCorrect = optionId === currentQuestion.correctOptionId;
    const { score, earnedBonus } = calculateScore(isCorrect, timeTaken, state.timeBonusWindow);

    const record: AnswerRecord = {
      questionId: currentQuestion.id,
      signId: currentQuestion.sign.id,
      signName: currentQuestion.sign.name,
      drawKey: currentQuestion.sign.drawKey,
      category: currentQuestion.sign.category,
      selectedOptionId: optionId,
      selectedText: selectedOption?.text ?? null,
      isCorrect,
      timeTaken,
      earnedScore: score,
      earnedBonus,
    };

    set({
      status: GameStatus.ANSWERED,
      answers: [...state.answers, record],
      totalScore: state.totalScore + score,
      correctCount: state.correctCount + (isCorrect ? 1 : 0),
      bonusCount: state.bonusCount + (earnedBonus ? 1 : 0),
    });
  },

  nextQuestion() {
    const state = get();
    const nextIndex = state.currentQuestionIndex + 1;
    if (nextIndex >= state.questions.length) {
      set({ status: GameStatus.FINISHED });
    } else {
      set({
        status: GameStatus.PLAYING,
        currentQuestionIndex: nextIndex,
        questionStartTime: Date.now(),
      });
    }
  },

  resetGame() {
    set(initialState);
  },

  getCurrentQuestion() {
    const state = get();
    return state.questions[state.currentQuestionIndex] ?? null;
  },
}));
