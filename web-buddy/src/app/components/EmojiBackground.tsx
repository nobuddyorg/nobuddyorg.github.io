'use client';

import { useEffect, useState, JSX } from "react";


export default function EmojiBackground() {
    const [elements, setElements] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const emojis = [
        "🧸", "🎈", "🎉", "🌈", "🪄", "✨", "👾", "🤖", "🧠", "🧃", "🕹️",
        "📦", "🧪", "🎨", "📡", "🚀", "🛸", "🔮", "🗺️", "🍄", "🐙", "🎧",
        "🪩", "🐸", "📎", "📚", "💡", "🫧", "🐻", "🐤", "🫶"
    ];

    const items = Array.from({ length: 1000 }).map((_, i) => {
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      const delay = (Math.random() * 5).toFixed(2);
      const duration = (5 + Math.random() * 5).toFixed(2);

      return (
        <span
          key={i}
          className="flex items-center justify-center h-[50px] w-full"
          style={{
            animation: `float ${duration}s ease-in-out infinite`,
            animationDelay: `${delay}s`,
          }}
        >
          {emoji}
        </span>
      );
    });

    setElements(items);
  }, []);

  return (
    <>
      <style>{`
        @keyframes float {
          0% { transform: translate(0px, 0px) rotate(0deg); }
          50% { transform: translate(8px, -12px) rotate(3deg); }
          100% { transform: translate(0px, 0px) rotate(0deg); }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none select-none opacity-10 grayscale"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(50px, 1fr))",
          lineHeight: "1",
          fontSize: "28px",
          fontFamily: "'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif",
        }}
      >
        {elements}
      </div>
    </>
  );
}
