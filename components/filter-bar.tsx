import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { CredentialCategory } from "@/data/credentials"

const filters: { label: string; value: CredentialCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Projects", value: "project" },
  { label: "Experience", value: "experience" },
  { label: "Education", value: "education" },
]

interface FilterBarProps {
  active: CredentialCategory | "all"
  onChange: (value: CredentialCategory | "all") => void
}

export function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="flex gap-2">
      {filters.map((f) => (
        <motion.div
          key={f.value}
          layout
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Button
            variant={active === f.value ? "default" : "outline"}
            size="sm"
            onClick={() => onChange(f.value)}
          >
            {f.label}
          </Button>
        </motion.div>
      ))}
    </div>
  )
}
