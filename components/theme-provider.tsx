"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const STORAGE_KEY = "portfolio-theme"

/**
 * Applies the theme class to <html> and keeps it in sync with
 * localStorage. On first visit the system preference is respected.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = (typeof window !== "undefined"
      ? (localStorage.getItem(STORAGE_KEY) as Theme | null)
      : null)
    const system =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    setThemeState(stored ?? system)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    root.classList.toggle("dark", theme === "dark")
    root.style.colorScheme = theme
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme, mounted])

  const setTheme = useCallback((next: Theme) => setThemeState(next), [])
  const toggleTheme = useCallback(
    () => setThemeState((t) => (t === "dark" ? "light" : "dark")),
    [],
  )

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}

/**
 * Inline script injected before hydration to set the initial theme
 * class and avoid a flash of the wrong theme (FOUC).
 */
export const themeScript = `
(function() {
  try {
    var key = "${STORAGE_KEY}";
    var stored = localStorage.getItem(key);
    var system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    var theme = stored || system;
    var root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    root.style.colorScheme = theme;
  } catch (e) {}
})();
`
