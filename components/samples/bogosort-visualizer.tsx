"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw, Square, Shuffle } from "lucide-react"

// Bogosort Visualizer Component
export function BogosortVisualizer() {
  const [array, setArray] = useState([3, 1, 4, 1, 5, 9, 2, 6])
  const [isRunning, setIsRunning] = useState(false)
  const [steps, setSteps] = useState(0)
  const [inputValue, setInputValue] = useState("3,1,4,1,5,9,2,6")
  const shouldStopRef = useRef(false)

  const isSorted = (arr: number[]): boolean => {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) return false
    }
    return true
  }

  const shuffleArray = <T,>(arr: T[]): T[] => {
    const shuffled = [...arr]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const bogosort = async (arr: number[], onUpdate: (newArr: number[], step: number) => void) => {
    let current = [...arr]
    let stepCount = 0
    
    while (!isSorted(current) && !shouldStopRef.current) {
      current = shuffleArray(current)
      stepCount++
      onUpdate(current, stepCount)
      
      await new Promise(resolve => setTimeout(resolve, 200))
    }
    
    return current
  }

  const startSorting = async () => {
    setIsRunning(true)
    setSteps(0)
    shouldStopRef.current = false
    
    await bogosort(array, (newArr, step) => {
      setArray(newArr)
      setSteps(step)
    })
    
    setIsRunning(false)
  }

  const stopSorting = () => {
    shouldStopRef.current = true
    setIsRunning(false)
  }

  const resetArray = () => {
    const newArray = inputValue.split(',').map(x => parseInt(x.trim())).filter(x => !isNaN(x))
    if (newArray.length > 0) {
      setArray(newArray)
      setSteps(0)
      shouldStopRef.current = false
      setIsRunning(false)
    }
  }

  // Auto-reset when input changes
  useEffect(() => {
    if (inputValue.trim()) {
      resetArray()
    }
  }, [inputValue])

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-end gap-4 flex-nowrap overflow-x-auto">
        <div className="flex-1 min-w-0">
          <label className="text-sm font-medium mb-2 block text-white dark:text-white">Array (comma-separated):</label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full h-9 px-3 border border-border rounded-md bg-background text-foreground dark:text-white"
            placeholder="3,1,4,1,5,9,2,6"
            disabled={isRunning}
          />
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Button
            onClick={resetArray}
            variant="outline"
            size="sm"
            disabled={isRunning}
            className="flex items-center h-9 px-4"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
          {isRunning ? (
            <Button
              onClick={stopSorting}
              size="sm"
              variant="destructive"
              className="flex items-center h-9 px-4"
            >
              <Square className="h-4 w-4 mr-1" />
              Stop
            </Button>
          ) : (
            <Button
              onClick={startSorting}
              size="sm"
              className="bg-mauve hover:bg-mauve/80 text-background h-9 px-4"
            >
              <Shuffle className="h-4 w-4 mr-1" />
              Start
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Steps: <span className="font-code font-bold text-lavender dark:text-lavender">{steps}</span>
          </span>
          <span className="text-sm text-muted-foreground">
            Status: <span className={isSorted(array) ? "text-green dark:text-green" : "text-yellow dark:text-yellow"}>
              {isSorted(array) ? "Sorted!" : isRunning ? "Sorting..." : "Unsorted"}
            </span>
          </span>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4">
        <div className="flex gap-2 flex-wrap">
          {array.map((value, index) => (
            <div
              key={`${value}-${index}`}
              className={`
                w-12 h-12 flex items-center justify-center rounded-lg font-bold text-sm
                transform hover:scale-110
                ${isSorted(array) 
                  ? "bg-green dark:bg-green text-white dark:text-white glow-green" 
                  : "bg-blue dark:bg-blue text-white dark:text-white"
                }
              `}
            >
              {value}
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}
