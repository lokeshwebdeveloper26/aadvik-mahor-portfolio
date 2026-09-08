"use client"

import { motion } from "framer-motion"
import {
  CalendarDays,
  Eye,
  MapPin,
  Palette,
  Ruler,
  Scissors,
  Sparkle,
  User,
  Weight,
} from "lucide-react"
import Image from "next/image"
import type { ComponentType } from "react"
import { modelData } from "@/data/model-data"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"
import { TiltCard } from "./tilt-card"

interface DetailRow {
  label: string
  value?: string
  icon: ComponentType<{ className?: string }>
}

export function ModelProfile() {
  const { details, parents } = modelData

  // Build the detail rows, then drop any that are empty so private /
  // optional fields are automatically hidden.
  const rows: DetailRow[] = [
    { label: "Age", value: details.age, icon: User },
    { label: "Date of Birth", value: details.dateOfBirth, icon: CalendarDays },
    { label: "Height", value: details.height, icon: Ruler },
    { label: "Weight", value: details.weight, icon: Weight },
    { label: "Bust", value: details.Bust, icon: Ruler },
    { label: "Waist", value: details.Waist, icon: Ruler },
    { label: "Hips", value: details.Hips, icon: Ruler },
    { label: "Shoe Size", value: details.ShoeSize, icon: Ruler },
    { label: "Skin Tone", value: details.skinTone, icon: Palette },
    { label: "Hair Color", value: details.hairColor, icon: Scissors },
    { label: "Eye Color", value: details.eyeColor, icon: Eye },    
    { label: "Location", value: details.location, icon: MapPin },
    { label: "Father's Name", value: parents.fatherName, icon: User },
    { label: "Mother's Name", value: parents.motherName, icon: User },
  ].filter((row) => row.value && row.value.trim().length > 0)

  return (
    <section id="model" className="relative py-24 sm:py-32">
      {/* soft glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-24 h-96 w-96 rounded-full bg-gold-soft blur-[130px]"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* Profile card */}
          <Reveal direction="right">
            <TiltCard className="group sticky top-28" intensity={6}>
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={modelData.profileImage || "/placeholder.svg"}
                    alt={`Portrait of ${modelData.name}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-xs uppercase tracking-[0.25em] text-gold">
                    {modelData.title}
                  </p>
                  <h3 className="mt-1 font-serif text-3xl">{modelData.name}</h3>
                  <p className="mt-2 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold-soft px-3 py-1 text-xs text-gold">
                    <Sparkle className="h-3 w-3" />
                    {modelData.availability}
                  </p>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* Bio + details */}
          <div>
            <SectionHeading
              eyebrow="The Model"
              title="Profile & Details"
              lede={modelData.bio}
            />

            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {rows.map((row, i) => {
                const Icon = row.icon
                return (
                  <motion.div
                    key={row.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className="flex items-center gap-4 rounded-xl border border-border bg-card/50 p-4 transition-colors hover:border-gold/50"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold-soft text-gold">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                        {row.label}
                      </p>
                      <p className="truncate font-sans text-lg">{row.value}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-secondary/50 p-4 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <p>
                For the model&apos;s privacy, personal contact details are never
                published. All enquiries are handled by the representing agency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
