# Personal Portfolio Website

Next.js 14 (App Router) + Tailwind + Framer Motion. Static-deploy friendly
to Vercel — no env vars required for the demo, but the contact form
optionally delivers via Resend if you add credentials.

## Quick start

```bash
npm install
npm run dev   # http://localhost:3000
npm run build # production build
```

## Editing content

**Almost everything is in one file: [`lib/data.ts`](./lib/data.ts).**
Edit it to update your bio, projects, skills, achievements, competitions,
and beyond-the-code list. No code changes needed.

## Visual assets

Drop your actual files into the `public/` folder:

| Slot                                          | Where it shows                              |
| --------------------------------------------- | ------------------------------------------- |
| `public/logo.svg` (or `.png`)                 | Hero + navigation mark — **placeholder**    |
| `public/portrait.jpg` (or `.png`)             | About section (auto-included if present)    |
| `public/certs/cert-1.jpg` ... `cert-6.jpg`    | Achievements gallery                        |
| `public/competitions/*.jpg` & `.png`          | Competition Wins gallery                    |

Subfolders have their own `README.md` with placement instructions.

## Contact form delivery (optional)

The `/api/contact` endpoint validates and logs every message. To actually
deliver by email, add these env vars in your Vercel project:

- `RESEND_API_KEY` — from <https://resend.com>
- `RESEND_FROM` — a sender address verified in Resend
- `RESEND_TO` — where you want messages delivered

Without them, the form still returns success — submissions are logged
to the server console.

## Customizing the look

- **Palette** — `tailwind.config.ts` → `theme.extend.colors`
- **Fonts** — `app/layout.tsx` (currently JetBrains Mono + Inter)
- **Motion variants** — `lib/motion.ts`
- **Components** — under `components/`

## Deployment

Just push to GitHub and import the repo in Vercel. Zero config required.
