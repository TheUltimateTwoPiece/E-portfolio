# Editing guide

> **TL;DR** — every visible string on the site lives in `lib/data.ts`.
> Open that file, save it, refresh the browser. No build step unless
> you want one (`npm run build`).

---

## Where to edit what

You should never have to open a `.tsx` file to change copy. Here's the
map. Press **Ctrl-F** in `lib/data.ts` to jump to a section.

| You want to change… | Edit this block in `lib/data.ts` |
| --- | --- |
| Your name | `identity.firstName` / `identity.lastName` |
| School · year · role | `identity.school` / `identity.yearLabel` / `identity.role` |
| The one-line tagline under the hero | `identity.oneLine` |
| The three bio paragraphs on the home page | `identity.bio` (the array — add or remove lines) |
| "Started building at age 9 · Primary 3 · primary school CCA" | `identity.startedAge` / `identity.startedAt` / `identity.startedWhere` |
| Email, phone, GitHub | `identity.email` / `identity.phone` / `identity.github` (blank to hide GitHub) |
| The four chips under the bio strip | `liveBits` (the array of `{ label, value }`) |
| The cycling "now" lines on the hero + bio strip | `statusFeed` (the array — replace or add lines) |
| CCA blurb / beats / equipment | `cca.blurb` / `cca.beats` / `cca.equipment` |
| Skill chips (Software / Hardware / Sensors / CAD) | `skills` |
| **Add a new robotics win** | push a row into `roboticsWins` (see the `// ADD A PHOTO` block in that file) |
| Add an "oddments" entry on /achievements | push a row into `otherAchievements` |
| **Add a new project card** on /projects | push a row into `projects` (copy an existing row) |
| Add or swap a hobby on /hobbies | edit the relevant entries in `hobbies` |
| Page hero eyebrow / subtitle / chips | `pageContent.{cca, projects, achievements, hobbies, contact}` |
| Eyebrow/title/subtitle on the 5 home sections | `pageContent.home.*` |
| The 5 cards on the home Showcase | `pageContent.home.showcaseCards` |
| The two scrolling ribbons on the home page | `pageContent.home.winsMarqueeItems` + `winsSecondaryItems` |
| Hero oscilloscope labels (top-left, top-right, etc.) | `heroScopeLabels` |
| Footer build credits | `buildStack` |

---

## Adding a photo

1. Drop the file in **`public/competitions/`**.
   - Recommended filename: `<event>_<year>.jpg` or `.png`. Lowercase,
     no spaces, dashes are fine.
2. Open `lib/data.ts`, find the `roboticsWins` array. Push a row that
   points at the file. Example:

   ```ts
   roboticsWins.push({
     id: "robocup-2025",
     event: "RoboCup Singapore 2025",
     placement: "Participated",  // be honest about results
     year: 2025,
     image: "/competitions/robocup-2025.jpg",
     blurb: "Half a sentence about the day, in your voice.",
   });
   ```

3. Save `lib/data.ts` and refresh the browser. The win appears on
   `/cca` and `/achievements` automatically.

   **Personal builds** (no competition behind them): use
   `placement: "Personal build"` and the home page photo strip will
   quietly skip them. They still appear on `/achievements` under their
   own captions.

For other photos — a project screen, a portrait, a logo — see the
README in the matching `public/<folder>/` directory.

---

## Adding a 4th project

Push a row into the `projects` array in `lib/data.ts`. Copy a recent
entry, rename, edit. The new card will appear on `/projects` and as a
Showcase card on the home page (if you also add an entry to
`pageContent.home.showcaseCards`).

## Adding a hobby

Add or edit a row in the `hobbies` array. Each entry has `id`, `tag`,
`title`, `body`, and a small `facts` array rendered as stat tiles.

## Editing a hobby fact

Just change the value. The label stays the same.

---

## Don't want to touch TypeScript?

Most edits in `lib/data.ts` only change text inside quotation marks. If
you find yourself needing to add a new field that doesn't already
exist, that's a 30-second dev-mode change, not a code project — but
the easier path is to reuse fields that are already there.

---

## Build commands

You'll reach for these on the rare occasion you actually change a
component or styling. Most edits don't need a rebuild at all.

```bash
# Dev server (hot reload, watch files)
npm run dev

# Type check only
npx tsc --noEmit

# Production build (deployable)
npm run build
```

See `CONTENT.md` at the repo root for the image-folder layout, and
`.freebuff/run.md` for the dev server / production deploy procedures.
