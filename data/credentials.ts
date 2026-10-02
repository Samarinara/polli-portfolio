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
    highlight: true,
  },
  {
    title: "polli.page",
    description:
      "A search engine with a new take on the internet. Get to your destination with no ads, no lag, and no friction",
    category: "project",
    completed: true,
    date: "2025 - 2026",
    href: "https://polli.page",
    highlight: false,
  },
  {
    title: "Bachelor's in Software Engineering",
    description:
      "University of Calgary — Specialized in product development with a minor in Biomedical Engineering",
    category: "education",
    completed: false,
    date: "2025 - Present",
  },
  {
    title: "Cargo TUI",
    description:
      "An terminal user interface for managing Rust projects without memorizing cargo commands. It is written is Rust and uses Ratatui",
    category: "project",
    href: "https://github.com/Samarinara/cargotui",
    completed: true,
    date: "2026",
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
    title: "AI Model Training",
    description:
      "I am experimenting in training smaller language models using pytorch that can run on common conusmer hardware.",
    category: "project",
    completed: false,
    date: "2024 - Present",
    href: "https://github.com/Samarinara/small-language-training",
  },
  {
    title: "University of Calgary Course Web",
    description:
      "An unofficial tool to help engineering students at the University of Calgary learn their course requirements.",
    category: "project",
    href: "https://ucalgary-courseweb.vercel.app/",
    completed: true,
    date: "2026",
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
    completed: false,
    href: "https://beagle-edgar.vercel.app/",
    date: "2026 - present",
  },
]
