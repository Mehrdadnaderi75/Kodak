
import React, { useRef, useEffect, useState } from 'react';
import { audioService } from '../services/audioService';

interface DrawingCanvasProps {
  letter: string;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ letter }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    initCanvas();
  }, [letter]);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 350;
    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Guide Letter Background
    ctx.font = '280px Vazirmatn';
    ctx.fillStyle = '#f8fafc';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letter, canvas.width / 2, canvas.height / 2);
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 16;
    ctx.strokeStyle = '#2563eb';
  };

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (e.cancelable) e.preventDefault();
    const pos = getPos(e);
    lastPos.current = pos;
    setIsDrawing(true);
    audioService.play('pop');
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    if (e.cancelable) e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
  };

  const stopDrawing = () => {
    if (isDrawing) {
      audioService.play('chime');
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    audioService.play('sweep');
    initCanvas();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative bg-white rounded-[3rem] shadow-2xl border-4 border-blue-200 overflow-hidden cursor-crosshair">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] block"
        />
        <div className="absolute top-4 left-4 bg-blue-50/70 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] text-blue-600 font-black pointer-events-none uppercase tracking-wider">
          بنویس ✨
        </div>
      </div>
      <button
        onClick={clearCanvas}
        className="bg-red-500 hover:bg-red-600 text-white px-12 py-3.5 rounded-2xl font-black shadow-lg shadow-red-100 active:scale-95 transition-all flex items-center gap-2 text-lg"
      >
        <span>🗑️</span> پاک کن
      </button>
    </div>
  );
};

export default DrawingCanvas;
