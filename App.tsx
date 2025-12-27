
import React, { useState, useEffect } from 'react';
import { PersianLetter, AppMode } from './types';
import LetterGrid from './components/LetterGrid';
import LearningView from './components/LearningView';
import PaintingIdeaGenerator from './components/PaintingIdeaGenerator';
import { audioService } from './services/audioService';
import { getProgress } from './services/progressService';

const App: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<PersianLetter | null>(null);
  const [mode, setMode] = useState<AppMode>(AppMode.GRID);
  const [progress, setProgress] = useState(getProgress());

  useEffect(() => {
    if (mode === AppMode.GRID) {
      setProgress(getProgress());
    }
  }, [mode]);

  const handleSelectLetter = (l: PersianLetter) => {
    setSelectedLetter(l);
    setMode(AppMode.LEARNING);
  };

  const handleBackToGrid = () => {
    setMode(AppMode.GRID);
    setSelectedLetter(null);
  };

  const handlePaintingGenClick = () => {
    audioService.play('sparkle');
    setMode(AppMode.PAINTING_GEN);
  };

  return (
    <div className="min-h-screen bg-[#fefce8] text-right" dir="rtl">
      <header className="bg-blue-500 text-white py-6 px-4 shadow-lg sticky top-0 z-10 rounded-b-3xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-2xl shadow-inner cursor-pointer hover:rotate-12 transition-transform" onClick={handleBackToGrid}>
             <span className="text-3xl">🎨</span>
          </div>
          <div>
            <h1 className="text-2xl font-black">الفبای شادی</h1>
            <p className="text-xs opacity-90">دنیای بازی و یادگیری حروف</p>
          </div>
        </div>
        <div className="flex gap-2">
           <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold border border-white/20">
             {progress.completedLetters.length} / 32 ⭐
           </div>
           <div className="bg-blue-400 px-4 py-1 rounded-full text-sm font-bold border border-white/20">
             بخش خردسالان
           </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-8 px-4">
        {mode === AppMode.GRID && (
          <div className="flex flex-col gap-8">
            <div className="bg-white p-8 rounded-[40px] shadow-xl border-b-8 border-gray-200 text-center flex flex-col items-center gap-4 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-100 rounded-bl-full -mr-10 -mt-10 opacity-50"></div>
               <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center text-4xl animate-bounce z-0">
                 👋
               </div>
               <h2 className="text-3xl font-black text-gray-800">سلام قهرمان کوچولو!</h2>
               <p className="text-gray-600 max-w-sm">
                 آماده‌ای با هم بازی کنیم و حروف قشنگ فارسی رو یاد بگیریم؟ یکی از دکمه‌های رنگی پایین رو انتخاب کن!
               </p>
               <button 
                  onClick={handlePaintingGenClick}
                  className="mt-2 bg-purple-500 text-white px-6 py-2 rounded-full font-bold shadow-md hover:bg-purple-600 transition-all flex items-center gap-2"
                >
                 <span>🎨</span>
                 ایده برای نقاشی روی دفتر
               </button>
            </div>

            <LetterGrid onSelect={handleSelectLetter} />
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-green-100 p-6 rounded-3xl border-2 border-green-200 text-center cursor-pointer active:scale-95 transition-transform" onClick={() => audioService.play('pop')}>
                 <span className="text-3xl block mb-2">⭐</span>
                 <p className="font-bold text-green-700">امتیاز تو: {progress.completedLetters.length}</p>
              </div>
              <div className="bg-pink-100 p-6 rounded-3xl border-2 border-pink-200 text-center cursor-pointer active:scale-95 transition-transform" onClick={() => audioService.play('pop')}>
                 <span className="text-3xl block mb-2">🎈</span>
                 <p className="font-bold text-pink-700">پر از شادی و خنده</p>
              </div>
            </div>
          </div>
        )}

        {mode === AppMode.LEARNING && selectedLetter && (
          <LearningView 
            letter={selectedLetter} 
            onBack={handleBackToGrid} 
          />
        )}

        {mode === AppMode.PAINTING_GEN && (
          <PaintingIdeaGenerator onBack={handleBackToGrid} />
        )}
      </main>

      {mode === AppMode.GRID && (
        <div className="fixed bottom-6 left-6 animate-pulse z-20" onClick={handlePaintingGenClick}>
           <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border-4 border-white cursor-pointer hover:scale-110 transition-transform group">
             <span className="text-2xl group-hover:rotate-12 transition-transform">🎨</span>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;
