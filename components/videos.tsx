"use client"

import { motion } from "framer-motion"
import { Maximize2 } from "lucide-react"
import { modelData } from "@/data/model-data"
import { SectionHeading } from "./section-heading"

export function Videos() {
  if (modelData.videos.length === 0) return null

  return (
    <section id="videos" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <SectionHeading
          eyebrow="Motion"
          title="Videos"
          lede="Selected fashion, commercial and campaign video work."
        />

        <div className="mt-12 space-y-10">
          {modelData.videos.map((video, index) => (
            <motion.div
              key={`${video.title}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="overflow-hidden rounded-2xl border border-border bg-black shadow-xl"
            >
              {video.type === "mp4" ? (
                <video
                  src={video.src}
                  controls
                  playsInline
                  preload="metadata"
                  className="block h-auto max-h-[75vh] w-full bg-black object-contain"
                />
              ) : (
                <iframe
                  src={video.src}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="aspect-video w-full"
                />
              )}

              <div className="flex items-center justify-between gap-4 bg-card px-5 py-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gold">
                    {video.category}
                  </p>

                  <h3 className="mt-1 font-serif text-xl">
                    {video.title}
                  </h3>
                </div>

                <Maximize2 className="h-5 w-5 shrink-0 text-muted-foreground" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}