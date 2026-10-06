# MOOD — No Risk, No Story 💜

A showcase website for **MOOD**, Nairobi's purple nganya. Front says *TRY ME*, back says *ATMOSPHERE*.

A static site with no build step and no dependencies. Open `index.html` in a browser and it works.

## Design
- **Light and dark mode**: follows the device setting by default, with a sun/moon toggle in the header that remembers the visitor's choice. The hero shows Mood by day in light mode and at night in dark mode.
- **Icon-only buttons**: a Lucide-style line-icon sprite at the top of `index.html` (`#i-…` symbols). Every icon button has an `aria-label` for screen readers and a `data-tip` tooltip on hover. On phones the nav becomes a floating icon bar at the bottom.

## Sections
- **Hero**: the front photo dressed in Mood's own stickers, plus a Hoot! horn button.
- **Mood in Motion**: vertical reels that autoplay silently in view, with tap to pause and a sound toggle.
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

## Adding a video
Needs `ffmpeg`. Convert the phone video (iPhone `.mov`/HEVC is fine) into web-ready MP4 + WebM files and a poster image:

```bash
scripts/add-video.sh path/to/clip.mov my-clip            # whole frame
scripts/add-video.sh path/to/story.mov my-clip 250 40    # cut 250px off the top, 40px off the bottom
```

For screen-recorded Instagram Stories, `250 40` removes the username overlay and rounded corners. Then add the clip to `VIDEOS` in `js/main.js`, using the width and height the script prints:

```js
{ src: "assets/video/my-clip", poster: "assets/video/my-clip.webp", w: 720, h: 1280,
  caption: "What happens in it", credit: "@mood_family33" },
```

Videos are encoded at 720px wide (about 1.5 MB per 6 seconds). They load only when someone scrolls to them, play muted on a loop while on screen, and pause when off screen.

## Run locally
```bash
python3 -m http.server 8000   # open http://localhost:8000
```

## Deploy (free)
- **GitHub Pages**: Settings → Pages → Deploy from branch → `main` / root.
- **Netlify / Vercel**: import the repo. It needs no build command, and the output directory is the root.

## Photo credits
The three-quarter front and back photos are by **Mziziani Photography**. The night photo is by **@poolman_edits** (POOLMAN). The photographer of the head-on photo is still to be confirmed (`PHOTOS.headon.credit` in `js/main.js`). Get permission before publishing, and keep the credits.
