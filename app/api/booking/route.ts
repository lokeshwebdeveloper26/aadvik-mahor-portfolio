import { NextResponse } from "next/server"

/**
 * Booking enquiry endpoint.
 *
 * This is intentionally backend-light for the first version: it
 * validates the payload and returns success. The structure is ready
 * to connect to any of the following later WITHOUT touching the UI:
 *
 *   - A database (Neon / Supabase): insert the `data` object.
 *   - Transactional email (Resend / Nodemailer): email the agency.
 *   - WhatsApp Business API: forward the enquiry.
 *   - Google Sheets / Excel: append a row.
 *
 * Just replace the "TODO: persist" block below with your integration.
 */

interface BookingPayload {
  name: string
  company: string
  email: string
  phone: string
  projectType: string
  shootDate: string
  location: string
  message: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  let body: Partial<BookingPayload>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const errors: Record<string, string> = {}
  if (!body.name?.trim()) errors.name = "Name is required."
  if (!body.email?.trim() || !EMAIL_RE.test(body.email)) errors.email = "A valid email is required."
  if (!body.projectType?.trim()) errors.projectType = "Please select a project type."
  if (!body.message?.trim()) errors.message = "Please include a short message."

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Validation failed.", errors }, { status: 422 })
  }

  const data: BookingPayload = {
    name: body.name!.trim(),
    company: body.company?.trim() ?? "",
    email: body.email!.trim(),
    phone: body.phone?.trim() ?? "",
    projectType: body.projectType!.trim(),
    shootDate: body.shootDate?.trim() ?? "",
    location: body.location?.trim() ?? "",
    message: body.message!.trim(),
  }

  // TODO: persist — connect a database, email, WhatsApp or Google Sheet here.
  console.log("[v0] New booking enquiry:", data)

  return NextResponse.json({ ok: true, message: "Enquiry received." })
}
