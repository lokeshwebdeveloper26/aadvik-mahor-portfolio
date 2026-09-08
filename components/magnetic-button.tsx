"use client"

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import { useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type Variant = "gold" | "outline" | "ghost"

const variants: Record<Variant, string> = {
  gold: "bg-gold text-primary-foreground hover:brightness-110 gold-glow",
  outline:
    "border border-gold/60 text-foreground hover:border-gold hover:bg-gold-soft",
  ghost: "text-foreground/80 hover:text-gold",
}

/**
 * Magnetic button — subtly pulls toward the cursor. Falls back to a
 * plain button under reduced-motion. Renders an <a> when href is set.
 */
export function MagneticButton({
  children,
  className,
  variant = "gold",
  href,
  onClick,
  type = "button",
  target,
  ariaLabel,
}: {
  children: ReactNode
  className?: string
  variant?: Variant
  href?: string
  onClick?: () => void
  type?: "button" | "submit"
  target?: string
  ariaLabel?: string
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })

  function handleMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 16)
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * 16)
  }
  function reset() {
    x.set(0)
    y.set(0)
  }

  const classes = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium tracking-wide transition-[filter,background,border,color] duration-300 cursor-pointer",
    variants[variant],
    className,
  )

  const inner = href ? (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  ) : (
    <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  )

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className="inline-block"
    >
      {inner}
    </motion.div>
  )
}
