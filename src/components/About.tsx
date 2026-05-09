import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import FloatingCodeParticles from "./FloatingCodeParticles";

export default function About() {
  return (
    <section id="about" className="min-h-screen bg-black text-white py-24 px-6 relative overflow-hidden flex items-center">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-green-900/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-stretch relative z-10">
        
        {/* === LEFT COL: THE STORY === */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
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
             I'm <strong className="text-white">Rohan</strong>, a Bachelor of Technology student in Computer Science and Engineering at <strong className="text-white">PES University, Bengaluru</strong>.
              I'm interested in software engineering and building efficient, scalable systems. My coursework covers Data Structures and Algorithms, Operating Systems, Computer Networks, and Machine Learning.
            </p>
            <p>
              Always eager to learn and adapt, I'm looking to leverage my skills to contribute to a forward-thinking engineering team.
            </p>
          </div>
          
          {/* CTA */}
          <div className="pt-4 mt-auto">
             <p className="text-gray-400 italic border-l-2 border-green-500 pl-4">
               "Eager to bring a fresh perspective to Software Development."
             </p>
          </div>
        </motion.div>


        {/* === RIGHT COL: FLOATING CODE PARTICLES === */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative w-full aspect-square max-w-[500px] mx-auto"
        >
          <FloatingCodeParticles />
        </motion.div>

      </div>
    </section>
  );
}
