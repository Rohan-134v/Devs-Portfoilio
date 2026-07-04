# Rohan's Developer Portfolio

A personal portfolio website built with React 19 and TypeScript, featuring 3D Spline scenes, interactive canvas animations, smooth scroll-driven layouts, and deep-linked project detail pages. Deployed on Vercel with analytics, security headers, and optimised chunk splitting.

**Live:** [devs-portfoilio.vercel.app](https://devs-portfoilio.vercel.app)

---

## Tech Stack

| Category | Technology | Version |
|---|---|---|
| Build Tool | Vite | 7 |
| Framework | React | 19 |
| Language | TypeScript | 5.9 |
| Styling | Tailwind CSS | 3 |
| CSS Processing | PostCSS + Autoprefixer | — |
| Animations | Framer Motion | 12 |
| 3D Scenes | Spline (`@splinetool/react-spline`) | 4 |
| 3D Runtime | React Three Fiber + Drei | 9 / 10 |
| Routing | React Router DOM | 7 |
| Icons | Lucide React | 0.563 |
| Analytics | Vercel Analytics | — |
| Contact Form | Formspree | — |
| Linting | ESLint + TypeScript ESLint | 9 |

---

## Features

### Sections
- **Hero** — Full-screen Spline 3D scene with animated name reveal and resume download link
- **About** — Bio, location, graduation year, and a floating neural-graph canvas animation
- **Experience** — Animated vertical timeline with work experience and leadership roles
- **Skills** — Spotlight-effect cards with infinite scrolling skill tags per category
- **Projects** — Sticky scroll layout with an interactive RGB mechanical keyboard canvas on the left and scrollable project cards on the right. Each card navigates to a deep-linked detail page
- **Contact** — Interactive terminal-style contact form powered by Formspree, with a Spline avatar and social links

### Project Detail Pages
Each project has a dedicated route (`/project/:id`) with:
- Full tech stack breakdown
- Sectioned write-up (architecture, design decisions, results)
- GitHub and live demo links
- Back navigation that restores the exact scroll position of the originating project card

### Interactive Canvas Animations
- `FloatingCodeParticles.tsx` — Neural network graph with pulsing nodes, travelling signals, and floating ML formulas (used in About)
- `OrbitingPlanets.tsx` — Full mechanical keyboard with RGB wave lighting and random key press animations that react to the active project category (used in Projects)

---

## Directory Structure

```
Devs Portfolio/
├── public/
│   ├── images/
│   │   └── project.png          # Fallback project image
│   ├── Logo.png                 # Favicon and apple-touch-icon
│   └── vite.svg                 # Vite default asset (template reference)
│
├── src/
│   ├── assets/
│   │   └── react.svg            # React default asset (template reference)
│   │
│   ├── components/
│   │   ├── About.tsx            # About section with bio and neural graph
│   │   ├── Contact.tsx          # Terminal contact form + Spline avatar + social links
│   │   ├── Experience.tsx       # Animated timeline — work and leadership
│   │   ├── FloatingCodeParticles.tsx  # Neural graph canvas animation
│   │   ├── Hero.tsx             # Full-screen hero with Spline scene
│   │   ├── Navbar.tsx           # Fixed bottom macOS-style dock with magnification
│   │   ├── OrbitingPlanets.tsx  # RGB mechanical keyboard canvas animation
│   │   ├── Projects.tsx         # Sticky scroll project showcase
│   │   ├── Skills.tsx           # Spotlight skill cards with infinite scroll tags
│   │   └── SplineAvatar.tsx     # Lazy-loaded Spline wrapper with loading state
│   │
│   ├── pages/
│   │   └── ProjectDetail.tsx    # Deep-linked project detail page
│   │
│   ├── App.css                  # Vite default styles (template reference)
│   ├── App.tsx                  # Root — lazy-loaded routes and layout
│   ├── index.css                # Global styles — Tailwind directives, body, html
│   └── main.tsx                 # Entry point — React DOM, BrowserRouter, Vercel Analytics
│
├── .gitignore
├── eslint.config.js             # ESLint flat config with TypeScript and React Hooks rules
├── index.html                   # HTML entry — SEO meta, Open Graph, Twitter Card, favicon
├── package.json
├── postcss.config.js            # PostCSS — Tailwind + Autoprefixer
├── tailwind.config.js           # Tailwind content paths
├── tsconfig.json                # Base TypeScript config
├── tsconfig.app.json            # App TypeScript config
├── tsconfig.node.json           # Node TypeScript config (Vite config)
├── vercel.json                  # SPA rewrites, cache headers, security headers
└── vite.config.ts               # Vite — React plugin, manual chunk splitting
```

---

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm 9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/Rohan-134v/devs-portfolio.git
cd devs-portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

The dev server runs at `http://localhost:5173`.

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite development server with HMR |
| `npm run build` | Type-check with `tsc` then build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the entire codebase |

---

## Deployment on Vercel

This project is configured for zero-config deployment on Vercel.

### Steps

1. Push the repository to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import the repository
3. Vercel auto-detects Vite — no build settings need to be changed
4. Click Deploy

### What `vercel.json` does

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

All routes (including `/project/:id`) are rewritten to `index.html` so React Router handles client-side navigation correctly. Without this, direct URL access or page refresh on a project detail page would return a 404.

**Cache headers** — all files under `/assets/` are served with `Cache-Control: public, max-age=31536000, immutable`. Vite appends a content hash to every asset filename, so browsers cache them for one year and only re-download when the file actually changes.

**Security headers** applied to every response:

| Header | Value |
|---|---|
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `X-XSS-Protection` | `1; mode=block` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |

---

## Performance Optimisations

### Code Splitting
`vite.config.ts` uses `manualChunks` to split the bundle into separately cacheable vendor files:

| Chunk | Contents | Gzip Size |
|---|---|---|
| `react-vendor` | React, React DOM, React Router | ~16 KB |
| `motion` | Framer Motion | ~39 KB |
| `three-vendor` | Three.js, R3F, Drei | ~57 KB |
| `spline` | Spline runtime + react-spline | ~580 KB |
| `icons` | Lucide React | ~3 KB |
| Per-section chunks | About, Skills, Projects, Contact, etc. | 2–19 KB each |

The `spline` chunk is large because it bundles Spline's full 3D physics engine — this is irreducible. It is isolated so returning visitors never re-download it after the first visit.

### Lazy Loading
Every section below Hero is wrapped in `React.lazy()` and `Suspense` in `App.tsx`. The initial JS payload is minimal — only Hero, Navbar, and the router load on first paint. All other sections load asynchronously as the user scrolls.

### Spline Scenes
`SplineAvatar.tsx` wraps the Spline component in its own `Suspense` boundary with a loading spinner. On mobile, `pointer-events-none` is applied to prevent the 3D scene from intercepting touch scroll events.

### Canvas Animations
Both canvas components (`FloatingCodeParticles`, `OrbitingPlanets`) use `requestAnimationFrame` loops with frame-rate throttling and are implemented without any additional runtime dependencies — pure browser Canvas 2D API.

---

## Analytics

Vercel Analytics is integrated via `@vercel/analytics` in `main.tsx`:

```ts
import { inject } from '@vercel/analytics';
inject();
```

Once deployed, pageviews, unique visitors, top pages, referrers, and geographic data are available in the Vercel dashboard under the **Analytics** tab at no cost on the Hobby plan. No cookies, no consent banners required.

---

## SEO

`index.html` includes:
- `<title>` and `<meta name="description">` for search engines
- `<link rel="canonical">` pointing to the live URL
- Open Graph tags for rich previews on LinkedIn, WhatsApp, and Slack
- Twitter Card tags for rich previews on X
- `<meta name="theme-color">` for mobile browser chrome
- Favicon and Apple touch icon via `Logo.png`

---

## Contact Form

The terminal-style contact form in the Contact section submits to [Formspree](https://formspree.io). The endpoint is configured in `Contact.tsx`:

```ts
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mwvbdaaa";
```

To use your own endpoint, replace the form ID with the one from your Formspree dashboard.

---

## Project Routes

| Route | Component | Description |
|---|---|---|
| `/` | `App.tsx` | Main scrolling portfolio page |
| `/project/policy-aware-code-auditor` | `ProjectDetail.tsx` | AI/ML project detail |
| `/project/airline-reservation-system` | `ProjectDetail.tsx` | Full Stack project detail |
| `/project/smart-glove-healthcare` | `ProjectDetail.tsx` | Embedded Systems project detail |
| `/project/perishables-management-system` | `ProjectDetail.tsx` | Software Engineering project detail |
| `/project/real-time-streaming-platform` | `ProjectDetail.tsx` | Full Stack project detail |
| `*` | Inline | 404 fallback |

---

## About

**Rohan Jogi** — B.Tech Computer Science and Engineering student at PES University, Bengaluru (graduating 2027). Interested in software engineering, AI/ML systems, and building efficient, scalable applications.

- **GitHub:** [Rohan-134v](https://github.com/Rohan-134v)
- **Email:** rohanjjogi@gmail.com
- **Location:** Bengaluru, India
