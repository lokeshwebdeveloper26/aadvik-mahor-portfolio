import { Reveal } from "./reveal"
import { cn } from "@/lib/utils"

/**
 * Consistent editorial section header: small gold eyebrow + large
 * serif title + optional lede.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
}: {
  eyebrow: string
  title: string
  lede?: string
  align?: "left" | "center"
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal>
        <span className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
          <span className="h-px w-8 bg-gold/50" aria-hidden />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-serif text-4xl font-medium leading-[1.05] text-balance sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </Reveal>
      {lede && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "max-w-xl text-base leading-relaxed text-muted-foreground",
              align === "center" && "mx-auto",
            )}
          >
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  )
}
