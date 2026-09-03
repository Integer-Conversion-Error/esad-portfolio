// Single source of truth for portfolio content.
// Personal info mirrored verbatim from /root/projects/Resume/resume.json.
// Project narratives are original prose synthesized from that source.

export type LinkSet = {
  linkedin: string;
  github: string;
};

export type Personal = {
  name: string;
  givenName: string;
  surname: string;
  tagline: string;
  status: string;
  location: string;
  email: string;
  links: LinkSet;
  languagesSpoken: Array<{ name: string; level: string }>;
};

export type Experience = {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  year: number;
  highlights: string[];
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  narrative: string;
  year: string;
  stack: string[];
  role: string;
  visualHint:
    | "raindropticon"
    | "raindrop-web"
    | "home-intercom"
    | "parkopticon"
    | "put-it-down"
    | "legend-flooring";
  url?: string;
  github?: string;
};

export type SmallProject = {
  slug: string;
  index: string;
  title: string;
  description: string;
  role: string;
  duration: string;
  stack: string[];
  github?: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export const personal: Personal = {
  name: "Esad Kaya",
  givenName: "Esad",
  surname: "Kaya",
  tagline: "I build software I can maintain.",
  status: "Ottawa, Canada · Available Summer 2027",
  location: "Ottawa, ON, Canada",
  email: "ekaya064@uottawa.ca",
  links: {
    linkedin: "https://www.linkedin.com/in/esad-kaya-28b400215/",
    github: "https://github.com/Integer-Conversion-Error",
  },
  languagesSpoken: [
    { name: "English", level: "Native" },
    { name: "Turkish", level: "Native" },
    { name: "French", level: "Intermediate" },
    { name: "Russian", level: "Elementary" },
  ],
};

const yearOf = (dates: string): number => {
  const match = dates.match(/(\d{4})/);
  return match ? parseInt(match[1], 10) : 0;
};

export const experience: Experience[] = [
  {
    role: "Software Engineer Intern",
    company: "Entrust",
    location: "Ottawa, ON, Canada",
    start: "May 2026",
    end: "Present",
    year: yearOf("May 2026"),
    highlights: [
      "Shipped UI changes to the IDaaS platform with TypeScript and JavaScript on the front end and Java on the back end.",
      "Improved insights and real-time analysis for anonymized customer usage across production systems serving more than 10 million users.",
      "Built an AWS S3 data store for customer-success data with fast lookups and restricted access.",
      "Worked with the team through stand-ups and backlog grooming.",
      "Added a Redis heartbeat that notified customer users within five minutes of a failure.",
      "Wrote Jest mocks and DOM tests to catch regressions before release.",
      "Built an Identity Threat Detection and Response dashboard on Redis with modular components.",
    ],
  },
  {
    role: "Support Engineer Intern",
    company: "Solace",
    location: "Canada",
    start: "Sept 2025",
    end: "Dec 2025",
    year: yearOf("Sept 2025"),
    highlights: [
      "Maintained internal support tools and runbooks for the team.",
    ],
  },
  {
    role: "Software Developer Intern",
    company: "Communications Research Center",
    location: "Canada",
    start: "Jan 2025",
    end: "April 2025",
    year: yearOf("Jan 2025"),
    highlights: [
      "Built cross-platform PyQt tools for radar analysis. Cut investigator setup time by 98% and startup time by 95%.",
      "Parallelized Python data pipelines for visualizations. Reduced one report from an overnight run to under four hours.",
      "Wrote a setup script generator so researchers could reproduce experiments without engineering help.",
    ],
  },
  {
    role: "Student Junior Business Analyst",
    company: "HR – Infrastructure Canada",
    location: "Ottawa, ON",
    start: "May 2024",
    end: "Aug 2024",
    year: yearOf("May 2024"),
    highlights: [
      "Prototyped Power BI dashboards with DAX measures for senior directors across HR datasets.",
      "Cleaned and standardized data with Power Query, removing missing-value friction in recurring reports.",
      "Built reports that made pipeline bottlenecks visible.",
    ],
  },
  {
    role: "Technical Support Officer",
    company: "Raindrop Janitorial Services Corp.",
    location: "Ottawa, ON",
    start: "Jan 2020",
    end: "Present",
    year: yearOf("Jan 2020"),
    highlights: [
      "Maintained the head office's hardware and network.",
      "Ran QuickBooks payroll for more than 50 employees and maintained the supporting systems.",
      "Rebuilt the company marketing site in Next.js and am building an internal workforce-management system in React and Node.js.",
    ],
  },
];

export const leadProjects: Project[] = [
  {
    slug: "raindropticon",
    title: "Raindropticon",
    subtitle: "Workforce management with geofenced clock-ins.",
    narrative:
      "I built this for a janitorial company with about fifty crews across Ottawa. The main requirement was that a clock-in had to be tied to a real location. Each clock-in is checked against a PostGIS polygon, so supervisors can see whether a worker was on site. The backend uses NestJS, GraphQL, Prisma, and PostGIS. The admin dashboard is React; the field app is React Native with Expo and is designed to keep working when LTE is unreliable. CI runs unit and end-to-end tests on every merge. A Gemini Vision check reviews task-completion photos so supervisors have more context than a thumbnail.",
    year: "Nov 2025 — Present",
    role: "Solo founder & full-stack engineer",
    stack: ["NestJS", "GraphQL", "Prisma", "PostGIS", "React", "React Native", "Expo"],
    visualHint: "raindropticon",
    url: "https://www.raindropticon.com",
  },
  {
    slug: "home-intercom",
    title: "Home Intercom",
    subtitle: "A local network intercom for the house.",
    narrative:
      "I built two ESP32-S3 room stations and a Dockerized hub for my home network. WebSocket carries control messages; raw UDP carries 16 kHz PCM audio for push-to-talk. A broadcast mode sends a call to every station. The system runs locally with no accounts or cloud service. I built it because I wanted a simple intercom for my mom, and because the audio path was a useful embedded-systems problem.",
    year: "May 2026",
    role: "Firmware + backend",
    stack: ["ESP32-S3", "Docker", "WebSocket", "UDP", "C++"],
    visualHint: "home-intercom",
  },
  {
    slug: "parkopticon",
    title: "Parkopticon",
    subtitle: "A real-time street-parking map with enforcement alerts.",
    narrative:
      "I built a React Native and Expo app for sharing open parking spots and nearby enforcement activity. Drivers can add pins, and the app can notify people parked in the same zone. A separate in-car device uses an Orange Pi 5, ESP32-S3, camera, mmWave radar, and a quantized YOLOv8 model to collect some of that data. It draws under 50 Wh overnight, so it can remain in a parked car over a weekend without draining the battery. The app and device use the same pin and geofence model.",
    year: "Nov 2025",
    role: "Mobile + edge-AI",
    stack: ["React Native", "Expo", "YOLOv8", "ONNX", "ESP32-S3", "Orange Pi"],
    visualHint: "parkopticon",
    github: "https://github.com/Integer-Conversion-Error/park-opticon",
  },
  {
    slug: "put-it-down",
    title: "Put It Down",
    subtitle: "A desktop focus monitor using head-pose tracking.",
    narrative:
      "I built this to understand how much time I spend looking at a screen, a phone, or something else. MediaPipe provides the face mesh; OpenCV turns it into a head-pose vector. The app compares that signal with the active window and records the result. A pie chart summarizes the time, and a block list manages distracting applications. Tkinter keeps the interface small, while tracking runs on a separate thread.",
    year: "May 2025",
    role: "Solo developer",
    stack: ["Python", "MediaPipe", "OpenCV", "Tkinter"],
    visualHint: "put-it-down",
    github: "https://github.com/Integer-Conversion-Error/put-it-down",
  },
  {
    slug: "legend-flooring",
    title: "Legend Flooring",
    subtitle: "A production flooring site with supplier data and private deployment.",
    narrative:
      "I built this marketing site for an Ottawa flooring company. The frontend is a Vite and TypeScript SPA; the API uses Express and SQLite; supplier scrapers update the catalog overnight. The admin diff view shows which supplier records changed during the latest sync.",
    year: "Jul 2026 — Present",
    role: "Full-stack & DevOps",
    stack: ["Vite", "TypeScript", "Express", "SQLite", "Cloudflare"],
    visualHint: "legend-flooring",
  },
  {
    slug: "raindrop-web",
    title: "raindropjanitorial.com",
    subtitle: "A Next.js rebuild for search and answer engines.",
    narrative:
      "I rebuilt Raindrop Janitorial's marketing site from PHP in Next.js. I handle the build, technical SEO, and answer-engine content. The site uses static App Router output, route metadata, JSON-LD on service and area pages, a sitemap, robots rules, and an llms.txt file. The goal is to make the company easy to find when people search for commercial cleaning in Ottawa, including through answer engines.",
    year: "Sep 2025 — Present",
    role: "Solo build (design, code, SEO/GEO)",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "JSON-LD"],
    visualHint: "raindrop-web",
    url: "https://www.raindropjanitorial.com",
  },
];

export const smallProjects: SmallProject[] = [
  {
    slug: "budg-it",
    index: "01 / 03",
    title: "Budg-It",
    description:
      "A budgeting tool with receipt reading and an AI chat service. FastAPI handles the backend, Firebase handles authentication, and Gemini 2.0 provides the budget conversation.",
    role: "Developer",
    duration: "Mar 2025",
    stack: ["Python", "FastAPI", "Gemini", "Firebase"],
    github: "https://github.com/Integer-Conversion-Error/Budg-It",
  },
  {
    slug: "notesplicer",
    index: "02 / 03",
    title: "Notesplicer",
    description:
      "RAG over personal notes. LiteLLM routes requests between Gemini and Deepseek; ChromaDB stores embeddings. Model selection is configured in one place.",
    role: "Solo developer",
    duration: "Jul — Nov 2025",
    stack: ["LiteLLM", "ChromaDB", "Gemini", "Deepseek"],
    github: "https://github.com/Integer-Conversion-Error/Note-Splicer",
  },
  {
    slug: "autoscraper",
    index: "03 / 03",
    title: "AutoScraper (Kaya Auto)",
    description:
      "Marketplace for vehicle listings. Python scrapers run concurrently, Firebase stores the data, and Gemini flags listings whose prices look unusual.",
    role: "Solo developer",
    duration: "Dec 2024 — Jun 2025",
    stack: ["Python", "Flask", "Firebase", "Gemini"],
    github: "https://github.com/Integer-Conversion-Error/AutoScraper",
  },
];

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "Java", "C/C++", "SQL", "DAX", "PHP", "Go", "Rust", "Lisp (Racket)"],
  },
  {
    label: "Frameworks & Web",
    items: ["React", "React Native", "Expo", "Node.js", "NestJS", "Spring Boot", "Flask", "GraphQL", "REST", "Tailwind", "Jest"],
  },
  {
    label: "Data & AI",
    items: ["NumPy", "Pandas", "Scikit-learn", "TensorFlow", "ONNX Runtime", "OpenCV", "MediaPipe", "YOLOv8", "Power BI", "Redis"],
  },
  {
    label: "Embedded & Hardware",
    items: ["ESP32", "Orange Pi", "Arduino", "mmWave radar", "LTE modems", "FPGA (Quartus)", "KiCAD", "SolidWorks", "3D printing"],
  },
  {
    label: "DevOps",
    items: ["Docker", "Jenkins", "Bitbucket", "Tailscale", "Git/GitHub", "AWS EC2", "Cloudflare", "Firebase", "Linux", "CI/CD"],
  },
  {
    label: "Other",
    items: ["PyQt", "Tkinter", "Matplotlib", "Playwright", "Selenium", "OCR", "Agile", "UML", "Interpersonal Skills", "Threat Assessment"],
  },
];
