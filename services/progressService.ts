
import { ProgressData } from '../types';

const PROGRESS_KEY = 'persian_alphabet_progress_v2';

export const getProgress = (): ProgressData => {
  const data = localStorage.getItem(PROGRESS_KEY);
  if (data) {
    return JSON.parse(data);
  }
  return { completedLetters: [], starsCount: 0 };
};

export const markLetterComplete = (letterChar: string) => {
  const progress = getProgress();
  if (!progress.completedLetters.includes(letterChar)) {
    progress.completedLetters.push(letterChar);
    progress.starsCount = progress.completedLetters.length;
    progress.lastAccessed = new Date().toISOString();
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    return true;
  }
  return false;
};

export const isLetterComplete = (letterChar: string): boolean => {
  return getProgress().completedLetters.includes(letterChar);
};
