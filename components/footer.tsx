"use client"

import { Github, Mail, Cat, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-t from-muted/20 to-background py-12 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-primary mb-2">YaseiTanuki</h3>
              <p className="text-muted-foreground text-sm">
                Security-focused engineer building robust, privacy-first web experiences.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#about" className="block text-sm text-muted-foreground hover:text-primary ">
                  About
                </a>
                <a
                  href="#projects"
                  className="block text-sm text-muted-foreground hover:text-primary "
                >
                  Projects
                </a>
                <a href="#samples" className="block text-sm text-muted-foreground hover:text-primary ">
                  Code Samples
                </a>
              </div>
            </div>

            {/* Contact */}
            <div className="text-center md:text-right">
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex justify-center md:justify-end space-x-4">
                <a
                  href="https://github.com/YaseiTanuki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-lavender"
                  title="GitHub Profile"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href="https://x.com/YaseiTanuki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-blue"
                  title="X (Twitter)"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">X (Twitter)</span>
                </a>
                <a
                  href="https://reddit.com/u/YaseiTanuki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-orange-500"
                  title="Reddit Profile"
                >
                  <Cat className="h-5 w-5" />
                  <span className="sr-only">Reddit</span>
                </a>
                <a
                  href="mailto:github.tanuki@gmail.com"
                  className="text-muted-foreground hover:text-green"
                  title="Send Email"
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
