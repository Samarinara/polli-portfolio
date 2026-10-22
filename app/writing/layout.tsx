"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { motion, MotionConfig } from "framer-motion"
import { ThemeToggle } from "@/components/theme-provider"
import { Separator } from "@/components/ui/separator"

export default function WritingLayout({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.main
        className="mx-auto flex min-h-svh max-w-3xl flex-col gap-8 p-8"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="rounded-md text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            ← back
          </Link>
          <ThemeToggle />
        </div>
        <Separator />
        {children}
      </motion.main>
    </MotionConfig>
  )
}
