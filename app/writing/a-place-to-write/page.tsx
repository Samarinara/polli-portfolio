import type { Metadata } from "next"
import { posts } from "@/data/posts"

const post = posts.find((post) => post.href === "/writing/a-place-to-write")!

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
}

export default function PostPage() {
  return (
    <article className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
        <time dateTime={post.date} className="text-xs text-muted-foreground">
          {post.date}
        </time>
      </header>
      <p className="text-base leading-relaxed text-muted-foreground">
        A small space for things I learn while building. More soon.
      </p>
    </article>
  )
}
