"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Code, Palette, Database, Globe } from "lucide-react"

type AboutProps = {
  name: string
  location?: string
  bio?: string
  readmeBio?: string
  stats?: { repos: number; followers: number; following: number }
  timelineItems?: Array<{ year: string; title: string; company?: string; description?: string; current?: boolean }>
  skills?: string[]
}

const defaultSkills = [
  { name: "React", category: "Frontend", color: "blue" },
  { name: "Next.js", category: "Frontend", color: "blue" },
  { name: "TypeScript", category: "Language", color: "sapphire" },
  { name: "JavaScript", category: "Language", color: "sapphire" },
  { name: "Node.js", category: "Backend", color: "green" },
  { name: "Python", category: "Language", color: "sapphire" },
  { name: "PostgreSQL", category: "Database", color: "teal" },
  { name: "MongoDB", category: "Database", color: "teal" },
  { name: "Tailwind CSS", category: "Styling", color: "lavender" },
  { name: "Figma", category: "Design", color: "pink" },
  { name: "Git", category: "Tools", color: "peach" },
  { name: "Docker", category: "DevOps", color: "mauve" },
]

const emptyTimeline: Array<{ year: string; title: string; company?: string; description?: string; current?: boolean }> = []

export function AboutSection({ name, location, bio, readmeBio, stats, timelineItems, skills }: AboutProps) {
  return (
    <section id="about" className="py-16 sm:py-20 bg-gradient-to-b from-background to-muted/20 w-full overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-balance">
              About <span className="text-lavender">{name}</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty px-4">
              {bio || "Security-focused engineer building robust, privacy-first applications."}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {/* Profile card */}
            <div className="lg:col-span-1">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-lavender/50">
                <CardContent className="p-6 sm:p-8">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-gradient-to-br from-lavender to-blue p-1 glow-lavender mb-4">
                      <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                        <img 
                          src="https://github.com/YaseiTanuki.png" 
                          alt="YaseiTanuki Avatar" 
                          className="w-full h-full object-cover rounded-full"
                          onError={(e) => {
                            // Fallback to YT text if image fails to load
                            e.currentTarget.style.display = 'none'
                            const sibling = e.currentTarget.nextElementSibling as HTMLElement | null
                            if (sibling) {
                              sibling.style.display = 'flex'
                            }
                          }}
                        />
                        <span className="text-xl sm:text-2xl font-bold text-primary hidden">YT</span>
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">{name}</h3>
                    <p className="text-muted-foreground mb-4 text-sm sm:text-base">Developer</p>

                    <div className="flex items-center justify-center text-xs sm:text-sm text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      {location || "Worldwide"}
                    </div>
                    <div className="flex items-center justify-center text-xs sm:text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      Open to opportunities
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center text-xs sm:text-sm">
                      <Code className="h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3 text-blue" />
                      <span>{stats ? `${stats.repos}+ repos` : "GitHub projects"}</span>
                    </div>
                    <div className="flex items-center text-xs sm:text-sm">
                      <Palette className="h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3 text-pink" />
                      <span>Security focused</span>
                    </div>
                    <div className="flex items-center text-xs sm:text-sm">
                      <Database className="h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3 text-teal" />
                      <span>{stats ? `${stats.followers} followers` : "Full-stack expertise"}</span>
                    </div>
                    <div className="flex items-center text-xs sm:text-sm">
                      <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3 text-green" />
                      <span>Remote collaboration</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Skills and description */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center">
                    <Code className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-lavender" />
                    About
                  </h3>
                  <div className="prose prose-sm sm:prose-lg max-w-none text-foreground [&>*]:text-foreground [&_p]:text-foreground [&_div]:text-foreground" style={{ color: 'var(--foreground)' }}>
                    {readmeBio ? (
                      <div className="whitespace-pre-line text-sm sm:text-base text-foreground" style={{ color: 'var(--foreground)' }}>{readmeBio}</div>
                    ) : bio ? (
                      <p className="mb-0 text-sm sm:text-base text-foreground" style={{ color: 'var(--foreground)' }}>{bio}</p>
                    ) : (
                      <p className="mb-0 text-sm sm:text-base text-foreground" style={{ color: 'var(--foreground)' }}>
                        Security-focused engineer building robust, privacy-first applications.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center">
                    <Palette className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-pink" />
                    Skills & Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(skills && skills.length > 0
                      ? (() => {
                          const palette = [
                            "blue",
                            "sapphire",
                            "green",
                            "teal",
                            "lavender",
                            "pink",
                            "peach",
                            "mauve",
                          ] as const
                          const colorFor = (label: string) => {
                            let sum = 0
                            for (let i = 0; i < label.length; i++) sum = (sum + label.charCodeAt(i)) | 0
                            return palette[Math.abs(sum) % palette.length]
                          }
                          return skills.map((s) => ({ name: s, color: colorFor(s) }))
                        })()
                      : defaultSkills
                    ).map((skill) => (
                      <Badge
                        key={skill.name}
                        variant="secondary"
                        className={`
                          px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium hover:scale-105
                          ${skill.color === "blue" ? "bg-blue/20 text-blue border-blue/30 hover:bg-blue/30" : ""}
                          ${skill.color === "sapphire" ? "bg-sapphire/20 text-sapphire border-sapphire/30 hover:bg-sapphire/30" : ""}
                          ${skill.color === "green" ? "bg-green/20 text-green border-green/30 hover:bg-green/30" : ""}
                          ${skill.color === "teal" ? "bg-teal/20 text-teal border-teal/30 hover:bg-teal/30" : ""}
                          ${skill.color === "lavender" ? "bg-lavender/20 text-lavender border-lavender/30 hover:bg-lavender/30" : ""}
                          ${skill.color === "pink" ? "bg-pink/20 text-pink border-pink/30 hover:bg-pink/30" : ""}
                          ${skill.color === "peach" ? "bg-peach/20 text-peach border-peach/30 hover:bg-peach/30" : ""}
                          ${skill.color === "mauve" ? "bg-mauve/20 text-mauve border-mauve/30 hover:bg-mauve/30" : ""}
                        `}
                      >
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Timeline */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 flex items-center">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-sapphire" />
                Experience Timeline
              </h3>

              <div className="space-y-6 sm:space-y-8">
                {(timelineItems ?? emptyTimeline).map((item, index) => (
                  <div key={index} className="flex gap-4 sm:gap-6">
                    <div className="flex flex-col items-center">
                      <div
                        className={`
                        w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 
                        ${
                          item.current
                            ? "bg-lavender border-lavender glow-lavender"
                            : "bg-background border-muted-foreground"
                        }
                      `}
                      />
                      {index < (timelineItems ?? emptyTimeline).length - 1 && <div className="w-0.5 h-12 sm:h-16 bg-border mt-2" />}
                    </div>

                    <div className="flex-1 pb-6 sm:pb-8">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <span className="text-xs sm:text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded w-fit">
                          {item.year}
                        </span>
                        {item.current && (
                          <Badge variant="secondary" className="bg-lavender/20 text-lavender border-lavender/30 w-fit text-xs">
                            Current
                          </Badge>
                        )}
                      </div>
                      <h4 className="text-lg sm:text-xl font-semibold mb-1">{item.title}</h4>
                      <p className="text-blue font-medium mb-2 text-sm sm:text-base">
                        {item.company === 'HCM University of Infomation Technology' ? (
                          <a href="https://www.uit.edu.vn/" target="_blank" rel="noopener noreferrer" className="hover:text-blue/80">
                            HCM University of Information Technology
                          </a>
                        ) : (
                          item.company
                        )}
                      </p>
                      <p className="text-muted-foreground text-xs sm:text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
