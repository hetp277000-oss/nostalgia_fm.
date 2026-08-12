"use client";

import { useEffect, useState } from "react";

export default function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = now
    ? now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "--:--:--";

  const date = now
    ? now.toLocaleDateString([], {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div
      className="glass rounded-2xl px-3.5 py-2 leading-tight text-paper/90"
      suppressHydrationWarning
    >
      <div className="font-mono text-[13px] tabular-nums tracking-wide">
        {time}
      </div>
      <div className="text-[10px] uppercase tracking-[0.14em] text-paper/55">
        {date}
      </div>
    </div>
  );
}
