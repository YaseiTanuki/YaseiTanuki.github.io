import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { readFile } from "fs/promises"
import path from "path"
import { Footer } from "@/components/footer"
import { fetchGitHubUser, fetchUserRepos, fetchProfileReadme, parseTechStackFromReadme, parseBioFromReadme, parseRedditFromReadme } from "@/lib/github"
import { RealtimeTechProvider } from "@/components/realtime-tech-provider"
import { SamplesSection } from "@/components/samples-section"
import { highlightWithShiki } from "@/lib/syntax-highlighting"
import { codeSamples } from "@/components/samples/sample-data"

export default async function Home() {
  const username = "YaseiTanuki"
  const [user, repos, readme] = await Promise.all([
    fetchGitHubUser(username),
    fetchUserRepos(username, { perPage: 18, sort: "updated" }),
    fetchProfileReadme(username),
  ])
  const skillsFromReadme = parseTechStackFromReadme(readme)
  const readmeBio = parseBioFromReadme(readme)
  const redditUsername = parseRedditFromReadme(readme)
  const skillsFromRepos = Array.from(
    new Set(
      repos
        .flatMap((r) => [r.language, ...(r.topics || [])])
        .filter((v): v is string => !!v && v.trim().length > 0)
    )
  ).slice(0, 12)
  const skillsCombined = (skillsFromReadme.length ? skillsFromReadme : skillsFromRepos)

  // Read timeline.json and parse
  async function readTimelineFile(): Promise<Array<{ year: string; title: string; company?: string; current?: boolean }>> {
    try {
      const buf = await readFile(path.join(process.cwd(), "timeline.json"))
      const content = buf.toString("utf-8")
      return JSON.parse(content)
    } catch {
      return []
    }
  }

  const timelineItems = await readTimelineFile()

  // Social links
  const twitterUrl = user.twitter_username ? `https://x.com/${user.twitter_username}` : undefined
  const redditUrl = redditUsername ? `https://reddit.com/u/${redditUsername}` : undefined

  // Pre-highlight sample codes on server to avoid client delay
  const [preDarkEntries, preLightEntries] = await Promise.all([
    Promise.all(
      codeSamples.map(async (s) => {
        const lang = (s.language || "javascript") as string
        const html = await highlightWithShiki(s.code, lang, "catppuccin-mocha")
        return [s.id, html] as const
      })
    ),
    Promise.all(
      codeSamples.map(async (s) => {
        const lang = (s.language || "javascript") as string
        const html = await highlightWithShiki(s.code, lang, "catppuccin-latte")
        return [s.id, html] as const
      })
    )
  ])
  const preHighlightedDark: Record<string, string> = Object.fromEntries(preDarkEntries)
  const preHighlightedLight: Record<string, string> = Object.fromEntries(preLightEntries)

  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection
        name={user.name ?? user.login}
        avatarUrl={user.avatar_url}
        bio={user.bio ?? ""}
        githubUrl={user.html_url}
        websiteUrl={user.blog ?? undefined}
        twitterUrl={twitterUrl}
        redditUrl={redditUrl}
      />
      <RealtimeTechProvider
        initialSkills={skillsCombined}
        user={user}
        timelineItems={timelineItems}
        readmeBio={readmeBio}
      />
      <ProjectsSection repos={repos} />
      <SamplesSection preHighlightedDark={preHighlightedDark} preHighlightedLight={preHighlightedLight} />
      <Footer />
    </main>
  )
}
