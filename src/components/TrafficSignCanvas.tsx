import { useEffect, useRef } from 'react';
import { drawTrafficSign } from '@/utils/drawUtils';

interface TrafficSignCanvasProps {
  drawKey: string;
  size?: number;
  className?: string;
  animated?: boolean;
}

export function TrafficSignCanvas({
  drawKey,
  size = 300,
  className = '',
  animated = true,
}: TrafficSignCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawTrafficSign(ctx, drawKey, size);
  }, [drawKey, size]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center justify-center ${
        animated ? 'animate-sign-enter' : ''
      } ${className}`}
      style={{ width: size, height: size }}
    >
      <div
        className="absolute inset-0 rounded-3xl bg-white shadow-xl border-4 border-gray-100"
        style={{
          boxShadow:
            '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05) inset',
        }}
      />
      <canvas
        ref={canvasRef}
        className="relative z-10"
        style={{ imageRendering: 'auto' }}
      />
    </div>
  );
}
