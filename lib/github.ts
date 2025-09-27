export type GitHubUser = {
  login: string
  name: string | null
  bio: string | null
  avatar_url: string
  html_url: string
  blog: string | null
  twitter_username: string | null
  reddit_username: string | null
  location: string | null
  public_repos: number
  followers: number
  following: number
}

export type GitHubRepo = {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  forks_count: number
  watchers_count: number
  language: string | null
  topics?: string[]
}

async function safeFetch(input: string, init?: RequestInit) {
  const res = await fetch(input, {
    // Cache on the server for a short time to avoid rate limiting
    next: { revalidate: 300 },
    headers: {
      Accept: (init && init.headers && (init.headers as any).Accept) || "application/vnd.github+json",
    },
    ...init,
  })
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  return safeFetch(`https://api.github.com/users/${username}`)
}

export async function fetchUserRepos(
  username: string,
  params: { perPage?: number; sort?: "updated" | "pushed" | "full_name" } = {}
): Promise<GitHubRepo[]> {
  const perPage = params.perPage ?? 12
  const sort = params.sort ?? "updated"
  const data: GitHubRepo[] = await safeFetch(
    `https://api.github.com/users/${username}/repos?per_page=${perPage}&sort=${sort}`
  )
  // Prefer repositories with description and stars
  return data
    .filter((r) => !r.name.startsWith("."))
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
}

export async function fetchProfileReadme(username: string): Promise<string | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${username}/${username}/readme`, {
      // ask for raw content
      headers: { Accept: "application/vnd.github.v3.raw" },
      next: { revalidate: 300 },
    })
    if (!res.ok) return null
    return await res.text()
  } catch {
    return null
  }
}

export function parseBioFromReadme(readme: string | null): string | null {
  if (!readme) return null
  
  const lines = readme.split(/\r?\n/)
  
  // Find the section after "# **Hello, I'm Tanuki**" and before contact information
  let startIndex = -1
  let endIndex = -1
  
  // Find start: look for "# **Hello, I'm Tanuki**" or similar patterns
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line.match(/^#\s*\*\*.*[Hh]ello.*[Ii]'m.*\*\*/) || 
        line.match(/^#\s*\*\*.*[Tt]anuki.*\*\*/) ||
        line.match(/^#\s*.*[Hh]ello.*[Ii]'m.*/) ||
        line.match(/^#\s*.*[Tt]anuki.*/)) {
      startIndex = i + 1
      break
    }
  }
  
  if (startIndex === -1) return null
  
  // Find end: look for contact information or next major heading
  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line.match(/^#{1,2}\s*(contact|reach|connect|social|links)/i) ||
        line.match(/^#{1,2}\s*(email|phone|linkedin|github|twitter)/i) ||
        line.match(/^#{1,2}\s*.*[Cc]ontact.*/) ||
        line.match(/^#{1,2}\s*.*[Rr]each.*/) ||
        line.match(/^#{1,2}\s*.*[Cc]onnect.*/)) {
      endIndex = i
      break
    }
  }
  
  // If no end found, take next 20 lines
  if (endIndex === -1) {
    endIndex = Math.min(startIndex + 20, lines.length)
  }
  
  // Extract content between start and end
  const bioLines: string[] = []
  for (let i = startIndex; i < endIndex; i++) {
    const line = lines[i].trim()
    
    // Skip empty lines and headers
    if (!line || line.startsWith("#")) continue
    
    // Skip images
    if (line.match(/^<img/) || line.match(/^!\[/)) continue
    
    // Skip common contact patterns
    if (line.match(/^(email|phone|linkedin|github|twitter|discord|telegram)/i)) continue
    
    bioLines.push(line)
  }
  
  if (bioLines.length === 0) return null
  
  // Process markdown lists and convert to readable format
  const processedLines: string[] = []
  for (const line of bioLines) {
    // Handle markdown list items (>, +, -, *)
    if (line.match(/^[>\+\-\*]\s+/)) {
      const content = line.replace(/^[>\+\-\*]\s+/, '').trim()
      if (content) {
        // Remove any remaining + symbols from the content
        const cleanContent = content.replace(/^\+\s*/, '').trim()
        processedLines.push(`• ${cleanContent}`)
      }
    } else {
      processedLines.push(line)
    }
  }
  
  // Join lines with proper formatting
  let bio = processedLines.join('\n').trim()
  
  // Remove markdown formatting
  bio = bio.replace(/\*\*(.*?)\*\*/g, '$1') // Bold
  bio = bio.replace(/\*(.*?)\*/g, '$1') // Italic
  bio = bio.replace(/`(.*?)`/g, '$1') // Code
  bio = bio.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Links
  
  return bio.length > 10 ? bio : null
}

export function parseTechStackFromReadme(readme: string | null): string[] {
  if (!readme) return []
  const lines = readme.split(/\r?\n/)
  // find heading that contains "tech stack"
  let start = -1
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].toLowerCase().trim()
    if ((l.startsWith("##") || l.startsWith("#")) && l.includes("tech stack")) {
      start = i + 1
      break
    }
  }
  // fallback: find first occurrence anywhere and take next 40 lines
  if (start === -1) {
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].toLowerCase().includes("tech stack")) {
        start = i + 1
        break
      }
    }
    if (start === -1) return []
  }
  // capture until next heading (or limit window)
  const section: string[] = []
  for (let i = start; i < lines.length; i++) {
    const l = lines[i]
    if (/^#{1,6}\s+/.test(l)) break
    section.push(l)
    if (section.length > 60) break
  }
  const block = section.join("\n")
  const skills = new Set<string>()
  // extract alt text from markdown images
  const imgRe = /!\[([^\]]+)\]\([^\)]+\)/g
  let m: RegExpExecArray | null
  while ((m = imgRe.exec(block))) {
    const name = m[1].trim()
    if (name) skills.add(name)
  }
  // extract alt/title from HTML <img>
  const htmlImgRe = /<img[^>]*(?:alt|title)=["']([^"']+)["'][^>]*>/gi
  while ((m = htmlImgRe.exec(block))) {
    const name = m[1].trim()
    if (name) skills.add(name)
  }
  // extract titles from inline SVG
  const svgTitleRe = /<svg[\s\S]*?<title>([\s\S]*?)<\/title>[\s\S]*?<\/svg>/gi
  while ((m = svgTitleRe.exec(block))) {
    const name = m[1].trim()
    if (name) skills.add(name)
  }
  // extract inline code blocks with tech names
  const codeRe = /`([^`]+)`/g
  while ((m = codeRe.exec(block))) {
    const name = m[1].trim()
    if (name) skills.add(name)
  }
  // extract text inside span or anchor tags (common in custom stacks)
  const tagRe = /<(?:span|a)[^>]*>([\s\S]*?)<\/(?:span|a)>/gi
  while ((m = tagRe.exec(block))) {
    const inner = m[1]
    // strip nested tags
    const text = inner.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").trim()
    if (!text) continue
    // split by common separators
    const parts = text.split(/[,|\/•·;]+/).map((t) => t.trim()).filter(Boolean)
    for (const p of parts) {
      // keep medium-length tokens, ignore long sentences
      if (p.length <= 40) skills.add(p)
    }
  }
  // extract list items words (fallback)
  block
    .split(/\n/)
    .filter((l) => /^[-*]\s+/.test(l))
    .forEach((l) => {
      const t = l.replace(/^[-*]\s+/, "").trim()
      if (!t) return
      t
        .split(/[,|\/•·;]+/)
        .map((x) => x.trim())
        .filter(Boolean)
        .forEach((x) => skills.add(x))
    })
  // final normalization (keep concise tokens; normalize casing for known acronyms)
  const normalize = (s: string) => s.replace(/\s+/g, " ").trim()
  const acronyms = new Set(["C", "C++", "C#", "HTML", "CSS", "SQL", "JS", "TS"])
  const out: string[] = []
  skills.forEach((s) => {
    const v = normalize(s)
    if (!v) return
    if (v.length <= 2 && !acronyms.has(v)) return
    out.push(v)
  })
  return Array.from(new Set(out)).slice(0, 32)
}

export function parseRedditFromReadme(readme: string | null): string | null {
  if (!readme) return null
  
  const lines = readme.split(/\r?\n/)
  
  // Tìm các pattern phổ biến cho Reddit username
  const redditPatterns = [
    /reddit[:\s]*u\/([a-zA-Z0-9_-]+)/i,
    /reddit[:\s]*@([a-zA-Z0-9_-]+)/i,
    /reddit[:\s]*([a-zA-Z0-9_-]+)/i,
    /u\/([a-zA-Z0-9_-]+)/i,
    /reddit\.com\/u\/([a-zA-Z0-9_-]+)/i,
    /reddit\.com\/user\/([a-zA-Z0-9_-]+)/i,
  ]
  
  for (const line of lines) {
    for (const pattern of redditPatterns) {
      const match = line.match(pattern)
      if (match && match[1]) {
        return match[1].trim()
      }
    }
  }
  
  return null
}


