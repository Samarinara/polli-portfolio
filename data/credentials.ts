export type CredentialCategory = "project" | "experience" | "education"

export interface Credential {
  id: string
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
    id: "1",
    title: "polli.page",
    description:
      "A search engine with a new take on the internet. Get to your destination with no ads, no lag, and no friction",
    category: "project",
    completed: false,
    date: "2025 - Present",
    href: "https://polli.page",
    highlight: true,
  },
  {
    id: "2",
    title: "Bachelor's in Software Engineering",
    description:
      "University of Calgary — Specialized in product development with a minor in Biomedical Engineering",
    category: "education",
    completed: false,
    date: "2025 - Present",
  },
  {
    id: "3",
    title: "Cargo TUI",
    description:
      "An terminal user interface for managing Rust projects without memorizing cargo commands. It is written is Rust and uses Ratatui",
    category: "project",
    href: "https://github.com/Samarinara/cargotui",
    completed: true,
    date: "2026",
  },
  {
    id: "4",
    title: "Power Hour",
    description:
      "A minimal payroll tracking app for contractors that logs hours and generates invoices. Built using Next JS",
    category: "project",
    completed: true,
    date: "2020 - 2022",
  },
  {
    id: "5",
    title: "The Nex Look Portfolio",
    description:
      "A bold site to showcase the work of makeup artist Nex Zimelstern. Built with Next JS, UploadThing, and Turso.",
    category: "project",
    href: "https://thenexlook.vercel.app/",
    completed: true,
    date: "2026",
  },
  {
    id: "6",
    title: "AI Model Training",
    description:
      "I am experimenting in training smaller language models using pytorch that can run on common conusmer hardware.",
    category: "project",
    completed: false,
    date: "2024 - Present",
    href: "https://github.com/Samarinara/small-language-training",
  },
  {
    id: "7",
    title: "University of Calgary Course Web",
    description:
      "An unofficial tool to help engineering students at the University of Calgary learn their course requirements.",
    category: "project",
    href: "https://ucalgary-courseweb.vercel.app/",
    completed: true,
    date: "2026",
  },
  {
    id: "8",
    title: "Cyber Patriot Platinum Tier",
    description:
      "Reached Platinum Tier in CyberPatriot for two consecutive years, placing among the top 10% of Canadian teams.",
    category: "experience",
    completed: true,
    date: "2024 - 2025",
  },
  {
    id: "9",
    title: "Lilypad Browser",
    description:
      "An early stage web browser built with Qt and C++ that builds on top of the search features in polli.page. It focuses on clean Ui and local AI models.",
    category: "project",
    completed: false,
    href: "https://github.com/Samarinara/lilypad",
    date: "2026 - present",
  },
  {
    id: "10",
    title: "Young Defenders of the North Winner",
    description:
      "First place in the Young Defenders of the North Hack-a-thon, focused on digital forensics and real-time adaptaility.",
    category: "experience",
    completed: true,
    date: "2025",
  },
]
