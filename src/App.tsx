import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero   from './components/Hero';
import Marquee from './components/Marquee';

// Heavy sections — loaded after first paint
const Statement    = lazy(() => import('./components/Statement'));
const About         = lazy(() => import('./components/About'));
const Experience    = lazy(() => import('./components/Experience'));
const Education     = lazy(() => import('./components/Education'));
const Skills        = lazy(() => import('./components/Skills'));
const Projects      = lazy(() => import('./components/Projects'));
const Contact       = lazy(() => import('./components/Contact'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

const PROJECT_ID_MAP: Record<number, string> = {
  1: 'policy-aware-code-auditor',
  2: 'airline-reservation-system',
  3: 'real-time-streaming-platform',
  4: 'smart-glove-healthcare',
};
export { PROJECT_ID_MAP };

// Minimal fallback — invisible, no layout shift
function PageFallback() {
  return <div className="min-h-screen bg-paper" />;
}

function ScrollHandler() {
  const location = useLocation();
  useEffect(() => {
    const target = (location.state as any)?.scrollTo;
    if (!target) return;
    // Poll until the element is mounted (lazy sections may not be ready yet)
    let attempts = 0;
    const id = setInterval(() => {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        clearInterval(id);
      }
      if (++attempts > 20) clearInterval(id);
    }, 100);
    return () => clearInterval(id);
  }, [location.state]);
  return null;
}

export default function App() {
  return (
    <main className="bg-paper min-h-screen w-full text-ink font-sans selection:bg-mint-dark/20">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ScrollHandler />
              <Hero />
              <Marquee />
              <Suspense fallback={<PageFallback />}>
                <Statement />
                <About />
                <Experience />
                <Education />
                <Skills />
                <Projects />
                <Contact />
              </Suspense>
            </>
          }
        />
        <Route
          path="/project/:id"
          element={
            <Suspense fallback={<PageFallback />}>
              <ProjectDetail />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <div className="flex flex-col items-center justify-center h-screen gap-3 text-center px-6">
              <span className="font-mono text-xs uppercase tracking-widest text-mint-dark">404</span>
              <p className="font-display text-2xl text-ink">Page not found.</p>
            </div>
          }
        />
      </Routes>
    </main>
  );
}
