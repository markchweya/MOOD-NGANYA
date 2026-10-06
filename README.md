# MOOD — No Risk, No Story 💜

A showcase website for **MOOD**, Nairobi's purple nganya. Front says *TRY ME*, back says *ATMOSPHERE*.

A static site with no build step and no dependencies. Open `index.html` in a browser and it works.

## Sections
- **Hero**: the front photo dressed in Mood's own stickers, plus a Hoot! horn button.
- **Spot the Details**: tap numbered hotspots on the front and back photos.
- **The Palette**: every colour sampled from the matatu, each with a photo chip showing where it lives. Tap a swatch to copy its hex.
- **Sticker Wall**: every sticker on Mood, redrawn as SVG. Drag them around, or hit Shuffle.
- **Gallery** with a full-screen photo viewer.
- **Mood Family**: the Instagram bio as a manifesto, with a link to @mood_family33.

## Brand
- **Name mark:** M😈😈D. The two O's are purple devils, as on Instagram (`#s-devil`).
- **Voice:** No risk, no story · Redefining greatness daily · We don't follow trends, we start them · Too rare to be compared
- **Instagram:** [@mood_family33](https://www.instagram.com/mood_family33/)

## Brand colours
Every colour was measured from photos of the matatu, mostly the head-on shot in full sun. They're defined as CSS variables at the top of `css/styles.css`.

| Group | Name | Hex | Where | Measured from |
|---|---|---|---|---|
| Paint | Mood Purple | `#8B1BAB` | Main body paint | Head-on, sun |
| | Purple Glow | `#AE2EC9` | Sunlit curves | Head-on, sun |
| | Purple Night | `#280633` | Shadows | Head-on, sun |
| | Cloud Violet | `#4C44AC` | Side-panel clouds | Three-quarter |
| | Drip Lilac | `#A07EB4` | Windshield banner wash | Head-on, sun |
| | Sun-strip Blue | `#0B0491` | Windshield sun-strip | Head-on, sun |
| Stickers | Smiley Mustard | `#D1AF4A` | Drippy smileys | Head-on, sun |
| | Try-Me Gold | `#E4A83C` | TRY ME fill | Head-on, sun |
| | Try-Me Magenta | `#AC24A1` | TRY ME outline & art | Head-on, sun |
| | First-Class Amber | `#CC8F33` | FIRST CLASS sign | Head-on, sun |
| | Plate Yellow | `#C07D2C` | Rear plate | Back |
| Lights | Tail-Light Red | `#E2332E` | LED tail lights | Back |
| | Beacon Red | `#B32827` | Red roof beacons | Three-quarter |
| | Beacon Purple | `#6C1F67` | Purple roof beacons | Head-on, sun |
| | LED Ice | `#73B5DB` | Headlight LEDs | Three-quarter |
| Art | Liberty Teal | `#489E97` | Lady Liberty | Three-quarter |
| | Atmosphere White | `#F4F1F8` | ATMOSPHERE, die-cut edges | Back |
| | Ink | `#262322` | Outlines & trims | Head-on, sun |

## Stickers
All stickers are SVG `<symbol>`s at the top of `index.html` (`#s-devil`, `#s-mood`, `#s-norisk`, `#s-tryme`, `#s-firstclass`, `#s-plate-front`, `#s-plate-rear`, `#s-hazard`, `#s-warning`, `#s-atmosphere`, `#s-school`, `#s-smiley`). Reuse one anywhere with `<svg viewBox="…"><use href="#s-tryme" /></svg>`.

## Editing content
At the top of `js/main.js`: `DETAILS` (hotspots), `PALETTE`, `STICKERS` (wall layout), `CONFIG.photoCredit`.

## Run locally
```bash
python3 -m http.server 8000   # open http://localhost:8000
```

## Deploy (free)
- **GitHub Pages**: Settings → Pages → Deploy from branch → `main` / root.
- **Netlify / Vercel**: import the repo. It needs no build command, and the output directory is the root.

## Photo credits
The three-quarter front and back photos are by **Mziziani Photography**. The photographer of the head-on photo is still to be confirmed (`PHOTOS.headon.credit` in `js/main.js`). Get permission before publishing, and keep the credits.
