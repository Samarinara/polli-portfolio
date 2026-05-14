"use client"

import { motion } from "framer-motion"

const checkPathVariants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
}

interface StatusIconProps {
  completed: boolean
}

export function StatusIcon({ completed }: StatusIconProps) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-1.5">
      {completed ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-primary"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path
              d="M5 13l4 4L19 7"
              variants={checkPathVariants}
              initial="hidden"
              animate="visible"
              className="text-primary-foreground"
            />
          </svg>
        </motion.div>
      ) : (
        <motion.div
          initial={{ rotate: 45 }}
          animate={{ rotate: 405 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="h-[22px] w-[22px] rounded-[5px] border-2 border-muted-foreground/60"
        />
      )}
      {completed ? (
        <span className="text-[11px] leading-none text-muted-foreground">
          Completed
        </span>
      ) : (
        <span className="text-[11px] leading-none text-muted-foreground">
          In Progress
        </span>
      )}
    </div>
  )
}
