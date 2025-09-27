// Sample code data for the samples section
export const codeSamples = [
  {
    id: "bad-apple-player",
    title: "Bad Apple ASCII Player",
    description: "Authentic Bad Apple silhouette animation in ASCII art",
    language: "javascript",
    code: `// Bad Apple ASCII Player — Chunked frames + smooth RAF playback
// Frames are pre-generated into /frames/chunk_*.json with index.json

class ChunkAsciiPlayer {
  constructor(fps = 30) {
    this.fps = fps
    this.frames = []
    this.chunks = []
    this.chunkIndex = 0
    this.loaded = new Set()
    this.isPlaying = false
    this.rafId = null
    this.startTime = 0
    this.currentFrame = 0
  }

  async loadIndex() {
    const res = await fetch('/frames/index.json')
    const meta = await res.json()
    this.chunks = meta.chunks || []
  }

  async preloadNext() {
    if (this.chunkIndex >= this.chunks.length) return
    if (this.loaded.has(this.chunkIndex)) return
    const file = this.chunks[this.chunkIndex].file
    const r = await fetch('/frames/' + file)
    const j = await r.json()
    this.frames.push(...(j.frames || []))
    this.loaded.add(this.chunkIndex)
    this.chunkIndex++
  }

  start() {
    if (this.isPlaying) return
    this.isPlaying = true
    this.startTime = performance.now()
    const tick = () => {
      if (!this.isPlaying) return
      const elapsed = (performance.now() - this.startTime) / 1000
      const target = Math.floor(elapsed * this.fps)
      const total = this.frames.length
      // proactive preloads
      if (target >= total - 10) this.preloadNext()
      this.currentFrame = Math.min(target, Math.max(0, total - 1))
      this.rafId = requestAnimationFrame(tick)
    }
    this.rafId = requestAnimationFrame(tick)
  }

  stop() {
    this.isPlaying = false
    if (this.rafId) cancelAnimationFrame(this.rafId)
  }
}

// Example usage in UI:
// const p = new ChunkAsciiPlayer(30)
// await p.loadIndex();
// await p.preloadNext(); // first chunk
// p.start();`,
    preview: `// Bad Apple ASCII Player - Real Video Processing
// 
// Features:
// - Uses HTML5 Video API to read bad_apple.mp4
// - Extracts real video frames using Canvas API
// - Converts RGB pixels to grayscale intensity
// - Maps intensity to ASCII characters
// - Real-time frame extraction and display
//
// Technical Implementation:
// - Video element loads bad_apple.mp4
// - Canvas draws video frames at specified resolution
// - ImageData extraction for pixel analysis
// - RGB to grayscale conversion
// - ASCII character mapping
//
// Requirements:
// - bad_apple.mp4 file in public directory
// - HTML5 Video and Canvas support
// - CORS enabled for video loading
//
// Controls:
// - Play: Start video playback and ASCII conversion
// - Stop: Pause video and frame extraction
// - Reset: Return to beginning
// - FPS: Adjust extraction rate`,
  },
  {
    id: "bogosort-visualizer",
    title: "Bogosort Visualizer",
    description: "Interactive sorting algorithm that randomly shuffles until sorted",
    language: "typescript",
    code: `// Bogosort Visualizer — stop flag + gentle pacing
const isSorted = (arr: number[]): boolean => {
  for (let i = 1; i < arr.length; i++) if (arr[i] < arr[i-1]) return false
  return true
}

const shuffleArray = <T,>(arr: T[]): T[] => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export async function bogosort(
  arr: number[],
  onUpdate: (next: number[], step: number) => void,
  shouldStop: () => boolean,
): Promise<number[]> {
  let cur = [...arr]
  let step = 0
  while (!isSorted(cur) && !shouldStop()) {
    cur = shuffleArray(cur)
    step++
    onUpdate(cur, step)
    await new Promise(r => setTimeout(r, 200))
  }
  return cur
}`,
    preview: `// Interactive Bogosort Demo
const [array, setArray] = useState([3, 1, 4, 1, 5, 9, 2, 6]);
const [isRunning, setIsRunning] = useState(false);
const [steps, setSteps] = useState(0);

const startSorting = async () => {
  setIsRunning(true);
  setSteps(0);
  
  await bogosort(array, (newArr, step) => {
    setArray(newArr);
    setSteps(step);
  });
  
  setIsRunning(false);
};

// Visual representation
<div className="flex gap-2">
  {array.map((value, index) => (
    <div 
      key={index}
      className="w-12 h-12 bg-blue-500 text-white 
               flex items-center justify-center rounded"
    >
      {value}
    </div>
  ))}
</div>`,
  },
  {
    id: "python-overengineering",
    title: "Anti Dimension Script",
    description: "Script to destroy others Dimension",
    language: "python",
    code: `#!/usr/bin/env python3
# anti_dimension.py — superfluous architecture + base64 arcana + apocalyptic epilogus
import sys, time, random, base64, contextlib

# ————— Obfuscata —————
GRADUS = [
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

PRAEFIXUM = "ZGltZW5zaW9uIC=="
SUFFIXUM  = "IGhhcyBiZWVuIGRlc3Ryb3llZC4="
NOTITIA   = "WW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGRlc3Ryb3llZCBhIGZhciBkaW1lbnNpb24u"

# ————— Ornamenta —————
class CollegiumMeta(type):
    tabula = {}
    def __new__(mcls, nomen, bases, dct):
        cls = super().__new__(mcls, nomen, bases, dct)
        mcls.tabula[nomen] = cls
        return cls

def sigillum(nomen: str):
    def _ambitus(fn):
        def _involucrum(*a, **k):
            return fn(*a, **k)
        _involucrum.__name__ = f"sig_{nomen}"
        return _involucrum
    return _ambitus

@contextlib.contextmanager
def ritus():
    yield

class Decodex(metaclass=CollegiumMeta):
    @staticmethod
    @sigillum("b64")
    def de_obscura(textus_b64: str) -> str:
        return base64.b64decode(textus_b64.encode()).decode()

RUBER = "\\x1b[31m"
RESTITUE = "\\x1b[0m"

SYLLABAE = ["va","lo","ri","an","ka","th","ra","zu","mi","on","el","ar","ta","shi","no","qu","dra","fen","mor","bel","nar","sil","ther","ix","ul","ae","or","in","al","is","en"]

def nomen_dimensionis() -> str:
    partes = random.randint(2, 3)
    vox = ''.join(random.choice(SYLLABAE) for _ in range(partes))
    return vox.capitalize()

def progressio(label: str, summa: int = 20, mora: float = 0.12):
    for i in range(summa + 1):
        vectis = "#" * i + "-" * (summa - i)
        per = int(i / summa * 100)
        sys.stdout.write(f"\r{label} [{vectis}] {per}%")
        sys.stdout.flush()
        time.sleep(mora)
    print()

def praecipuum():
    with ritus():
        for gradus in GRADUS:
            titulus = Decodex.de_obscura(gradus)
            progressio(titulus)
        dim = nomen_dimensionis()
        praef = Decodex.de_obscura(PRAEFIXUM)
        suff  = Decodex.de_obscura(SUFFIXUM)
        nota  = Decodex.de_obscura(NOTITIA)
        inscriptio = f"{praef}{dim}{suff}"
        if inscriptio:
            caput = ''.join([inscriptio[0].upper(), inscriptio[1:]])
        else:
            caput = inscriptio
        ornamenta = [lambda s: s, lambda s: ''.join(list(s))]
        for opus in ornamenta:
            caput = opus(caput)
        print(RUBER + caput + RESTITUE)
        print(RUBER + nota + RESTITUE)

if __name__ == '__main__':
    praecipuum()`,
    preview: `#!/usr/bin/env python3\n# (see code tab for full script)`,
  },
]
