# Drop your certificate images here

The Achievements section in `components/achievements/Achievements.tsx` references
six slots, currently labeled `cert-1` through `cert-6`.

## How to populate

1. Drop your certificate images into this folder, naming them:
   - `cert-1.jpg`
   - `cert-2.jpg`
   - `cert-3.jpg`
   - `cert-4.jpg`
   - `cert-5.jpg`
   - `cert-6.jpg`

   (`.png` works too — just update the filenames in `lib/data.ts` if you
   prefer PNG, and update the imports there.)

2. Edit `lib/data.ts` — fill in the `label`, `org`, and `year` fields
   for each certificate. The image filenames are listed under
   `src:` on each row.

That's it. Hot reload picks up new images automatically.

## If you have more than 6 certificates

Add more rows to the `achievements` array in `lib/data.ts` and the
gallery will grow automatically (it's a grid).
