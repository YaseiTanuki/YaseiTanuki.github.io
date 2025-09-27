"use client"

import { useEffect, useState, useMemo } from "react"
import { useTheme } from "next-themes"
// Use Shiki's shorthand API on the client

interface SyntaxHighlighterProps {
  code: string
  language?: string
  className?: string
  prerenderedHtml?: string
  prerenderedHtmlDark?: string
  prerenderedHtmlLight?: string
}

export function SyntaxHighlighter({ code, language = "javascript", className = "", prerenderedHtml, prerenderedHtmlDark, prerenderedHtmlLight }: SyntaxHighlighterProps) {
  const [highlightedCode, setHighlightedCode] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const { theme } = useTheme()

  // Memoize the code and language to prevent unnecessary re-renders
  const memoizedCode = useMemo(() => code, [code])
  const memoizedLanguage = useMemo(() => language, [language])
  
  useEffect(() => {
    // Prefer client theme when available
    const serverHtml = prerenderedHtml ?? (theme === "dark" ? prerenderedHtmlDark : prerenderedHtmlLight) ?? prerenderedHtmlDark ?? prerenderedHtmlLight
    if (serverHtml) {
      setHighlightedCode(serverHtml)
      setIsLoading(false)
      return
    }
    const highlightCode = async () => {
      try {
        setIsLoading(true)
        // Client-side highlighting via Shiki shorthand (auto-loads langs/themes)
        const { codeToHtml } = await import("shiki")
          const selectedTheme = theme === "dark" ? "catppuccin-mocha" : "catppuccin-latte"
        const html = await codeToHtml(memoizedCode, {
            lang: memoizedLanguage,
            theme: selectedTheme,
          })
          setHighlightedCode(html)
      } catch (error) {
        console.error("Error highlighting code:", error)
        // Fallback to plain text if highlighting fails
        setHighlightedCode(`<pre><code>${memoizedCode.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`)
      } finally {
        setIsLoading(false)
      }
    }

    if (memoizedCode.trim()) {
      highlightCode()
    } else {
      setHighlightedCode("")
      setIsLoading(false)
    }
  }, [memoizedCode, memoizedLanguage, theme])

  if (isLoading) {
    return (
      <div className={`${className} relative`}>
        <div className="absolute top-2 right-2 flex items-center space-x-1 text-xs text-muted-foreground">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span>Highlighting...</span>
        </div>
        <pre className="p-6 overflow-x-auto text-sm leading-relaxed opacity-60" style={{ fontFamily: "'Cascadia Code', 'JetBrains Mono', monospace" }}>
          <code className="text-gray-900 dark:text-gray-100">
            {code}
          </code>
        </pre>
      </div>
    )
  }

  return (
    <div 
      className={`shiki-container ${className}`}
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
      style={{ 
        background: 'transparent',
        color: 'inherit',
        fontFamily: "'Cascadia Code', 'JetBrains Mono', monospace"
      }}
    />
  )
}
