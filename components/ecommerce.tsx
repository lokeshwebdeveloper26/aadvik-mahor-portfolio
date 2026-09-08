"use client"

import { motion } from "framer-motion"
import { ExternalLink, ShoppingBag } from "lucide-react"
import { modelData } from "@/data/model-data"
import { Reveal } from "./reveal"
import { MagneticButton } from "./magnetic-button"

export function Ecommerce() {
  const ecommerce = modelData.ecommerce

  if (!ecommerce || ecommerce.length === 0) return null

  return (
    <section id="ecommerce" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card/50 p-8 sm:p-12 lg:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-gold-soft blur-[120px]"
          />

          <div className="relative">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold-soft px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-gold">
                <ShoppingBag className="h-3.5 w-3.5" />
                E-Commerce
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-5xl">
                Shop & Explore
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Explore featured e-commerce campaigns and commercial
                collaborations.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {ecommerce.map((item, index) => (
                <motion.div
                  key={`${item.name}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  whileHover={{ y: -5 }}
                  className="group rounded-2xl border border-border bg-background/60 p-6 transition-colors duration-300 hover:border-gold/50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-gold-soft">
                    <ShoppingBag className="h-5 w-5 text-gold" />
                  </div>

                  <h3 className="mt-6 text-xl font-medium">
                    {item.name}
                  </h3>

                  {item.description && (
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  )}

                  <div className="mt-6">
                    <MagneticButton
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="gold"
                    >
                      Visit Store
                      <ExternalLink className="h-4 w-4" />
                    </MagneticButton>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}