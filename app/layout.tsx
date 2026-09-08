import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Jost } from "next/font/google"
import { ThemeProvider, themeScript } from "@/components/theme-provider"
import { modelData } from "@/data/model-data"
import { companyData } from "@/data/company-data"
import "./globals.css"

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
})

const bodyFont = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: `${modelData.name} — ${modelData.title} | ${companyData.name}`,
  description: modelData.intro,
  generator: "v0.app",
  keywords: [
    modelData.name,
    "junior model",
    "fashion model",
    "commercial model",
    companyData.name,
    "model portfolio",
    "modeling agency",
  ],
  openGraph: {
    title: `${modelData.name} — ${modelData.title}`,
    description: modelData.intro,
    type: "profile",
    images: [{ url: modelData.heroImage, width: 1200, height: 630, alt: modelData.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${modelData.name} — ${modelData.title}`,
    description: modelData.intro,
    images: [modelData.heroImage],
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f1e8" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${displayFont.variable} ${bodyFont.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-background text-foreground font-body antialiased">
        <ThemeProvider>{children}</ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
