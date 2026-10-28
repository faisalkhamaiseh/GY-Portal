# GY-Portal: German Year Guide for GJU students

A bilingual guide, in **Arabic and English**, for German Jordanian University students on their German Year. It covers all 126 host universities, the 16 German states and the partner universities abroad. It is an **unofficial, independent** guide that is not affiliated with GJU or any German authority.

## Features

- **Arabic or English: the student chooses.** Arabic (RTL) lives at `/` and English (LTR) at `/en`. The language button in the header switches the current page to the other language and remembers the choice in the browser.

- **126 universities and 17 regions**, each with real YouTube campus, city and region videos, housing links (Studierendenwerk and trusted portals), estimated prices, and halal food and mosques.
- **Smart search** in the top bar (Arabic and English): it handles typos and routes queries like "prices in Berlin", "housing in Munich", "halal food Erfurt" and "E120" to the right page.
- **Student toolkit**: budget planner, internship hub, cultural survival map (halal food, Deutschlandticket, budget airports), hidden rules and fines, comparisons (banks, mobile providers, health insurance), budget travel, an app directory with **Google Play and App Store** links, an E-number and ingredient guide, and an arrival checklist.
- **Free sharing**: every page has a share button (Web Share API, or copy the link).

## Content policy: Evergreen & Zero-Liability

- **No hard-coded dates or years.** Timelines are relative ("4 weeks before departure", "within your first week").
- **Non-binding money.** All prices, rents and fines are approximate ranges and carry an `EstimateBadge` with the tooltip "*Estimated cost. Prices are subject to change."
- **Step-back rule.** Legal, governmental and academic steps (visa, Anmeldung, residence permit, Rundfunkbeitrag, enrolment, learning agreement, work rules) describe only the general process. Each one has a "Check Official Website" button (`OfficialLink`).
- **Global disclaimer.** The exact disclaimer text (English and Arabic) appears permanently in the footer of every page and in a one-time modal on the first visit (`src/components/Disclaimer.jsx`).
- **No volatile data.** Exact fees, contribution amounts and event dates were removed. Check official sources for current values.

When you edit content in `src/data/*.js` (Arabic) or `src/en/data/*.js` (English), keep to these rules and update both languages.

## On phones: a native-app feel

- **Bottom tab bar** (Home, Universities, Search, Costs, More) within thumb reach, with safe-area padding for notched phones.
- **"More" sheet** that slides up with every tool as an app icon, plus the language switch.
- **No endless scrolling.** Long pages (university, region, guide, rules, costs, housing, internships, comparisons, travel and survival map) split into **section tabs** on phones: a sticky tab strip shows one topic at a time, and you can swipe left or right between tabs. Links such as `/guide#week1` open the right tab. On desktop the same sections stack as a normal page.
- **Home dashboard**: a compact hero, a grid of tool icons, and swipeable card rails (`.rail`) instead of long vertical lists.
- **Installable**: a web app manifest and icons let students add the site to their home screen.
- Touch targets are at least 40 px, there is press feedback, and no tap highlight.

## Speed

- **Pre-rendered HTML for all 314 pages** (both languages, `scripts/prerender.mjs`). Phones show the page before any JavaScript runs, then React hydrates it. This gives the same benefit as server components, without needing a server.
- **The CSS is inlined** in each page, and the self-hosted fonts are preloaded. Fonts use `font-display: optional`, so text never jumps.
- **Code-splitting**: each language and each page is its own chunk, with shared `react` and `icons` chunks.
- **Images**: responsive WebP (`srcset`, 480 to 1200 px) with fixed width and height. Below-the-fold images and YouTube thumbnails are lazy-loaded. The region posters are pre-built SVG files (`public/art/`), not inline DOM.
- **Deferred data**: a 16 KB cover index (`src/data/covers.json`) renders thumbnails right away. The full video index loads when the browser is idle.
- **60 FPS**: animations use only `transform` and `opacity`, there is no backdrop blur on phones, and `prefers-reduced-motion` is respected.
- **Lighthouse (mobile, simulated slow 4G)**: Performance 88–99, Accessibility 100, Best Practices 100, layout shift about 0.

## Tech

- React 19, React Router 7, Vite 7, Tailwind CSS 4, lucide-react and self-hosted fonts (Cairo, IBM Plex Sans Arabic).
- An error boundary auto-reloads once after a new deploy, so stale page files don't break navigation.
- YouTube embeds use `youtube-nocookie` and load only on click, and so do the maps.

## Run locally

```bash
git clone https://github.com/faisalkhamaiseh/GY-Portal.git ~/Desktop/GY-Portal
cd ~/Desktop/GY-Portal
npm install
npm run dev        # http://localhost:5173
npm run build      # covers index, client build, SSR build, then pre-renders every page into dist/
npx vite preview   # serve dist/ locally
```

## Project layout

- `src/`: the Arabic site (`App.jsx`, `pages/`, `components/`, `data/`, `lib/`).
- `src/en/`: the English site, with the same structure and routes.
- `src/main.jsx`: loads the Arabic or English app depending on the URL (`/en` prefix) and hydrates the pre-rendered HTML. An inline script in `index.html` applies the saved language and shows the one-time disclaimer before the first paint.
- `src/entry-server.jsx` and `scripts/prerender.mjs`: the build-time renderer for every route and region poster.
- `src/components/AppShell.jsx` (tab bar, More sheet, quick actions) and `src/components/Sections.jsx` (phone section tabs) are shared by both languages.
- Shared pieces: `src/components/Disclaimer.jsx`, `src/components/LangSwitch.jsx`, `src/lib/lang.js`, `src/data/videos.json` and `src/index.css`.

## Data

| File | What |
| --- | --- |
| `src/data/universities.tsv`, `src/en/data/universities.tsv` | The 126 host universities (Arabic and English): GJU requirements, fees, notes and websites |
| `src/data/videos.json` | Curated YouTube videos per university, city, state and topic |
| `src/data/regions.js` | States: events, sights, housing and airports |
| `src/data/costs.js` | Estimated price ranges and rent tiers |
| `src/data/guide.js` | Arrival checklist with official sources |
| `src/data/*.js` | Rules, comparisons, travel, apps, additives and careers |

To refresh the videos (this needs `yt-dlp`), run `npm run videos`.

## Deploy (free)

1. Import this repo on [vercel.com](https://vercel.com). The framework preset is Vite, the build command is `npm run build`, and the output directory is `dist`.
2. `vercel.json` serves the pre-rendered pages with clean URLs, sends unknown paths to the app shell (`spa.html`), and sets the caching and security headers. On Netlify, `public/_redirects` does the same.
3. Share the resulting `*.vercel.app` link.

---

Designed and developed by **Faisal Khamaiseh**.
