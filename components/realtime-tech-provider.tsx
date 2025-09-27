"use client"

import { AboutSection } from "@/components/about-section"

type RealtimeTechProviderProps = {
  initialSkills: string[]
  user: {
    name: string | null
    login: string
    location: string | null
    bio: string | null
    public_repos: number
    followers: number
    following: number
  }
  timelineItems: Array<{ year: string; title: string; company?: string; current?: boolean }>
  readmeBio?: string | null
}


export function RealtimeTechProvider({ initialSkills, user, timelineItems, readmeBio }: RealtimeTechProviderProps) {
  return (
    <div className="relative">
      <AboutSection
        name={user.name ?? user.login}
        location={user.location ?? undefined}
        bio={user.bio ?? undefined}
        readmeBio={readmeBio ?? undefined}
        stats={{ repos: user.public_repos, followers: user.followers, following: user.following }}
        timelineItems={timelineItems}
        skills={initialSkills}
      />
    </div>
  )
}
