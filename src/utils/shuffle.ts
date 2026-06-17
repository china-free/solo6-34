export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function randomPick<T>(array: T[], count: number): T[] {
  return shuffleArray(array).slice(0, count);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}
