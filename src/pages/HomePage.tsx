import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@/store/gameStore';
import { TrafficSignCanvas } from '@/components/TrafficSignCanvas';
import { trafficSigns } from '@/data/signs';
import { TOTAL_QUESTIONS, OPTIONS_PER_QUESTION } from '@/services/questionService';
import {
  BASE_SCORE,
  TIME_BONUS_SCORE,
  TIME_BONUS_WINDOW_MS,
} from '@/services/scoreService';
import { SignCategory } from '@/types';
import {
  PlayCircle,
  BookOpen,
  Trophy,
  Zap,
  Target,
  AlertTriangle,
} from 'lucide-react';

const DECORATION_POSITIONS = [
  { top: '10%', left: '8%', size: 70, className: 'animate-float-slow' },
  { top: '18%', right: '12%', size: 80, className: 'animate-float-slower' },
  { top: '60%', left: '5%', size: 65, className: 'animate-float-slow', delay: '1s' },
  { bottom: '15%', right: '8%', size: 75, className: 'animate-float-slower', delay: '1.5s' },
  { bottom: '30%', left: '15%', size: 60, className: 'animate-float-slow', delay: '0.5s' },
  { top: '45%', right: '5%', size: 70, className: 'animate-float-slower', delay: '2s' },
];

export function HomePage() {
  const navigate = useNavigate();
  const startGame = useGameStore(s => s.startGame);

  const decorationSigns = useMemo(() => {
    const byCategory = {
      [SignCategory.PROHIBITION]: trafficSigns.filter(s => s.category === SignCategory.PROHIBITION),
      [SignCategory.WARNING]: trafficSigns.filter(s => s.category === SignCategory.WARNING),
      [SignCategory.INDICATION]: trafficSigns.filter(s => s.category === SignCategory.INDICATION),
    };
    const selected = [
      byCategory[SignCategory.PROHIBITION][2],
      byCategory[SignCategory.WARNING][5],
      byCategory[SignCategory.WARNING][0],
      byCategory[SignCategory.INDICATION][1],
      byCategory[SignCategory.PROHIBITION][10],
      byCategory[SignCategory.WARNING][7],
    ];
    return selected.filter(Boolean);
  }, []);

  const sampleSigns = useMemo(() => {
    return trafficSigns
      .filter((_, i) => i % Math.ceil(trafficSigns.length / 6) === 0)
      .slice(0, 6);
  }, []);

  const totalBankSize = trafficSigns.length;
  const bonusSeconds = TIME_BONUS_WINDOW_MS / 1000;

  const handleStart = () => {
    startGame();
    navigate('/game');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-yellow-500 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {decorationSigns.map((sign, i) => {
          const pos = DECORATION_POSITIONS[i] || DECORATION_POSITIONS[0];
          return (
            <div
              key={sign.id}
              className={`absolute ${pos.className} opacity-70`}
              style={{
                top: pos.top,
                right: pos.right,
                bottom: pos.bottom,
                left: pos.left,
                animationDelay: pos.delay || '0s',
              }}
            >
              <TrafficSignCanvas drawKey={sign.drawKey} size={pos.size} animated={false} />
            </div>
          );
        })}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <AlertTriangle size={16} className="text-yellow-400" />
              <span className="text-sm font-medium text-white/80">
                交通安全知识闯关游戏
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-yellow-100 mb-5 leading-tight">
              交通标志
              <br />
              <span className="text-yellow-400">大挑战</span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100/80 max-w-lg mx-auto leading-relaxed">
              你认识多少道路上的交通标志？<br />
              来挑战一下，看看你能拿多少分！
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <BookOpen size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">游戏规则</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-md">
                  1
                </div>
                <div>
                  <p className="font-bold text-blue-900 mb-1">
                    共 {TOTAL_QUESTIONS} 道题
                  </p>
                  <p className="text-blue-700/80 text-sm leading-relaxed">
                    从{' '}
                    <span className="font-bold text-blue-800">
                      {totalBankSize} 个
                    </span>{' '}
                    常见交通标志题库中随机抽取
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                <div className="w-10 h-10 rounded-xl bg-green-500 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-md">
                  2
                </div>
                <div>
                  <p className="font-bold text-green-900 mb-1">答对得分</p>
                  <p className="text-green-700/80 text-sm leading-relaxed">
                    每题答对{' '}
                    <span className="font-bold text-green-800 text-base">
                      +{BASE_SCORE} 分
                    </span>
                    ，答错不扣分
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-100">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-md">
                  <Zap size={20} fill="currentColor" />
                </div>
                <div>
                  <p className="font-bold text-amber-900 mb-1">神速答题奖励</p>
                  <p className="text-amber-700/80 text-sm leading-relaxed">
                    每题{' '}
                    <span className="font-bold text-amber-800 text-base">
                      {bonusSeconds} 秒内
                    </span>{' '}
                    作答，额外{' '}
                    <span className="font-bold text-amber-800 text-base">
                      +{TIME_BONUS_SCORE} 分
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-rose-50 to-red-50 rounded-2xl border border-rose-100">
                <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-md">
                  <Target size={20} />
                </div>
                <div>
                  <p className="font-bold text-rose-900 mb-1">
                    {OPTIONS_PER_QUESTION} 选 1
                  </p>
                  <p className="text-rose-700/80 text-sm leading-relaxed">
                    每题显示一个标志，从 {OPTIONS_PER_QUESTION} 个选项中选出正确含义
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleStart}
            className="group w-full py-6 px-10 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white rounded-3xl font-black text-2xl shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="relative flex items-center justify-center gap-4">
              <PlayCircle size={36} />
              <span>开始挑战</span>
              <Trophy size={30} className="text-yellow-200" />
            </div>
          </button>

          <div className="mt-8 grid grid-cols-6 gap-3 opacity-60">
            {sampleSigns.map(sign => (
              <div key={sign.id} className="aspect-square">
                <TrafficSignCanvas drawKey={sign.drawKey} size={56} animated={false} />
              </div>
            ))}
          </div>

          <p className="text-center text-white/40 text-sm mt-8">
            题库涵盖禁令标志、警告标志、指示标志等多种类型
          </p>
        </div>
      </div>
    </div>
  );
}
