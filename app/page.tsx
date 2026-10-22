"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { AnimatePresence, motion, animate } from "framer-motion"

import { PortfolioHeader } from "@/components/portfolio-header"
import { FilterBar } from "@/components/filter-bar"
import { TodoItem } from "@/components/todo-item"
import { WritingFlip } from "@/components/writing-flip"
import { posts } from "@/data/posts"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { credentials, type CredentialCategory } from "@/data/credentials"

const pageVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const fadeInUp = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
}

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  initial: { opacity: 0, y: 12, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: -8,
    transition: { duration: 0.15, ease: "easeIn" as const },
  },
}

function AnimatedCounter({ value }: { value: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = nodeRef.current
    if (!node) return

    const controls = animate(Number(node.textContent), value, {
      duration: 0.4,
      ease: "easeOut",
      onUpdate: (v) => {
        node.textContent = String(Math.round(v))
      },
    })

    return () => controls.stop()
  }, [value])

  return <span ref={nodeRef}>{value}</span>
}

export default function Page() {
  const [writing, setWriting] = useState(false)
  const [sort, setSort] = useState<"newest" | "oldest" | "title">("newest")
  const sortedPosts = useMemo(
    () =>
      [...posts].sort((a, b) =>
        sort === "title"
          ? a.title.localeCompare(b.title)
          : sort === "newest"
            ? b.date.localeCompare(a.date)
            : a.date.localeCompare(b.date)
      ),
    [sort]
  )
  const [filter, setFilter] = useState<CredentialCategory | "all">("all")

  const filtered = useMemo(
    () =>
      filter === "all"
        ? credentials
        : credentials.filter((item) => item.category === filter),
    [filter]
  )

  const totalCount = credentials.length

  return (
    <motion.div
      className="mx-auto flex min-h-svh max-w-3xl flex-col gap-8 p-8"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div layout variants={fadeInUp}>
        <PortfolioHeader
          writing={writing}
          onToggleWriting={() => setWriting((value) => !value)}
        />
      </motion.div>
      <motion.div layout variants={fadeInUp}>
        <Separator />
      </motion.div>
      <motion.div layout variants={fadeInUp}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={writing ? "writing-controls" : "credential-controls"}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
          >
            {writing ? (
              <div role="group" aria-label="Sort posts" className="flex gap-2">
                {(["newest", "oldest", "title"] as const).map((value) => (
                  <motion.div key={value} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant={sort === value ? "default" : "outline"}
                      size="sm"
                      aria-pressed={sort === value}
                      onClick={() => setSort(value)}
                    >
                      {value === "newest"
                        ? "Newest"
                        : value === "oldest"
                          ? "Oldest"
                          : "Title"}
                    </Button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <FilterBar active={filter} onChange={setFilter} />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <motion.div
        layout
        variants={fadeInUp}
        className="flex items-center justify-between text-sm text-muted-foreground"
      >
        <span aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={writing ? "posts-count" : "credentials-count"}
              className="inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {writing ? (
                <>
                  {posts.length} {posts.length === 1 ? "post" : "posts"}
                </>
              ) : (
                <>
                  Showing <AnimatedCounter value={filtered.length} /> of{" "}
                  {totalCount} items
                </>
              )}
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.div>
      <motion.div variants={fadeInUp}>
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          id="portfolio-items"
          className="flex flex-col gap-2"
        >
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 || (writing && posts.length > 0) ? (
              Array.from(
                { length: Math.max(filtered.length, posts.length) },
                (_, index) => {
                  const item = filtered[index]
                  return (
                    <motion.div
                      key={item ? credentials.indexOf(item) : `post-${index}`}
                      layout="position"
                      variants={itemVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <WritingFlip
                        writing={writing}
                        post={sortedPosts[index]}
                        index={index}
                      >
                        {item && (
                          <TodoItem
                            title={item.title}
                            description={item.description}
                            category={item.category}
                            checked={item.completed}
                            date={item.date}
                            href={item.href}
                            highlight={item.highlight}
                          />
                        )}
                      </WritingFlip>
                    </motion.div>
                  )
                }
              )
            ) : (
              <motion.div
                key="empty"
                variants={itemVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col items-center gap-2 py-16 text-sm text-muted-foreground"
              >
                <svg
                  className="size-8 opacity-40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <span>No items in this category.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
