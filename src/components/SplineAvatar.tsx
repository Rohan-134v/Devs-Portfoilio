import { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineAvatarProps {
  sceneUrl: string;
  className?: string;
}

export default function SplineAvatar({ sceneUrl, className = '' }: SplineAvatarProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Only start loading Spline when the container is near the viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShouldLoad(true); observer.disconnect(); } },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/10 backdrop-blur-sm z-20">
          <div className="flex flex-col items-center gap-2 text-green-500/80">
            <Loader2 size={24} className="animate-spin" />
            <span className="text-[10px] font-mono tracking-widest uppercase">Initializing...</span>
          </div>
        </div>
      )}

      {shouldLoad && (
        <div className="w-full h-full pointer-events-none lg:pointer-events-auto relative z-10">
          <Suspense fallback={null}>
            <Spline
              scene={sceneUrl}
              onLoad={() => setIsLoading(false)}
              className="w-full h-full"
            />
          </Suspense>
        </div>
      )}
    </div>
  );
}
