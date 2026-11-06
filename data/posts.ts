export interface Post {
  title: string
  description: string
  date: string
  href: `/writing/${string}`
}

export const posts: Post[] = [
  {
    title: "We Shouldn't Settle for Slop",
    description: "Generated interfaces can look great in demos, but what makes these apps slop?",
    date: "2026-11-05",
    href: "/writing/what-makes-app-slop",
  },
  {
    title: "A place to write",
    description: "A first post.",
    date: "2026-10-21",
    href: "/writing/a-place-to-write",
  },
]
