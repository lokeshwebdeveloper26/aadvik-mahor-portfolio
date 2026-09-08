"use client"

import { Mail, Phone } from "lucide-react"
import Image from "next/image"
import { InstagramGlyph } from "@/components/icons"
import { companyData } from "@/data/company-data"
import { modelData } from "@/data/model-data"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <Image
                src={companyData.logo || "/placeholder.svg"}
                alt={`${companyData.name} logo`}
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
              <div className="leading-tight">
                <p className="font-serif text-xl">{companyData.name}</p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {companyData.tagline}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              For all bookings and professional enquiries regarding{" "}
              {modelData.name}, please contact the agency directly.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <a href={`mailto:${companyData.email}`} className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-gold">
              <Mail className="h-4 w-4" />
              {companyData.email}
            </a>
            <a href={`tel:${companyData.phone}`} className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-gold">
              <Phone className="h-4 w-4" />
              {companyData.phone}
            </a>
            <a
              href={`https://instagram.com/${companyData.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-gold"
            >
              <InstagramGlyph className="h-4 w-4" />@{companyData.instagram}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            &copy; {year} {companyData.name}. All rights reserved.
          </p>
          <p>Junior talent represented and safeguarded by the agency.</p>
        </div>
      </div>
    </footer>
  )
}
