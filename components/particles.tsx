"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  a: number
}

/**
 * Lightweight canvas of drifting golden light particles.
 * Automatically disabled on small screens and for reduced motion,
 * and pauses when the tab / section is not visible.
 */
export function Particles({ density = 40 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const small = window.matchMedia("(max-width: 767px)").matches
    if (reduce || small) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0
    let running = true
    let particles: Particle[] = []
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      const parent = canvas.parentElement
      if (!parent) return
      const { width, height } = parent.getBoundingClientRect()
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      const count = Math.round((width * height) / 26000)
      particles = Array.from({ length: Math.min(count, density) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -(Math.random() * 0.35 + 0.05),
        a: Math.random() * 0.5 + 0.15,
      }))
    }

    function readGold() {
      const styles = getComputedStyle(document.documentElement)
      return styles.getPropertyValue("--gold").trim() || "#c9a24b"
    }

    function draw() {
      if (!ctx) return
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)
      const gold = readGold()
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.y < -10) {
          p.y = h / dpr + 10
          p.x = Math.random() * (w / dpr)
        }
        if (p.x < -10) p.x = w / dpr + 10
        if (p.x > w / dpr + 10) p.x = -10
        ctx.beginPath()
        ctx.fillStyle = gold
        ctx.globalAlpha = p.a
        ctx.arc(p.x * dpr, p.y * dpr, p.r * dpr, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      if (running) raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener("resize", resize)

    const onVisibility = () => {
      running = !document.hidden
      if (running) draw()
      else cancelAnimationFrame(raf)
    }
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [density])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
