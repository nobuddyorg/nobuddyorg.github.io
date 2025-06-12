"use client";

import { useEffect, useRef } from "react";

type Particle = {
  baseX: number;
  baseY: number;
  emoji: string;
  phase: number;
  floatRange: number;
  speed: number;
};

const emojis = [
  "🧸",
  "🎈",
  "🎉",
  "🌈",
  "🪄",
  "✨",
  "👾",
  "🤖",
  "🧠",
  "🧃",
  "🕹️",
  "📦",
  "🧪",
  "🎨",
  "📡",
  "🚀",
  "🛸",
  "🔮",
  "🗺️",
  "🍄",
  "🐙",
  "🎧",
  "🪩",
  "🐸",
  "📎",
  "📚",
  "💡",
  "🫧",
  "🐻",
  "🐤",
  "🫶",
  "⏰",
  "🤷",
];

const cellSize = 64;
const parallaxFactor = 0.4;
const font = "32px serif";

export default function EmojiGridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Map<string, Particle>>(new Map());
  const dimensionsRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const getCanvasDimensions = () => ({
      width: window.innerWidth,
      height: Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        window.innerHeight
      ),
    });

    const getKey = (x: number, y: number) => `${x},${y}`;

    const ensureGrid = (width: number, height: number) => {
      const cols = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize);
      const particles = particlesRef.current;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const key = getKey(x, y);
          if (!particles.has(key)) {
            particles.set(key, {
              baseX: x * cellSize,
              baseY: y * cellSize,
              emoji: emojis[Math.floor(Math.random() * emojis.length)],
              phase: Math.random() * Math.PI * 2,
              floatRange: 6 + Math.random() * 3,
              speed: 0.0005 + Math.random() * 0.0005,
            });
          }
        }
      }
    };

    const resizeCanvasIfNeeded = () => {
      const { width, height } = getCanvasDimensions();
      const dims = dimensionsRef.current;

      if (width !== dims.width || height !== dims.height) {
        canvas.width = width;
        canvas.height = height;
        dimensionsRef.current = { width, height };
        ensureGrid(width, height);
      }
    };

    const draw = () => {
      resizeCanvasIfNeeded();

      const t = Date.now();
      const scrollY = window.scrollY;
      const { width, height } = canvas;

      ctx.clearRect(0, 0, width, height);

      for (const p of particlesRef.current.values()) {
        const offset = Math.sin(t * p.speed + p.phase) * p.floatRange;
        const x = p.baseX + cellSize / 2 + offset;
        const y = p.baseY + cellSize / 2 - offset - scrollY * parallaxFactor;

        ctx.font = font;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.emoji, x, y);
      }

      requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resizeCanvasIfNeeded);
    return () => window.removeEventListener("resize", resizeCanvasIfNeeded);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-10 grayscale select-none"
    />
  );
}
