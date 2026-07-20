"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../utils";

type Particle = {
  baseX: number;
  baseY: number;
  emoji: string;
  phase: number;
  floatRange: number;
  speed: number;
};

const emojis = [
  "🧸","🎈","🎉","🌈","🪄","✨","👾","🤖","🧠","🧃","🕹️","📦","🧪","🎨","📡","🚀","🛸","🔮","🗺️","🍄","🐙","🎧","🪩","🐸","📎","📚","💡","🫧","🐻","🐤","🫶","⏰","🤷",
];

const cellSize = 64;
const font = "32px serif";
const frameInterval = 1000 / 24; // targetFps

const hash2 = (x: number, y: number) => {
  let h = 2166136261;
  h = Math.imul(h ^ x, 16777619);
  h = Math.imul(h ^ y, 16777619);
  return h >>> 0;
};
const rand01 = (h: number) => (h >>> 0) / 4294967296;

// Rasterizing a color emoji glyph with fillText() is expensive; doing it
// ~500 times per frame is the bulk of this component's cost. Each emoji is
// rasterized once into an offscreen canvas up front, and the render loop
// only ever blits those sprites with drawImage().
function buildSpriteCache(): Map<string, HTMLCanvasElement> {
  const cache = new Map<string, HTMLCanvasElement>();
  for (const emoji of new Set(emojis)) {
    const sprite = document.createElement("canvas");
    sprite.width = cellSize;
    sprite.height = cellSize;
    const spriteCtx = sprite.getContext("2d")!;
    spriteCtx.font = font;
    spriteCtx.textAlign = "center";
    spriteCtx.textBaseline = "middle";
    spriteCtx.fillText(emoji, cellSize / 2, cellSize / 2);
    cache.set(emoji, sprite);
  }
  return cache;
}

export default function EmojiGridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Map<string, Particle>>(new Map());
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const sprites = buildSpriteCache();
    const particles = particlesRef.current;

    const ensureGrid = (width: number, height: number) => {
      const cols = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize);
      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          const key = `${gx},${gy}`;
          if (particles.has(key)) continue;
          particles.set(key, {
            baseX: gx * cellSize,
            baseY: gy * cellSize,
            emoji: emojis[hash2(gx, gy) % emojis.length],
            phase: rand01(hash2(gx + 1013, gy + 7)) * Math.PI * 2,
            floatRange: 6 + rand01(hash2(gx + 17, gy + 2003)) * 3,
            speed: 0.0005 + rand01(hash2(gx + 4099, gy + 97)) * 0.0005,
          });
        }
      }
    };

    const resizeCanvasIfNeeded = () => {
      const { innerWidth: width, innerHeight: height } = window;
      const dims = dimensionsRef.current;
      if (width === dims.width && height === dims.height) return;
      canvas.width = width;
      canvas.height = height;
      dimensionsRef.current = { width, height };
      ensureGrid(width, height);
    };

    const reduceMotion = prefersReducedMotion();

    const render = (animate: boolean) => {
      resizeCanvasIfNeeded();
      const t = animate ? Date.now() : 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles.values()) {
        const offset = animate
          ? Math.sin(t * p.speed + p.phase) * p.floatRange
          : 0;
        const x = p.baseX + cellSize / 2 + offset;
        const y = p.baseY + cellSize / 2 - offset;
        ctx.drawImage(
          sprites.get(p.emoji)!,
          x - cellSize / 2,
          y - cellSize / 2
        );
      }
    };

    let lastFrameTime = 0;
    const draw = (timestamp: number) => {
      if (timestamp - lastFrameTime >= frameInterval) {
        lastFrameTime = timestamp;
        render(true);
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    // Always redraws immediately on resize (rather than only recomputing
    // the grid and waiting for the next animation frame), since resize is
    // rare enough that one extra draw call is free.
    const handleResize = () => render(!reduceMotion);
    if (reduceMotion) {
      render(false);
    } else {
      rafRef.current = requestAnimationFrame(draw);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-[0.16] grayscale select-none"
    />
  );
}
