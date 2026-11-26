// Original public summaries. Keep source evidence and review notes outside the site.
export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  status: string;
  role: string;
  purpose: string;
  contribution: string;
  architecture: string;
  flow: string[];
  flowNote: string;
  challenge: string;
  outcome: string;
  next: string;
  stack: string[];
  url?: string;
  github?: string;
  devpost?: string;
  screenshot?: { src: string; alt: string; width: number; height: number; caption: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "hack-the-nest",
    title: "QuantumLoop",
    summary: "A quantum optimization agent that turns an EV dispatch prompt into a schedule you can replay.",
    status: "Hack the Nest 2026 · team prototype",
    role: "Agent planning and dashboard integration",
    purpose: "An EV fleet has to fit charging stops around delivery deadlines and battery limits. At Hack the Nest, my team built QuantumLoop to turn a plain-English dispatch problem into a solver and show its schedule in the Fleet Lab dashboard.",
    contribution: "I built the Gemini planning loop and connected it to Fleet Lab. I added progress tracking for solver revisions, controls from the approved plan, and browser replay for driving, waiting, charging, and deliveries. I worked with Chenkai Mu, Ehan Hassan, and Maegen Hill.",
    architecture: "The Python pipeline uses Gemini to interpret the prompt, draft a plan, and generate a solver. The EV example encodes dispatch choices for a QAOA circuit on the Quantum Rings simulator. After verification, a JSON handoff gives Fleet Lab the timed routes, cost breakdown, and adjustable settings.",
    flow: ["Dispatch prompt → Gemini plan", "Generated solver → circuit simulation and checks", "Verified schedule → Fleet Lab replay"],
    flowNote: "Fleet Lab uses the same handoff format for fresh and recorded runs.",
    challenge: "Changing a van's starting charge can make a previously valid route infeasible. Fleet Lab reruns the solver with the approved setting and checks the new schedule before updating the map. The progress view keeps earlier attempts and the reasons they were revised.",
    outcome: "In the recorded two-van example, a five-qubit QAOA simulation matched the exact classical reference at $15.78. Fleet Lab replays the routes and shows how driving, waiting, and charging contributed to that cost.",
    next: "The recorded run can be replayed locally. Starting a fresh prompt-to-solver run requires Gemini and Quantum Rings credentials.",
    stack: ["Python", "Gemini", "Quantum Rings", "Qiskit", "JavaScript", "Pygame"],
    github: "https://github.com/Integer-Conversion-Error/hack-the-nest",
    devpost: "https://devpost.com/software/quantumloop",
    screenshot: {
      src: "/images/hack-the-nest-fleet-lab.webp",
      alt: "Fleet Lab shows two delivery routes, a charging stop, the replay timeline, and the $15.78 total cost.",
      width: 1100,
      height: 1045,
      caption: "Fleet Lab paused at 08:36 in the recorded two-van dispatch run.",
    },
  },
  {
    slug: "home-intercom",
    title: "Home Intercom",
    summary: "Room-to-room audio on the home network, with a wall-station board in progress.",
    status: "Prototype · PCB placement complete; routing pending",
    role: "Hub, firmware integration, and board layout",
    purpose: "I wanted a simple intercom for my family. A room station should let someone select a room, hold a button to talk, or broadcast to the house. The audio stays on the local network.",
    contribution: "I built the Node.js hub and the control/audio split for ESP32-S3 stations. I also worked on the KiCad wall-panel layout, correcting breakout-module footprints and arranging the display, microphone, push-to-talk button, and volume control around how someone would use them.",
    architecture: "WebSocket carries registration and room state. UDP carries PCM audio through the hub to a selected station or broadcast targets. Keeping those paths separate lets the control channel report offline or muted rooms while the audio path stays small. Docker packages the hub.",
    flow: ["ESP32-S3 room station", "Local hub · control + audio", "Selected room or broadcast"],
    flowNote: "The wall-station PCB is a separate hardware workstream within this project.",
    challenge: "The board needed to represent real module dimensions. Placement checks caught collisions between front controls and rear components; I repositioned those parts and refilled the ground zone.",
    outcome: "The hub implements room registration, push-to-talk routing, and broadcast. The board placement review resolved placement-created clearance problems; the PCB is still unrouted.",
    next: "Routing, enclosure design, and assembled-board validation remain. I haven't measured end-to-end audio latency.",
    stack: ["ESP32-S3", "C++", "Node.js", "WebSocket", "UDP", "Docker", "KiCad"],
  },
  {
    slug: "legend-flooring",
    title: "Legend Flooring",
    summary: "A flooring catalogue that turns a shortlist into a quote request.",
    status: "Live business website",
    role: "Full-stack development and deployment",
    purpose: "Customers need to compare flooring and ask for a quote before committing to an installation. I built an Ottawa flooring company's marketing site around that workflow: browse products, save a shortlist, and send the selection with an enquiry.",
    contribution: "I built the TypeScript frontend, Express API, and SQLite persistence. I added supplier-catalogue import tooling and the quote/contact workflow, including an email outbox for notifications.",
    architecture: "The browser and API share an origin. Supplier importers return product records to a separate synchronizer, which matches stable supplier identifiers and updates changed content. SQLite stores catalogue data and enquiries. The quote shortlist persists in the browser between visits.",
    flow: ["Supplier catalogues", "Sync + SQLite catalogue", "Browse → shortlist → quote"],
    flowNote: "Quote and contact submissions also persist through the API.",
    challenge: "A supplier refresh can remove a product that an older quote still references. The sync marks missing products as discontinued by default. An outbox records notification work alongside the enquiry so email delivery can be retried.",
    outcome: "The public site is live, with product browsing and a quote-led customer journey. The implementation includes repeatable supplier sync and persisted enquiries.",
    next: "I don't have measured conversion or traffic gains to report.",
    stack: ["Vite", "TypeScript", "Express", "SQLite", "Docker", "Caddy", "Resend"],
    url: "https://legendflooring.ca",
  },
  {
    slug: "raindrop-web",
    title: "Raindrop Janitorial",
    summary: "A Next.js marketing site organized around cleaning services and the places they cover.",
    status: "Live business website",
    role: "Design, development, and technical SEO",
    purpose: "People searching for commercial cleaning need to know whether a company handles their facility and serves their area. I rebuilt Raindrop Janitorial's site around service pages, local area pages, and a clear route to a quote.",
    contribution: "I handled the Next.js rebuild and technical SEO: reusable service-page components, route metadata, canonical URLs, JSON-LD, sitemap generation, and robots rules. The current build replaces the earlier holding-page version.",
    architecture: "Next.js App Router exports static pages. Shared metadata and structured-data utilities keep page identity consistent across service and area routes. React components handle navigation and forms; the content remains readable in the generated HTML.",
    flow: ["Service + area content", "Next.js static export", "Search visitors → enquiry"],
    flowNote: "This marketing site is separate from Raindropticon.",
    challenge: "Adding local landing pages creates repeated metadata and URL decisions. I centralized metadata generation and kept the service and area hierarchy explicit. Static export makes that metadata part of the generated page rather than something a crawler has to wait for JavaScript to add.",
    outcome: "The live site exposes service and area pages, resources, and quote/contact entry points. Static export and search metadata are present in the implementation.",
    next: "Search rankings, answer-engine visibility, and enquiry growth haven't been measured here; those remain goals rather than claimed results.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "JSON-LD", "Static export"],
    url: "https://www.raindropjanitorial.com",
  },
  {
    slug: "kaya-auto",
    title: "Kaya Auto",
    summary: "A vehicle marketplace prototype with a detailed catalogue and separate seller workflows.",
    status: "Development prototype · no public demo verified",
    role: "Frontend, API, and data modelling",
    purpose: "I built a marketplace prototype around makes, models, trims, and configurations, with separate workflows for private sellers and dealerships.",
    contribution: "I built React listing and administration screens, Express routes, and the PostgreSQL catalogue model. The work includes shortlists, listing reports, dealership membership, and tools for maintaining vehicle attributes and configurations.",
    architecture: "A React and TypeScript client calls the Express API. PostgreSQL separates reusable vehicle catalogue records from listings and seller relationships. Administrative screens manage that shared catalogue rather than duplicating specifications inside every listing.",
    flow: ["React buyer + seller views", "Express API", "PostgreSQL catalogue + listings"],
    flowNote: "This marketplace is distinct from the older AutoScraper project.",
    challenge: "Vehicle specifications vary by trim and powertrain. Normalized catalogue records keep those relationships explicit, but require more editing tooling. I added dedicated administration screens for configurations, transmissions, and attributes.",
    outcome: "The repository contains listing workflows, catalogue administration, and the relational schema. It establishes implementation progress, rather than a launched marketplace or verified sales activity.",
    next: "Sponsored listings are documented, but a plan isn't proof of completed payments. Public launch, usage, and transaction results aren't verified.",
    stack: ["React", "TypeScript", "Vite", "Node.js", "Express", "PostgreSQL"],
  },
  {
    slug: "hugging-stocks",
    title: "Hugging Stocks",
    summary: "Experiments comparing news sentiment with patterns in historical stock returns.",
    status: "Personal learning project",
    role: "Data processing, model experiments, and Flask interface",
    purpose: "The project explores news sentiment, historical price regimes, and analyst targets through separate experiments.",
    contribution: "I built Python modules for sentiment scoring and Hidden Markov Model analysis, then exposed the experiments through Flask pages and APIs. The HMM module prepares returns, fits a Gaussian model, and plots inferred states alongside price indicators.",
    architecture: "Data-fetching and analysis modules sit behind a small Flask interface. Hugging Face Transformers scores text sentiment; pandas prepares price data; hmmlearn models return sequences. Matplotlib renders charts for the browser.",
    flow: ["News + historical prices", "Sentiment / HMM experiments", "Flask views + plots"],
    flowNote: "Parallel experiments, not a validated combined forecasting model.",
    challenge: "A sentiment score and a historical regime label answer different questions. I kept them separate so each output could be inspected. Empty-data checks in the HMM path avoid fitting a model when there aren't enough returns.",
    outcome: "The code implements sentiment analysis, historical-state plots, and browser endpoints. The analyst-pricing endpoint is configured to use debug data in the inspected version.",
    next: "I haven't demonstrated out-of-sample prediction accuracy or trading returns. This is an educational experiment, with no public demo verified.",
    stack: ["Python", "Flask", "Transformers", "pandas", "NumPy", "hmmlearn", "Matplotlib", "yfinance"],
  },
  {
    slug: "law-buddy",
    title: "Law-Buddy",
    summary: "Canadian-law ingestion and model-training experiments, with retrieval still unfinished.",
    status: "Research prototype · retrieval and API pending",
    role: "Corpus processing and model-training tooling",
    purpose: "I explored a local legal-research assistant that could connect an answer to the statute sections it used. The first task was turning legal XML into records that retain section identity and source context.",
    contribution: "I wrote XML ingestion, embedding, and fine-tuning scripts. The ingestion step preserves titles, section labels, languages, and sources, and handles repeated section identifiers. Embeddings go into a persistent Chroma store.",
    architecture: "XML becomes section-level JSONL, then sentence embeddings in Chroma. LoRA training and an inference script form a separate model workstream. The intended retrieval-to-answer stage remains unfinished; the retrieval and API files are placeholders.",
    flow: ["Legal XML → section records", "Embeddings → Chroma", "Retrieval + answers · planned"],
    flowNote: "The final stage shows the intended design. It isn't implemented as a complete answer service.",
    challenge: "Repeated section labels need distinct IDs, and model files are large enough for filesystem placement to matter. I added identifier handling and documented native Linux model storage for the WSL training setup.",
    outcome: "The implementation includes section ingestion, batched embedding, and training/inference scripts. It doesn't establish completed retrieval, citation-backed answers, or legal-answer accuracy.",
    next: "Connect retrieval to generation, then evaluate source attribution and answer quality. It's a research prototype, not a legal-advice service.",
    stack: ["Python", "lxml", "Sentence Transformers", "Chroma", "PyTorch", "Transformers", "LoRA", "QLoRA"],
  },
  {
    slug: "home-security-node",
    title: "Home Security Node",
    summary: "An ESP32 camera prototype with browser viewing, telemetry, and recording code.",
    status: "Local development prototype",
    role: "Camera firmware and streaming backend",
    purpose: "I wanted to explore a small camera node that sends images to a local browser viewer. The project combines embedded capture with a server that can track multiple nodes and record their streams.",
    contribution: "I built ESP32-WROVER camera firmware and a Bun/Hono server. Firmware sends JPEG frames and device telemetry over WebSocket. The server forwards frames to viewers and includes recording support through FFmpeg.",
    architecture: "Camera capture stays on the ESP32; the server handles viewer fan-out and recording. Binary frames carry images, while text frames carry telemetry. A bounded recent-frame buffer lets a new viewer catch up without retaining an unbounded image queue.",
    flow: ["ESP32 camera + telemetry", "Local WebSocket hub", "Browser viewer + recordings"],
    flowNote: "The node captures images; the server handles viewing and recording.",
    challenge: "Camera memory and reconnects shape the design. The firmware selects buffers according to PSRAM availability; the hub preserves viewer state when a node reconnects and limits recent-frame retention.",
    outcome: "Current code contains JPEG capture, telemetry, browser viewing, and server-side recording. Hardware uptime and frame-rate results aren't verified.",
    next: "Device validation and production-readiness work remain. I haven't verified remote configuration end to end with the current firmware.",
    stack: ["ESP32-WROVER", "C++", "PlatformIO", "WebSocket", "Bun", "Hono", "FFmpeg", "Docker"],
  },
  {
    slug: "home-media-server",
    title: "Home Media Server",
    summary: "A household media monitor with 21 TB of storage from Facebook Marketplace hard drives.",
    status: "Personal home-server project · no public demo",
    role: "Web console, service integration, and persistence",
    purpose: "I built a browser console to organize the library, manage downloads, and track household requests in one place. The server has 21 TB of storage on hard drives I bought on Facebook Marketplace.",
    contribution: "I built the Express console and service integrations, plus SQLite-backed request tracking. The request workflow records whether an item is open, downloading, or complete. Optional email integration connects notifications and fulfilment to that workflow.",
    architecture: "The browser calls an Express service, which coordinates qBittorrent and the media library. SQLite holds request state across restarts. Local playback uses streaming routes and DLNA-compatible devices; media storage stays separate from application code.",
    flow: ["Browser console + requests", "Express + SQLite", "Download services + local playback"],
    flowNote: "Requests and media-management actions share the same console.",
    challenge: "Download state and request state need to agree without losing a request on restart. I persisted the request lifecycle and linked fulfilment to a download identifier so later progress updates can find the right record.",
    outcome: "The code includes a media monitor, download management, library actions, and persistent request tracking. The project is designed for a home network; no public service or measured streaming reliability is claimed.",
    next: "Playback depends on the configured services and client devices. I haven't published a compatibility benchmark or uptime result.",
    stack: ["Node.js", "Express", "JavaScript", "SQLite", "qBittorrent", "DLNA", "Linux"],
  },
];

export const caseStudyHref = (slug: string) => `/projects/${slug}/`;
