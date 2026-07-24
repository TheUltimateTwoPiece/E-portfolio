# public/

Everything in here is accessible at the URL path shown. Drop a file
in the matching folder and reference it in `lib/data.ts`.

| Folder | Used by | Site path |
| --- | --- | --- |
| `competitions/` | RoboCup, CoSpace, IDE Series, personal-build arm photos | `/competitions/<file>` |
| `portrait.jpg` | About section portrait on the home page | `/portrait.jpg` |
| `logo.svg` | Site logo (placeholder until you have a real one) | `/logo.svg` |

## How to add a photo, step by step

1. Pick the right folder:
   - **Wins, competitions, personal builds** → `public/competitions/`
2. Drop the file. Lowercase, no spaces, dashes are fine:
   - `2025-robocup-rescue.jpg` ✓
   - `RoboCup 2025.JPG` ✗
3. Add a row in `lib/data.ts` → `roboticsWins` pointing at the file:

   ```ts
   {
     id: "robocup-2025",
     event: "RoboCup Singapore 2025",
     placement: "Participated",
     year: 2025,
     image: "/competitions/2025-robocup-rescue.jpg",
     blurb: "Half a sentence about the day.",
   },
   ```

4. Save and refresh. The new card is now visible on `/cca` and
   `/achievements`. The home page photo strip picks it up
   automatically (unless it has `placement: "Personal build"`).

For everything else — project screenshots, portrait, hobby photos,
a real logo — drop them in `public/` directly and reference from
`lib/data.ts` with a leading `/`.

> See `lib/README.md` for the full editing map.
