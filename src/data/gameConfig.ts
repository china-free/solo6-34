import { trafficSigns as rawTrafficSigns } from '@/data/signs';
import { availableDrawKeys } from '@/utils/drawUtils';
import { SignCategory, TrafficSign } from '@/types';
import { randomPick } from '@/utils/shuffle';

export const GAME_CONFIG = {
  TOTAL_QUESTIONS: 10,
  OPTIONS_PER_QUESTION: 4,
  BASE_SCORE: 10,
  TIME_BONUS_SCORE: 5,
  TIME_BONUS_WINDOW_MS: 3000,
  HOME_DECORATION_SIGN_COUNT: 6,
  HOME_PREVIEW_SIGN_COUNT: 6,
} as const;

const drawableSet = new Set(availableDrawKeys);

export const trafficSigns: TrafficSign[] = rawTrafficSigns.map(sign => ({
  ...sign,
  enabled: sign.enabled !== false && drawableSet.has(sign.drawKey),
  showOnHome: sign.showOnHome !== false && drawableSet.has(sign.drawKey),
}));

export function isDrawable(drawKey: string): boolean {
  return drawableSet.has(drawKey);
}

export function getEnabledSigns(): TrafficSign[] {
  return trafficSigns.filter(s => s.enabled);
}

export function getHomePageSigns(): TrafficSign[] {
  return trafficSigns.filter(s => s.showOnHome);
}

export function getSignsByCategory(category: SignCategory): TrafficSign[] {
  return trafficSigns.filter(s => s.category === category);
}

export function getEnabledSignsByCategory(category: SignCategory): TrafficSign[] {
  return getEnabledSigns().filter(s => s.category === category);
}

export function getSignById(id: string): TrafficSign | undefined {
  return trafficSigns.find(s => s.id === id);
}

export function getSignByDrawKey(drawKey: string): TrafficSign | undefined {
  return trafficSigns.find(s => s.drawKey === drawKey);
}

export function getTotalEnabledCount(): number {
  return getEnabledSigns().length;
}

export function getHomeDecorationSigns(count: number = GAME_CONFIG.HOME_DECORATION_SIGN_COUNT): TrafficSign[] {
  const candidates = getHomePageSigns();
  const byCategory = {
    [SignCategory.PROHIBITION]: candidates.filter(s => s.category === SignCategory.PROHIBITION),
    [SignCategory.WARNING]: candidates.filter(s => s.category === SignCategory.WARNING),
    [SignCategory.INDICATION]: candidates.filter(s => s.category === SignCategory.INDICATION),
    [SignCategory.GUIDE]: candidates.filter(s => s.category === SignCategory.GUIDE),
  };
  const balanced: TrafficSign[] = [];
  const categories = Object.values(SignCategory).filter(
    c => byCategory[c as SignCategory].length > 0
  ) as SignCategory[];
  let idx = 0;
  while (balanced.length < count && categories.length > 0) {
    const cat = categories[idx % categories.length];
    const pool = byCategory[cat].filter(s => !balanced.includes(s));
    if (pool.length > 0) {
      balanced.push(pool[idx % pool.length]);
    }
    idx++;
    if (idx > count * 3) break;
  }
  if (balanced.length < count) {
    const extra = randomPick(
      candidates.filter(s => !balanced.includes(s)),
      count - balanced.length
    );
    balanced.push(...extra);
  }
  return balanced.slice(0, count);
}

export function getHomePreviewSigns(count: number = GAME_CONFIG.HOME_PREVIEW_SIGN_COUNT): TrafficSign[] {
  const candidates = getHomePageSigns();
  const step = Math.max(1, Math.ceil(candidates.length / count));
  return candidates.filter((_, i) => i % step === 0).slice(0, count);
}

export type GameConfig = typeof GAME_CONFIG;
