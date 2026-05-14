"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { StatusIcon } from "@/components/status-icon"
import type { CredentialCategory } from "@/data/credentials"

const badgeVariant: Record<
  CredentialCategory,
  "default" | "secondary" | "outline" | "ghost"
> = {
  project: "default",
  experience: "secondary",
  education: "outline",
}

const categoryLabel: Record<CredentialCategory, string> = {
  project: "Project",
  experience: "Experience",
  education: "Education",
}

interface TodoItemProps {
  title: string
  description: string
  category: CredentialCategory
  checked: boolean
  date?: string
  href?: string
  highlight?: boolean
}

export function TodoItem({
  title,
  description,
  category,
  checked,
  date,
  href,
  highlight,
}: TodoItemProps) {
  const isExternal = href?.startsWith("http")

  const cardContent = (
    <>
      <StatusIcon completed={checked} />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 self-stretch">
        <div className="flex items-center gap-2">
          <span className="text-base font-medium group-hover:underline decoration-primary decoration-2 underline-offset-4 transition-all duration-200">
            {title}
          </span>
          {href && (
            <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
              {isExternal ? "↗" : "→"}
            </span>
          )}
          <Badge variant={badgeVariant[category]}>
            {categoryLabel[category]}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
        {date && (
          <span className="mt-auto self-end text-xs text-muted-foreground/60">{date}</span>
        )}
      </div>
    </>
  )

  const baseClasses = "flex items-start gap-4 rounded-xl px-4 py-3.5 transition-colors hover:bg-muted/50"
  const clickableClasses = href ? "cursor-pointer group" : ""
  const highlightClasses = highlight ? "animate-ring-pulse" : ""

  const combinedClasses = [baseClasses, clickableClasses, highlightClasses].filter(Boolean).join(" ")

  if (href) {
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={combinedClasses}>
          {cardContent}
        </a>
      )
    }
    return (
      <Link href={href} className={combinedClasses}>
        {cardContent}
      </Link>
    )
  }

  return (
    <div className={combinedClasses}>
      {cardContent}
    </div>
  )
}
