# MOOD — No Risk, No Story

A showcase site for **MOOD**, Nairobi's purple nganya ([@mood_family33](https://www.instagram.com/mood_family33/)).
Front says _TRY ME_, back says _ATMOSPHERE_.

**Live:** https://markchweya.github.io/MOOD-NGANYA/

## Stack

| Concern   | Choice                                                                 |
| --------- | ---------------------------------------------------------------------- |
| UI        | React 19 + TypeScript (strict, `noUncheckedIndexedAccess`)             |
| Build     | Vite 8                                                                 |
| Styling   | Tailwind CSS v4 with design tokens in `src/styles`                     |
| Motion    | Motion (Framer Motion): reveals, shared layout, springs, drag physics  |
| Scrolling | Lenis smooth scrolling (off when the visitor prefers reduced motion)   |
| Icons     | Lucide                                                                 |
| Fonts     | Self-hosted via Fontsource (Bungee, Permanent Marker, Space Grotesk)   |
| Quality   | ESLint (type-checked, hooks, jsx-a11y), Prettier, Vitest + Testing Lib |
| CI/CD     | GitHub Actions: verify on every PR, deploy to GitHub Pages from `main` |

## Getting started

```bash
npm ci
npm run dev        # http://localhost:5173
```

| Script              | What it does                          |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Dev server with hot reload            |
| `npm run build`     | Type-check and build to `dist/`       |
| `npm run preview`   | Serve the production build            |
| `npm run lint`      | ESLint                                |
| `npm run typecheck` | TypeScript project build              |
| `npm test`          | Vitest (unit, content and component)  |
| `npm run format`    | Prettier (sorts Tailwind classes too) |

## Project structure

```
src/
  app/           Providers (theme, toast, Motion config, Lenis) and section links
  components/
    brand/       Smiley, Wordmark and every sticker as typed SVG components
    layout/      Header, Dock, Footer, ThemeToggle, CursorFollower, ScrollProgress
    scroll/      Scroll-linked entrances: Rise, JoinSides, Construct, Puzzle
    ui/          IconButton, Modal, Reveal, SectionHeading
  content/       All copy and data, typed: photos, cutouts, palette, hotspots, videos, stickers
  features/      Theme and toast state (context + hooks)
  hooks/         useActiveSection, useHorn, useCopyToClipboard, useElementWidth
  lib/           cn(), Motion presets, helpers
  sections/      One folder per page section
  styles/        Tailwind entry, brand tokens, night/day theme, utilities
public/          Video clips, favicons, manifest, social image
scripts/         add-video.sh
```

## Editing content

Everything on the page comes from typed modules in `src/content/`. Edit them, and TypeScript
plus the tests in `src/content/content.test.ts` catch mistakes.

- **Photos:** add the `.webp` to `src/assets/photos/` and register it in `photos.ts`.
- **Hotspots:** `details.ts`. `x` and `y` are percentages of the photo's size.
- **Colours:** `palette.ts`, plus a crop in `src/assets/chips/` showing where the colour lives.
  `spot` pins a colour to the 3D bus (`face`, then `x`/`y` as percentages of that cutout).
- **Cutouts:** background-free PNG/WebP versions of the bus in `src/assets/cutouts/`, registered
  in `cutouts.ts`. They drive the hero and the 3D bus in the Colours section.
- **Copy and socials:** `brand.ts`.

### Adding a video

Needs `ffmpeg`. The script converts phone video (iPhone HEVC `.mov` is fine) to H.264 MP4 plus a
VP9 WebM fallback and a poster:

```bash
scripts/add-video.sh path/to/clip.mov my-clip            # whole frame
scripts/add-video.sh path/to/story.mov my-clip 250 40    # crop an Instagram Story overlay
```

Then add it to `src/content/videos.ts` with the width and height the script prints.

## Design

- **Night and day.** The site follows the device setting, with a toggle that remembers the
  choice. Dark mode shows Mood at night; light mode shows it in the sun.
- **Measured palette.** Every colour was sampled from photos of the matatu (see the Colours section).
- **The nganya's own smileys.** The wordmark spells MOOD with the dead-eyed and melting smileys
  painted on the mirrors and windshield.
- **Scroll entrances with character.** Each section arrives differently, all scroll-linked so they
  play forwards and backwards with the scrollbar: the videos **join** from opposite sides, Spot the
  Details is **constructed** block by block, the colour chips assemble like a **puzzle**, and the
  sticker wall and gallery photos **rise** into place.
- **The bus in 3D.** The Colours section shows the matatu as a front/back pair you can drag to
  spin; every colour is a dot on the bus itself.
- **Night mode lights.** In dark mode the hero bus dims and its beacons, headlights and fog lamps
  glow.
- **Image quality.** Photos and cutouts are upscaled 2x with EDSR super-resolution and graded for
  deep blacks and rich colour. Video is served at the source's full 1080p.
- **Accessible motion.** Every animation is disabled for visitors who ask for reduced motion, and
  the custom cursor only replaces the pointer on mouse and trackpad.

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which builds with the right base path
and publishes to GitHub Pages. One-time setup: **Settings → Pages → Source: GitHub Actions**.

## Credits

Photos by **Mziziani Photography** and **@poolman_edits**. Video by @mood_family33 with
@lenny_mmoja\_ and @matrix_family33.
