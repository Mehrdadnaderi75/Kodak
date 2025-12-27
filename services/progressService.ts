
import { ProgressData } from '../types';

const PROGRESS_KEY = 'persian_alphabet_progress';

export const getProgress = (): ProgressData => {
  const data = localStorage.getItem(PROGRESS_KEY);
  return data ? JSON.parse(data) : { completedLetters: [] };
};

export const markLetterComplete = (letterChar: string) => {
  const progress = getProgress();
  if (!progress.completedLetters.includes(letterChar)) {
    progress.completedLetters.push(letterChar);
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  }
};

export const isLetterComplete = (letterChar: string): boolean => {
  return getProgress().completedLetters.includes(letterChar);
};
