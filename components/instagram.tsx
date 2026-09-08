"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { InstagramGlyph as InstagramIcon } from "@/components/icons"
import { modelData } from "@/data/model-data"
import { Reveal } from "./reveal"
import { MagneticButton } from "./magnetic-button"

/**
 * Instagram CTA section. The handle is read from model data — no
 * hard-coded URLs. If a live feed API is ever wired up it can replace
 * the preview tiles; until then we show a premium CTA + preview grid.
 */
export function Instagram() {
  const handle = modelData.instagram
  if (!handle) return null

  const url = `https://instagram.com/${handle}`
  // Preview tiles reuse the curated gallery imagery (no fake "posts").
  const preview = modelData.gallery.slice(0, 6)

  return (
    <section id="instagram" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card/50 p-8 sm:p-12 lg:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-soft blur-[120px]"
          />
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold-soft px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-gold">
                  <InstagramIcon className="h-3.5 w-3.5" />
                  Instagram
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-5xl">
                  Follow the journey
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 max-w-md text-muted-foreground">
                  Behind-the-scenes moments, new campaigns and editorial
                  highlights — all curated and managed by the agency.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <MagneticButton href={url} target="_blank" variant="gold">
                    <InstagramIcon className="h-4 w-4" />@{handle}
                  </MagneticButton>
                  <span className="text-sm text-muted-foreground">
                    Follow for updates
                  </span>
                </div>
              </Reveal>
            </div>

            {/* Preview grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {preview.map((img, i) => (
                <motion.a
                  key={`${img.src}-${i}`}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="group relative aspect-square overflow-hidden rounded-xl border border-border"
                  aria-label={`Open Instagram @${handle}`}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt=""
                    fill
                    loading="lazy"
                    sizes="200px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-background/50 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <InstagramIcon className="h-6 w-6 text-gold" />
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
