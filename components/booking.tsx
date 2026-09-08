"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Loader2, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react"
import { useState } from "react"
import { companyData } from "@/data/company-data"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

const PROJECT_TYPES = [
  "Fashion Shoot",
  "Commercial Shoot",
  "Brand Campaign",
  "Catalogue",
  "Advertisement",
  "Video / Reel",
  "Other",
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface FormState {
  name: string
  company: string
  email: string
  phone: string
  projectType: string
  shootDate: string
  location: string
  message: string
}

const initialForm: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectType: "",
  shootDate: "",
  location: "",
  message: "",
}

type Status = "idle" | "loading" | "success" | "error"

export function Booking() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [status, setStatus] = useState<Status>("idle")
  const [serverError, setServerError] = useState("")

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  function validate() {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) next.name = "Please enter your name."
    if (!EMAIL_RE.test(form.email)) next.email = "Enter a valid email address."
    if (!form.projectType) next.projectType = "Select a project type."
    if (!form.message.trim()) next.message = "Add a short message."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setStatus("loading")
    setServerError("")
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "Something went wrong.")
      }
      setStatus("success")
      setForm(initialForm)
    } catch (err) {
      setStatus("error")
      setServerError(err instanceof Error ? err.message : "Something went wrong.")
    }
  }

  const whatsappUrl = `https://wa.me/${companyData.whatsapp}?text=${encodeURIComponent(
    `Hello ${companyData.name}, I'd like to enquire about a booking.`,
  )}`
  const mailUrl = `mailto:${companyData.email}?subject=${encodeURIComponent("Booking Enquiry")}`

  const inputClass =
    "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-gold focus:ring-2 focus:ring-gold/20"

  return (
    <section id="booking" className="relative py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-soft blur-[140px]"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Bookings & Enquiries"
          title="Work With Us"
          lede="For bookings and professional enquiries, please contact the company/agency. The model is never contacted directly."
          align="center"
          className="items-center"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          {/* Contact rail */}
          <Reveal direction="right">
            <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card/50 p-6 sm:p-8">
              <h3 className="font-serif text-2xl">{companyData.name}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Reach our booking team directly through any of the channels below.
              </p>

              <div className="mt-2 flex flex-col gap-3">
                <a href={mailUrl} className="group flex items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:border-gold/50">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-soft text-gold">
                    <Mail className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] uppercase tracking-widest text-muted-foreground">Email</span>
                    <span className="block truncate text-sm">{companyData.email}</span>
                  </span>
                </a>
                <a href={`tel:${companyData.phone}`} className="group flex items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:border-gold/50">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-soft text-gold">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[11px] uppercase tracking-widest text-muted-foreground">Phone</span>
                    <span className="block text-sm">{companyData.phone}</span>
                  </span>
                </a>
                <div className="flex items-center gap-3 rounded-xl border border-border p-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-soft text-gold">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[11px] uppercase tracking-widest text-muted-foreground">Location</span>
                    <span className="block text-sm">{companyData.location}</span>
                  </span>
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-3 pt-4 sm:flex-row">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-medium text-primary-foreground transition hover:brightness-110 gold-glow"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
                <a
                  href={mailUrl}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-gold/50 px-5 py-3 text-sm font-medium transition hover:bg-gold-soft"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal>
            <div className="rounded-2xl border border-border bg-card/50 p-6 sm:p-8">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex min-h-[24rem] flex-col items-center justify-center text-center"
                >
                  <CheckCircle2 className="h-14 w-14 text-gold" />
                  <h3 className="mt-4 font-serif text-2xl">Enquiry sent</h3>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    Thank you. Our booking team will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 rounded-full border border-gold/50 px-6 py-2.5 text-sm transition hover:bg-gold-soft"
                  >
                    Send another enquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" error={errors.name} required>
                    <input
                      className={inputClass}
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Your full name"
                      aria-invalid={!!errors.name}
                    />
                  </Field>
                  <Field label="Company / Brand" error={undefined}>
                    <input
                      className={inputClass}
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                      placeholder="Company or brand"
                    />
                  </Field>
                  <Field label="Email" error={errors.email} required>
                    <input
                      type="email"
                      className={inputClass}
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@company.com"
                      aria-invalid={!!errors.email}
                    />
                  </Field>
                  <Field label="Phone" error={undefined}>
                    <input
                      type="tel"
                      className={inputClass}
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+44 ..."
                    />
                  </Field>
                  <Field label="Project Type" error={errors.projectType} required>
                    <select
                      className={inputClass}
                      value={form.projectType}
                      onChange={(e) => update("projectType", e.target.value)}
                      aria-invalid={!!errors.projectType}
                    >
                      <option value="" disabled>
                        Select a project type
                      </option>
                      {PROJECT_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Shoot Date" error={undefined}>
                    <input
                      type="date"
                      className={inputClass}
                      value={form.shootDate}
                      onChange={(e) => update("shootDate", e.target.value)}
                    />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Location" error={undefined}>
                      <input
                        className={inputClass}
                        value={form.location}
                        onChange={(e) => update("location", e.target.value)}
                        placeholder="Shoot location"
                      />
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <Field label="Message" error={errors.message} required>
                      <textarea
                        className={`${inputClass} min-h-28 resize-y`}
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        placeholder="Tell us about your project..."
                        aria-invalid={!!errors.message}
                      />
                    </Field>
                  </div>

                  {status === "error" && (
                    <p className="sm:col-span-2 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                      {serverError}
                    </p>
                  )}

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-medium text-primary-foreground transition hover:brightness-110 disabled:opacity-60 gold-glow"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Enquiry
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
        {required && <span className="text-gold"> *</span>}
      </span>
      {children}
      {error && <span className="text-xs text-destructive">{error}</span>}
    </label>
  )
}
