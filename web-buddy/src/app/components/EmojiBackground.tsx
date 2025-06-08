'use client';

import { useEffect, useRef } from 'react';

type Particle = {
  baseX: number;
  baseY: number;
  emoji: string;
  phase: number;
  floatRange: number;
  speed: number;
};

export default function EmojiGridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const emojis = [
      "🧸", "🎈", "🎉", "🌈", "🪄", "✨", "👾", "🤖", "🧠", "🧃", "🕹️",
      "📦", "🧪", "🎨", "📡", "🚀", "🛸", "🔮", "🗺️", "🍄", "🐙", "🎧",
      "🪩", "🐸", "📎", "📚", "💡", "🫧", "🐻", "🐤", "🫶", "⏰", "🤷"
    ];

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const cellSize = 64;
    const cols = Math.floor(width / cellSize);
    const rows = Math.floor(height / cellSize);

    const particles: Particle[] = [];

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        particles.push({
          baseX: x * cellSize,
          baseY: y * cellSize,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          phase: Math.random() * Math.PI * 2,
          floatRange: 6 + Math.random() * 3,
          speed: 0.0005 + Math.random() * 0.00075,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const t = Date.now();

      for (const p of particles) {
        const offset = Math.sin(t * p.speed + p.phase) * p.floatRange;
        const offsetX = offset;
        const offsetY = -offset;

        ctx.font = "28px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          p.emoji,
          p.baseX + cellSize / 2 + offsetX,
          p.baseY + cellSize / 2 + offsetY
        );
      }

      requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-10 grayscale"
    />
  );
}
