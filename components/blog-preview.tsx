"use client"

import { useState, useEffect, useRef } from "react"
import { FiEdit3 } from "react-icons/fi"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const PDS = "https://splitgill.us-east.host.bsky.network"
const DID = "did:plc:4oondlbmpgr2oz6jda7nhzlg"

interface AtProtoRecord<T> {
  uri: string
  cid: string
  value: T
}

interface AtProtoListResponse<T> {
  records: AtProtoRecord<T>[]
  cursor?: string
}

interface PublicationValue {
  name: string
  url: string
}

interface DocumentValue {
  title: string
  description?: string
  textContent?: string
  publishedAt: string
  path: string
}

interface BlogPost {
  title: string
  description: string
  publishedAt: string
  path: string
}

interface BlogData {
  name: string
  url: string
  posts: BlogPost[]
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

const containerVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      height: { duration: 0.3, ease: "easeOut" as const },
      opacity: { duration: 0.25, ease: "easeOut" as const },
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      height: { duration: 0.25, ease: "easeIn" as const },
      opacity: { duration: 0.15, ease: "easeIn" as const },
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: {
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

function BlogSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {[1, 2].map((i) => (
        <div key={i} className="flex flex-col gap-1.5 rounded-xl px-4 py-3.5">
          <div className="flex items-center gap-2">
            <div className="h-5 w-48 animate-pulse rounded-md bg-muted" />
            <div className="size-4 animate-pulse rounded-sm bg-muted/30" />
            <div className="h-5 w-20 animate-pulse rounded-full bg-muted/40" />
          </div>
          <div className="space-y-1.5">
            <div className="h-3.5 w-full animate-pulse rounded-md bg-muted/60" />
            <div className="h-3.5 w-3/4 animate-pulse rounded-md bg-muted/60" />
          </div>
          <div className="h-3 w-16 animate-pulse self-end rounded-md bg-muted/30" />
        </div>
      ))}
    </div>
  )
}

export function BlogPreview() {
  const [isOpen, setIsOpen] = useState(false)
  const [blogData, setBlogData] = useState<BlogData | null>(null)
  const [loading, setLoading] = useState(false)
  const fetchedRef = useRef(false)

  const handleToggle = () => {
    if (!isOpen && !fetchedRef.current) {
      setLoading(true)
    }
    setIsOpen((p) => !p)
  }

  useEffect(() => {
    if (!isOpen || fetchedRef.current) return
    fetchedRef.current = true

    Promise.all([
      fetch(
        `${PDS}/xrpc/com.atproto.repo.listRecords?repo=${DID}&collection=site.standard.publication&limit=1`
      ).then((r) => r.json()),
      fetch(
        `${PDS}/xrpc/com.atproto.repo.listRecords?repo=${DID}&collection=site.standard.document&limit=5`
      ).then((r) => r.json()),
    ])
      .then(([pub, docs]) => {
        const pubResponse = pub as AtProtoListResponse<PublicationValue>
        const docResponse = docs as AtProtoListResponse<DocumentValue>
        const publication = pubResponse.records?.[0]?.value
        const posts: BlogPost[] = (docResponse.records ?? []).map(
          (r: AtProtoRecord<DocumentValue>) => ({
            title: r.value.title,
            description:
              r.value.description ?? r.value.textContent?.slice(0, 200) ?? "",
            publishedAt: r.value.publishedAt,
            path: r.value.path,
          })
        )
        setBlogData({
          name: publication?.name ?? "Samarinara",
          url: publication?.url ?? "https://samarinara.pckt.blog",
          posts,
        })
      })
      .catch(() => {
        setBlogData({
          name: "Samarinara",
          url: "https://samarinara.pckt.blog",
          posts: [],
        })
      })
      .finally(() => setLoading(false))
  }, [isOpen])

  return (
    <div className="flex flex-col gap-2">
      <motion.button
        onClick={handleToggle}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "flex w-fit items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
          isOpen
            ? "bg-primary text-primary-foreground shadow-md"
            : "bg-muted text-muted-foreground hover:bg-muted/80"
        )}
      >
        <motion.div
          animate={{ rotate: isOpen ? 12 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiEdit3 className="size-4" />
        </motion.div>
        <span>{isOpen ? "Ignore my Blog" : "Read my Blog"}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            layout
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden rounded-xl border bg-card/50 shadow-lg backdrop-blur-sm"
          >
            <div className="p-4">
              <motion.div
                variants={itemVariants}
                whileHover={{ x: 5 }}
                className="mb-6 ml-1"
              >
                <a
                  href={blogData?.url ?? "https://samarinara.pckt.blog"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-lg font-bold tracking-tight"
                >
                  <span className="decoration-primary decoration-2 underline-offset-4 transition-all group-hover:underline">
                    {blogData?.name ?? "Samarinara"}
                  </span>
                  <span className="-translate-x-2 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                    ↗
                  </span>
                </a>
              </motion.div>

              <AnimatePresence mode="popLayout">
                {loading ? (
                  <motion.div
                    key="loading"
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <BlogSkeleton />
                  </motion.div>
                ) : !blogData || blogData.posts.length === 0 ? (
                  <motion.p
                    key="empty"
                    layout
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="py-8 text-center text-sm text-muted-foreground"
                  >
                    No posts yet.
                  </motion.p>
                ) : (
                  <motion.div
                    key="content"
                    layout
                    className="flex flex-col gap-2"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                        },
                      },
                    }}
                  >
                    {blogData.posts.map((post) => (
                      <motion.a
                        key={post.path}
                        variants={itemVariants}
                        layout="position"
                        href={`${blogData.url}${post.path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/post flex flex-col gap-1.5 rounded-xl px-4 py-3.5 transition-colors hover:bg-muted/50"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base font-medium decoration-primary decoration-2 underline-offset-4 transition-all duration-200 group-hover/post:underline">
                            {post.title}
                          </span>
                          <span className="-translate-x-2 opacity-0 transition-all duration-200 group-hover/post:translate-x-0 group-hover/post:opacity-100">
                            ↗
                          </span>
                          <Badge variant="outline">Blog Post</Badge>
                        </div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          {post.description}
                        </p>
                        <span className="mt-auto self-end text-xs text-muted-foreground/60">
                          {formatDate(post.publishedAt)}
                        </span>
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
