"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { AnimatePresence, motion, animate } from "framer-motion"

import { PortfolioHeader } from "@/components/portfolio-header"
import { FilterBar } from "@/components/filter-bar"
import { TodoItem } from "@/components/todo-item"
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
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
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
      <motion.div variants={fadeInUp}>
        <PortfolioHeader />
      </motion.div>
      <motion.div variants={fadeInUp}>
        <Separator />
      </motion.div>
      <motion.div variants={fadeInUp}>
        <FilterBar active={filter} onChange={setFilter} />
      </motion.div>
      <motion.div
        variants={fadeInUp}
        className="flex items-center justify-between text-sm text-muted-foreground"
      >
        <span>
          Showing <AnimatedCounter value={filtered.length} /> of {totalCount}{" "}
          items
        </span>
      </motion.div>
      <motion.div variants={fadeInUp}>
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="flex flex-col gap-2"
        >
          <AnimatePresence mode="popLayout">
            {filtered.length > 0
              ? filtered.map((item) => (
                  <motion.div
                    key={item.id}
                    layout="position"
                    variants={itemVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <TodoItem
                      title={item.title}
                      description={item.description}
                      category={item.category}
                      checked={item.completed}
                      date={item.date}
                      href={item.href}
                      highlight={item.highlight}
                    />
                  </motion.div>
                ))
              : (
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
