"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { Sun, Moon } from "lucide-react"

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const isDark = theme === "dark"

  const onCheckedChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light")
  }

  return (
    <div className="inline-flex items-center gap-2">
      <Sun className={`h-4 w-4 ${isDark ? "opacity-40" : "opacity-100"}`} />
      <Switch checked={isDark} onCheckedChange={onCheckedChange} aria-label="Theme switch" />
      <Moon className={`h-4 w-4 ${isDark ? "opacity-100" : "opacity-40"}`} />
    </div>
  )
}


