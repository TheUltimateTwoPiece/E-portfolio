# Run doc

Two sections. The first lists the procedures a fresh checkout needs to mirror what was built; the second lists how to start the dev server for this thread's preview.

## 1. Reproduce the build artifacts

A clean checkout needs the following before `npm run build` passes:

1. **Install Node deps** with the project's package manager. There is a `package-lock.json`, so npm is the canonical choice:
   ```bash
   npm ci
   # or if you only have a package.json snapshot:
   npm install --no-audit --no-fund
   ```
   The lockfile pins Next 14.2.18, React 18, Framer Motion 11.x, Tailwind 3.4, lucide-react, clsx, tailwind-merge and the `next/font` Google fonts (`JetBrains_Mono`, `Inter`).

2. **No env file.** This site has no runtime secrets — it deploys static. There is a (currently disabled) optional `RESEND_API_KEY` env var on `/api/contact`, commented in `app/api/contact/route.ts`. Skip copying unless you intend to wire transactional email.

3. **`public/competitions/`** assets are committed (`2024-robocup.png`, `2023-cospace.jpeg`, `ide-series-2025.jpeg`, `grabby-arm-1.jpeg`, `grabby-arm-2.jpeg`, `grabby-electronics.jpeg`, `robot-car.jpeg`, `robocup-2024.jpg`). They render directly from the embedded URLs — no copy step needed beyond `git pull`.

4. **Skill files for the home page PCB centerpiece and the piano Web Audio** are referenced inline from `node_modules` after `npm ci`. There are no additional binaries to copy.

5. **Fonts** come from `next/font/google`. They fetch on the first build and self-host. No extra setup needed.

If you ever add an env file (e.g. for Resend), copy it as a fresh file at `.env.local` from the main checkout — never symlink, because tokens/ports may need to differ per worktree.

## 2. Run the dev server

The site boots cleanly with `next dev`. Pick any free port — 3000 is the default. This thread uses 3010 to avoid clashing with anything else on the host.

```bash
# from the repo root
npx next dev -p 3010
```

The server answers HTTP within ~3 seconds of `next` finishing its initial compile. Verify with `curl -s -o /dev/null -w '%{http_code}' http://localhost:3010/` — should print `200`.

### Detached background launch (non-interactive shells)

When the foreground bash itself gets reaped (a wrapping CLI tool, a sandbox, or any host that sends SIGTERM to its process group on exit), `nohup ... &` is not enough. `setsid` is also not standard on stock macOS. The portable pattern is a subshell + `exec` so the child is reparented to PID 1 as soon as the launching bash exits:

```bash
# from the repo root
rm -rf .next node_modules/.cache   # clear any polluted prod/dev cache first
( cd /Users/hemanthreddy/Desktop/my-projects/repos/Personal-website && \
  exec npx next dev -p 3010 </dev/null >/Users/hemanthreddy/Desktop/my-projects/repos/Personal-website/.freebuff/preview-thmryks5uisjdw.log 2>&1 ) &
disown -a 2>/dev/null
```

The launching shell exits in <1s. Next dev is reparented to PID 1 and survives. Logs land in `.freebuff/preview-thmryks5uisjdw.log` so each preview thread has its own log path.

If port 3010 is in use, pick another free port and adapt the URL the preview registers against:

```bash
lsof -ti:3010 2>/dev/null               # find pids listening on 3010
# pick a free port and adjust the -p flag above
```

Kill / restart:

```bash
lsof -ti:3010 | xargs -r kill -9
pkill -f 'next dev' 2>/dev/null
pkill -f 'next-server' 2>/dev/null
```

### Routes stat-checked (with detached launch)

### Routes stat-checked

- `GET /` → 200 — landing / home with hero, bio strip, showcase, marquee, photo roll, outro
- `GET /cca` → 200 — Robotics CCA deep dive
- `GET /projects` → 200 — three project cards (Homework Board, Meal Planning, Robotic Arm)
- `GET /achievements` → 200 — robotics wins + other achievements
- `GET /hobbies` → 200 — piano Web Audio + swimming lane
- `GET /contact` → 200 — direct contact + form

### Contact API

`POST /api/contact` accepts `{ name, email, message }`. Returns:

```json
{ "ok": true, "reference": "RC-<random>" }
```

…or an error JSON if validation fails (e.g. message < 5 chars returns `{ "error": "Message must be 5–4000 chars." }`).

### Production build

```bash
npm run build   # all 10 routes prerender as static; /api/contact remains dynamic
npm start       # serves the production build on port 3000 by default
```

### Notes

- The hero PCB centerpiece, status ticker, marquee and cursor glow are all client-side reactive (mousemove, scroll, interval). They respect `prefers-reduced-motion`.
- The mini piano on `/hobbies` plays audio on hover — initialize the AudioContext after a real user gesture if you wire it into a more elaborate editor.
- All contact form/email/phone values come from `lib/data.ts`. Replace them in one place.
