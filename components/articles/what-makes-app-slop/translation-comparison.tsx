"use client"

import { useState } from "react"
import { motion, MotionConfig } from "framer-motion"

const options = [
  { label: "Spanish", phrases: ["Te amo", "Te quiero", "Te adoro"] },
  { label: "English", phrases: ["I love you", "I love you", "I adore you"] },
  { label: "English with context", phrases: ["I love you (romantic)", "I love you (mostly platonic)", "I adore you"] },
] as const

export function TranslationComparison() {
  const [selected, setSelected] = useState(0)
  return (
    <MotionConfig reducedMotion="user">
      <figure className="my-4 rounded-2xl bg-muted/40 px-4 py-8 sm:px-8">
        <div aria-live="polite" aria-atomic="true" className="flex min-h-52 flex-col items-center justify-center gap-4 text-center">
          {options[selected].phrases.map((phrase, index) => (
            <motion.p key={index} initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.25 }} className="font-serif text-xl sm:text-2xl">
              {phrase}
            </motion.p>
          ))}
        </div>
        <div role="group" aria-label="Translation version" className="mt-8 grid grid-cols-3 gap-2">
          {options.map((option, index) => (
            <button key={option.label} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}
              className={`rounded-lg px-2 py-3 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:text-sm ${selected === index ? "bg-foreground text-background" : "bg-background text-foreground hover:bg-muted"}`}>
              {option.label}
            </button>
          ))}
        </div>
      </figure>
    </MotionConfig>
  )
}
