
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
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center bg-white p-4 rounded-3xl shadow-md border-b-4 border-purple-100">
        <button onClick={onBack} className="bg-purple-100 p-2 rounded-full hover:bg-purple-200 transition-colors">
          <svg className="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <h2 className="text-xl font-black text-purple-600">ایده‌ساز نقاشی جادویی! 🎨</h2>
      </div>

      <div className="bg-white p-8 rounded-[40px] shadow-xl border-b-8 border-purple-200 flex flex-col items-center gap-6">
        <div className="w-full text-center">
          <p className="text-gray-600 mb-4 font-bold">دوست داری چه چیزی رو روی دفترت نقاشی کنی؟ بنویس تا برات مدلشو بکشم!</p>
          <div className="flex gap-2">
            <input 
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="مثلاً: یک گربه مهربون، خورشید..."
              className="flex-1 bg-purple-50 border-2 border-purple-100 rounded-2xl px-4 py-3 focus:outline-none focus:border-purple-300 text-purple-800 font-bold"
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !topic.trim()}
              className="bg-purple-500 text-white px-6 py-3 rounded-2xl font-black shadow-lg hover:bg-purple-600 transition-all disabled:opacity-50"
            >
              {loading ? '...🎨' : 'بکش!'}
            </button>
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center gap-4 py-10">
            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
            <p className="text-purple-600 font-bold animate-pulse">در حال کشیدن نقاشی ساده برای شما...</p>
          </div>
        )}

        {imageUrl && !loading && (
          <div className="w-full flex flex-col items-center gap-6">
            <div className="bg-white p-4 rounded-3xl shadow-2xl border-4 border-purple-400 w-full max-w-sm aspect-square overflow-hidden">
              <img src={imageUrl} alt="Generated Idea" className="w-full h-full object-contain" />
            </div>
            <p className="text-sm text-gray-500 text-center font-bold">
              قهرمان کوچولو! حالا می‌تونی این نقاشی رو توی دفترت بکشی. 🖍️
            </p>
            <button 
              onClick={() => { setImageUrl(null); setTopic(''); }}
              className="bg-gray-100 text-gray-600 px-6 py-2 rounded-full font-bold shadow-sm"
            >
              یکی دیگه!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaintingIdeaGenerator;
