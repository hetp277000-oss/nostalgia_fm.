"use client";

import { useEffect, useState } from "react";

/**
 * Ambient "tuned in" counter. Starts from a fixed seed on the server so
 * markup matches on hydration, then drifts gently to feel alive.
 */
export default function ListenerCount() {
  const [count, setCount] = useState(482);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => {
        const drift = Math.round(Math.random() * 6) - 3;
        return Math.max(140, c + drift);
      });
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="glass flex items-center gap-2 rounded-2xl px-3.5 py-2">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      <span className="font-mono text-[12.5px] tabular-nums text-paper/90">
        {count.toLocaleString()}
      </span>
      <span className="hidden text-[10px] uppercase tracking-[0.14em] text-paper/55 sm:inline">
        tuned in
      </span>
    </div>
  );
}
