"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"
import type { ReactNode } from "react"

type Direction = "up" | "down" | "left" | "right" | "none"

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
  none: {},
}

/**
 * Scroll-triggered reveal wrapper. Respects prefers-reduced-motion.
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  once = true,
}: {
  children: ReactNode
  direction?: Direction
  delay?: number
  className?: string
  once?: boolean
}) {
  const reduce = useReducedMotion()

  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, ...offset[direction] },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Staggered text reveal, splits a string into words that rise in.
 */
export function TextReveal({
  text,
  className,
  delay = 0,
  as: Tag = "span",
}: {
  text: string
  className?: string
  delay?: number
  as?: "span" | "h1" | "h2" | "p"
}) {
  const reduce = useReducedMotion()
  const words = text.split(" ")

  if (reduce) {
    return <Tag className={className}>{text}</Tag>
  }

  const MotionTag = motion[Tag]

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%" },
              visible: {
                y: 0,
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}
