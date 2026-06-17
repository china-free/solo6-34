import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GAME_CONFIG,
  getHomeDecorationSigns,
  getHomePreviewSigns,
  getTotalEnabledCount,
} from '@/data/gameConfig';
import { TrafficSignCanvas } from '@/components/TrafficSignCanvas';
import {
  Play,
  Target,
  Award,
  Clock,
  CheckCircle2,
  Sparkles,
  Car,
} from 'lucide-react';

const DECORATION_POSITIONS: Array<{ top: string; left: string; animClass: string }> = [
  { top: '5%', left: '3%', animClass: 'float-slower' },
  { top: '8%', left: '90%', animClass: 'float-slow' },
  { top: '45%', left: '2%', animClass: 'float-slow' },
  { top: '50%', left: '92%', animClass: 'float-slower' },
  { top: '80%', left: '8%', animClass: 'float-slower' },
  { top: '82%', left: '88%', animClass: 'float-slow' },
];

export function HomePage() {
  const navigate = useNavigate();

  const decorationSigns = useMemo(() => getHomeDecorationSigns(), []);
  const sampleSigns = useMemo(() => getHomePreviewSigns(), []);
  const totalBankSize = useMemo(() => getTotalEnabledCount(), []);

  const totalQuestions = GAME_CONFIG.TOTAL_QUESTIONS;
  const optionsCount = GAME_CONFIG.OPTIONS_PER_QUESTION;
  const baseScore = GAME_CONFIG.BASE_SCORE;
  const bonusScore = GAME_CONFIG.TIME_BONUS_SCORE;
  const bonusSeconds = GAME_CONFIG.TIME_BONUS_WINDOW_MS / 1000;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-50 flex flex-col items-center px-6 py-10">
      {decorationSigns.map((sign, idx) => (
        <div
          key={`deco-${sign.id}`}
          className={`absolute opacity-20 ${DECORATION_POSITIONS[idx]?.animClass ?? 'float-slow'}`}
          style={{
            top: DECORATION_POSITIONS[idx]?.top ?? '10%',
            left: DECORATION_POSITIONS[idx]?.left ?? '10%',
          }}
        >
          <div className="w-16 h-16">
            <TrafficSignCanvas drawKey={sign.drawKey} size={64} animated={false} />
          </div>
        </div>
      ))}

      <div className="relative z-10 max-w-3xl w-full text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm text-sky-700 text-sm font-medium shadow-sm mb-6">
          <Car size={16} />
          <span>交通安全知识闯关</span>
        </div>

        <h1 className="text-5xl font-black text-slate-800 mb-4 tracking-tight leading-tight">
          交通标志
          <span className="bg-gradient-to-r from-sky-500 to-cyan-500 bg-clip-text text-transparent"> 大挑战</span>
        </h1>

        <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto leading-relaxed">
          考考你认识多少交通标志！共 {totalQuestions} 道题，每题 {optionsCount} 个选项，答得越快得分越高～
        </p>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/60 mb-10 text-left">
          <h2 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
            <Sparkles size={20} className="text-amber-500" />
            游戏规则
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center mt-0.5">
                <Target size={18} className="text-sky-600" />
              </div>
              <div className="flex-1">
                <span className="font-semibold text-slate-800">共 {totalQuestions} 道题</span>
                <span className="text-slate-600">，从题库 {totalBankSize} 个标志中随机抽取</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center mt-0.5">
                <CheckCircle2 size={18} className="text-emerald-600" />
              </div>
              <div className="flex-1">
                <span className="font-semibold text-slate-800">答对得 {baseScore} 分</span>
                <span className="text-slate-600">，每题为 {optionsCount} 选 1</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center mt-0.5">
                <Clock size={18} className="text-amber-600" />
              </div>
              <div className="flex-1">
                <span className="font-semibold text-slate-800">速度奖励</span>
                <span className="text-slate-600">：{bonusSeconds} 秒内答对，额外加 {bonusScore} 分</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center mt-0.5">
                <Award size={18} className="text-rose-600" />
              </div>
              <div className="flex-1">
                <span className="font-semibold text-slate-800">答错不扣分</span>
                <span className="text-slate-600">，会正确答案，帮助你学习</span>
              </div>
            </li>
          </ul>
        </div>

        <button
          onClick={() => navigate('/game')}
          className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-sky-500 to-cyan-500 text-white text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <Play size={24} fill="white" />
          <span>开始挑战</span>
        </button>

        <div className="mt-16">
          <p className="text-sm text-slate-500 mb-5">认识下面这些标志吗？</p>
          <div className="flex justify-center flex-wrap gap-4">
            {sampleSigns.map(sign => (
              <div
                key={sign.id}
                className="w-16 h-16 bg-white rounded-xl shadow-md p-2 hover:scale-110 transition-transform cursor-default"
                title={sign.name}
              >
                <TrafficSignCanvas drawKey={sign.drawKey} size={48} animated={false} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
