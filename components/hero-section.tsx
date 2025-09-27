"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Mail, ExternalLink, Twitter, Cat } from "lucide-react"
import Image from "next/image"

type HeroProps = {
  name: string
  avatarUrl: string
  bio?: string
  githubUrl: string
  websiteUrl?: string
  twitterUrl?: string
  redditUrl?: string
}

export function HeroSection({ name, avatarUrl, bio, githubUrl, websiteUrl, twitterUrl, redditUrl }: HeroProps) {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden w-full max-w-full">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero" />

      {/* Subtle animated background elements - responsive sizing */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-full bg-gradient-to-r from-lavender to-blue blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 sm:w-36 sm:h-36 lg:w-48 lg:h-48 rounded-full bg-gradient-to-r from-teal to-sapphire blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center w-full">
          {/* Avatar - responsive sizing */}
          <div className="mb-6 sm:mb-8">
            <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto rounded-full bg-gradient-to-br from-lavender to-blue p-1 glow-lavender overflow-hidden">
              <Image
                src={avatarUrl}
                alt={`${name} avatar`}
                width={128}
                height={128}
                className="w-full h-full rounded-full object-cover"
                sizes="(max-width: 640px) 80px, (max-width: 1024px) 112px, 128px"
                priority
              />
            </div>
          </div>

          {/* Main heading - responsive typography */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-balance leading-tight">
            <span className="text-foreground">Hi, I'm </span>
            <span className="bg-gradient-to-r from-lavender via-blue to-sapphire bg-clip-text text-transparent">
              {name}
            </span>
          </h1>

          {/* Subtitle - responsive sizing */}
          {bio && (
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 text-balance max-w-2xl mx-auto px-4">
              {bio}
            </p>
          )}

          {/* Short introduction - responsive sizing */}
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground/80 mb-8 sm:mb-12 text-pretty max-w-3xl mx-auto px-4">
            Security-focused engineer crafting robust, privacy-first web applications with modern frameworks, ensuring
            resilient performance and seamless interactions across all devices.
          </p>

          {/* Call-to-action buttons - responsive layout */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16 px-4">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-lavender to-blue hover:from-blue hover:to-sapphire text-background font-semibold px-6 sm:px-8 py-3 rounded-full  glow-blue text-sm sm:text-base"
              onClick={scrollToAbout}
            >
              View My Work
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-2 border-lavender text-lavender hover:bg-lavender hover:text-background px-6 sm:px-8 py-3 rounded-full  bg-transparent text-sm sm:text-base"
              onClick={() => window.open(githubUrl, "_blank")}
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub Profile
              <ExternalLink className="ml-2 h-3 w-3" />
            </Button>
          </div>

          {/* Social links - responsive spacing */}
          <div className="flex justify-center space-x-4 sm:space-x-6">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-lavender p-2"
              title="GitHub Profile"
            >
              <Github className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="sr-only">GitHub</span>
            </a>
            {twitterUrl && (
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-blue p-2"
                title="X (Twitter)"
              >
                <Twitter className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="sr-only">X</span>
              </a>
            )}
            {redditUrl && (
              <a
                href={redditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-orange-500 p-2"
                title="Reddit Profile"
              >
                <Cat className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="sr-only">Reddit</span>
              </a>
            )}
            {websiteUrl ? (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-blue p-2"
                title="Personal Website"
              >
                <ExternalLink className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="sr-only">Website</span>
              </a>
            ) : (
              <a 
                href="mailto:github.tanuki@gmail.com" 
                className="text-muted-foreground hover:text-blue p-2"
                title="Send Email"
              >
                <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="sr-only">Contact</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator - responsive positioning */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
      </div>
    </section>
  )
}
