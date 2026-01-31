import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import Spline from '@splinetool/react-spline';
// Add this style tag to define the slow spin animation needed for the border
const customAnimation = `
  @keyframes spin-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .animate-spin-slow {
    animation: spin-slow 8s linear infinite;
  }
`;

export default function About() {
  return (
    <section id="about" className="min-h-screen bg-black text-white py-24 px-6 relative overflow-hidden flex items-center">
      {/* Injecting custom animation styles */}
      <style>{customAnimation}</style>
      <div id="about" className="absolute -top-10 left-0" />
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-green-900/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

      {/* CHANGE 1: Changed 'items-center' to 'items-stretch'. 
         This makes both columns equal height based on the tallest content.
      */}
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-stretch relative z-10">
        
        {/* === LEFT COL: THE STORY === */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          // Added flex and flex-col justify-center to ensure it centers vertically if it happens to be shorter
          className="space-y-8 flex flex-col justify-center"
        >
          {/* Header */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
              About <span className="text-green-500">me</span>
            </h2>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-mono mt-2">
              <span className="flex items-center gap-1"><MapPin size={14} className="text-green-500"/> Bengaluru, India</span>
              <span className="flex items-center gap-1"><Calendar size={14} className="text-green-500"/> Graduating in 2027</span>
            </div>
          </div>

          {/* Bio Paragraphs */}
          <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
            <p>
              I’m <strong className="text-white">Rohan Jogi</strong>, a Computer Science undergraduate at <strong className="text-white">PES University</strong>. 
              My passion lies at the intersection of the digital and physical worlds. I don't just build software; I build bridges—connecting raw hardware logic with intuitive user experiences.
            </p>
            <p>
              Whether developing real-time streaming platforms or crafting responsive UI components for ventures like InstiBuzz, I focus on creating scalable, impactful solutions.
            </p>
          </div>
          
          {/* CTA */}
          <div className="pt-4 mt-auto">
             <p className="text-gray-400 italic border-l-2 border-green-500 pl-4">
               "Eager to bring a fresh perspective to Full-Stack or Embedded Systems roles."
             </p>
          </div>
        </motion.div>


        {/* === RIGHT COL: THE AVATAR WITH MOVING BORDER === */}
       {/* === RIGHT COL: SQUARE SPLINE BOX === */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          // CHANGE 1: Added 'aspect-square' to force it to be a perfect square.
          // Added 'max-w-[500px] mx-auto' to ensure it doesn't get too huge on big screens.
          className="relative w-full aspect-square max-w-[500px] mx-auto rounded-[40px] overflow-hidden group"
        >
          
          {/* 1. Moving Green Border (The Conic Gradient) */}
          <div className="absolute inset-0 overflow-hidden rounded-[40px]">
             <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_300deg,#22c55e_360deg)] animate-spin-slow opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* 2. Inner Container (Black Background + Spline) */}
          {/* inset-[2px] creates the gap for the border to show through */}
          <div className="absolute inset-[2px] rounded-[38px] bg-black/90 backdrop-blur-md overflow-hidden z-10 border border-white/10">
            
            {/* THE SPLINE SCENE */}
            <Spline 
              scene="https://prod.spline.design/KvPhSrgRMPli4o0g/scene.splinecode"
              className="w-10 h-10 object-cover"
            />
            
            {/* Optional: Overlay Gradient (If you want the bottom to fade into black) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>

             {/* Floating Badge (Optional - keep or remove) */}
            <div className="absolute bottom-6 left-6 p-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl z-20 pointer-events-none">
               <p className="text-xs text-green-400 font-mono">System Status: Online</p>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}