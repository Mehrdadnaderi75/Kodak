
import React from 'react';
import { PERSIAN_ALPHABET } from '../constants';
import { PersianLetter } from '../types';
import { audioService } from '../services/audioService';
import { isLetterComplete } from '../services/progressService';

interface LetterGridProps {
  onSelect: (letter: PersianLetter) => void;
}

const LetterGrid: React.FC<LetterGridProps> = ({ onSelect }) => {
  const handleClick = (letter: PersianLetter) => {
    audioService.play('pop');
    onSelect(letter);
  };

  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 p-6">
      {PERSIAN_ALPHABET.map((letter) => {
        const completed = isLetterComplete(letter.char);
        return (
          <button
            key={letter.char}
            onClick={() => handleClick(letter)}
            className={`${letter.color} aspect-square rounded-3xl flex items-center justify-center text-3xl md:text-4xl font-black text-white shadow-[0_8px_0_rgba(0,0,0,0.1)] hover:shadow-[0_4px_0_rgba(0,0,0,0.1)] hover:translate-y-[4px] active:translate-y-[6px] active:shadow-none transition-all relative border-2 border-white/20`}
          >
            {letter.char}
            {completed && (
              <div className="absolute -top-2 -right-2 bg-green-500 rounded-full w-7 h-7 flex items-center justify-center text-xs shadow-lg border-2 border-white animate-bounce">
                ✅
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default LetterGrid;
