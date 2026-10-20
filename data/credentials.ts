export type CredentialCategory = "project" | "experience" | "education"

export interface Credential {
  title: string
  description: string
  category: CredentialCategory
  completed: boolean
  date?: string
  href?: string
  highlight?: boolean
}

export const credentials: Credential[] = [
  {
    title: "brownbag",
    description:
      "A social network for sharing, saving, and discovering recipes federated over the AT protocol. ",
    category: "project",
    completed: false,
    date: "2026 - Present",
    href: "https://brownbag.polli.page",
    highlight: false,
  },
  {
    title: "Bachelor's in Software Engineering",
    description:
      "University of Calgary — Socond Year",
    category: "education",
    completed: false,
    date: "2025 - Present",
  },
  {
    title: "polli.page",
    description:
      "A search engine that goes to the best site instead of listing results. No ads, no lag, and no friction",
    category: "project",
    completed: true,
    date: "2025 - 2026",
    href: "https://polli.page",
    highlight: false,
  },
  {
    title: "UCalgary Schulich on a Chip Club",
    description:
      "Part of the software team at Schulich on a Chip, a club focused on designing and manufacturing custom processors.",
    category: "experience",
    completed: false,
    href: "https://schulichonachip.ca/",
    date: "2025 - Present",
  },
  {
    title: "Cargo TUI",
    description:
      "A terminal user interface for managing Rust projects without memorizing cargo commands. It is written is Rust and uses Ratatui",
    category: "project",
    href: "https://github.com/Samarinara/cargotui",
    completed: true,
    date: "2026",
  },
  {
    title: "CISCO Endpoint Security Certificate",
    description:
      "A 27 hour online course building the skills to secure a network, keep data confidential, and manage IOT devices.",
    category: "education",
    href: "https://www.netacad.com/courses/endpoint-security",
    completed: true,
    date: "2025",
  },
  {
    title: "Topix",
    description:
      "The best notes app for random thoughts using innovative UI to get your ideas down faster. Topix was built in React Native and is currently in alpha on Android.",
    category: "project",
    href: "https://topix.polli.page/",
    completed: false,
    date: "2026",
  },
  {
    title: "Cyber Patriot Platinum Tier",
    description:
      "Reached Platinum Tier in CyberPatriot for two consecutive years, placing among the top 10% of Canadian teams.",
    category: "experience",
    completed: true,
    date: "2024 - 2025",
  },
  {
    title: "Corgi",
    description:
      "A small web interface for editing a Neo4j database. This is designed to make it simple for non-technical team members to edit the graph data.",
    category: "project",
    completed: false,
    href: "https://corgi.polli.page",
    date: "2026 - present",
  },
  {
    title: "Young Defenders of the North Winner",
    description:
      "First place in the Young Defenders of the North Hack-a-thon, focused on digital forensics and real-time adaptaility.",
    category: "experience",
    completed: true,
    date: "2025",
  },
  {
    title: "Beagle",
    description:
      "A small web interface for reading through SEC filings with EDGAR. There are also Ai features to extract data in cleaner formats.",
    category: "project",
    completed: true,
    href: "https://beagle-edgar.vercel.app/",
    date: "2026",
  },
]
