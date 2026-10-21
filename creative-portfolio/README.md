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
  assets/about/             ← your portrait (portrait.webp / .jpg / .png)
  components/               shared components (Nav, Gallery, Lightbox, …)
  sections/                 Introduction (About), Hero, Work, Contact
  data/
    site.js                 your name, email, location, social links
    projects.js             web projects
    graphicDesign.js        poster titles/descriptions (optional metadata)
  lib/motion.js             shared animation variants
  index.css                 Tailwind import + design tokens (colours, fonts)
```

## The personal introduction (first section)
`src/sections/Introduction.jsx` is the permanent About / personal intro at the very top of the page (it stays on the page — it is not a splash screen). The anchors `#top` and `#about` both point to it. The "I build websites…" hero follows it, then Work, then Contact.
- **Replace your photo:** put an image named `portrait.webp` (or `.jpg` / `.jpeg` / `.png` / `.avif`) in `src/assets/about/`. Delete the old `portrait.*` first so only one exists. Portrait orientation works best (shown at 4:5, cropped from the top).
- **Edit the copy:** the paragraphs, disciplines and details list are at the top/bottom of `Introduction.jsx`.
- **Availability:** the "Open to work" status and "Available for freelance projects" rows are in the `details` array in `Introduction.jsx`.

## Update your name, email and social links
Edit **`src/data/site.js`**:
- `name` — your display name (currently `BENJY`); used in the nav, hero, intro and footer
- `fullName` — shown in the About section
- `email` — currently `workwithbenjy@gmail.com`; used for every `mailto:` link
- `socials` — WhatsApp, Instagram, GitHub, LinkedIn and X. Replace each placeholder URL (anything containing `YOUR`); placeholders show as dimmed, non-clickable icons until you do. WhatsApp format: `https://wa.me/2348012345678` (country code + number, digits only)
- `location` — shown in the About section and mobile menu

Also check the `<title>` and description in `index.html`.

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
Project previews live in `public/images/web-projects/` (file names are set per project in `projects.js`). Replace a file with the same name to change a preview — no code changes needed. If a file is missing, a labelled placeholder is shown.

## Interactive touches (what's in the design)
- **Custom cursor** (mouse devices only): grows over links and shows labels like "Open", "Enlarge", "Drag". Add `data-cursor="Label"` to any element to give it one. Remove `<Cursor />` in `src/App.jsx` to disable it.
- **Draggable hero posters** (mouse devices): grab and move them. Disabled on touch screens and for reduced-motion users.
- **Tilted ticker bands** (`src/components/Bands.jsx`): edit the two word lists at the top of the file.
- **Project cards** tilt toward the mouse; the project index list shows a floating screenshot on hover.
- **Gallery prints** are slightly rotated and straighten on hover.
- **Contact** is a full-bleed accent block with a giant wordmark; scroll progress bar at the top of the page.
- All of it respects `prefers-reduced-motion`, and nothing is required to reach any content or link.

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
The production build (`npm run build`) runs cleanly, and the site was exercised in headless Chromium at desktop (1440px), tablet (820px) and mobile (390px) widths: no horizontal overflow, filters and lightbox working, all six project previews loading. It has **not** been tested on real devices, in Safari/Firefox, or with a screen reader. The live project sites were not opened during the build (no network access to them from that environment); the previews are your supplied screenshots.

## Accessibility & motion
Semantic landmarks, skip link, visible focus states, keyboard-operable gallery/lightbox (Esc closes, ←/→ navigate, focus is trapped and restored), descriptive alt text, and `prefers-reduced-motion` respected via Motion's `MotionConfig` plus CSS media queries. External links use `target="_blank" rel="noopener noreferrer"`.
