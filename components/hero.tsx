"use client"

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { ArrowDown, Sparkles } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"
import { companyData } from "@/data/company-data"
import { modelData } from "@/data/model-data"
import { MagneticButton } from "./magnetic-button"
import { Particles } from "./particles"

export function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"])
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Mouse-following depth on the portrait
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 })
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 })

  function onMove(e: React.MouseEvent) {
    if (reduce) return
    const { innerWidth, innerHeight } = window
    mx.set((e.clientX / innerWidth - 0.5) * 24)
    my.set((e.clientY / innerHeight - 0.5) * 24)
  }

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  }
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Background portrait with parallax + subtle mouse depth */}
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <motion.div style={{ x: mx, y: my }} className="absolute -inset-8">
          <Image
            src={modelData.heroImage || "/placeholder.svg"}
            alt={`${modelData.name} — ${modelData.title}`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_25%]"
          />
        </motion.div>
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30 dark:via-background/80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </motion.div>

      {/* Golden ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 h-[36rem] w-[36rem] rounded-full bg-gold-soft blur-[120px]"
      />
      <Particles density={36} />

      {/* Content */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold-soft px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-gold"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {companyData.name}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 font-serif text-6xl font-medium leading-[0.95] text-balance sm:text-7xl lg:text-8xl"
          >
            {modelData.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 text-lg font-light uppercase tracking-[0.28em] text-gold sm:text-xl"
          >
            {modelData.title}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {modelData.intro}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton
              variant="gold"
              onClick={() =>
                document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Portfolio
              <ArrowDown className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              variant="outline"
              onClick={() =>
                document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Book the Company
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Scroll
        </span>
        <motion.span
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="text-gold"
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.div>
    </section>
  )
}
