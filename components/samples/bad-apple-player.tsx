"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw, Square, Music } from "lucide-react"

// Bad Apple Player Component - Real Video Processing
export function BadApplePlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentFrame, setCurrentFrame] = useState(0)
  const fps = 30
  const width = 60
  const height = 20
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [frames, setFrames] = useState<string[][]>([])
  const [chunkIndex, setChunkIndex] = useState(0)
  const [chunks, setChunks] = useState<{ file: string; count: number }[]>([])
  const framesLengthRef = useRef(0)
  const chunkIndexRef = useRef(0)
  const chunksRef = useRef<{ file: string; count: number }[]>([])
  const isLoadingChunkRef = useRef(false)
  const loadedChunksRef = useRef<Set<number>>(new Set()) // Track loaded chunks
  const startTimeRef = useRef<number | null>(null)
  const rafIdRef = useRef<number | null>(null)
  const isPlayingRef = useRef(false)
  const currentFrameRef = useRef(0)
  const [loadingStatus, setLoadingStatus] = useState<string>("")
  const [loadError, setLoadError] = useState<string>("")

  useEffect(() => {
    framesLengthRef.current = frames.length
  }, [frames.length])

  useEffect(() => {
    chunkIndexRef.current = chunkIndex
  }, [chunkIndex])

  useEffect(() => {
    chunksRef.current = chunks
  }, [chunks])

  // ASCII character mapping
  const getAsciiChar = (intensity: number) => {
    const chars = [' ', '.', ':', ';', 'o', 'x', '%', '#', '#']
    const index = Math.floor(intensity * (chars.length - 1))
    return chars[Math.max(0, Math.min(chars.length - 1, index))]
  }

  // Fallback animation when video is not available
  const generateFallbackFrame = (frameNumber: number) => {
    const frame = []
    const time = frameNumber / fps
    
    for (let y = 0; y < height; y++) {
      let line = ''
      for (let x = 0; x < width; x++) {
        const normalizedX = x / width
        const normalizedY = y / height
        
        // Create Bad Apple-like patterns
        let intensity = 0
        if (time < 10) {
          // Opening scene
          const centerX = 0.5
          const centerY = 0.5
          const dist = Math.sqrt((normalizedX - centerX) ** 2 + (normalizedY - centerY) ** 2)
          const fade = Math.max(0, 1 - dist * 3)
          const pulse = Math.sin(time * 2) * 0.3 + 0.7
          intensity = fade * pulse
        } else if (time < 30) {
          // Character scene
          const wave1 = Math.sin((normalizedX + time * 0.5) * Math.PI * 2) * 0.3
          const wave2 = Math.cos((normalizedY + time * 0.3) * Math.PI * 2) * 0.2
          const combined = (wave1 + wave2 + 1) / 2
          const outline = Math.abs(normalizedX - 0.5) < 0.3 && Math.abs(normalizedY - 0.5) < 0.4 ? 0.8 : 0.2
          intensity = Math.max(combined, outline)
        } else {
          // Action scene
          const pattern1 = Math.sin((normalizedX + time) * Math.PI * 4) * Math.cos((normalizedY + time * 0.7) * Math.PI * 3)
          const pattern2 = Math.sin((normalizedX - time * 0.5) * Math.PI * 2) * Math.sin((normalizedY - time * 0.3) * Math.PI * 2)
          intensity = Math.abs(pattern1 + pattern2) / 2
        }
        
        const asciiChar = getAsciiChar(intensity)
        line += asciiChar
      }
      frame.push(line)
    }
    
    return frame
  }

  const preloadNextChunk = async () => {
    try {
      if (isLoadingChunkRef.current) return
      const localChunks = chunksRef.current
      const localIdx = chunkIndexRef.current
      if (localChunks.length === 0 || localIdx >= localChunks.length) return
      
      // Check if this chunk is already loaded
      if (loadedChunksRef.current.has(localIdx)) return
      
      isLoadingChunkRef.current = true
      setLoadingStatus(`Loading ${localIdx + 1}/${localChunks.length}...`)
      const chunkFile = localChunks[localIdx].file
      const res = await fetch(`/frames/${chunkFile}`)
      if (!res.ok) throw new Error(`Failed to load ${chunkFile}`)
      const json = await res.json()
      const newFrames: string[][] = json.frames || []
      setFrames(prev => [...prev, ...newFrames])
      setChunkIndex(prev => prev + 1)
      loadedChunksRef.current.add(localIdx) // Mark as loaded
    } catch (e) {
      console.error('Failed to load chunk', e)
      setLoadError('Failed to load frames chunk')
    } finally {
      isLoadingChunkRef.current = false
      setLoadingStatus("")
    }
  }

  const startPlaybackLoop = () => {
    // Real-time scheduler using RAF to reduce drift
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    startTimeRef.current = performance.now()
    currentFrameRef.current = 0
    let lastUpdateTime = 0
    const minUpdateInterval = 1000 / fps // Minimum time between updates
    
    const tick = () => {
      const now = performance.now()
      const total = framesLengthRef.current
      
      if (total > 0 && startTimeRef.current != null) {
        const elapsedSec = (now - startTimeRef.current) / 1000
        const targetIndex = Math.floor(elapsedSec * fps)
        
        // Preload early when close to buffer end (load more frames proactively)
        if (targetIndex >= total - 30 && chunkIndexRef.current < chunksRef.current.length && !isLoadingChunkRef.current) {
          void preloadNextChunk()
        }
        
        // Also try to load next chunk if we're getting close to the end of current buffer
        if (targetIndex >= total - 10 && chunkIndexRef.current < chunksRef.current.length && !isLoadingChunkRef.current) {
          void preloadNextChunk()
        }

        // Recovery: if we've already hit the last available frame but there are more chunks, force preload
        if (targetIndex >= total - 1 && chunkIndexRef.current < chunksRef.current.length && !isLoadingChunkRef.current) {
          void preloadNextChunk()
        }
        
        const maxIndex = Math.max(0, total - 1)
        const clamped = Math.min(targetIndex, maxIndex)
        
        // Only update if frame actually changed AND enough time has passed
        if (clamped !== currentFrameRef.current && (now - lastUpdateTime) >= minUpdateInterval) {
          currentFrameRef.current = clamped
          setCurrentFrame(clamped)
          lastUpdateTime = now
        }

        // Auto-stop when we've reached the last frame and there are no more chunks
        const noMoreChunks = chunkIndexRef.current >= (chunksRef.current?.length || 0)
        if (noMoreChunks && clamped >= maxIndex) {
          // ensure the very last frame is displayed
          if (currentFrameRef.current !== maxIndex) {
            currentFrameRef.current = maxIndex
            setCurrentFrame(maxIndex)
          }
          isPlayingRef.current = false
          setIsPlaying(false)
          return
        }
      }
      
      if (isPlayingRef.current) {
        rafIdRef.current = requestAnimationFrame(tick)
      }
    }
    rafIdRef.current = requestAnimationFrame(tick)
  }

  const play = () => {
    if (isPlaying) return

    setIsPlaying(true)
    isPlayingRef.current = true
    setFrames([])
    setCurrentFrame(0)
    // Reset chunk loading state for reliable replays
    loadedChunksRef.current.clear()
    setChunkIndex(0)
    chunkIndexRef.current = 0
    isLoadingChunkRef.current = false
    
    // Always use pre-generated frames (chunk mode)
    ;(async () => {
      try {
        const res = await fetch('/frames/index.json')
        if (!res.ok) throw new Error('index.json not found')
        const meta = await res.json()
        setChunks(meta.chunks || [])
        setChunkIndex(0)
        // load first chunk synchronously
        if (meta.chunks && meta.chunks.length > 0) {
          const first = meta.chunks[0].file
          const r = await fetch(`/frames/${first}`)
          if (!r.ok) throw new Error(`Failed to load ${first}`)
          const j = await r.json()
          const firstFrames: string[][] = j.frames || []
          setFrames(firstFrames)
          setCurrentFrame(0)
          setChunkIndex(1)
          loadedChunksRef.current.add(0) // Mark first chunk as loaded
          startPlaybackLoop()
          // Immediately queue more preloads to avoid initial stall around first chunk boundary
          setTimeout(() => { if (!isLoadingChunkRef.current) void preloadNextChunk() }, 0)
          setTimeout(() => { if (!isLoadingChunkRef.current) void preloadNextChunk() }, 100)
        } else {
          // fallback animation if no chunks
          let frameCounter = 0
          intervalRef.current = setInterval(() => {
            const frame = generateFallbackFrame(frameCounter)
            setFrames(prev => {
              const nf = [...prev, frame]
              setCurrentFrame(nf.length - 1)
              return nf
            })
            frameCounter++
          }, 1000 / fps)
        }
      } catch (e) {
        console.warn('Chunk mode failed, using fallback animation', e)
        let frameCounter = 0
        intervalRef.current = setInterval(() => {
          const frame = generateFallbackFrame(frameCounter)
          setFrames(prev => {
            const nf = [...prev, frame]
            setCurrentFrame(nf.length - 1)
            return nf
          })
          frameCounter++
        }, 1000 / fps)
      }
    })()
  }

  // Start RAF loop once frames are present (in case network delay finished after Play)
  useEffect(() => {
    if (isPlaying && frames.length > 0 && !rafIdRef.current) {
      startPlaybackLoop()
    }
  }, [isPlaying, frames.length])

  const stop = () => {
    setIsPlaying(false)
    isPlayingRef.current = false
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
  }

  const reset = () => {
    stop()
    setFrames([])
    setCurrentFrame(0)
    currentFrameRef.current = 0
    loadedChunksRef.current.clear()
    setChunkIndex(0)
    chunkIndexRef.current = 0
    isLoadingChunkRef.current = false
    setLoadingStatus("")
    setLoadError("")
  }

  return (
    <div className="p-6 space-y-4">
      {/* Using pre-generated frames only; no video element needed */}

      <div className="flex gap-2 justify-center">
        <Button
          onClick={reset}
          variant="outline"
          size="sm"
          className="flex items-center h-9 px-4"
        >
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset
        </Button>
        {isPlaying ? (
          <Button
            onClick={stop}
            size="sm"
            variant="destructive"
            className="flex items-center h-9 px-4"
          >
            <Square className="h-4 w-4 mr-1" />
            Stop
          </Button>
        ) : (
          <Button
            onClick={play}
            size="sm"
            className="bg-mauve hover:bg-mauve/80 text-background h-9 px-4"
          >
            <Music className="h-4 w-4 mr-1" />
            Play
          </Button>
        )}
      </div>

      {/* Small note about theme preference */}
      <div className="text-center text-xs text-muted-foreground -mt-2">
        Note: Bad Apple ASCII Player works best on dark theme.
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Frame: <span className="font-code font-bold text-lavender dark:text-lavender">
              {currentFrame + 1}/{frames.length}
            </span>
          </span>
          <span className="text-sm text-muted-foreground">
            Status: <span className={isPlaying ? "text-green dark:text-green" : "text-muted-foreground"}>
              {isPlaying ? "Playing" : "Stopped"}
            </span>
          </span>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4 min-h-[400px] flex items-center justify-center">
          <div className="text-center w-full">
            {frames.length > 0 ? (
              <pre className="text-xs font-code text-black dark:text-white leading-tight whitespace-pre-wrap bg-white dark:bg-black p-4 rounded border border-gray-300 dark:border-gray-600">
                {(frames[currentFrame] || frames[frames.length - 1]).join('\n')}
              </pre>
            ) : (
              <div className="text-muted-foreground">Click Play to start Bad Apple ASCII conversion</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
