"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw, Terminal } from "lucide-react"

// Python Runner Component
export function PythonRunner() {
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const outputRef = useRef("")

  const runPythonCode = async () => {
    if (isRunning) return
    setIsRunning(true)
    setOutput("")
    outputRef.current = ""
    
    // Simulate Python execution with cinematic step-by-step output
    const steps = [
      "Booting anti-dimension core...",
      "Arming metaclass annihilators...",
      "Engraving forbidden sigils...",
      "Summoning async wraiths...",
      "Spawning thread sentinels...",
      "Tearing rifts across timelines...",
      "Collapsing causality check...",
      "Triggering main cataclysm...",
      "Routing power through the Facade obelisk...",
      "Event horizon reached..."
    ]
    // Match the sample code: keep encoded strings inside the UI code as well
    const encodedSteps = [
      "Qm9vdGluZyBhbnRpLWRpbWVuc2lvbiBjb3JlLi4u",
      "QXJtaW5nIG1ldGFjbGFzcyBhbm5paGlsYXRvcnMuLi4=",
      "RW5ncmF2aW5nIGZvcmJpZGRlbiBzaWdpbHMuLi4=",
      "U3VtbW9uaW5nIGFzeW5jIHdyYWl0aHMuLi4=",
      "U3Bhd25pbmcgdGhyZWFkIHNlbnRpbmVscy4uLg==",
      "VGVhcmluZyByaWZ0cyBhY3Jvc3MgdGltZWxpbmVzLi4u",
      "Q29sbGFwc2luZyBjYXVzYWxpdHkgY2hlY2suLi4=",
      "VHJpZ2dlcmluZyBtYWluIGNhdGFjbHlzbS4uLg==",
      "Um91dGluZyBwb3dlciB0aHJvdWdoIHRoZSBGYWNhZGUgb2JlbGlzay4uLg==",
      "RXZlbnQgaG9yaXpvbiByZWFjaGVkLi4u",
    ]
    
    const sleep = (ms: number) => new Promise(res => setTimeout(res, ms))
    const append = (text: string) => {
      outputRef.current += text
      setOutput(outputRef.current)
    }
    const printWithProgress = async (label: string) => {
      const totalBars = 20
      // base string before this step begins
      const base = outputRef.current
      for (let i = 0; i <= totalBars; i++) {
        await sleep(120)
        const bar = '#'.repeat(Math.max(0, i)) + '-'.repeat(Math.max(0, totalBars - i))
        const pct = Math.round((i / totalBars) * 100)
        const line = `${label} [${bar}] ${pct}%`
        const next = base + line
        outputRef.current = next
        setOutput(next)
      }
      // finalize line break between steps
      append('\n')
    }

    for (const step of encodedSteps) {
      // decode for display
      const bytes = Uint8Array.from(atob(step), c => c.charCodeAt(0))
      const decoded = new TextDecoder().decode(bytes)
      await printWithProgress(decoded)
    }
    
    // Final output
    const syllables = [
      "va","lo","ri","an","ka","th","ra","zu","mi","on","el","ar","ta","shi","no","qu","dra","fen","mor","bel","nar","sil","ther","ix","ul","ae","or","in","al","is","en"
    ]
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
    const generateDimensionName = () => {
      const parts = 2 + Math.floor(Math.random() * 2) // 2-3 syllables
      let name = ""
      for (let i = 0; i < parts; i++) {
        name += syllables[Math.floor(Math.random() * syllables.length)]
      }
      return capitalize(name)
    }
    const dim = generateDimensionName()
    const variants = [
      `dimension ${dim} has been destroyed.`,
      `${dim} dimension has been destroyed.`,
    ]
    let line = variants[Math.floor(Math.random() * variants.length)]
    // Capitalize first letter for dramatic effect
    if (line.length > 0) {
      line = line[0].toUpperCase() + line.slice(1)
    }
    append(`\n${line}\nYou have successfully destroyed a far dimension.`)
    setIsRunning(false)
  }

  const clearOutput = () => {
    setOutput("")
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-end gap-2 flex-nowrap">
        <div className="flex gap-2 flex-shrink-0">
          <Button
            onClick={clearOutput}
            variant="outline"
            size="sm"
            disabled={isRunning}
            className="flex items-center h-9 px-4"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Clear
          </Button>
          <Button
            onClick={runPythonCode}
            disabled={isRunning}
            size="sm"
            className="bg-mauve hover:bg-mauve/80 text-background h-9 px-4"
          >
            <Terminal className="h-4 w-4 mr-1" />
            {isRunning ? "Running..." : "Run Python"}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Status: <span className={isRunning ? "text-yellow dark:text-yellow" : "text-green dark:text-green"}>
              {isRunning ? "Executing..." : "Ready"}
            </span>
          </span>
          <span className="text-sm text-muted-foreground">
            Language: <span className="font-code font-bold text-blue dark:text-blue">Python 3</span>
          </span>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4 min-h-[200px]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-red dark:bg-red"></div>
            <div className="w-3 h-3 rounded-full bg-yellow dark:bg-yellow"></div>
            <div className="w-3 h-3 rounded-full bg-green dark:bg-green"></div>
            <span className="text-sm text-muted-foreground ml-2">Terminal</span>
          </div>
          <pre className="text-sm font-code text-black dark:text-white whitespace-pre-wrap overflow-x-auto bg-white dark:bg-black p-3 rounded border border-gray-300 dark:border-gray-600">
            {output || "Press 'Run Python' to execute the Anti Dimension Script and begin the sequence..."}
          </pre>
        </div>
      </div>
    </div>
  )
}
