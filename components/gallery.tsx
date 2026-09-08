"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"
import Image from "next/image"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { modelData } from "@/data/model-data"
import type { GalleryCategory } from "@/data/types"
import { cn } from "@/lib/utils"
import { SectionHeading } from "./section-heading"

type Filter = "All" | GalleryCategory

export function Gallery() {
  const [filter, setFilter] = useState<Filter>("All")
  const [lightbox, setLightbox] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)

  const categories = useMemo<Filter[]>(() => {
    const set = new Set<GalleryCategory>()
    modelData.gallery.forEach((g) => set.add(g.category))
    return ["All", ...Array.from(set)]
  }, [])

  const items = useMemo(
    () =>
      filter === "All"
        ? modelData.gallery
        : modelData.gallery.filter((g) => g.category === filter),
    [filter],
  )

  const close = useCallback(() => setLightbox(null), [])
  const next = useCallback(
    () => setLightbox((i) => (i === null ? i : (i + 1) % items.length)),
    [items.length],
  )
  const prev = useCallback(
    () => setLightbox((i) => (i === null ? i : (i - 1 + items.length) % items.length)),
    [items.length],
  )

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [lightbox, close, next, prev])

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Portfolio"
          title="The Gallery"
          lede="A curated editorial selection spanning fashion, commercial and campaign work."
        />

        {/* Filters */}
        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "relative rounded-full border px-5 py-2 text-sm transition-colors",
                filter === cat
                  ? "border-gold text-gold"
                  : "border-border text-muted-foreground hover:border-gold/50 hover:text-foreground",
              )}
            >
              {filter === cat && (
                <motion.span
                  layoutId="gallery-filter"
                  className="absolute inset-0 rounded-full bg-gold-soft"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span className="relative">{cat}</span>
            </button>
          ))}
        </div>

        {/* Editorial grid */}
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {items.map((img, i) => (
              <motion.button
                layout
                key={`${img.src}-${i}`}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setLightbox(i)}
                className={cn(
                  "group relative min-h-[420px] overflow-hidden rounded-2xl border border-border bg-card/20",
                  "sm:min-h-[500px]",
                  img.featured && "sm:col-span-2 sm:min-h-[620px]",
                )}
                aria-label={`Open ${img.alt}`}
              >
                <Image
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-contain bg-card/20 transition-transform duration-700 will-change-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-0 rounded-xl opacity-0 ring-1 ring-inset ring-gold/60 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 flex translate-y-3 items-center gap-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="rounded-full bg-gold-soft px-3 py-1 text-[10px] uppercase tracking-widest text-gold">
                    {img.category}
                  </span>
                </div>
                <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/70 text-gold opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                  <ZoomIn className="h-4 w-4" />
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && items[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return
              const dx = e.changedTouches[0].clientX - touchStartX.current
              if (dx > 50) prev()
              else if (dx < -50) next()
              touchStartX.current = null
            }}
          >
            <button
              onClick={close}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/60 text-foreground transition-colors hover:border-gold hover:text-gold"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/60 text-foreground transition-colors hover:border-gold hover:text-gold sm:left-6"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/60 text-foreground transition-colors hover:border-gold hover:text-gold sm:right-6"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <motion.figure
              key={lightbox}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-4 flex max-h-[85svh] w-full max-w-4xl flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[70svh] w-full">
                <Image
                  src={items[lightbox].src || "/placeholder.svg"}
                  alt={items[lightbox].alt}
                  fill
                  sizes="100vw"
                  className="rounded-xl object-contain"
                />
              </div>
              <figcaption className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
                <span className="rounded-full bg-gold-soft px-3 py-1 text-[10px] uppercase tracking-widest text-gold">
                  {items[lightbox].category}
                </span>
                {items[lightbox].alt}
                <span className="text-xs">
                  {lightbox + 1} / {items.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
