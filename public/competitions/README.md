# Competition photos live here

The Competition Wins section in `components/competitions/Competitions.tsx`
reads from this folder. Your competition photos are already in here
(real ones you uploaded to the repo).

## Editing captions

Fill in the captions, placements, and years by editing `lib/data.ts` —
look for the `competitions` array. Each row has:

- `src` — image filename in this folder
- `caption` — e.g. "RoboCup Junior 2024"
- `placement` — e.g. "2nd place, Rescue Line"
- `year` — e.g. "2024"

## Adding more photos

1. Drop the file here (good naming: `image-name.jpg`).
2. Add a row to `competitions` in `lib/data.ts`.
3. Done — the gallery grows automatically.
