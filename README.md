# GY-Portal: German Year Guide for GJU students

A bilingual guide, in **Arabic and English**, for German Jordanian University students on their German Year. It covers all 126 host universities, the 16 German states and the partner universities abroad. It is an **unofficial, independent** guide that is not affiliated with GJU or any German authority.

## Features

- **Arabic or English: the student chooses.** Arabic (RTL) lives at `/` and English (LTR) at `/en`. The language button in the header switches the current page to the other language and remembers the choice in the browser.

- **126 universities and 17 regions**, each with real YouTube campus, city and region videos, housing links (Studierendenwerk and trusted portals), estimated prices, and halal food and mosques.
- **Smart search** in the top bar (Arabic and English): it handles typos and routes queries like "prices in Berlin", "housing in Munich", "halal food Erfurt" and "E120" to the right page.
- **Student toolkit**: budget planner, internship hub, cultural survival map (halal food, Deutschlandticket, budget airports), hidden rules and fines, comparisons (banks, mobile providers, health insurance), a route planner between German regions (free regional trains vs. ICE, FlixBus and flights, with times and prices), budget travel, an app directory with **Google Play and App Store** links, an E-number and ingredient guide, and an arrival checklist.
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
- **Lighthouse (mobile, simulated slow 4G)**: Performance 83–98, Accessibility 100, Best Practices 100, SEO 100, layout shift about 0.
- **SEO and sharing**: every page has a canonical link, Arabic/English `hreflang` links, absolute link-preview tags (WhatsApp shows the title and image), plus `sitemap.xml` and `robots.txt`. Addresses use `https://www.gyportal.online`, the primary domain on Vercel; `gyportal.online` redirects there (override with `SITE_URL`).

## Works on every phone and every network

- **Older phones (iOS 14+, Android Chrome 80+)**: Tailwind's cascade layers are flattened into plain CSS (`flatten-css-layers` in `vite.config.js`), and JavaScript is transpiled for those browsers. Search and video pop-ups fall back gracefully where `<dialog>` is missing (`src/lib/dialog.js`).
- **The page never gets stuck**: the content is in the HTML, and the one-time disclaimer can be accepted by a tiny inline script even if the app script fails to load.
- **No auto-translate crashes**: `translate="no"` stops the browser's automatic translation from rewriting the page under React (the site has its own English version).
- **Offline and blocked networks**: a service worker (`scripts/sw-template.js`, generated into `dist/sw.js`) keeps the app on the phone after the first visit (about 600 KB, downloaded once in the background). After that, every page opens instantly, even offline or on a Wi-Fi network that blocks the hosting address. Pages are loaded network-first, so updates show up as soon as the site is reachable. On phones, a one-time card (`src/components/InstallPrompt.jsx`) invites students to add the guide to their home screen: the Chrome install button on Android, and step-by-step instructions on iPhone.

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
| `src/lib/costModel.js` | Every price, rent tier and fixed fee, once for both languages; `src/data/costs.js` and `src/en/data/costs.js` add the words |
| `src/data/guide.js` | Arrival checklist with official sources |
| `src/data/*.js` | Rules, comparisons, travel, apps, additives and careers |
| `src/lib/routes.js` | Rail network model for the route planner: stations, regional and ICE/IC lines with typical times |

To refresh the videos (this needs `yt-dlp`), run `npm run videos`.

## Deploy (free, on Vercel)

1. Import this repo on [vercel.com](https://vercel.com). The framework preset is Vite, the build command is `npm run build`, and the output directory is `dist`.
2. `vercel.json` serves the pre-rendered pages with clean URLs and sets the caching and security headers. Unknown paths get `404.html`, the app shell, which shows the "not found" page.
3. Every push to `main` deploys automatically.
4. On Vercel's free Hobby plan, a deployment is **blocked** unless the commit author is linked to the repository owner's GitHub account. Commit with your GitHub email (or `270198751+faisalkhamaiseh@users.noreply.github.com`), or merge changes through a pull request on GitHub.

## Staying online under load

The site is static files: there is no server code to overload or crash. What can take it down, and what protects it:

- **Vercel's free-plan limits** (about 1 million requests and 100 GB a month; past them Vercel pauses the project). Cloudflare sits in front and caches every page for 2 minutes (`Cloudflare-CDN-Cache-Control` in `vercel.json`, plus a Cloudflare Cache Rule), so a flood of visits or bots is answered by Cloudflare and barely reaches Vercel. If Vercel errors, Cloudflare keeps serving the saved copy for up to a week (`stale-if-error`).
- **Floods from one address**: a Cloudflare rate limiting rule blocks an IP that sends hundreds of requests in 10 seconds. It is set high on purpose: in Jordan many phones share one public IP.
- **A broken release**: `scripts/verify.mjs` runs at the end of `npm run build` and checks every page (content, heading, title, disclaimer, no `undefined`/`NaN`, no missing files). If anything fails, the build fails and Vercel keeps the previous version online. A bad release that slips through can be undone in Vercel under Deployments, then "Instant Rollback".
- **Crashes in the browser**: every page has an error screen, the whole app has a last-resort one (`src/main.jsx`), and a tab left open across a release reloads once to fetch the new files (`src/lib/reload.js`).
- **Knowing when it is down**: `.github/workflows/uptime.yml` opens the main pages every 30 minutes and fails (GitHub emails you) if they do not load.
- **Emergencies**: Cloudflare, Security, then "Under Attack Mode" puts a browser check in front of every visitor; Vercel, Firewall, then "Attack Challenge Mode" does the same at Vercel.

**Important for Jordan:** some home and university Wi-Fi providers cut connections to `*.vercel.app` addresses. Safari then shows "the network connection was lost", while the same link works on mobile data. This is a network block, not a site bug. The site therefore has its own domain, **gyportal.online**, connected to the Vercel project (Settings, then Domains, then "Connect to an environment: Production"). Share that address, not `*.vercel.app`. Once a phone has opened the site, the service worker also keeps it working on those networks.

---

Designed and developed by **Faisal Khamaiseh**.
