
import React, { useRef, useEffect, useState } from 'react';
import { audioService } from '../services/audioService';

interface DrawingCanvasProps {
  letter: string;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ letter }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const hasDrawnStroke = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset canvas with guide letter
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '200px Vazirmatn';
    ctx.fillStyle = '#f3f4f6';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letter, canvas.width / 2, canvas.height / 2);
    
    // Line style
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [letter]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    hasDrawnStroke.current = true;
    audioService.play('pop');
    draw(e);
  };

  const stopDrawing = () => {
    if (isDrawing && hasDrawnStroke.current) {
      audioService.play('chime');
      hasDrawnStroke.current = false;
    }
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.beginPath();
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    audioService.play('sweep');
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Re-draw the guide
    ctx.font = '200px Vazirmatn';
    ctx.fillStyle = '#f3f4f6';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letter, canvas.width / 2, canvas.height / 2);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative bg-white rounded-3xl shadow-inner border-4 border-blue-200 canvas-container">
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="cursor-crosshair"
        />
        <div className="absolute top-2 left-2 text-xs text-blue-300 font-bold pointer-events-none">
          اینجا بنویس!
        </div>
      </div>
      <button
        onClick={clearCanvas}
        className="bg-red-400 text-white px-6 py-2 rounded-full font-bold shadow-md hover:bg-red-500 transition-colors"
      >
        پاک کن
      </button>
    </div>
  );
};

export default DrawingCanvas;
