# Personal portfolio — Kakarla Hemanth Reddy

Multi-page Next.js 14 (App Router) + Tailwind + Framer Motion. Six routes:
`/`, `/cca`, `/projects`, `/achievements`, `/hobbies`, `/contact`. Static build with
one dynamic route (`/api/contact`).

## Persona
- Secondary 3 student at SST Singapore
- Robotics CCA member since 2022
- NOT a competitive programmer — explicitly removed from copy

## Aesthetic
- Dark mode first
- ENIG-gold and copper accents on deep solder-mask background
- JetBrains Mono for display, Inter for body
- Structural PCB motifs (fiducials, corner brackets, pin pads, BGA field) used intentionally

## Key live elements
- Home hero: interactive PCB centerpiece with mouse-modulated pulse + cursor proximity highlighting
- Home: cursor glow + scroll progress rail + status ticker + LiveBits chips
- Home bio strip: rotating "currently building" lines
- /hobbies: Web Audio mini piano + animated lane
- /achievements, /cca: lightboxed competition photo grid

## Editing surfaces
- `lib/data.ts` — all identity, projects, wins, hobbies, status lines
- `public/competitions/` — drop new image files, reference in `roboticsWins`
- `public/logo.svg` — swap if the user has a real personal logo
- `tailwind.config.ts` — palette tuning (gold, copper, solder, code)

## Build
- `npx tsc --noEmit` clean
- `npm run build` produces 10 static routes, ~150KB first-load JS
- Port 3010 used in this thread; default 3000 if free

## Accessibility
- Reduced-motion handled across all bits (PianoKeys, Marquee, StatusFeed, CursorGlow, hero centerpiece)
- Lightbox: keyboard nav (Esc, ←, →) plus body scroll lock
- Form posts to /api/contact with proper validation (>5 char message) and reference ID back
- Marquee is aria-hidden on the motion div, parent has aria-label

## Known follow-ups
- WinGallery lightbox: focus move into modal + return on close could be tighter
- Cursor targets in PCB centerpiece are queried per mousemove (perf nit on slow CPUs)
