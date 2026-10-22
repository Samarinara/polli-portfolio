"use client"

import type { CSSProperties, ReactNode } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { FiEdit3 } from "react-icons/fi"
import type { Post } from "@/data/posts"

export function WritingFlip({
  writing,
  post,
  index,
  children,
}: {
  writing: boolean
  post?: Post
  index: number
  children: ReactNode
}) {
  return (
    <div
      className="writing-flip grid [perspective:1000px]"
      data-writing={writing}
      style={{ "--flip-delay": `${index * 75}ms` } as CSSProperties}
    >
      <div
        className="writing-face writing-front"
        aria-hidden={writing}
        inert={writing}
      >
        {children}
      </div>
      <div
        className="writing-face writing-back"
        aria-hidden={!writing}
        inert={!writing}
      >
        <AnimatePresence mode="wait" initial={false}>
          {post && (
            <motion.div
              key={post.href}
              className="h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Link
                href={post.href}
                className="group flex h-full items-start gap-4 rounded-xl px-4 py-3.5 transition-colors hover:bg-muted/50"
              >
                <FiEdit3
                  aria-hidden="true"
                  className="mt-1 size-5 shrink-0 text-muted-foreground"
                />
                <div className="flex min-w-0 flex-1 flex-col gap-1.5 self-stretch">
                  <span className="text-base font-medium decoration-primary decoration-2 underline-offset-4 group-hover:underline">
                    {post.title}
                  </span>
                  <p className="text-sm text-muted-foreground">
                    {post.description}
                  </p>
                  <time
                    dateTime={post.date}
                    className="mt-auto self-end text-xs text-muted-foreground/60"
                  >
                    {post.date}
                  </time>
                </div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
