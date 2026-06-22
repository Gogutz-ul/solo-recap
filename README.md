# SOLO Recap 2025

A mobile-first, Instagram-Story–style yearly accounting recap for SOLO. The user enters
their 2025 numbers, watches an animated, skippable story built with [Remotion](https://remotion.dev),
and downloads a 9:16 MP4 to share.

## What it does

- **Form** → enter name, activity (Șofer Uber/Bolt or IT & Programare), încasări, cheltuieli, taxe.
- **Story player** → 7 skippable parts with progress bars, tap-to-skip, press-and-hold to pause:
  1. Intro · 2. Activity → Money In (bespoke per activity) · 3. Cheltuieli · 4. Profit ·
  5. Taxe · 6. Personajul tău · 7. Final
- **Two bespoke activity animations**: the driver drives a car then money flies in; the IT-ist
  writes code then is surprised by money popping up.
- **Share** → renders the same composition to MP4 and opens the phone's native share sheet
  (download fallback on desktop).

## Run (development)

```bash
npm install
npm start          # Vite (web, :5173) + Express render server (:3001) together
```

Open http://localhost:5173.

### Test on a real phone (recommended — this is mobile-first)

Both servers bind to `0.0.0.0`. On a phone on the same network, open
`http://<your-LAN-IP>:5173` (the IP is printed by Vite as the "Network" URL).
The web app proxies `/api/render` to the render server automatically.

## Other commands

```bash
npm run studio     # Remotion Studio — preview/scrub each scene and the full SoloRecap composition
npm run render     # CLI render to out/recap.mp4 (uses default props)
npm run build      # type-check + production build
```

## Architecture

- `src/remotion/` — the Remotion video. `config.ts` holds the single `SCENES` array that drives
  both the master composition (`RecapComposition`, a `<Series>`) and the player's progress bars +
  skip boundaries. Scenes in `scenes/`, shared visuals in `components/`, brand tokens + persona
  logic in `branding.ts`, input shape in `schema.ts`.
- `src/app/` — the mobile UI: `RecapForm`, `StoryPlayer` (wraps `@remotion/player`), `ShareBar`.
- `server/render.mjs` — Express endpoint that bundles once and renders the MP4 with
  `@remotion/renderer` (headless Chrome, so it runs on the host, not the phone).
- `public/characters/` — the 20 SOLO brand character SVGs.

Brand: SOLO yellow `#FEDA00` + black `#161616`, Inter (GT Walsheim fallback), Romanian copy,
no emojis (all coins/icons are drawn SVG).

## Credits

- Background music: **"Folk Round"** by Kevin MacLeod (incompetech.com), licensed under
  [Creative Commons BY 4.0](https://creativecommons.org/licenses/by/4.0/). The track lives at
  `public/music.mp3`; replace it with any licensed `.mp3` of the same name to swap it.

## Notes

- `scripts/` contains dev-only tooling used to catalog the character SVGs (not part of the app).
- First MP4 render is slower (bundles + downloads Remotion's headless Chrome); subsequent ones
  take ~20s for the ~28s story.
