"use client"

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion"
import { useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * 3D tilt card that reacts to pointer position. Disabled for
 * reduced-motion and effectively inert on touch (no hover).
 */
export function TiltCard({
  children,
  className,
  intensity = 8,
  glow = true,
}: {
  children: ReactNode
  className?: string
  intensity?: number
  glow?: boolean
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 })
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)

  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, var(--gold-soft), transparent 55%)`

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rotateY.set((px - 0.5) * intensity * 2)
    rotateX.set((0.5 - py) * intensity * 2)
    glareX.set(px * 100)
    glareY.set(py * 100)
  }

  function reset() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 900 }}
      className={cn("relative", className)}
    >
      {children}
      {glow && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ backgroundImage: glare }}
        />
      )}
    </motion.div>
  )
}
