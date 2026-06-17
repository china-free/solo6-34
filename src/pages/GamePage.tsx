import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@/store/gameStore';
import { GameStatus } from '@/types';
import { GAME_CONFIG } from '@/data/gameConfig';
import { TrafficSignCanvas } from '@/components/TrafficSignCanvas';
import { OptionButton } from '@/components/OptionButton';
import { Timer } from '@/components/Timer';
import { ScoreBoard } from '@/components/ScoreBoard';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { FeedbackOverlay } from '@/components/FeedbackOverlay';
import { HelpCircle } from 'lucide-react';

export function GamePage() {
  const navigate = useNavigate();
  const {
    status,
    currentQuestionIndex,
    questions,
    answers,
    totalScore,
    timeBonusWindow,
    submitAnswer,
    nextQuestion,
    resetGame,
    getCurrentQuestion,
  } = useGameStore();
  const TOTAL_QUESTIONS = GAME_CONFIG.TOTAL_QUESTIONS;
  const OPTIONS_PER_QUESTION = GAME_CONFIG.OPTIONS_PER_QUESTION;

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [bonusWindowOpen, setBonusWindowOpen] = useState(true);
  const [timerKey, setTimerKey] = useState(0);

  const currentQuestion = useMemo(() => getCurrentQuestion(), [
    getCurrentQuestion,
    currentQuestionIndex,
  ]);
  const lastAnswer = answers[answers.length - 1];
  const isAnswered = status === GameStatus.ANSWERED;
  const isLastQuestion = currentQuestionIndex >= TOTAL_QUESTIONS - 1;

  useEffect(() => {
    if (questions.length === 0) {
      navigate('/');
    }
  }, [questions.length, navigate]);

  useEffect(() => {
    if (status === GameStatus.PLAYING) {
      setSelectedOptionId(null);
      setBonusWindowOpen(true);
      setTimerKey(k => k + 1);
    }
  }, [status, currentQuestionIndex]);

  useEffect(() => {
    if (status === GameStatus.FINISHED) {
      navigate('/result');
    }
  }, [status, navigate]);

  const handleSelectOption = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOptionId(optionId);
    submitAnswer(optionId);
  };

  const handleBonusExpire = () => {
    setBonusWindowOpen(false);
  };

  const handleContinue = () => {
    nextQuestion();
  };

  const handleQuit = () => {
    resetGame();
    navigate('/');
  };

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-3xl mx-auto px-4 py-6 md:py-10">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleQuit}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-xl transition-all"
          >
            <span className="text-lg">←</span>
            <span className="font-medium">退出</span>
          </button>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100">
            <HelpCircle size={16} className="text-blue-500" />
            <span className="text-sm text-gray-600">
              从 {OPTIONS_PER_QUESTION} 个选项中选出标志的正确含义
            </span>
          </div>
        </div>

        <div className="mb-6">
          <ProgressIndicator />
        </div>

        <div className="mb-6">
          <ScoreBoard />
        </div>

        <div className="mb-6">
          <Timer
            duration={timeBonusWindow}
            isActive={status === GameStatus.PLAYING}
            onExpire={handleBonusExpire}
            keyReset={timerKey}
          />
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-gray-100 mb-6">
          <div className="flex flex-col items-center mb-8">
            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6 ${
                bonusWindowOpen && !isAnswered
                  ? 'bg-amber-100 text-amber-700 border border-amber-200'
                  : 'bg-gray-100 text-gray-500 border border-gray-200'
              }`}
            >
              {bonusWindowOpen && !isAnswered ? (
                <>⚡ 快速作答可获得额外奖励</>
              ) : isAnswered ? (
                <>✅ 已作答</>
              ) : (
                <>⏱ 奖励时间已过</>
              )}
            </div>
            <div key={`sign-${currentQuestionIndex}-${timerKey}`}>
              <TrafficSignCanvas
                drawKey={currentQuestion.sign.drawKey}
                size={280}
                animated={true}
              />
            </div>
            <p className="mt-6 text-gray-500 text-sm">
              第 {currentQuestionIndex + 1} 题 / 共 {TOTAL_QUESTIONS} 题
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <OptionButton
                key={option.id}
                option={option}
                index={index}
                disabled={isAnswered}
                showResult={isAnswered}
                isCorrectOption={option.id === currentQuestion.correctOptionId}
                isSelected={option.id === selectedOptionId}
                onClick={() => handleSelectOption(option.id)}
              />
            ))}
          </div>
        </div>

        <div className="text-center text-gray-400 text-sm">
          当前得分：<span className="font-bold text-gray-600">{totalScore}</span> 分
        </div>
      </div>

      <FeedbackOverlay
        show={isAnswered}
        isCorrect={lastAnswer?.isCorrect ?? false}
        score={lastAnswer?.earnedScore ?? 0}
        earnedBonus={lastAnswer?.earnedBonus ?? false}
        correctAnswer={currentQuestion.sign.name}
        onContinue={handleContinue}
        isLast={isLastQuestion}
      />
    </div>
  );
}
