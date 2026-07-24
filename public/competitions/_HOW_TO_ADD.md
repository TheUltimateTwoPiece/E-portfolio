# public/competitions/

Robotics event photos and personal-build arm photos. Every file in
this folder is referenced from `lib/data.ts → roboticsWins`.

## Add a new event

1. Drop the file here. Lowercase, no spaces, dashes OK.
   - Good: `2025-robocup-rescue.jpg`
   - Good: `ide-series-2025.jpg`
2. Open `lib/data.ts`, find the `roboticsWins = [...]` array. Push
   a row at the end:

   ```ts
   {
     id: "robocup-2025",
     event: "RoboCup Singapore 2025",
     placement: "Participated",   // be honest
     year: 2025,
     image: "/competitions/2025-robocup-rescue.jpg",
     blurb: "Half a sentence in your own voice.",
   }
   ```

3. Save. The new card appears on `/cca` and `/achievements`
   automatically. The home page photo strip picks it up too, unless
   you set `placement: "Personal build"`.

## Already in here

- `2024-robocup.png`, `robocup-2024.jpg` · RoboCup Singapore 2024
- `2023-cospace.jpeg` · CoSpace Rescue 2023
- `ide-series-2025.jpeg` · IDE Series 2025
- `grabby-arm-1.jpeg`, `grabby-arm-2.jpeg`, `grabby-electronics.jpeg` · robotic-arm personal build
- `robot-car.jpeg` · robot-car daily driver

## Replace a photo

Keep the same filename if you want to swap cleanly. Otherwise you can
either delete the old file or update the `image:` field in
`lib/data.ts` to point at the new one.
