# Mainframe — personal site

Hero landing page built with React + TypeScript + Vite + Tailwind CSS v4.

## Run it

```bash
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173).

```bash
npm run build    # typecheck + production build into dist/
npm run preview  # preview the production build
```

## Structure

```
src/
  main.tsx                  entry point
  App.tsx                   composes the page
  index.css                 Tailwind import, font vars, blink keyframes
  hooks/
    useTypewriter.ts        character-by-character reveal
  components/
    BackgroundVideo.tsx     fixed full-screen video, mouse-scrub seeking
    Navbar.tsx              logo, desktop links + CTA, mobile hamburger/overlay
    Hero.tsx                blurred intro, typewriter, action pills, copy email
```

## Notes

- Fonts load via stylesheet links in `index.html`. The logo uses
  `--font-heading`; everything else uses `--font-body`.
- The background video does not autoplay — it scrubs based on horizontal
  mouse movement (`SENSITIVITY = 0.8`), seeking through `currentTime` with an
  `onSeeked` queue to avoid seek-flooding.
- This is the hero only. It is structured so additional sections can be added
  as sibling components under `App.tsx`.
