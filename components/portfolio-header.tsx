import { useState, useEffect, type ReactElement } from "react"
import { FiMail, FiCheck } from "react-icons/fi"
import { FaGithub, FaTwitter } from "react-icons/fa"
import { SiBluesky } from "react-icons/si"
import { motion, AnimatePresence } from "framer-motion"

import { ThemeToggle } from "@/components/theme-provider"
import { BlogPreview } from "@/components/blog-preview"

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string
  label: string
  icon: ReactElement
}) {
  return (
    <div className="group relative">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-muted"
        aria-label={label}
      >
        {icon}
      </a>
      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-75 rounded-md bg-popover px-2 py-1 text-xs whitespace-nowrap text-popover-foreground opacity-0 shadow-sm transition-all group-hover:scale-100 group-hover:opacity-100">
        {label}
      </span>
    </div>
  )
}

function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(timeout)
    }
  }, [copied])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
    } catch (err) {
      console.error("Failed to copy email:", err)
    }
  }

  return (
    <div className="group relative">
      <button
        onClick={handleCopy}
        className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-muted focus:outline-none"
        aria-label={copied ? "Email copied" : "Copy email address"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.div
              key="check"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <FiCheck className="size-4 text-green-500" />
            </motion.div>
          ) : (
            <motion.div
              key="mail"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <FiMail className="size-4 text-muted-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-75 rounded-md bg-popover px-2 py-1 text-xs whitespace-nowrap text-popover-foreground opacity-0 shadow-sm transition-all group-hover:scale-100 group-hover:opacity-100">
        {copied ? "Copied!" : email}
      </span>
    </div>
  )
}

export function PortfolioHeader() {
  return (
    <header className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Hey there!<br></br> I&apos;m Sam Katevatis
        </h1>
        <ThemeToggle />
      </div>
      <p className="text-base text-muted-foreground">
        I&apos;m a backend dev and Ui designer living in Calgary.
      </p>
      <div className="flex items-start justify-between gap-4">
        <BlogPreview />
        <div className="flex shrink-0 justify-end gap-1">
          <CopyEmailButton email="sam@katevatis.com" />
          <SocialLink
            href="https://github.com/Samarinara"
            label="@Samarinara"
            icon={<FaGithub className="size-4 text-muted-foreground" />}
          />
          <SocialLink
            href="https://samarinara.bsky.social"
            label="@samarinara.bsky.social"
            icon={<SiBluesky className="size-4 text-muted-foreground" />}
          />
          <SocialLink
            href="https://x.com/_samarinara"
            label="@_samarinara"
            icon={<FaTwitter className="size-4 text-muted-foreground" />}
          />
        </div>
      </div>
    </header>
  )
}
