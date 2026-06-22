# SOLO Recap 2025 — Build Conversation Log

A chronological log of the session that built the SOLO 2025 animated recap app
(mobile-first, Instagram-Story–style, Remotion). Captures each request and the
resulting change.

---

## 1. Kickoff & planning
**Ask:** Build an app that plays an animated, skippable Instagram-Story-style
yearly accounting recap for SOLO (Romanian fintech), using the 20 character SVGs,
built in Remotion, with a share button and per-data-point "parts".

**Decisions (confirmed via questions):**
- Language: **Romanian**
- Data input: **on-screen form → play**
- Share: **9:16 MP4** (native share sheet)
- Scenes: Intro, Activity→Money-In (branched), Money Out, Net result, Taxes,
  Persona, Outro
- **Mobile-only** (UI/UX + MP4 designed mobile-first)
- Two activities with bespoke animations: **Șofer Uber/Bolt** (drives a car) and
  **IT/Programator** (writes code → surprised by money)

**Stack:** Vite + React + TS, Remotion as a library, `@remotion/player` for the
interactive story, a local Express server using `@remotion/renderer` for MP4 export
(headless Chrome can't run in the browser).

## 2. Initial build
- Cataloged the 20 character SVGs (black line-art + SOLO yellow `#FEDA00`) and
  pulled SOLO brand tokens (font GT Walsheim → Inter fallback, colors, **no emojis**).
- Built core lib: `branding.ts`, `schema.ts`, `config.ts` (single `SCENES` array
  driving both the master `TransitionSeries` composition and the player's progress
  bars + skip), shared components (Character, Counter, Money, Car, Laptop, etc.).
- Built all scenes in Romanian, the mobile `StoryPlayer` (progress bars, tap-skip,
  hold-to-pause), `RecapForm`, and the Express render server (`/api/render`).
- Verified via still renders + a mobile-viewport browser run; MP4 rendered end-to-end.

## 3. Iteration on feedback (chronological)
- **"Don't like the car / make animations more dynamic; never yellow char on yellow bg":**
  Rebuilt the car, added a reusable light "stage" so brand characters stay visible on
  colored backgrounds; added parallax, speed lines, exhaust, sunbursts, confetti.
- **"Text-first; drop the white spotlight circles; characters secondary, not on every page":**
  Reworked to bold centered text. Intro/Persona/Outro became text-only on brand
  colors; light scenes kept a smaller character low in the back.
- **Money In / Out / Taxes:** removed characters, centered text, added themed
  **invoices / receipts / stamps** floating around (built `Documents.tsx`).
- **"Remove character from the car":** car drove empty; later replaced entirely.
- **"Driver page: face inside the car + a phone with the info":** front-car with
  face in windshield + phone reveal.
- **"More cinematic: drive → phone rises → zoom → fares pop in → venituri celebration":**
  full timeline with ride-fare notifications and a live tally.
- **"Car should be lateral view":** rebuilt as a side-view sedan.
- **Profit page:** dark, rising coins, glow, relaxed character among flowers
  (generated **white-line variants** of the characters for dark backgrounds), copy line.
- **Pacing:** extended the activity hold and the profit hold ("too fast").
- **"Phone too big":** reduced the camera zoom (3.1× → 2.25×) and tightened the
  phone screen height.

## 4. Matching the SOLO Wrapped reference (HTML provided)
- **Driver scene** rebuilt to the **night-time cinematic** reference: black bg, white
  line-art rideshare car (yellow roof sign, glowing headlight, spinning spoked wheels),
  driver in a lit cabin window, parallax outline skyline, then a **camera zoom into a
  phone** that **lights up** and tallies the total while **ride fares pop in one by one**
  (Cursă · Centru +42 lei, …). Added a `plain` counter mode (fixed a doubled "lei").
- **New "growth vs last year" page** ("FAȚĂ DE ANUL TRECUT", big green "+36%", rising
  green line chart, character) — added a `prevIncome` field to the schema + form.
- Uppercased the activity headlines ("MEREU PE DRUM", "COD, COD, COD").
- **New Summary finale** ("ASTA A FOST 2025 / Împărtășește-ți anul cu SOLO" + recap
  card: Activitate, Venituri, Cheltuieli, Profit, Titlu) — replaced the outro.

## 5. Buttons & sharing
- Removed the persistent share button from all pages.
- End actions shown **on the summary scene while it animates** (not after it stops):
  **Distribuie prietenilor** and **Vezi din nou**.
- "Distribuie prietenilor" shares **just the summary image** (PNG via a new `/api/image`
  endpoint) through the native share sheet (WhatsApp, etc.), not the full video.

## 6. Autoplay fix
- Story wasn't starting until tapped — `autoPlay` fired before assets loaded. Added a
  retry-`play()` loop until the player actually starts.

## 7. Music
- Added background music wired into the composition (fade in/out, background level,
  present in both the player and the rendered MP4) with the player set to auto-play
  with sound.
- First used a royalty-free CC-BY track; for a **local POC only**, swapped to the
  user's own file at `public/music.mp3`, trimmed to start at the chorus via
  `trimBefore` (`CHORUS_START_SEC` in `RecapComposition.tsx`).
- **Note:** the POC track is copyrighted and must be replaced with a
  licensed/royalty-free track before the site is published or videos are shared.

## 8. Pending
- **Netlify deploy** — not yet done. Open decision: the MP4/image render backend needs
  a Node host (Netlify static can't run headless Chrome). Options discussed:
  (A) Netlify front-end + separate Node render service, (B) whole app on a Node host,
  (C) Netlify only with share disabled until a backend exists.

---

## How to run
```bash
cd D:\solo-recap
npm start        # Vite (:5173) + Express render server (:3001)
```
Open the printed Network URL on a phone for the real mobile experience.
`npm run studio` opens Remotion Studio; `npm run render` renders an MP4 via CLI.

## Project shape
- `src/remotion/` — composition, `config.ts` (SCENES), `scenes/`, `components/`,
  `branding.ts`, `schema.ts`
- `src/app/` — `RecapForm`, `StoryPlayer`
- `server/render.mjs` — `/api/render` (MP4) and `/api/image` (PNG)
- `public/characters/` — 20 brand SVGs (+ generated `-white` variants);
  `public/music.mp3` — background track
