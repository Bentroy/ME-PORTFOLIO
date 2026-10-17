# Creative Portfolio

A dark, experimental portfolio for a frontend developer + graphic designer.
Built with **Vite + React + Tailwind CSS v4 + Motion (`motion/react`) + Lucide React**.
Fonts (Syne, JetBrains Mono, Instrument Sans) are bundled locally via Fontsource — no external font requests.

## Prerequisites
- Node.js 20.19+ (or 22+) and npm

## Install & run
```bash
npm install
npm run dev        # development server (http://localhost:5173)
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

## Project structure
```
public/
  favicon.svg
  images/web-projects/      ← drop website screenshots here
src/
  assets/graphic-design/    ← drop poster images here (auto-detected)
  components/               shared components (Nav, Gallery, Lightbox, …)
  sections/                 Hero, Work, About, Contact
  data/
    site.js                 your name, email, social links
    projects.js             web projects
    graphicDesign.js        poster titles/descriptions (optional metadata)
  lib/motion.js             shared animation variants
  index.css                 Tailwind import + design tokens (colours, fonts)
```

## Cinematic intro
`src/components/Intro.jsx` plays before the homepage (~4s, then a curtain-lift transition into the hero).
- **Replace your photo:** put an image named `portrait.webp` (or `.jpg` / `.jpeg` / `.png` / `.avif`) in `src/assets/intro/`. Delete the old `portrait.*` first so only one exists. Portrait orientation works best (shown at 4:5, cropped from the top).
- **Edit the text:** the intro line and wordmark are inside `Intro.jsx`; the name comes from `src/data/site.js`.
- **Timing:** change `INTRO_DURATION` (milliseconds) at the top of `Intro.jsx`.
- **Behaviour:** plays once per browser session (`sessionStorage`), has a "Skip intro" button (Esc also skips), and is skipped automatically for reduced-motion users or when the URL has a `#section`. To replay it, open a new tab/session or clear `portfolio-intro-seen` in sessionStorage. To disable it entirely, remove `<Intro />` from `src/App.jsx`.

## Update your name, email and social links
Edit **`src/data/site.js`**:
- `name` — your display name (currently `BENJY`); used in the nav, hero, intro and footer
- `fullName` — shown in the About section
- `email` — once it no longer contains `YOUR`, it becomes a working `mailto:` link
- `socials` — set each `url`; entries with an empty `url` show as "add link" placeholders
- `location` — shown in the About section and mobile menu

Also change the `<title>` in `index.html`, and the "About" copy in `src/sections/About.jsx` (items in `[BRACKETS]` are placeholders).

## Replace or add poster images
1. Put image files in **`src/assets/graphic-design/`** (`.webp .jpg .jpeg .png .avif`).
2. That's it — they appear in the gallery automatically, sorted by file name, with their original aspect ratio preserved. **No component changes needed.**
3. Optional: in `src/data/graphicDesign.js`, add an entry to `meta` keyed by the exact file name to set a title and description:
   ```js
   'my-poster.jpg': { title: 'My Poster', description: 'Short description.' },
   ```
4. To remove a poster, delete its file.

The 16 included posters are your uploaded designs, converted to WebP (max 1600px wide) for fast loading. The titles/descriptions in `meta` are generic labels derived from the visible text on each poster — edit them freely.

## Add / edit a web project
Edit **`src/data/projects.js`** and add an object:
```js
{
  id: 'my-site',
  index: '07',
  title: 'My Site',
  category: 'web',
  description: 'One-line description.',
  url: 'https://my-site.vercel.app/',
  image: 'my-site.jpg',          // file in public/images/web-projects/
  span: 'lg:col-span-6',          // grid width on large screens (12-col grid)
  ratio: 'aspect-[4/3]',          // preview proportions
},
```

### Website screenshots
Screenshots of the live sites could **not** be captured while building (the build environment had no access to `*.vercel.app`), so each project shows a clearly labelled **"Preview placeholder"**. To replace one, save a screenshot into `public/images/web-projects/` using the file name in `projects.js` (e.g. `chidextech.jpg`, `gfsteel.jpg`, `cove-associates.jpg`, `recherche-events.jpg`, `rackcentre-incident-logger.jpg`, `playin-architecture.jpg`). It is picked up automatically — no code changes.

## Change the colours
Open `src/index.css` and edit the tokens in `@theme` (e.g. `--color-signal: #ff4d2e;` is the accent).

## Deploy to Vercel
**Option A — Git:** push the project to GitHub, then on vercel.com choose *Add New → Project*, import the repo. Vercel auto-detects Vite (build command `npm run build`, output `dist`). Click *Deploy*.

**Option B — CLI:**
```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production
```

## Verification notes
The production build (`npm run build`) was run successfully, and the site was exercised in headless Chromium at 1440px and 390px widths: no horizontal overflow, working filters, lightbox open/close (Escape), and mobile menu. It has **not** been tested on real devices, in Safari/Firefox, or with a screen reader. Live-site links were not opened during the build (no network access to them from that environment).

## Accessibility & motion
Semantic landmarks, skip link, visible focus states, keyboard-operable gallery/lightbox (Esc closes, ←/→ navigate, focus is trapped and restored), descriptive alt text, and `prefers-reduced-motion` respected via Motion's `MotionConfig` plus CSS media queries. External links use `target="_blank" rel="noopener noreferrer"`.
