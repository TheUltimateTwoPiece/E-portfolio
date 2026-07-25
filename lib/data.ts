// =============================================================
//   EDIT THIS FILE
// =============================================================
//
//   This is the single source of truth for every visible string
//   on the site. To change a piece of text, find the section
//   below and edit the value. Save the file, refresh the browser.
//
//   Sections at a glance (Ctrl-F the name):
//
//     identity       -> name, school, year, role, oneLine, bio
//     reachLinks     -> the contact-tile icons
//     cca            -> the Robotics CCA blurb, beats, equipment
//     skills         -> the four "tool belt" groups on /cca
//     hobbies        -> the two hobby panels on /hobbies
//     roboticsWins   -> the photo cards on /cca and /achievements
//     otherAchievements -> the "oddments" on /achievements
//     projects       -> the three project cards on /projects
//     statusFeed     -> the rotating "currently building" lines
//     liveBits       -> the four chips under the bio strip
//     pageContent    -> every page's eyebrow, title, subtitle, chips,
//                       and CTA copy
//     heroScopeLabels -> the four oscilloscope labels in the hero
//     buildStack     -> the credits list in the footer
//
//   IMAGES: drop the file in public/competitions/ then add a
//   row to roboticsWins. The /achievements page will pick it up
//   automatically. More at CONTENT.md and lib/README.md.
//
// =============================================================

export const identity = {
  firstName: "Hemanth",
  lastName: "Kakarla",
  fullName: "Kakarla Hemanth Reddy",
  shortName: "Hemanth",
  school: "SST Singapore",
  yearLabel: "Secondary 1",
  // Short tagline used in the browser tab and OpenGraph defaults.
  // (The longer `role` below is still here for body copy.)
  shortRole: "Robotics maker",
  role: "Maker · Coder · Designer",
  oneLine: "I build robots because it's fun. I started when I was nine.",
  email: "kakarla_hemanth_reddy@s2026.ssts.edu.sg",
  phone: "+65 89449358",
  // Leave blank to hide the GitHub link everywhere.
  github: "",
  startedAge: "9",
  startedAt: "Primary 3",
  startedWhere: "primary school CCA",

  // Bio paragraphs on the home page. Add or trim freely.
  bio: [    "I'm a Secondary 1 student at SST Singapore. Most of my time goes to Robotics CCA: A plan in my mind, Robot on the bench, Python scripts on the laptop.",
    "I started building robots in Primary 3, at my primary school CCA, when I was nine. I'm still doing the same thing, just with better parts.",
    "Python is my main language. Outside of Python I do TypeScript for the web bits and a bit of C++ for the Arduino side when I need raw servo loops.",
  ],
};

// Just a transform of identity into nice display objects.
export const reachLinks = [
  { label: "Email", value: identity.email, href: `mailto:${identity.email}` },
  { label: "Phone", value: identity.phone, href: `tel:${identity.phone.replace(/\s/g, "")}` },
];

// Robotics CCA — what I actually do, week to week.
export const cca = {
  name: "Robotics CCA",
  school: "SST Singapore",
  abbrev: "CCA",
  role: "Member · since P3",
  // Used as the hero subtitle on /cca and the card body on / .
  blurb:
    "I joined Robotics at my primary school CCA in Primary 3, when I was nine. I continued at SST in Secondary 1 and kept going. Below is what the work actually looks like, week to week.",
  // Four "beats" of the work, rendered as cards on /cca.
  // Tag is the small label on each card. Title + body are user-editable.
  beats: [
    {
      tag: "BUILD",
      title: "Designing and fabrication",
      body: "Most builds start in Fusion 360. Links, mounts, brackets, the occasional gripper. We iterate in plastic before we commit to anything metal.",
    },
    {
      tag: "WIRE",
      title: "Wiring and bench work",
      body: "I run servo buses through an Arduino or esp32, route the wiring properly, and label the 30 AWG harness so the next person doesn't have to guess.",
    },
    {
      tag: "CODE",
      title: "Code that runs the thing",
      body: "Python is my main language. For the Arduino side I write C++ servo loops. For web bits I do TypeScript. I keep the same data model across all three.",
    },
    {
      tag: "SHARE",
      title: "Showing the work",
      body: "I also like building smaller web apps in Typescript when an idea won't leave me alone. That's where Homework Board and the Meal Planning App live.",
    },
  ],
  // Rendered as the "what's on the bench" grid on /cca.
  equipment: [
    { label: "MCU", value: "Arduino Uno · Arduino Mega · ESP32 · SSTuino II" },
    { label: "Driver", value: "L298N · TB6612 · PCA9865" },
    { label: "CAD", value: "Fusion 360 (parametric parts, assemblies)" },
    { label: "Print", value: "Bambu Lab A1 · BambuStudio profiles" },
    { label: "Sensors", value: "HC-SR04 · MPU-6050 · IR line-follower" },
    { label: "Servos", value: "SG90 · MG90S · MG996r" },
    { label: "Materials", value: "PETG, PLA, plywood, 22 AWG silicone wire" },
    { label: "Display", value: "TM1637 7-segment · 16x2 LCD" },
  ],
};

// Robotics photos from the user's uploads. Captions + placements are
// editable. Personal-builds go on /achievements with
// placement: "Personal build" — the home strip filters those out.
//
// To add a new photo:
//   1. Drop the file in public/competitions/ (jpg / png / webp).
//   2. Push a row here. Use a unique id, fill the event + year, and
//      put the placement honestly ("Participated" is fine if you
//      don't have a result yet).
export const roboticsWins: Array<{
  id: string;
  event: string;
  placement: string;
  year: number | string;
  image?: string;
  blurb: string;
}> = [
  {
    id: "robocup-2024",
    event: "RoboCup Singapore 2024",
    placement: "1st place",
    year: 2024,
    image: "/competitions/2024-robocup.png",
    blurb: "Rescue line. The line-sensor stack worked on the third revision, finally.",
  },
  {
    id: "cospace-2023",
    event: "CoSpace Rescue 2023",
    placement: "Participated",
    year: 2023,
    image: "/competitions/2023-cospace.jpeg",
    blurb: "First time doing simulation + real merges. Strategy phase cost us a week.",
  },
  {
    id: "ide-series-2025",
    event: "IDE Series 2025",
    placement: "Participated",
    year: 2025,
    image: "/competitions/ide-series-2025.jpeg",
    blurb: "Robotics CCA event day. Real robots, real arena, real teammates.",
  },
  {
    id: "arm-personal",
    event: "Robotic arm build · at home",
    placement: "Personal build",
    year: 2026,
    image: "/competitions/grabby-arm-1.jpeg",
    blurb: "Six-servo arm. Built for myself, not for any competition.",
  },
  {
    id: "arm-wiring",
    event: "Robotic arm build · at home",
    placement: "Personal build",
    year: 2026,
    image: "/competitions/grabby-arm-2.jpeg",
    blurb: "Calibrating the arm. Brown cable is servo 1, etc. (I labelled them eventually.)",
  },
  {
    id: "arm-electronics",
    event: "Robotic arm build · at home",
    placement: "Personal build",
    year: 2026,
    image: "/competitions/grabby-electronics.jpeg",
    blurb: "Inside the harness. L298N driver above, Arduino Uno on the right.",
  },
  {
    id: "robot-car",
    event: "Robot car · line follower",
    placement: "Personal build",
    year: 2025,
    image: "/competitions/robot-car.jpeg",
    blurb: "Used for line-follower drills. Goes fast enough to be a problem in the kitchen.",
  },
];

// Non-competition achievements. The "oddments" on /achievements.
export const otherAchievements: Array<{
  id: string;
  title: string;
  org: string;
  year: number | string;
  note: string;
}> = [
  {
    id: "meal-practical",
    title: "Meal Planning App · Science Practical",
    org: "SST Science Faculty",
    year: 2026,
    note: "Submitted the app with a 6-week waste-log dataset. Did it actually reduce waste? Mostly yes, on weeks we remembered to log.",
  },
  {
    id: "homework-board-launched",
    title: "Homework Board · Class rollout",
    org: "My class · S1-08",
    year: 2026,
    note: "Started with the 25 students in S1-08. We use it every week for homework posting and reminders.",
  },
];

// The three projects on /projects. Add a fourth by pushing another row.
export const projects: Array<Project & {
  audience: string;
  highlights: string[];
}> = [
  {
    id: "homework-board",
    name: "Homework Board",
    audience: "For my class · S1-08 · 25 students",
    tagline: "A small app I built because no one else was going to build it for us.",
    status: "Live in class.",
    summary:
      "A homework tracker for my class of 25 students in S1-08. Teacher posts, students tick, there's a corkboard view so the announcements don't get lost in chat. I run cron jobs to schedule reminders and email pings for upcoming deadlines. The stack is Python on the server with TypeScript on the front because that's what I'm fastest in.",
    stack: [ "FastAPI", "SQLite", "Supabase", "Next.js", "TypeScript", "cron"],
    features: [
      "Posting flow for admins with scheduled release times",
      "Corkboard-style main view so announcements don't fall off the page",
      "Per-student completion tracking visible to the admins",
      "Email reminder pipeline for upcoming deadlines",
      "Notification + comment threads under each post",
      "Currently used weekly by S1-08 since semester 2",
    ],
    metrics: [
      { label: "Class size", value: "25 students" },
      { label: "Class", value: "S1-08" },
      { label: "Posts per week", value: "~ 12" },
    ],
    highlights: [
      "It's only for my class. Not the whole school, not the year level. Just S1-08.",
      "I use it every week, which is the only metric that matters.",
    ],
  },
  {
    id: "meal-planning",
    name: "Meal Planning App",
    audience: "For our kitchen at home (and a science practical)",
    tagline: "Reducing food waste, one grocery list at a time.",
    status: "In active use at home.",
    summary:
      "What started as a submission to our science perfirmance taskbut soon it became a thing we use every week. Inventory, grocery, recipes, planning, and a waste log that I actually fill in. Gemini suggests recipes based on what's already in the fridge. Every panel exports to CSV because the whole point was to measure whether the thing works, not assume it.",
    stack: ["Next.js", "Supabase", "Gemini API", "Python", "TypeScript", "Postgres"],
    features: [
      "Inventory panel — what we actually have, with expiry awareness",
      "Grocery panel — auto-generated diff between recipe plan and inventory",
      "Recipe panel — Gemini suggestions grounded in the inventory",
      "Planning panel — week-at-a-glance meal timeline",
      "Waste Log panel — structured logging with CSV export",
      "CSV export across every panel for the science analysis",
    ],
    metrics: [
      { label: "Panels", value: "5 surfaces" },
      { label: "Backend", value: "Supabase + Postgres" },
      { label: "AI assist", value: "Gemini via API" },
    ],
    highlights: [
      "Family actually uses it on Sundays to plan the week.",
      "It was a science project first — that constraint shaped every panel.",
      "We have six weeks of real waste data. Proud of that.",
    ],
  },
  {
    id: "robotic-arm",
    name: "Robotic Arm",
    audience: "Built at home on my own time",
    tagline: "Six servos, an Arduino, and a C++ control loop.",
    status: "Built for myself. Not for any competition.",
    summary:
      "A six-servo arm built at home on my own time, not for CCA or any competition. 3 MG996r servos and 3 MG90 servos driven through an PCA9865, all hooked up to an SSTunio (esp32 and arduino combined). I wrote the servo mapping and a C++ script on the laptop that streams targets over serial for the smooth trajectories. Calibration is stored on the device so I don't have to redo it every morning.",
    stack: ["SSTino", "MG996r / MG90S servos", "PCA9865", "C++ (control script)", "TypeScript (Web Serial panel)"],
    features: [
      "Six-channel servo control driven from an Arduino Uno",
      "C++ control script streams servo targets from the laptop",
      "On-device calibration — saved to EEPROM, persists through power cycles",
      "Smoothed trajectory interpolation to prevent servo stall on big moves",
      "Web Serial panel to drive it from a browser tab when the laptop is too far",
      "No trophies, no CCA showcase, no Open House. Just a build I wanted to make.",
    ],
    metrics: [
      { label: "Servos", value: "6 channels" },
      { label: "MCU", value: "Arduino Uno" },
      { label: "Driver", value: "PCA9865" },
    ],
    highlights: [
      "It was never for any competition. I just wanted a six-servo arm on my desk.",
      "Half the firmware is in C++ on the Arduino. The other half is C++ on the laptop.",
      "It breaks sometimes. I fix it. That's the loop I'm in for.",
    ],
  },
];

export type Project = {
  id: string;
  name: string;
  tagline: string;
  status: string;
  summary: string;
  stack: string[];
  features: string[];
  metrics: { label: string; value: string }[];
};

// Skills — Python first, in the order the user actually reaches for them.
export const skills = [
  {
    group: "Software",
    items: [
      { name: "Python", note: "day-to-day. main." },
      { name: "TypeScript", note: "web bits" },
      { name: "C++", note: "Arduino firmware" },
      { name: "JavaScript", note: "browser glue" },
      { name: "SQL", note: "Postgres, SQLite" },
    ],
  },
  {
    group: "Hardware",
    items: [
      { name: "Arduino Uno", note: "most-used board" },
      { name: "ESP32", note: "when I need WiFi" },
      { name: "SSTuino II", note: "from school" },
      { name: "L298N", note: "motor driver" },
      { name: "PCA9865", note: "servo bus driver" },
      { name: "Servo buses", note: "SG90 · MG90S · MG996r" },
    ],
  },
  {
    group: "Sensors + Display",
    items: [
      { name: "HC-SR04", note: "ultrasonic distance" },
      { name: "MPU-6050", note: "6-axis IMU" },
      { name: "IR line-follow", note: "5-channel array" },
      { name: "TM1637", note: "7-segment display" },
      { name: "16x2 LCD", note: "menu + readouts" },
    ],
  },
  {
    group: "CAD / Fabrication",
    items: [
      { name: "Fusion 360", note: "parametric, assemblies" },
      { name: "BambuStudio", note: "slicer + print tuning" },
      { name: "3D Printing", note: "FDM, lots of revisioning" },
    ],
  },
];

// Hobbies — piano + swimming. To swap a hobby, change the id, tag,
// title, body and the facts array. The /hobbies page renders both
// entries as side-by-side cards.
export const hobbies = [
  {
    id: "piano",
    tag: "PIANO",
    title: "Plays piano, mostly by ear",
    body: "Started on a keyboard my cousin didn't want. Now I practise at night when the house is quiet. Mostly by ear, sometimes with sheet music when I can find the track I'm after. I don't perform. I just play until I'm tired.",
    facts: [
      { label: "How long", value: "about 5 years" },
      { label: "Style", value: "whatever I feel like" },
      { label: "Pieces end-to-end", value: "13" },
    ],
  },
  {
    id: "swimming",
    tag: "SWIMMING",
    title: "Swims at the public pool near home",
    body: "I go to the public pool near my housew. Freestyle is my best stroke. I try to go once a week and lift the count during holidays. It's the opposite of building robots: no wires, no soldering, just breathing right.",
    facts: [
      { label: "Distance", value: "1km typical" },
      { label: "Cadence", value: "once a week" },
      { label: "Where", value: "public pool" },
    ],
  },
];

// Status ticker lines — cycles every few seconds on the home hero and
// the bio strip. Add, trim or rewrite at will.
export const statusFeed = [
  "calibrating the next iteration of the arm gripper",
  "polishing Homework Board for class use",
  "labelling servo cables so they stop swapping",
  "updating the waste log so the science data isn't lying",
  "learning Swift and Xcode for Ios Apps",
  "laps at the public pool",
  "drawing a new mount in Fusion 360",
  "writing quick Python scripts to test motor speed",
];

// Live-bits chips under the home bio strip.
export const liveBits = [
  { label: "School", value: "SST Singapore · Secondary 1" },
  { label: "Started building at", value: "9 · Primary 3" },
  { label: "Main language", value: "Python" },
  { label: "Current build", value: "Using ai camera vision to control Robot arm" },
];

// =============================================================
// Page-level content (eyebrow / title / subtitle / chips / cta).
// Each block is keyed by route. Tweak copy here when you want to
// change what shows on a particular page. Most of this is also
// surfaced through identity / cca / projects etc., so if you change
// a name there, you don't need to touch pageContent too.
// =============================================================
export const pageContent = {
  home: {
    bioEyebrow: "01 · at a glance",
    // Plain object so the JSX side is straight-forward.
    bioTitle: {
      prefix: identity.yearLabel + " at",
      accent: identity.school,
      suffix: ".",
      bodyLine1: "Most of my time is on the",
      bodyLine2: "Robotics CCA bench.",
    },
    bioEyebrowAlt: "",
    showcaseEyebrow: "02 · where I spend my time",
    showcaseTitle: "Five surfaces. ",
    showcaseTitleAccent: "Each gets a page.",
    showcaseSubtitle:
      "CCA, projects, achievements, hobbies, contact. The whole point of the rest of this site. Pick one.",
    winsEyebrow: "03 · wins (scrolling)",
    winsLink: "all wins →",
    // The scrolling marquee ribbons on the home page.
    winsMarqueeItems: [
      "IDE Series 2025 · Made it to the finals",
      "RoboCup Singapore 2024 · Won 1st place",
      "CoSpace Rescue 2023 · Participated",
      "Robotic Arm · Personal build",
      "Robot Car · Personal build",
      "Meal Planning App · Science Performance task",
      "Homework Board · Class rollout",
    ],
    // Secondary marquee is greyer — UI telemetry, house-style.
    winsSecondaryItems: [
      "i2c bus live",
      "SSTuino II armed",
      "calibration loaded",
      "servo 6 / 6",
      "tension OK",
      "voltage 5.02V",
      "SST Robotics · 2022→now",
    ],
    photoStripEyebrow: "Quick photo roll",
    // Hero CTA buttons + the inline link under them. Edit text here.
    heroCtas: {
      seeProjects: "SEE PROJECTS",
      sayHi: "SAY HI",
      orReadAbout: "// or read about",
      ccaLink: "Robotics CCA",
    },
    // Section labels for the right-rail ScrollProgress dot-strip. Add / remove freely.
    scrollProgressSections: [
      { id: "hero", label: "00 \u00b7 Hero" },
      { id: "bio", label: "01 \u00b7 At a glance" },
      { id: "showcase", label: "02 \u00b7 Where I spend my time" },
      { id: "wins", label: "03 \u00b7 What I've won" },
      { id: "say-hi", label: "04 \u00b7 Say hi" },
    ],
    // The small label inside each Showcase card's footer. Edit to taste.
    caseCardOpenLabel: "OPEN \u2192",
    outroEyebrow: "04 · END OF TRANSMISSION",
    outroTitle: {
      line1: "Want to talk about a build",
      line2Pre: "or hand me a tip I'd actually",
      accent: "use",
      line2Post: "?",
    },
    outroBody:
      "Email is fastest. Phone works too. The contact page has both, plus a form if you'd rather write it out.",
    outroPrimaryCta: "GO TO CONTACT →",
    outroSecondaryCta: "See projects first →",
    outroDirectRows: [
      { label: "EMAIL", value: identity.email, href: `mailto:${identity.email}` },
      { label: "PHONE", value: identity.phone, href: `tel:${identity.phone.replace(/\s/g, "")}` },
      { label: "SCHOOL", value: identity.school },
      { label: "CCA", value: "Robotics · member since P3" },
    ],
    // Showcase cards on the home page. Add or remove freely.
    showcaseCards: [
      {
        mono: "01",
        label: "Robotics CCA",
        title: "What I actually do at SST",
        body: cca.blurb,
        meta: cca.role,
        accent: "#eab308",
        href: "/cca",
      },
      {
        mono: "02",
        label: "Projects",
        title: "Three things I built and ship",
        body: "The Homework Board that runs my class, the Meal Planning App on the fridge, and the robotic arm at home.",
        meta: `${projects.length} active projects`,
        accent: "#79c0ff",
        href: "/projects",
      },
      {
        mono: "03",
        label: "Achievements",
        title: "What I've participated in, plus oddments",
        body: "Robotics events from CCA, plus the meal-planning practical, the class rollout, and a couple of school recognitions.",
        meta: `${roboticsWins.length} photos · ${otherAchievements.length} oddments`,
        accent: "#f59e0b",
        href: "/achievements",
      },
      {
        mono: "04",
        label: "Hobbies",
        title: hbbTitle(hobbies),
        body: hbbBody(hobbies),
        meta: `${hobbies.length} hobbies`,
        accent: "#5eead4",
        href: "/hobbies",
      },
      {
        mono: "05",
        label: "Contact",
        title: "Email, phone, GitHub",
        body: "If you want to talk about a build, a CCA thing, or hand me a tip I'd actually use.",
        meta: identity.email,
        accent: "#a78bfa",
        href: "/contact",
      },
    ],
  },

  cca: {
    // Browser tab + search snippet for /cca.
    metaTitle: "Robotics CCA",
    metaDescription: `What ${cca.role.split(" · ")[0]} actually looks like at ${cca.school}.`,
    heroEyebrow: "01 · CCA",
    heroTitle: {
      pre: "Robotics ",
      accent: "CCA",
      post: ", week to week.",
    },
    chips: [
      { label: "School", value: cca.school },
      { label: "League", value: cca.abbrev },
      { label: "Role", value: cca.role },
      { label: "Joined", value: identity.yearLabel },
    ],
    beatsEyebrow: "What the work actually looks like",
    equipmentEyebrow: "What's on the bench",
    winsEyebrow: "Wins and places",
    winsTitle: {
      pre: "What we've ",
      accent: "brought home",
      post: ".",
    },
    winsLink: "// also on /achievements →",
    backCta: "← Back to home",
  },

  projects: {
    // Browser tab + search snippet for /projects.
    metaTitle: "Projects",
    metaDescription: "Three real systems I built: Homework Board, Meal Planning App, and the robotic arm.",
    heroEyebrow: "02 · Projects",
    heroTitle: {
      pre: "Three things I ",
      accent: "built",
      post: ".",
    },
    heroSubtitle:
      "The Homework Board is for my class of 25 in S1-08, not the whole school or the year level. The Meal Planning App runs the kitchen at home. The robotic arm is something I built at home on my own time.",
    chips: [
      { label: "Total", value: `${projects.length} active` },
      { label: "Live now", value: "Homework Board" },
      { label: "In use", value: "Meal Planning (family)" },
      { label: "Hardware", value: "Robotic Arm · Personal" },
    ],
  },

  achievements: {
    // Browser tab + search snippet for /achievements.
    metaTitle: "Achievements",
    metaDescription: "Robotics wins from CCA, plus a few other things I'm proud of.",
    heroEyebrow: "03 · achievements",
    heroTitle: {
      line1: { pre: "What I've ", accent: "won", post: "," },
      line2: { pre: "and a few ", accent: "oddments", post: "." },
    },
    heroSubtitle:
      "No certificate gallery on purpose. Robotics photos are relisted here from the CCA page. Plus the mean planning app and class rollout",
    chips: [
      { label: "Robotics photos", value: String(roboticsWins.length) },
      { label: "Oddments", value: String(otherAchievements.length) },
      { label: "Latest", value: latestYear(roboticsWins) ?? "—" },
      { label: "Earliest", value: earliestYear(roboticsWins) ?? "—" },
    ],
    winsSectionEyebrow: "Robotics photos · from CCA",
    winsSectionTitle: {
      pre: "Same photos as the ",
      linkLabel: "CCA page",
      post: ", captions filled in.",
    },
    winsSectionCta: "Read about the CCA work",
    winsSectionCaption: { org: cca.name, role: cca.role },
    oddmentsEyebrow: "// The oddments",
    ifYouWantMoreEyebrow: "// if you want more",
    ifYouWantMoreBody: "Got wins I missed? Add a row in ",
  },

  hobbies: {
    // Browser tab + search snippet for /hobbies.
    metaTitle: "Hobbies",
    metaDescription: "Piano and swimming. The two hobbies that keep the soldering iron from getting all of me.",
    heroEyebrow: "04 · hobbies",
    heroTitle: {
      pre: "The two things I do ",
      accent: "without",
      post: " a laptop.",
    },
    heroSubtitle:
      "Most of my week is signal wires, schematics and Python scripts. These two things keep the rest of it honest. No tutorials, no deliverables, just repetition and the occasional time on the clock.",
    chips: [
      { label: "First hobby", value: hobbies[0]?.tag?.toLowerCase() ?? "—" },
      { label: "Second hobby", value: hobbies[1]?.tag?.toLowerCase() ?? "—" },
      { label: "Cadence", value: "Most weeks" },
    ],
    bottomNote: "Aside from these, the rest of my week's a soldering iron and a terminal window. Not complaining.",
  },

  contact: {
    heroEyebrow: "05 · contact",
    heroTitle: {
      pre: "",
      accent: "Email",
      post: " or phone, whichever is faster.",
    },
    heroSubtitle:
      "Direct contact is at the top. If you'd rather write it out, the form below posts to my server and gives you a reference ID back.",
    chips: [
      { label: "Email", value: identity.email },
      { label: "Phone", value: identity.phone },
      { label: "School", value: identity.school },
      { label: "Best for", value: "Builds, CCA, tips" },
    ],
    emailHint: "Usually within a day or two. CCA build season gets slower.",
    phoneHint: "SMS or call, both fine. School hours best.",
    contextEyebrow: "// somewhere else",
    contextLines: [
      { label: "school", value: identity.school },
      { label: "cca", value: `Robotics CCA · ${cca.role.replace(/^Member · /, "")}` },
      { label: "looking for", value: "internship ideas, mentor chats, CCA sponsors" },
    ],
    formEyebrow: "// or write it out",
    submitIdle: "TRANSMIT →",
    submitSending: "SENDING…",
    submitSent: "SENT ✓",
    formEndpointLabel: "// endpoint ",
    formValidationError: "All fields are needed.",
    backCta: "← Back to home",
    typedFromScratchLabel: "// typed from scratch · ",
  },
};

// =============================================================
// Hero centerpiece oscilloscope labels. Edit if you want the
// scope face to read something else.
// =============================================================
export const heroScopeLabels = {
  topLeft: "SCOPE · 50ms/div",
  topRight: "ARM.tty",
  bottomLeft: "FREQ · 44Hz",
  bottomRight: "AMP · 0.55",
};

// =============================================================
// Build credits shown in the footer. Edit text here to change
// what's listed. The year is auto-filled at render time.
// =============================================================
export const buildStack = [
  "Next.js · 14 (App Router)",
  "Tailwind · 3.4",
  "Framer Motion · 11",
];

// =============================================================
// Small helpers that compute things from the data. Don't edit.
// =============================================================
function latestYear(rows: { year: number | string }[]): string | undefined {
  const numeric = rows
    .map((r) => Number(r.year))
    .filter((n) => Number.isFinite(n));
  if (numeric.length === 0) return undefined;
  return String(Math.max(...numeric));
}
function earliestYear(rows: { year: number | string }[]): string | undefined {
  const numeric = rows
    .map((r) => Number(r.year))
    .filter((n) => Number.isFinite(n));
  if (numeric.length === 0) return undefined;
  return String(Math.min(...numeric));
}
function hbbTitle(hobbies: { tag: string }[]): string {
  return hobbies.map((h) => h.tag.toLowerCase()).join(" and ");
}
function hbbBody(hobbies: { tag: string; body: string }[]): string {
  if (hobbies.length === 0) return "";
  if (hobbies.length === 1) return hobbies[0].body;
  return `${hobbies[0].body} ${hobbies[hobbies.length - 1].body}`;
}
