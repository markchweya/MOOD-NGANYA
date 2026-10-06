# MOOD — No Risk, No Story 💜

A website for **MOOD**, Nairobi's purple nganya. Front says *TRY ME*, back says *ATMOSPHERE*.

A fast static site with no build step and no dependencies. Open `index.html` in a browser and it works.

## Features
- **Spot the Details**: tap numbered hotspots on the real front and back photos to learn about each detail.
- **Mood switcher**: recolours the whole site (Signature purple/yellow, Hype, Bendera, Sunset). The visitor's choice is remembered.
- **Photo hero** with stickers, an animated drive-by matatu, and a gallery with a lightbox.
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
| Photos | `GALLERY`: put images in `assets/gallery/` (WebP, ~1200px wide) and set `src` |
| Hotspots on the photos | `DETAILS` (`x`/`y` are % of the photo's width/height) |
| Photographer credit | `CONFIG.photoCredit` |
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

## Photo credits
The front and back photos are by **Mziziani Photography**. Get the photographer's permission before publishing, and keep the credit.
