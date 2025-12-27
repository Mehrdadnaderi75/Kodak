
export interface PersianLetter {
  char: string;
  name: string;
  example: string;
  color: string;
  imageUrl: string;
}

export interface GeminiResponse {
  words: string[];
  story: string;
}

export enum AppMode {
  GRID = 'GRID',
  LEARNING = 'LEARNING',
  PAINTING_GEN = 'PAINTING_GEN'
}

export interface ProgressData {
  completedLetters: string[];
  lastAccessed?: string;
  starsCount: number;
}
