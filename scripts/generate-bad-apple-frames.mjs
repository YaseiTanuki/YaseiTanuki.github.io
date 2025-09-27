#!/usr/bin/env node
// generate-bad-apple-frames.mjs
// Precompute ASCII frames from a video using ffmpeg + pngjs

import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, rmSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import pkg from 'pngjs'
const { PNG } = pkg

function parseArgs() {
  const args = process.argv.slice(2)
  const opts = {}
  for (let i = 0; i < args.length; i++) {
    const a = args[i]
    if (a === '--in') opts.input = args[++i]
    else if (a === '--out') opts.outDir = args[++i]
    else if (a === '--fps') opts.fps = parseInt(args[++i], 10)
    else if (a === '--w') opts.width = parseInt(args[++i], 10)
    else if (a === '--h') opts.height = parseInt(args[++i], 10)
    else if (a === '--chunk') opts.chunk = parseInt(args[++i], 10)
  }
  if (!opts.input) throw new Error('Missing --in <video>')
  opts.outDir = opts.outDir || './public/frames'
  opts.fps = opts.fps || 30
  opts.width = opts.width || 60
  opts.height = opts.height || 20
  opts.chunk = opts.chunk || 300
  return opts
}

function run(cmd, args, cwd = process.cwd()) {
  return new Promise((resolvePromise, reject) => {
    const p = spawn(cmd, args, { stdio: 'inherit', cwd, shell: process.platform === 'win32' })
    p.on('error', reject)
    p.on('close', (code) => {
      if (code === 0) resolvePromise()
      else reject(new Error(`${cmd} exited with code ${code}`))
    })
  })
}

function intensityToAscii(intensity) {
  // 0..255 grayscale -> 0..1
  const n = intensity / 255
  const chars = [' ', '.', ':', ';', 'o', 'x', '%', '#', '#']
  const index = Math.max(0, Math.min(chars.length - 1, Math.floor(n * (chars.length - 1))))
  return chars[index]
}

async function main() {
  const { input, outDir, fps, width, height, chunk } = parseArgs()
  const absOut = resolve(outDir)
  const tmpDir = resolve('./.badapple_frames_tmp')

  if (existsSync(tmpDir)) rmSync(tmpDir, { recursive: true, force: true })
  mkdirSync(tmpDir, { recursive: true })
  mkdirSync(absOut, { recursive: true })

  // 1) Use ffmpeg to extract grayscale, scaled frames to PNGs
  // Requires ffmpeg installed and on PATH
  const scale = `${width}:${height}`
  const pattern = join(tmpDir, '%06d.png')
  await run('ffmpeg', ['-y', '-i', input, '-vf', `fps=${fps},scale=${scale},format=gray`, pattern])

  // 2) Read PNGs and convert to ASCII frames
  const files = readdirSync(tmpDir).filter(f => f.endsWith('.png')).sort()
  if (files.length === 0) throw new Error('No frames extracted by ffmpeg')

  const chunks = []
  let currentChunk = []
  let chunkIndex = 0

  for (let i = 0; i < files.length; i++) {
    const file = join(tmpDir, files[i])
    const png = PNG.sync.read(readFileSync(file))
    // png.data is RGBA for each pixel, but we used format=gray, so RGB will be same
    const { data, width: w, height: h } = png
    const frameLines = []
    for (let y = 0; y < h; y++) {
      let line = ''
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4
        const r = data[idx]
        // const g = data[idx + 1]; const b = data[idx + 2]
        line += intensityToAscii(r)
      }
      frameLines.push(line)
    }
    currentChunk.push(frameLines)

    if (currentChunk.length === chunk || i === files.length - 1) {
      const chunkFile = `chunk_${String(++chunkIndex).padStart(4, '0')}.json`
      writeFileSync(join(absOut, chunkFile), JSON.stringify({ frames: currentChunk }))
      chunks.push({ file: chunkFile, count: currentChunk.length })
      currentChunk = []
    }
  }

  // 3) Write index.json
  writeFileSync(join(absOut, 'index.json'), JSON.stringify({
    fps,
    width,
    height,
    totalFrames: files.length,
    chunks
  }, null, 2))

  // 4) Cleanup tmp
  rmSync(tmpDir, { recursive: true, force: true })

  console.log(`Generated ${files.length} frames in ${chunks.length} chunks at ${absOut}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})


