import type React from "react"
import type { Metadata } from "next"
import { Inter, Fira_Code, Comfortaa } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
})

const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
  display: "swap",
})

// Cascadia Code is not loaded via next/font; we rely on JetBrains Mono for code

export const metadata: Metadata = {
  title: "YaseiTanuki | GitHub Portfolio",
  description: "Personal site powered by Next.js, showing GitHub profile and repositories.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable} ${comfortaa.variable} antialiased`}>
      <body className="font-comfortaa">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
