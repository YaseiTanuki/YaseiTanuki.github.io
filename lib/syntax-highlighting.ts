// Custom regex-based highlighter removed in favor of Shiki

// Server-side Shiki highlight (used in server components)
let serverHighlighterPromise: Promise<any> | null = null
function getServerGlobal(): any {
  return globalThis as any
}

export async function getServerHighlighter() {
  const g = getServerGlobal()
  if (g.__server_shiki__) {
    return g.__server_shiki__
  }
  if (g.__server_shiki_promise__ || serverHighlighterPromise) {
    return (g.__server_shiki_promise__ || serverHighlighterPromise)
  }

  serverHighlighterPromise = (async () => {
    const shiki = await import("shiki")
    const instance = await shiki.createHighlighter({
      themes: ["catppuccin-mocha", "catppuccin-latte"],
      langs: ["javascript", "typescript", "python", "bash", "json", "html", "css"],
    })
    g.__server_shiki__ = instance
    return instance
  })()

  g.__server_shiki_promise__ = serverHighlighterPromise
  try {
    return await serverHighlighterPromise
  } finally {
    g.__server_shiki_promise__ = null
    serverHighlighterPromise = null
  }
}

export function disposeServerHighlighter() {
  const g = getServerGlobal()
  if (g.__server_shiki__) {
    try { g.__server_shiki__.dispose?.() } catch {}
    g.__server_shiki__ = null
  }
}

// Add basic cleanup hooks for dev servers
if (typeof process !== "undefined") {
  process.on?.("exit", () => {
    try { disposeServerHighlighter() } catch {}
  })
}
export async function highlightWithShiki(
  code: string,
  lang: string = "javascript",
  theme: "catppuccin-mocha" | "catppuccin-latte" = "catppuccin-mocha"
): Promise<string> {
  const highlighter = await getServerHighlighter()
  return highlighter.codeToHtml(code, { lang, theme })
}