
import React, { useState } from 'react';
import { audioService } from '../services/audioService';
import { generatePaintingIdea } from '../services/imageService';

interface PaintingIdeaGeneratorProps {
  onBack: () => void;
}

const PaintingIdeaGenerator: React.FC<PaintingIdeaGeneratorProps> = ({ onBack }) => {
  const [topic, setTopic] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    setLoading(true);
    setImageUrl(null);
    audioService.play('pop');
    
    const url = await generatePaintingIdea(topic);
    setImageUrl(url);
    setLoading(false);
    if (url) audioService.play('sparkle');
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in zoom-in duration-300">
      <div className="flex justify-between items-center bg-white p-5 rounded-[2rem] shadow-lg border border-purple-100">
        <button 
          onClick={onBack} 
          className="bg-purple-100 p-2.5 rounded-full hover:bg-purple-200 transition-colors active:scale-90"
        >
          <svg className="w-6 h-6 rotate-180 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <h2 className="text-xl md:text-2xl font-black text-purple-700">ایده‌ساز نقاشی جادویی! 🎨</h2>
      </div>

      <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-2xl border-b-8 border-purple-200 flex flex-col items-center gap-8">
        <div className="w-full text-center space-y-4">
          <p className="text-gray-600 text-lg font-bold">قهرمان من، دوست داری امروز چی بکشی؟</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="text"
              value={topic}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="مثلاً: یک شیر مهربون، خورشید خندان..."
              className="flex-1 bg-purple-50 border-4 border-purple-100 rounded-3xl px-6 py-4 focus:outline-none focus:border-purple-300 text-purple-800 font-bold text-lg shadow-inner"
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !topic.trim()}
              className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-3xl font-black text-xl shadow-[0_6px_0_#7e22ce] active:translate-y-[4px] active:shadow-none transition-all disabled:opacity-50 disabled:translate-y-0"
            >
              {loading ? 'در حال طراحی...' : 'بکش! ✨'}
            </button>
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center gap-6 py-12">
            <div className="relative">
              <div className="w-24 h-24 border-8 border-purple-100 border-t-purple-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-3xl">🎨</div>
            </div>
            <div className="space-y-1">
              <p className="text-purple-600 text-xl font-black text-center animate-pulse">در حال خلق یک ایده ساده برای تو...</p>
              <p className="text-gray-400 text-sm text-center">این نقاشی فقط برای کپی کردن تو طراحی میشه!</p>
            </div>
          </div>
        )}

        {imageUrl && !loading && (
          <div className="w-full flex flex-col items-center gap-8 animate-in slide-in-from-bottom-6 duration-500">
            <div className="bg-white p-6 rounded-[3rem] shadow-2xl border-4 border-purple-400 w-full max-w-sm aspect-square relative group overflow-hidden">
              <img src={imageUrl} alt="Generated Idea" className="w-full h-full object-contain pointer-events-none" />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <p className="bg-white/90 px-4 py-2 rounded-full font-bold text-purple-700 shadow-lg">مدل نقاشی تو 🖍️</p>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-3xl border-2 border-yellow-200 text-center space-y-2">
              <p className="text-yellow-800 font-black text-lg">✨ آفرین! حالا نوبت توئه ✨</p>
              <p className="text-gray-600">این طرح رو با دقت نگاه کن و توی دفتر نقاشیت بکش.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => { setImageUrl(null); setTopic(''); }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-2xl font-black shadow-md transition-all active:scale-95"
              >
                یک ایده دیگه؟
              </button>
              <button 
                onClick={() => window.print()}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-2xl font-black shadow-md transition-all active:scale-95 flex items-center gap-2"
              >
                <span>🖨️</span>
                چاپ کردن
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaintingIdeaGenerator;
