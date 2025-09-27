"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, Star, GitFork, Eye } from "lucide-react"
import type { GitHubRepo } from "@/lib/github"

type ProjectsProps = {
  repos: GitHubRepo[]
}

const techColors: Record<string, string> = {
  React: "blue",
  "Next.js": "sapphire",
  TypeScript: "lavender",
  JavaScript: "yellow",
  Vue: "green",
  "Vue.js": "green",
  "Node.js": "teal",
  Express: "peach",
  Tailwind: "sky",
  "Tailwind CSS": "sky",
  CSS: "pink",
  CSS3: "pink",
  HTML: "peach",
  PostgreSQL: "blue",
  MongoDB: "green",
  Prisma: "mauve",
  "OpenAI": "flamingo",
  "OpenAI API": "flamingo",
  "Socket.io": "rosewater",
  "Chart.js": "maroon",
  Stripe: "lavender",
  PWA: "teal",
  "Framer Motion": "pink",
}

export function ProjectsSection({ repos }: ProjectsProps) {
  const mapped = repos.map((r) => ({
    id: r.id,
    title: r.name,
    description: r.description ?? "",
    technologies: r.topics && r.topics.length > 0 ? r.topics : r.language ? [r.language] : [],
    githubUrl: r.html_url,
    liveUrl: r.homepage || r.html_url,
    stars: r.stargazers_count,
    forks: r.forks_count,
    watchers: r.watchers_count,
  }))
  
  // Sort by stars (descending) to get most popular projects first
  const sortedByStars = [...mapped].sort((a, b) => b.stars - a.stars)
  const featuredProjects = sortedByStars.slice(0, 2)
  // Limit other projects to a maximum of 6 items (excluding featured ones)
  const otherProjects = sortedByStars.slice(2, 8)

  return (
    <section id="projects" className="py-16 sm:py-20 bg-gradient-to-b from-muted/20 to-background w-full overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-balance">
              Featured <span className="text-blue">Projects</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty px-4">
              Secure-by-default projects and open-source contributions
            </p>
          </div>

          {/* Featured projects */}
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {featuredProjects.map((project) => {
              const accent = techColors[project.technologies[0] as string] || "sapphire"
              const borderAccent = `
                ${accent === "blue" ? "border-blue/40 hover:border-blue/60 hover:shadow-blue/10" : ""}
                ${accent === "sapphire" ? "border-sapphire/40 hover:border-sapphire/60 hover:shadow-sapphire/10" : ""}
                ${accent === "lavender" ? "border-lavender/40 hover:border-lavender/60 hover:shadow-lavender/10" : ""}
                ${accent === "yellow" ? "border-yellow/40 hover:border-yellow/60 hover:shadow-yellow/10" : ""}
                ${accent === "green" ? "border-green/40 hover:border-green/60 hover:shadow-green/10" : ""}
                ${accent === "teal" ? "border-teal/40 hover:border-teal/60 hover:shadow-teal/10" : ""}
                ${accent === "peach" ? "border-peach/40 hover:border-peach/60 hover:shadow-peach/10" : ""}
                ${accent === "sky" ? "border-sky/40 hover:border-sky/60 hover:shadow-sky/10" : ""}
                ${accent === "pink" ? "border-pink/40 hover:border-pink/60 hover:shadow-pink/10" : ""}
                ${accent === "mauve" ? "border-mauve/40 hover:border-mauve/60 hover:shadow-mauve/10" : ""}
                ${accent === "flamingo" ? "border-flamingo/40 hover:border-flamingo/60 hover:shadow-flamingo/10" : ""}
                ${accent === "rosewater" ? "border-rosewater/40 hover:border-rosewater/60 hover:shadow-rosewater/10" : ""}
                ${accent === "maroon" ? "border-maroon/40 hover:border-maroon/60 hover:shadow-maroon/10" : ""}
              `
              const titleAccent = `
                ${accent === "blue" ? "text-blue" : ""}
                ${accent === "sapphire" ? "text-sapphire" : ""}
                ${accent === "lavender" ? "text-lavender" : ""}
                ${accent === "yellow" ? "text-yellow" : ""}
                ${accent === "green" ? "text-green" : ""}
                ${accent === "teal" ? "text-teal" : ""}
                ${accent === "peach" ? "text-peach" : ""}
                ${accent === "sky" ? "text-sky" : ""}
                ${accent === "pink" ? "text-pink" : ""}
                ${accent === "mauve" ? "text-mauve" : ""}
                ${accent === "flamingo" ? "text-flamingo" : ""}
                ${accent === "rosewater" ? "text-rosewater" : ""}
                ${accent === "maroon" ? "text-maroon" : ""}
              `
              return (
              <Card
                key={project.id}
                className={`group bg-card/50 backdrop-blur-sm ${borderAccent}`}
              >
                <CardHeader className="pb-4 p-4 sm:p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-lg sm:text-xl font-bold mb-2 truncate ${titleAccent}`}>
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-xs sm:text-sm mb-4 text-pretty line-clamp-2">{project.description}</p>
                    </div>
                    <Badge variant="secondary" className="bg-blue/20 text-blue border-blue/30 ml-2 text-xs shrink-0">
                      Featured
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className={`text-xs
                          ${techColors[tech] === "blue" ? "border-blue/30 text-blue" : ""}
                          ${techColors[tech] === "sapphire" ? "border-sapphire/30 text-sapphire" : ""}
                          ${techColors[tech] === "lavender" ? "border-lavender/30 text-lavender" : ""}
                          ${techColors[tech] === "yellow" ? "border-yellow/30 text-yellow" : ""}
                          ${techColors[tech] === "green" ? "border-green/30 text-green" : ""}
                          ${techColors[tech] === "teal" ? "border-teal/30 text-teal" : ""}
                          ${techColors[tech] === "peach" ? "border-peach/30 text-peach" : ""}
                          ${techColors[tech] === "sky" ? "border-sky/30 text-sky" : ""}
                          ${techColors[tech] === "pink" ? "border-pink/30 text-pink" : ""}
                          ${techColors[tech] === "mauve" ? "border-mauve/30 text-mauve" : ""}
                          ${techColors[tech] === "flamingo" ? "border-flamingo/30 text-flamingo" : ""}
                          ${techColors[tech] === "rosewater" ? "border-rosewater/30 text-rosewater" : ""}
                          ${techColors[tech] === "maroon" ? "border-maroon/30 text-maroon" : ""}
                        `}
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="outline" className="text-xs text-muted-foreground">
                        +{project.technologies.length - 4}
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-0 p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        {project.stars}
                      </div>
                      <div className="flex items-center">
                        <GitFork className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        {project.forks}
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        {project.watchers}
                      </div>
                    </div>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-md border px-3 py-2 hover:bg-blue/10 hover:border-blue/50 text-xs sm:text-sm w-full sm:w-auto"
                    >
                      <Github className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      Code
                    </a>
                  </div>
                </CardContent>
              </Card>
            )})}
          </div>

          {/* Other projects */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">
              More <span className="text-teal">Projects</span>
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {otherProjects.map((project) => {
              const accent = techColors[project.technologies[0] as string] || "teal"
              const borderAccent = `
                ${accent === "blue" ? "border-blue/40 hover:border-blue/60 hover:shadow-blue/10" : ""}
                ${accent === "sapphire" ? "border-sapphire/40 hover:border-sapphire/60 hover:shadow-sapphire/10" : ""}
                ${accent === "lavender" ? "border-lavender/40 hover:border-lavender/60 hover:shadow-lavender/10" : ""}
                ${accent === "yellow" ? "border-yellow/40 hover:border-yellow/60 hover:shadow-yellow/10" : ""}
                ${accent === "green" ? "border-green/40 hover:border-green/60 hover:shadow-green/10" : ""}
                ${accent === "teal" ? "border-teal/40 hover:border-teal/60 hover:shadow-teal/10" : ""}
                ${accent === "peach" ? "border-peach/40 hover:border-peach/60 hover:shadow-peach/10" : ""}
                ${accent === "sky" ? "border-sky/40 hover:border-sky/60 hover:shadow-sky/10" : ""}
                ${accent === "pink" ? "border-pink/40 hover:border-pink/60 hover:shadow-pink/10" : ""}
                ${accent === "mauve" ? "border-mauve/40 hover:border-mauve/60 hover:shadow-mauve/10" : ""}
                ${accent === "flamingo" ? "border-flamingo/40 hover:border-flamingo/60 hover:shadow-flamingo/10" : ""}
                ${accent === "rosewater" ? "border-rosewater/40 hover:border-rosewater/60 hover:shadow-rosewater/10" : ""}
                ${accent === "maroon" ? "border-maroon/40 hover:border-maroon/60 hover:shadow-maroon/10" : ""}
              `
              const titleAccent = `
                ${accent === "blue" ? "text-blue" : ""}
                ${accent === "sapphire" ? "text-sapphire" : ""}
                ${accent === "lavender" ? "text-lavender" : ""}
                ${accent === "yellow" ? "text-yellow" : ""}
                ${accent === "green" ? "text-green" : ""}
                ${accent === "teal" ? "text-teal" : ""}
                ${accent === "peach" ? "text-peach" : ""}
                ${accent === "sky" ? "text-sky" : ""}
                ${accent === "pink" ? "text-pink" : ""}
                ${accent === "mauve" ? "text-mauve" : ""}
                ${accent === "flamingo" ? "text-flamingo" : ""}
                ${accent === "rosewater" ? "text-rosewater" : ""}
                ${accent === "maroon" ? "text-maroon" : ""}
              `
              return (
              <Card
                key={project.id}
                className={`group bg-card/30 backdrop-blur-sm ${borderAccent}`}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className={`font-semibold text-sm sm:text-base truncate flex-1 min-w-0 ${titleAccent}`}>{project.title}</h4>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-6 w-6 sm:h-8 sm:w-8 p-0 hover:bg-teal/10 shrink-0 ml-2 inline-flex items-center justify-center rounded-md"
                    >
                      <Github className="h-3 w-3 sm:h-4 sm:w-4" />
                    </a>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 text-pretty line-clamp-2">{project.description}</p>

                  <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                    {project.technologies.slice(0, 2).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs bg-muted/50">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 2 && (
                      <Badge variant="secondary" className="text-xs bg-muted/50">
                        +{project.technologies.length - 2}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 mr-1" />
                      {project.stars}
                    </div>
                    <div className="flex items-center">
                      <GitFork className="h-3 w-3 mr-1" />
                      {project.forks}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )})}
          </div>

          {/* View more button */}
          <div className="text-center mt-8 sm:mt-12">
            <a
              href="https://github.com/YaseiTanuki"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border-2 border-sapphire text-sapphire hover:bg-sapphire hover:text-background px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base"
            >
              <Github className="mr-2 h-4 w-4" />
              View All Projects on GitHub
              <ExternalLink className="ml-2 h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}