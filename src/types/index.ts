export enum SignCategory {
  PROHIBITION = 'prohibition',
  WARNING = 'warning',
  INDICATION = 'indication',
  GUIDE = 'guide',
}

export enum GameStatus {
  IDLE = 'idle',
  PLAYING = 'playing',
  ANSWERED = 'answered',
  FINISHED = 'finished',
}

export interface TrafficSign {
  id: string;
  name: string;
  category: SignCategory;
  drawKey: string;
  description?: string;
}

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  sign: TrafficSign;
  options: QuestionOption[];
  correctOptionId: string;
}

export interface AnswerRecord {
  questionId: string;
  signId: string;
  signName: string;
  drawKey: string;
  category: SignCategory;
  selectedOptionId: string | null;
  selectedText: string | null;
  isCorrect: boolean;
  timeTaken: number;
  earnedScore: number;
  earnedBonus: boolean;
}

export interface GameState {
  status: GameStatus;
  currentQuestionIndex: number;
  questions: Question[];
  answers: AnswerRecord[];
  totalScore: number;
  questionStartTime: number;
  timeBonusWindow: number;
  correctCount: number;
  bonusCount: number;
}
