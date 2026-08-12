"use client";

import { useEffect, useRef, useState } from "react";
import { playlist } from "@/lib/tracks";

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function PrevIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M6 5h2v14H6zm3.5 7 10-7v14z" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M16 5h2v14h-2zM4.5 5l10 7-10 7z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M7 4.5v15l13-7.5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M6 4.5h4v15H6zm8 0h4v15h-4z" />
    </svg>
  );
}

export default function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const track = playlist[trackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(0);
    setDuration(0);
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIndex]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  }

  function goNext() {
    setTrackIndex((i) => (i + 1) % playlist.length);
    setIsPlaying(true);
  }

  function goPrev() {
    setTrackIndex((i) => (i - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  }

  function onSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;
    if (!audio) return;
    const value = Number(e.target.value);
    audio.currentTime = value;
    setCurrentTime(value);
  }

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  const sharedAudio = (
    <audio
      ref={audioRef}
      src={track.src}
      onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
      onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      onEnded={goNext}
      preload="metadata"
    />
  );

  const seekBar = (widthClass: string) => (
    <div className={`group/seek relative h-6 ${widthClass}`}>
      <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/15">
        <div
          className="seek-fill-glow h-full rounded-full bg-accent"
          style={{ width: `${progressPct}%` }}
        />
      </div>
      <input
        type="range"
        min={0}
        max={duration || 0}
        step={0.1}
        value={currentTime}
        onChange={onSeek}
        aria-label="Seek"
        className="seek-range absolute inset-0 h-6 w-full"
      />
    </div>
  );

  const vinyl = (sizeClass: string) => (
    <div className={`relative shrink-0 ${sizeClass}`}>
      <div
        className="h-full w-full overflow-hidden rounded-full bg-cover bg-center shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
        style={{
          backgroundImage: `url(${track.cover})`,
          animation: "spin 8s linear infinite",
          animationPlayState: isPlaying ? "running" : "paused",
        }}
      />
      <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/70 ring-2 ring-white/40" />
    </div>
  );

  const transport = (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous track"
        className="rounded-full p-2 text-paper/80 transition hover:bg-white/10 hover:text-paper active:scale-95"
      >
        <PrevIcon />
      </button>
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="rounded-full bg-accent p-2.5 text-ink shadow-[0_4px_14px_rgba(232,163,61,0.45)] transition hover:brightness-110 active:scale-95"
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button
        type="button"
        onClick={goNext}
        aria-label="Next track"
        className="rounded-full p-2 text-paper/80 transition hover:bg-white/10 hover:text-paper active:scale-95"
      >
        <NextIcon />
      </button>
    </div>
  );

  return (
    <div className="pointer-events-auto w-full max-w-xl px-4">
      {sharedAudio}

      {/* ---------- Desktop: horizontal pill ---------- */}
      <div className="glass hidden items-center gap-4 rounded-full p-3 pr-5 sm:flex">
        {vinyl("h-20 w-20")}

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold text-paper">
                {track.title}
              </p>
              <p className="truncate text-[12.5px] text-paper/78">
                {track.artist}
              </p>
            </div>
            <span className="shrink-0 font-mono text-[10.5px] tabular-nums text-paper/60">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          {seekBar("mt-1.5 w-full")}
        </div>

        {transport}
      </div>

      {/* ---------- Mobile: stacked card ---------- */}
      <div className="glass flex flex-col items-center gap-3 rounded-3xl p-5 sm:hidden">
        {vinyl("h-28 w-28")}

        <div className="w-full min-w-0 text-center">
          <p className="truncate text-[16px] font-semibold text-paper">
            {track.title}
          </p>
          <p className="truncate text-[13px] text-paper/78">{track.artist}</p>
        </div>

        <div className="w-full">
          {seekBar("w-full")}
          <div className="mt-0.5 flex justify-between font-mono text-[10.5px] tabular-nums text-paper/60">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {transport}
      </div>
    </div>
  );
}
