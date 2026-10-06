# MOOD — Nganya ya Vibes 🚌🔥

The official-style website for **MOOD**, one of Nairobi's most iconic matatus.

A fast static site with no build step and no dependencies. Open `index.html` in a browser and it works.

## Features
- **Mood switcher**: recolours the whole site, including the matatu illustration (Hype, Chill, Bendera, Sunset). The visitor's choice is remembered.
- **Animated matatu hero**: inline SVG with spinning rims, LED chase lights, underglow and an equaliser.
- **Hoot! button**: a dual-tone matatu horn made with the Web Audio API, so no audio files are needed.
- **Hire the Mood form**: validates the fields, then opens WhatsApp with a ready-written booking message.
- Gallery, route and crew sections that you fill in from one config file.
- Works on phones, keyboard-accessible, and respects `prefers-reduced-motion`.

## Editing content
All content you will want to change is at the top of **`js/main.js`**:

| What | Where |
|---|---|
| WhatsApp booking number | `CONFIG.whatsapp` (e.g. `"254712345678"`) |
| Instagram / TikTok / X / YouTube | `CONFIG.socials` |
| Route & stages | `ROUTE` |
| Photos | `GALLERY`: put images in `assets/gallery/` and set `src` |
| Crew | `CREW`: optional photos in `assets/crew/` |

The headline copy and feature cards are in `index.html`. Colours for each mood are at the top of `css/styles.css`.

## Run locally
```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy (free)
- **GitHub Pages**: Settings → Pages → Deploy from branch → `main` / root.
- **Netlify / Vercel**: import the repo. It needs no build command, and the output directory is the root.
