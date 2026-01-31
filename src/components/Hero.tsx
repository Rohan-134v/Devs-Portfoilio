import { motion } from "framer-motion";
import { Download } from "lucide-react";
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <div id="home" className="absolute -top-10 left-0" />
      {/* === LAYER 1: Background Elements === */}
      
      {/* 1. The 3D Scene (Covers entire page) */}
      <div className="absolute inset-0 z-0 ">
        <Spline 
          // Replace with your URL
          scene="https://prod.spline.design/rpGzP-4bk7VBqqaG/scene.splinecode"
          className="w-full h-full object-cover"
        />
        </div>

        <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        // Kept position at Top-Left as per your code snippet
        className="absolute top-6 left-6 md:top-12 md:left-16 z-20 pointer-events-auto"
        >
  {/* Removed bg-white/5, border, blur, shadow. Changed text-right to text-left. */}
  <div className="text-left">
      <p className="text-xl md:text-2xl text-gray-400 font-medium mb-1 tracking-wide">
        Hello There 
      </p>
      {/* Increased size to text-5xl / md:text-7xl */}
      <h2 className="text-5xl md:text-7xl font-bold text-white leading-none">
        I'm <span className="text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.6)]">Rohan</span>
      </h2>
  </div>
        </motion.div>

      {/* === LAYER 2: Foreground Content === */}
      <div className="absolute bottom-0 left-0 z-10 w-full md:max-w-2xl p-6 md:p-12 pb-32 pointer-events-none">
        <div className="flex flex-col items-start space-y-6 pointer-events-auto text-left">
          
          {/* Left Column: Text & Resume Button */}
          <div className="space-y-8 pointer-events-auto">
            {/* ONLY Resume Button */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-2" 
            >
              <a 
                href="https://drive.google.com/file/d/1-a6aVIlybFGKUtrWEQ2HQ4XZc3c2w_m8/view?usp=sharing" 
                target="_blank" 
                className="group w-fit px-8 py-3.5 rounded-full font-medium border border-white/20 bg-black/40 backdrop-blur-md hover:bg-green-500/20 hover:border-green-500 hover:text-green-400 transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-green-500/25"
              >
                <Download size={18} className="group-hover:scale-110 transition-transform duration-300" /> 
                Resume
              </a>
            </motion.div>

          </div>

          {/* Right Column: Empty (Visible 3D Scene) */}
          <div></div>

        </div>
      </div>
    </section>
  );
}