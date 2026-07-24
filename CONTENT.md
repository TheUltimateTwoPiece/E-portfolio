# CONTENT.md

Everything you need to update copy or add a photo, in one page.

## TL;DR

- **Text?** Open `lib/data.ts` and find the relevant block. Save,
  refresh the browser.
- **Photo?** Drop the file in `public/<matching-folder>/` and add a
  one-line row in `lib/data.ts` → `roboticsWins`.

## Folder layout

```
.
├── CONTENT.md              ← you are here
├── lib/
│   ├── data.ts             ← THE single source of truth for copy
│   └── README.md           ← the editing guide (open this if you want the map)
├── public/
│   ├── _HOW_TO_ADD.md      ← where to put what kind of image
│   ├── competitions/       ← robotics event photos + arm build photos
│   │   └── _HOW_TO_ADD.md
│   ├── portrait.jpg        ← about-section portrait
│   └── logo.svg            ← site logo (placeholder)
└── .freebuff/run.md        ← dev server + production build commands
```

## The map

Per-page chrome (eyebrow, title, subtitle, chips, CTA copy) lives in
`lib/data.ts → pageContent.<page>.<field>`. Open the file, Ctrl-F
`pageContent` and you'll land there.

| Page | Hero block under pageContent |
| --- | --- |
| Home: bio strip | `home.bioEyebrow`, `home.bioTitle` |
| Home: showcase | `home.showcaseEyebrow`, `home.showcaseCards` |
| Home: ribbon | `home.winsMarqueeItems`, `home.winsSecondaryItems` |
| Home: outro CTA | `home.outroTitlePart1` .. `outroTitlePart3` |
| /cca | `cca.heroEyebrow`, `cca.chips`, `cca.winsTitlePre` |
| /projects | `projects.heroSubtitle`, `projects.chips` |
| /achievements | `achievements.heroSubtitlePrefix`, `.chips`, `.ifYouWantMoreBody` |
| /hobbies | `hobbies.heroSubtitle`, `hobbies.chips`, `hobbies.bottomNote` |
| /contact | `contact.heroSubtitle`, `contact.chips`, `contact.emailHint` |

## Image-adding one-liner

1. Drop the file in `public/competitions/`
2. Add a row in `lib/data.ts → roboticsWins`
3. Save. Refresh.

That's it.
