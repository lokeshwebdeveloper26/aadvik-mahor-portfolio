"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { companyData } from "@/data/company-data"
import { modelData } from "@/data/model-data"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"

const BASE_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Model", id: "model" },
  { label: "Gallery", id: "gallery" },
]

const OPTIONAL_LINKS = [
  ...(modelData.videos?.length
    ? [{ label: "Videos", id: "videos" }]
    : []),

  ...(modelData.ecommerce?.length
    ? [{ label: "E-Commerce", id: "ecommerce" }]
    : []),

  ...(modelData.instagram?.trim()
    ? [{ label: "Instagram", id: "instagram" }]
    : []),
]

const LINKS = [
  ...BASE_LINKS,
  ...OPTIONAL_LINKS,
  { label: "Booking", id: "booking" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("home")
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)

    onScroll()

    window.addEventListener("scroll", onScroll, { passive: true })

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-45% 0px -50% 0px",
        threshold: 0,
      },
    )

    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id)

      if (el) {
        observer.observe(el)
      }
    })

    return () => observer.disconnect()
  }, [])

  function go(id: string) {
    setOpen(false)

    const el = document.getElementById(id)

    el?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    })
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 transition-all duration-500 sm:px-6",
            scrolled
              ? "glass border border-border py-2 shadow-lg shadow-black/5"
              : "border border-transparent py-3",
          )}
        >
          {/* Logo + company name */}
          <button
            onClick={() => go("home")}
            className="group flex items-center gap-3"
            aria-label={`${companyData.name} — back to top`}
          >
            <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14">
              <span
                className="absolute inset-0 rounded-xl bg-gold-soft blur-md opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              />

              <Image
                src={companyData.logo || "/placeholder.svg"}
                alt={`${companyData.name} logo`}
                width={56}
                height={56}
                className="relative h-full w-full object-contain"
                priority
              />
            </span>

            <span className="flex flex-col text-left leading-none">
              <span className="font-serif text-lg font-medium tracking-wide sm:text-xl">
                {companyData.name}
              </span>

              <span className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {companyData.tagline}
              </span>
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                className={cn(
                  "relative px-3 py-2 text-sm transition-colors",
                  active === link.id
                    ? "text-gold"
                    : "text-foreground/70 hover:text-foreground",
                )}
              >
                {link.label}

                {active === link.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-gold"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 32,
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Theme + Mobile button */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <button
              onClick={() => setOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 text-foreground transition-colors hover:border-gold hover:text-gold lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {open ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-2 max-w-7xl px-4 sm:px-6 lg:hidden"
          >
            <div className="glass overflow-hidden rounded-2xl border border-border p-2">
              {LINKS.map((link, i) => (
                <motion.button
                  key={link.id}
                  onClick={() => go(link.id)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base transition-colors",
                    active === link.id
                      ? "bg-gold-soft text-gold"
                      : "text-foreground/80 hover:bg-secondary",
                  )}
                >
                  {link.label}

                  <span className="text-xs text-muted-foreground">
                    0{i + 1}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}