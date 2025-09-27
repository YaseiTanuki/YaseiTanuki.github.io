"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Github } from "lucide-react"
import { ThemeSwitch } from "@/components/ui/theme-switch"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Samples", href: "#samples", mobileHidden: true },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState("home")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.href.slice(1))
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      } else {
        // If no section is active and we're on mobile, default to home
        if (window.innerWidth < 640) {
          setActiveSection("home")
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])


  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${
        isScrolled 
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-lg" 
          : "nav-glass"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between min-w-0">
          <div
            className={`text-base sm:text-lg lg:text-xl font-bold text-foreground truncate min-w-0 nav-text-shadow`}
          >
            YaseiTanuki
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`text-sm font-medium hover:text-primary px-2 py-1 rounded-md whitespace-nowrap nav-text-shadow ${
                  activeSection === item.href.slice(1) ? "text-primary bg-primary/20" : "text-muted-foreground hover:bg-muted/50"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-3">
            <ThemeSwitch />
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open("https://github.com/YaseiTanuki", "_blank")}
              className="text-xs whitespace-nowrap"
            >
              GitHub
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-1 lg:hidden min-w-0">
            <ThemeSwitch />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 flex-shrink-0"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 pb-3 border-t border-border/50 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-2 pt-3">
              {navItems.filter(item => !item.mobileHidden).map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-left text-sm font-medium hover:text-primary px-3 py-2 rounded-md nav-text-shadow ${
                    activeSection === item.href.slice(1) ? "text-primary bg-primary/20" : "text-muted-foreground hover:bg-muted/50"
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-2 border-t border-border/30">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open("https://github.com/YaseiTanuki", "_blank")}
                  className="w-full justify-start text-sm"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub Profile
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
