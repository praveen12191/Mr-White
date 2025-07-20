export interface Player {
  id: string;
  name: string;
  word: string;
  isMrWhite: boolean;
  hasSeenWord: boolean;
}

export interface WordPair {
  normal: string;
  mrWhite: string;
}

export type GamePhase = 'setup' | 'cardPicking' | 'discussion';