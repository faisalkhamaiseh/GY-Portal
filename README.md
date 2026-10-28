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

## Tech

- React 19, React Router 7, Vite 7, Tailwind CSS 4 and lucide-react.
- Every page except Home is lazy-loaded with `React.lazy` and `Suspense`. The video data loads only when needed.
- Animations use only `transform` and `opacity`. YouTube embeds use `youtube-nocookie` and load only on click, and so do the maps.
- An error boundary auto-reloads once after a new deploy, so stale page files don't break navigation.
- Load-tested at 200 concurrent visitors (4,000 requests) with 0 failures.

## Run locally

```bash
git clone https://github.com/faisalkhamaiseh/GY-Portal.git ~/Desktop/GY-Portal
cd ~/Desktop/GY-Portal
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

## Project layout

- `src/`: the Arabic site (`App.jsx`, `pages/`, `components/`, `data/`, `lib/`).
- `src/en/`: the English site, with the same structure and routes.
- `src/main.jsx`: loads the Arabic or English app depending on the URL (`/en` prefix) and the saved choice. Each language is its own bundle.
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

1. Import this repo on [vercel.com](https://vercel.com) or Netlify. The framework preset is Vite.
2. Vercel uses `vercel.json` automatically for SPA rewrites, caching and security headers.
3. Share the resulting `*.vercel.app` link.

---

Designed and developed by **Faisal Khamaiseh**.
