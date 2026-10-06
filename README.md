# MOOD — No Risk, No Story 💜

A showcase website for **MOOD**, Nairobi's purple nganya. Front says *TRY ME*, back says *ATMOSPHERE*.

A static site with no build step and no dependencies. Open `index.html` in a browser and it works.

## Sections
- **Hero**: the front photo dressed in Mood's own stickers, plus a Hoot! horn button.
- **Spot the Details**: tap numbered hotspots on the front and back photos.
- **The Palette**: every colour sampled from the matatu, each with a photo chip showing where it lives. Tap a swatch to copy its hex.
- **Sticker Wall**: every sticker on Mood, redrawn as SVG. Drag them around, or hit Shuffle.
- **Gallery** with a full-screen photo viewer.

## Brand colours
Defined as CSS variables at the top of `css/styles.css`:

| Group | Name | Hex | Where |
|---|---|---|---|
| Paint | Mood Purple | `#7817A3` | Main body paint |
| | Purple Glow | `#9B3FD0` | Sunlit panels |
| | Purple Night | `#2E0A3D` | Shadows, arches |
| | Cloud Violet | `#4C44AC` | Side-panel clouds |
| | Drip Lilac | `#C4C2E6` | Windshield wash |
| Stickers | Smiley Yellow | `#F9D133` | Drippy smileys, FIRST CLASS, hazard sign |
| | Try-Me Gold | `#F2AE3A` | TRY ME lettering |
| | Try-Me Orange | `#DD983C` | TRY ME badge |
| | Try-Me Maroon | `#8C221F` | TRY ME outlines |
| | Plate Yellow | `#E9A23B` | Rear plate |
| Lights | Tail-Light Red | `#E2332E` | LED tail lights |
| | Beacon Red | `#B32827` | Roof beacons |
| | LED Ice | `#73B5DB` | Headlights |
| Art | Liberty Teal | `#489E97` | Lady Liberty |
| | Atmosphere White | `#F4F1F8` | ATMOSPHERE, MOOD logo |
| | Ink | `#121016` | Outlines & trims |

Colours were measured from the photos. The overcast light dulled the yellows and one purple, so those were lifted back to true sticker brightness. The raw photo values are listed in `PALETTE` in `js/main.js`.

## Stickers
All stickers are SVG `<symbol>`s at the top of `index.html` (`#s-mood`, `#s-norisk`, `#s-tryme`, `#s-firstclass`, `#s-plate-front`, `#s-plate-rear`, `#s-hazard`, `#s-warning`, `#s-atmosphere`, `#s-school`, `#s-smiley`). Reuse one anywhere with `<svg viewBox="…"><use href="#s-tryme" /></svg>`.

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
The front and back photos are by **Mziziani Photography**. Get the photographer's permission before publishing, and keep the credit.
