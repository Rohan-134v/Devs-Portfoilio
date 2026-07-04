import { Sparkles } from "lucide-react";

const items = ["AI / ML Engineering", "Full-Stack Development", "Applied Research", "Embedded Systems"];

export default function Marquee() {
  return (
    <div className="relative w-full overflow-hidden bg-ink py-5">
      <svg className="absolute -top-px left-0 w-full h-2 text-mint" preserveAspectRatio="none" viewBox="0 0 100 4">
        <path d="M0 2 Q 5 0 10 2 T 20 2 T 30 2 T 40 2 T 50 2 T 60 2 T 70 2 T 80 2 T 90 2 T 100 2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
      <div className="flex">
        <div className="flex w-max animate-marquee" aria-hidden="false">
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-3 mx-6 font-display font-semibold text-white text-lg whitespace-nowrap">
              {item}
              <Sparkles size={16} className="text-mint" />
            </span>
          ))}
        </div>
        <div className="flex w-max animate-marquee" aria-hidden="true">
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-3 mx-6 font-display font-semibold text-white text-lg whitespace-nowrap">
              {item}
              <Sparkles size={16} className="text-mint" />
            </span>
          ))}
        </div>
      </div>
      <svg className="absolute -bottom-px left-0 w-full h-2 text-mint rotate-180" preserveAspectRatio="none" viewBox="0 0 100 4">
        <path d="M0 2 Q 5 0 10 2 T 20 2 T 30 2 T 40 2 T 50 2 T 60 2 T 70 2 T 80 2 T 90 2 T 100 2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  );
}
