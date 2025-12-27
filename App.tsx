
import React, { useState, useEffect, useCallback } from 'react';
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

  // Update progress state whenever we return to the grid or finish a task
  const refreshProgress = useCallback(() => {
    setProgress(getProgress());
  }, []);

  useEffect(() => {
    if (mode === AppMode.GRID) {
      refreshProgress();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [mode, refreshProgress]);

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
    <div className="min-h-screen bg-[#fefce8] text-right flex flex-col selection:bg-blue-200" dir="rtl">
      {/* Dynamic Header */}
      <header className="bg-blue-600 text-white py-4 px-6 shadow-xl sticky top-0 z-50 transition-all border-b-4 border-blue-700">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group active:scale-95 transition-transform"
            onClick={handleBackToGrid}
          >
            <div className="bg-white p-2 rounded-2xl shadow-lg group-hover:rotate-12 transition-transform">
               <span className="text-2xl">🎨</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black leading-tight tracking-tight">الفبای شادی</h1>
              <p className="text-[10px] md:text-xs opacity-80 hidden sm:block font-bold">آموزش هوشمند برای کودکان</p>
            </div>
          </div>
          
          <div className="flex gap-3 items-center">
             <div className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs md:text-sm font-black border border-white/30 flex items-center gap-2 shadow-inner">
               <span className="text-yellow-300 drop-shadow-sm text-lg">⭐</span>
               <span>{progress.starsCount} مدال</span>
             </div>
             {mode === AppMode.GRID && (
               <button 
                  onClick={handlePaintingGenClick}
                  className="hidden sm:flex bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-5 py-2 rounded-full text-sm font-black shadow-lg transition-all active:scale-95 items-center gap-2"
                >
                 <span>🖌️</span>
                 ایده نقاشی
               </button>
             )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-5xl mx-auto relative overflow-hidden">
        <div className="p-4 md:p-8">
          {mode === AppMode.GRID && (
            <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
              <section className="bg-white/80 backdrop-blur-sm p-8 rounded-[3rem] shadow-xl border-b-8 border-gray-200 text-center flex flex-col items-center gap-4 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                 <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-4xl animate-bounce shadow-inner">
                   🦁
                 </div>
                 <h2 className="text-3xl md:text-4xl font-black text-gray-800">بیا بازی کنیم!</h2>
                 <p className="text-gray-600 max-w-sm text-lg font-medium leading-relaxed">
                   دوست من، روی یکی از حروف پایین بزن تا با هم یادش بگیریم و کلی خوش بگذرونیم.
                 </p>
              </section>

              <div className="bg-white/50 p-2 rounded-[2.5rem] shadow-inner border border-white/50">
                <LetterGrid onSelect={handleSelectLetter} />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-12">
                <div 
                  className="bg-gradient-to-br from-green-400 to-emerald-500 p-8 rounded-[2.5rem] shadow-xl text-white transform hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer relative overflow-hidden group"
                  onClick={() => audioService.play('pop')}
                >
                   <div className="relative z-10">
                     <span className="text-5xl block mb-2 group-hover:scale-110 transition-transform">🏅</span>
                     <p className="text-xl font-black">پیشرفت من</p>
                     <p className="opacity-90 font-bold mt-1">تا حالا {progress.starsCount} تا حرف رو یاد گرفتی!</p>
                   </div>
                   <div className="absolute bottom-0 left-0 w-full h-2 bg-black/10">
                     <div 
                        className="h-full bg-white/40 transition-all duration-1000" 
                        style={{ width: `${(progress.starsCount / 32) * 100}%` }}
                     ></div>
                   </div>
                </div>
                
                <div 
                  className="bg-gradient-to-br from-purple-400 to-indigo-500 p-8 rounded-[2.5rem] shadow-xl text-white transform hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer relative overflow-hidden group"
                  onClick={handlePaintingGenClick}
                >
                   <div className="relative z-10">
                     <span className="text-5xl block mb-2 group-hover:scale-110 transition-transform">🎨</span>
                     <p className="text-xl font-black">دفتر نقاشی جادویی</p>
                     <p className="opacity-90 font-bold mt-1">بنویس چی دوست داری، برات مدل می‌کشم!</p>
                   </div>
                   <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                </div>
              </div>
            </div>
          )}

          {mode === AppMode.LEARNING && selectedLetter && (
            <div className="max-w-4xl mx-auto">
              <LearningView 
                letter={selectedLetter} 
                onBack={handleBackToGrid} 
              />
            </div>
          )}

          {mode === AppMode.PAINTING_GEN && (
            <div className="max-w-2xl mx-auto">
              <PaintingIdeaGenerator onBack={handleBackToGrid} />
            </div>
          )}
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="py-8 text-center text-gray-400 text-xs md:text-sm border-t border-gray-200 mt-auto bg-white/30 backdrop-blur-sm">
        <p className="font-bold flex items-center justify-center gap-2">
          ساخته شده با <span className="text-red-400 animate-pulse">❤️</span> برای شکوفایی خلاقیت کودکان
        </p>
        <p className="opacity-60 mt-1">قدرت گرفته از هوش مصنوعی جمینای</p>
      </footer>

      {/* Floating Action Button for Mobile */}
      {mode === AppMode.GRID && (
        <div className="fixed bottom-6 left-6 z-50 sm:hidden">
           <button 
             onClick={handlePaintingGenClick}
             className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border-4 border-white active:scale-90 transition-transform"
             aria-label="Generate painting idea"
           >
             <span className="text-2xl">🎨</span>
           </button>
        </div>
      )}
    </div>
  );
};

export default App;
