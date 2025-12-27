
import React, { useEffect, useState } from 'react';
import { PersianLetter, GeminiResponse } from '../types';
import { getLetterEducation } from '../services/geminiService';
import DrawingCanvas from './DrawingCanvas';
import { audioService } from '../services/audioService';
import { markLetterComplete } from '../services/progressService';
import { speak } from '../services/speechService';

interface LearningViewProps {
  letter: PersianLetter;
  onBack: () => void;
}

const LearningView: React.FC<LearningViewProps> = ({ letter, onBack }) => {
  const [eduData, setEduData] = useState<GeminiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [speaking, setSpeaking] = useState<string | null>(null);

  useEffect(() => {
    const loadEdu = async () => {
      setLoading(true);
      const data = await getLetterEducation(letter.char);
      setEduData(data);
      setLoading(false);
    };
    loadEdu();
  }, [letter]);

  const handleBack = () => {
    audioService.play('sparkle');
    onBack();
  };

  const handleDrawingDone = () => {
    markLetterComplete(letter.char);
  };

  const handleSpeak = async (text: string) => {
    if (speaking) return;
    setSpeaking(text);
    audioService.play('pop');
    await speak(text);
    setSpeaking(null);
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-6 flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <button
          onClick={handleBack}
          className="bg-white p-3 rounded-full shadow-md hover:bg-gray-100"
        >
          <svg className="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-gray-700">بیا با حرف "{letter.char}" آشنا بشیم!</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-xl flex flex-col items-center gap-4 border-b-8 border-yellow-200 relative group">
             <button 
               onClick={() => handleSpeak(letter.char)}
               disabled={!!speaking}
               className="absolute top-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all disabled:opacity-50"
               title="شنیدن تلفظ حرف"
             >
               {speaking === letter.char ? '⏳' : '🔊'}
             </button>
             
             <div className={`${letter.color} w-32 h-32 rounded-3xl flex items-center justify-center text-7xl text-white shadow-inner font-bold`}>
               {letter.char}
             </div>
             
             <div className="text-center flex flex-col items-center gap-2">
               <p className="text-gray-500 text-sm">نام حرف: {letter.name}</p>
               <div className="flex items-center gap-3">
                 <h3 className="text-4xl font-black text-blue-600">{letter.example}</h3>
                 <button 
                   onClick={() => handleSpeak(letter.example)}
                   disabled={!!speaking}
                   className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 transition-colors"
                 >
                   {speaking === letter.example ? '...' : '🔊'}
                 </button>
               </div>
             </div>
             <img src={letter.imageUrl} alt={letter.example} className="w-48 h-48 rounded-2xl object-cover shadow-md border-4 border-white" />
          </div>

          <div className="bg-blue-100 p-6 rounded-3xl shadow-lg border-2 border-blue-200 relative">
            <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
              <span className="text-2xl">💡</span> کلمات بیشتر:
            </h4>
            {loading ? (
              <div className="flex gap-2 animate-pulse">
                <div className="h-4 bg-blue-200 rounded w-full"></div>
                <div className="h-4 bg-blue-200 rounded w-full"></div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {eduData?.words.map((w, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSpeak(w)}
                    disabled={!!speaking}
                    className="bg-white px-3 py-1 rounded-full text-blue-600 font-bold shadow-sm flex items-center gap-2 hover:bg-blue-50 transition-colors disabled:opacity-75"
                  >
                    {w}
                    <span className="text-xs">{speaking === w ? '⏳' : '🔊'}</span>
                  </button>
                ))}
              </div>
            )}
            
            <div className="mt-4 bg-yellow-100 p-4 rounded-xl italic text-gray-700 relative">
               <button 
                 onClick={() => handleSpeak(eduData?.story || '')}
                 disabled={!!speaking || loading}
                 className="absolute -top-2 -left-2 bg-yellow-400 text-white p-2 rounded-full shadow-md disabled:opacity-50"
               >
                 {speaking === eduData?.story ? '...' : '📖'}
               </button>
               {loading ? "در حال ساختن قصه..." : eduData?.story}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-3xl shadow-xl border-t-8 border-blue-400" onMouseUp={handleDrawingDone} onTouchEnd={handleDrawingDone}>
          <h3 className="text-2xl font-bold text-blue-500 mb-4">بیا بنویسیم!</h3>
          <DrawingCanvas letter={letter.char} />
          <p className="text-sm text-gray-400 mt-2">با انگشتت روی کادر بالا نقاشی کن</p>
        </div>
      </div>
    </div>
  );
};

export default LearningView;
