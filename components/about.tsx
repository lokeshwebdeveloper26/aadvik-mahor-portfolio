"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { companyData } from "@/data/company-data"
import { modelData } from "@/data/model-data"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"
import { TiltCard } from "./tilt-card"

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
          {/* Editorial image */}
          <Reveal direction="right">
            <TiltCard className="group" intensity={5}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border">
                <Image
                  src={modelData.gallery[0]?.src || "/placeholder.svg"}
                  alt="Editorial campaign by the agency"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                {/* Floating logo badge */}
                <div className="glass absolute bottom-5 left-5 flex items-center gap-3 rounded-xl border border-border px-4 py-3">
                  <Image
                    src={companyData.logo || "/placeholder.svg"}
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                  <div className="leading-tight">
                    <p className="font-serif text-sm">{companyData.name}</p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      Est. Excellence
                    </p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* Text */}
          <div>
            <SectionHeading
              eyebrow="The Agency"
              title={companyData.name}
              lede={companyData.description}
            />

            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {companyData.services.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.06, duration: 0.6 }}
                  className="group rounded-xl border border-border bg-card/50 p-5 transition-colors hover:border-gold/50"
                >
                  <h3 className="flex items-center gap-2 font-serif text-lg">
                    <span className="text-xs font-sans text-gold">0{i + 1}</span>
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
