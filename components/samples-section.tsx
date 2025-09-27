"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Eye } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SyntaxHighlighter } from "@/components/syntax-highlighter"
import { codeSamples } from "@/components/samples/sample-data"
import { BadApplePlayer } from "@/components/samples/bad-apple-player"
import { BogosortVisualizer } from "@/components/samples/bogosort-visualizer"
import { PythonRunner } from "@/components/samples/python-runner"

export function SamplesSection({ preHighlightedDark, preHighlightedLight }: { preHighlightedDark?: Record<string, string>, preHighlightedLight?: Record<string, string> }) {
  const [activeSample, setActiveSample] = useState(codeSamples[0])
  const [activeTab, setActiveTab] = useState("code")
  return (
    <section id="samples" className="py-16 sm:py-20 bg-gradient-to-b from-background to-muted/20 w-full overflow-hidden hidden sm:block">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-balance">
              Code <span className="text-mauve">Samples</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty px-4">
              Interactive code examples showcasing modern development patterns and best practices
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="lg:col-span-1 order-2 lg:order-1">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="p-4 sm:p-6">
                  <h3 className="font-semibold flex items-center text-sm sm:text-base">
                    <Code className="h-4 w-4 mr-2 text-mauve" />
                    Examples
                  </h3>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {codeSamples.map((sample) => (
                      <button
                        key={sample.id}
                        onClick={() => setActiveSample(sample)}
                        className={`w-full text-left p-3 sm:p-4 rounded-lg ${
                          activeSample.id === sample.id
                            ? "bg-mauve/20 text-mauve border-l-2 border-mauve"
                            : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <div className="font-medium text-xs sm:text-sm mb-1 text-gray-900 dark:text-gray-100 truncate">{sample.title}</div>
                        <div className="text-xs opacity-75 text-pretty text-gray-700 dark:text-gray-300 line-clamp-2">{sample.description}</div>
                        <Badge variant="secondary" className="mt-2 text-xs bg-muted/50">
                          {sample.language}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3 order-1 lg:order-2">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-gray-100 truncate">{activeSample.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1 text-gray-700 dark:text-gray-300 line-clamp-2">{activeSample.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 p-4 sm:p-6">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="px-2 sm:px-4">
                      <TabsList className="grid w-full grid-cols-2 bg-muted/30">
                        <TabsTrigger value="code" className="flex items-center text-xs sm:text-sm">
                          <Code className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          Code
                        </TabsTrigger>
                        <TabsTrigger value="preview" className="flex items-center text-xs sm:text-sm">
                          <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          Preview
                        </TabsTrigger>
                      </TabsList>
                    </div>
                    <TabsContent value="code" className="mt-0">
                      <div className="p-2 sm:p-4 overflow-x-auto text-xs sm:text-sm font-code leading-relaxed">
                        <SyntaxHighlighter 
                          code={activeSample.code}
                          language={activeSample.language || "javascript"}
                          className="text-gray-900 dark:text-gray-100"
                          prerenderedHtmlDark={preHighlightedDark?.[activeSample.id]}
                          prerenderedHtmlLight={preHighlightedLight?.[activeSample.id]}
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="preview" className="mt-0">
                      {activeSample.id === "bad-apple-player" ? (
                        <div className="code-preview rounded-b-lg">
                          <BadApplePlayer />
                        </div>
                      ) : activeSample.id === "bogosort-visualizer" ? (
                        <div className="code-preview rounded-b-lg">
                          <BogosortVisualizer />
                        </div>
                      ) : activeSample.id === "python-overengineering" ? (
                        <div className="code-preview rounded-b-lg">
                          <PythonRunner />
                        </div>
                      ) : (
                        <div className="p-4 text-xs sm:text-sm text-muted-foreground">No preview available.</div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
