import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero   from './components/Hero';

// Heavy sections — loaded after first paint
const About         = lazy(() => import('./components/About'));
const Experience    = lazy(() => import('./components/Experience'));
const Skills        = lazy(() => import('./components/Skills'));
const Projects      = lazy(() => import('./components/Projects'));
const Contact       = lazy(() => import('./components/Contact'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

const PROJECT_ID_MAP: Record<number, string> = {
  1: 'policy-aware-code-auditor',
  2: 'airline-reservation-system',
  3: 'smart-glove-healthcare',
  4: 'perishables-management-system',
  5: 'real-time-streaming-platform',
};
export { PROJECT_ID_MAP };

// Minimal fallback — invisible, no layout shift
function PageFallback() {
  return <div className="min-h-screen bg-black" />;
}

export default function App() {
  return (
    <main className="bg-black min-h-screen w-full text-white selection:bg-green-500/40 selection:text-white">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Suspense fallback={<PageFallback />}>
                <About />
                <Experience />
                <Skills />
                <Projects />
                <Contact />
                <div className="h-[20vh]" />
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
            <div className="flex items-center justify-center h-screen text-2xl font-mono text-gray-400">
              404 | Page Not Found
            </div>
          }
        />
      </Routes>
    </main>
  );
}
