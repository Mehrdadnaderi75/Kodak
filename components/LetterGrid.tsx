
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
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 p-4">
      {PERSIAN_ALPHABET.map((letter) => {
        const completed = isLetterComplete(letter.char);
        return (
          <button
            key={letter.char}
            onClick={() => handleClick(letter)}
            className={`${letter.color} aspect-square rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-lg hover:scale-105 transition-transform active:scale-95 border-b-4 border-black/20 relative`}
          >
            {letter.char}
            {completed && (
              <div className="absolute -top-1 -right-1 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center text-[10px] shadow-sm border-2 border-white">
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
