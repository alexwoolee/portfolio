const placeholderImageUrl = "/projects/image-placeholder.png"

export type ProjectItem = {
  id: number
  slug: string
  authors: string[] 
  imageUrl: string 
  title: string 
  description: string 
  links?: { githubUrl?: string, figmaUrl?: string, liveUrl?: string } 
  status: "completed" | "in-progress"
  tags: string[]
}

const projects: ProjectItem[] = [
  {
    id: 1,
    slug: "taiwan-explorers",
    authors: ["Alex Lee", "Ryan Fu", "Ikkyu Li", "Tian Zheng"],
    imageUrl: "/projects/cover-taiwan.png",
    title: "Taiwan Explorers",
    description: "A full-stack travel platform helping users discover and book hidden gems in Taiwan. Features interactive maps, real-time itinerary planning, and a robust backend to handle user reviews and bookings.",
    links: { 
      liveUrl: "https://taiwanexplorers.onrender.com/",
    },
    status: "in-progress",
    tags: ["Web Apps"]
  },
  {
    id: 2,
    slug: "high-performance-load-balancer",
    authors: ["Alex Lee"],
    imageUrl: placeholderImageUrl,
    title: "High-Performance Load Balancer",
    description: "A multithreaded Layer 7 load balancer capable of handling 10k+ concurrent connections. Implements Round-Robin and Least-Connections algorithms to optimize traffic distribution across microservices.",
    status: "in-progress",
    tags: []
  },
  {
    id: 3,
    slug: "qguard-secure-messenger",
    authors: ["Alex Lee"],
    imageUrl: placeholderImageUrl,
    title: "QGuard Secure Messenger",
    description: "A post-quantum encrypted messaging app ensuring future-proof privacy. Features end-to-end encryption using Kyber algorithms, designed for high security and smooth mobile performance.",
    status: "in-progress",
    tags: []
  },
  {
    id: 4,
    slug: "open-source",
    authors: ["Alex Lee"],
    imageUrl: placeholderImageUrl,
    title: "Open Source Contributions",
    description: "Active contributor to major open-source repositories. Focused on resolving critical bugs, optimizing performance, and collaborating with maintainers to merge production-ready code.",
    status: "in-progress",
    tags: ["Open Source"]
  },
  {
    id: 5,
    slug: "emergency-reporting-system",
    authors: ["Alex L.", "Alexander K.", "Emily T.", "Camille Ng", "Josevan S. Wijaya"],
    imageUrl: "/projects/cover-erm.png",
    title: "Emergency Reporting System",
    description: "Manage and report emergencies efficiently in real time.",
    status: "completed",
    tags: ["Web Apps"]
  },
  {
    id: 6,
    slug: "dearly",
    authors: ["Alex Lee", "Eddie Nguyen", "Ryan Fu", "Kenny Zhang"],
    imageUrl: "/projects/cover-dearly.png",
    title: "Dearly",
    description: "A web application used to format emails to loved ones.",
    status: "in-progress",
    tags: ["Web Apps"]
  },
  {
    id: 7,
    slug: "dogoo",
    authors: ["Alex Lee"],
    imageUrl: "/projects/cover-dogoo.png",
    title: "Dogoo Chat",
    description: "A real-time chat app with AI-powered features.",
    status: "in-progress",
    tags: ["Web Apps"]
  },
  {
    id: 8,
    slug: "journey-of-the-alien-king",
    authors: ["Alex Lee"],
    imageUrl: "/projects/cover-jotak.png",
    title: "Journey of the Alien King",
    description: "A story-driven adventure game with unique alien worlds.",
    status: "in-progress",
    tags: ["Games"]
  },
  {
    id: 9,
    slug: "chip-8-emulator",
    authors: ["Alex Lee"],
    imageUrl: placeholderImageUrl,
    title: "CHIP-8 Emulator",
    description: "Run classic CHIP-8 programs with accurate emulation.",
    status: "in-progress",
    tags: ["Emulator"]
  },
  {
    id: 10,
    slug: "melas",
    authors: ["Alex Lee"],
    imageUrl: placeholderImageUrl,
    title: "Melas",
    description: "A fan-made Undertale-inspired game with unique mechanics.",
    status: "in-progress",
    tags: ["Games"]
  },
  {
    id: 11,
    slug: "google-gemini-ai-itinerary-generator",
    authors: ["Alex Lee"],
    imageUrl: placeholderImageUrl,
    title: "Google Gemini AI Itinerary Generator",
    description: "Generate custom travel plans using AI assistance.",
    status: "in-progress",
    tags: ["Web Apps", "AI"]
  },
  {
    id: 12,
    slug: "dsa-visualizer",
    authors: ["Alex Lee"],
    imageUrl: placeholderImageUrl,
    title: "DSA Visualizer",
    description: "Visualize algorithms and data structures interactively.",
    status: "in-progress",
    tags: []
  },
  {
    id: 13,
    slug: "peko",
    authors: ["Alex Lee"],
    imageUrl: placeholderImageUrl,
    title: "Peko",
    description: "A mobile app built for iOS devices.",
    status: "in-progress",
    tags: ["Mobile Apps"]
  },
  {
    id: 14,
    slug: "ai-companion",
    authors: ["Alex Lee"],
    imageUrl: placeholderImageUrl,
    title: "AI Companion",
    description: "A personalized AI companion app that adapts to user mood, habits, and goals. Features emotional tone detection, memory-based context, and daily check-ins designed to improve wellness, productivity, and connection.",
    status: "in-progress",
    tags: ["Web Apps", "AI"]
  },
];

export default projects;
