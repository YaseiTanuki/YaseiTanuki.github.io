# YaseiTanuki GitHub Portfolio

A modern, responsive portfolio website built with Next.js that dynamically showcases GitHub profile information, repositories, and interactive code samples. Features real-time GitHub data integration, dark/light theme support, and interactive demos.

## 🚀 Live Demo

Visit the live site: [YaseiTanuki Portfolio](https://yaseitanuki.github.io)

## 🛠️ Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Fonts**: Inter, Fira Code, Comfortaa
- **Syntax Highlighting**: Shiki
- **Deployment**: GitHub Pages

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/YaseiTanuki/git-gud.git
cd git-gud
```

2. Install dependencies:
```bash
npm install
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build & Deploy

### Static Export (for GitHub Pages)
```bash
npm run build:static # Build and export static files
```

## 📁 Project Structure

```
git-gud/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── samples/           # Interactive code samples
│   ├── ui/                # Reusable UI components
│   └── *.tsx              # Page sections
├── lib/                   # Utility libraries
│   ├── github.ts          # GitHub API integration
│   ├── syntax-highlighting.ts
│   └── utils.ts
├── public/                # Static assets
│   └── frames/            # Bad Apple animation frames
├── scripts/               # Build scripts
└── timeline.json          # Career timeline data
```

## 🎯 Key Components

### Hero Section
- Dynamic GitHub profile display
- Social media links
- Responsive avatar and bio

### About Section
- Real-time tech stack from GitHub
- Career timeline
- Skills parsing from README

### Projects Section
- Latest GitHub repositories
- Repository metadata and topics
- Live repository statistics

### Samples Section
- **Bad Apple Player**: ASCII art video player with chunked frame loading
- **Bogosort Visualizer**: Interactive sorting algorithm demonstration
- **Python Scripts**: Creative coding examples

## 🔧 Configuration

### GitHub Integration
The app automatically fetches data from the GitHub user specified in `app/page.tsx`:
```typescript
const username = "YaseiTanuki"  // Change this to your GitHub username
```

### Timeline Data
Edit `timeline.json` to customize your career timeline:
```json
[
  {
    "year": "2021 - 2025",
    "title": "Student",
    "company": "HCM University of Information Technology",
    "current": false
  }
]
```

### Tech Stack Detection
The app automatically detects technologies from:
- GitHub repository languages
- Repository topics
- Profile README content

## 🎨 Customization

### Themes
The app uses a custom design system with:
- Lavender, Blue, and Sapphire color palette
- Dark/Light mode support
- Custom CSS variables in `app/globals.css`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Shiki](https://shiki.matsu.io/) for syntax highlighting
- [Lucide](https://lucide.dev/) for beautiful icons

## 📞 Contact

- GitHub: [@YaseiTanuki](https://github.com/YaseiTanuki)
- Email: github.tanuki@gmail.com

---

⭐ Star this repository if you found it helpful!
