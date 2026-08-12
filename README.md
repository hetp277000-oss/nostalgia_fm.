# Soor Taal — Nostalgia FM

A single-page radio-dial player. Next.js App Router, TypeScript, Tailwind v4.

## Setup

```bash
npm install
npm run dev
```

## Assets you provide

Drop these in before running:

- `public/bg/scene-wide.png` — landscape hero background
- `public/bg/scene-tall.png` — portrait hero background (composed separately, not a crop)
- `public/audio/*.mp3` — your own audio files
- `public/covers/*.jpg` — matching cover art

Track metadata and file paths live in `lib/tracks.ts` — edit the `playlist`
array to point at whatever you've placed in `public/audio` and
`public/covers`. No audio or images are bundled in this repo; add your own
licensed files.

## Structure

- `app/layout.tsx` — root layout, fonts/metadata, `viewportFit: "cover"`, Vercel Analytics + Speed Insights
- `app/page.tsx` — page shell: fixed background, grain, top row, player
- `app/globals.css` — Tailwind v4 `@theme` tokens, glass recipe, grain, seek-range styling
- `components/Player.tsx` — the player (desktop pill / mobile card)
- `components/Clock.tsx`, `ListenerCount.tsx`, `SocialLinks.tsx` — fixed top row
- `lib/tracks.ts` — playlist data
