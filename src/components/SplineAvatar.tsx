import { useState, Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';

// Lazy load the heavy Spline library itself
const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineAvatarProps {
  sceneUrl: string;
  className?: string;
}

export default function SplineAvatar({ sceneUrl, className = "" }: SplineAvatarProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative w-full h-full ${className}`}>
      
      {/* 1. Loading Spinner (Visible while downloading) */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/10 backdrop-blur-sm z-20">
          <div className="flex flex-col items-center gap-2 text-green-500/80">
            <Loader2 size={24} className="animate-spin" />
            <span className="text-[10px] font-mono tracking-widest uppercase">Initializing...</span>
          </div>
        </div>
      )}

      {/* 2. The 3D Scene Wrapper */}
      {/* - pointer-events-none: Disables touch on mobile (fixes scrolling glitch) 
         - lg:pointer-events-auto: Re-enables touch on Desktop (allows interaction)
      */}
      <div className="w-full h-full pointer-events-none lg:pointer-events-auto relative z-10">
        <Suspense fallback={null}>
          <Spline 
            scene={sceneUrl}
            onLoad={() => setIsLoading(false)}
            className="w-full h-full"
          />
        </Suspense>
      </div>

    </div>
  );
}