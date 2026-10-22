export interface Post {
  title: string
  description: string
  date: string
  href: `/writing/${string}`
}

export const posts: Post[] = [
  {
    title: "A place to write",
    description: "A first post.",
    date: "2026-10-21",
    href: "/writing/a-place-to-write",
  },
]
