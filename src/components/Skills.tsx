import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Globe, Cpu, Wrench, Terminal } from "lucide-react";
import type { MouseEvent } from "react";

// === DATA ===
const skillCategories = [
  {
    id: "languages",
    title: "Languages & Logic",
    icon: <Terminal size={24} />,
    description: "Core syntax & query languages.",
    skills: ["Python", "C", "C++", "JavaScript", "SQL", "ARM-TDMI7", "NoSQL", "Python", "C", "C++"] // Duplicated for smooth loop
  },
  {
    id: "fullstack",
    title: "Full Stack Ecosystem",
    icon: <Globe size={24} />,
    description: "Scalable frontend & backend architecture.",
    skills: ["React.js", "Node.js", "Express", "MongoDB", "REST APIs", "Tailwind", "Vite", "HTML5", "CSS3"]
  },
  {
    id: "tools",
    title: "DevOps & Tools",
    icon: <Wrench size={24} />,
    description: "Prototyping, deployment & version control.",
    skills: ["Git", "GitHub", "Docker", "Figma", "Postman", "Arduino IDE", "MATLAB", "Spline", "Linux"]
  },
  {
    id: "engineering",
    title: "CS Foundations",
    icon: <Cpu size={24} />,
    description: "Deep system architecture & algorithms.",
    skills: ["Data Structures", "Algorithms", "OS", "Networks", "Big Data", "Machine Learning", "OOP", "Analytics"]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="min-h-screen bg-black text-white py-24 px-6 relative overflow-hidden flex items-center">
      
      {/* Background: Digital Noise & Glow */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:flex items-end justify-between"
        >
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
              System <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Capabilities</span>
            </h2>
            <div className="h-1 w-24 bg-green-500 rounded-full"></div>
          </div>
          <p className="text-gray-400 max-w-sm text-right hidden md:block font-mono text-sm">
            // STATUS: OPERATIONAL<br/>
            // SCANNING MODULES...
          </p>
        </motion.div>

        {/* SKILLS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <TechCard key={category.id} category={category} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}

// === COMPONENT: The Spotlight Tech Card ===
function TechCard({ category, index }: { category: any, index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      className="group relative h-64 w-full rounded-2xl border border-white/10 bg-neutral-900/50 overflow-hidden"
    >
      
      {/* 1. Spotlight Effect Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(34, 197, 94, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* 2. Grid Pattern Overlay (Tech Look) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* 3. Card Content */}
      <div className="relative h-full p-8 flex flex-col justify-between z-10">
        
        {/* Top: Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
             <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-green-400 group-hover:bg-green-500/20 group-hover:border-green-500/50 transition-all duration-500">
               {category.icon}
             </div>
             <div>
               <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                 {category.title}
               </h3>
               <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mt-1">
                 Module 0{index + 1}
               </p>
             </div>
          </div>
        </div>

        {/* Middle: Description */}
        <p className="text-gray-400 text-sm max-w-sm">
          {category.description}
        </p>

        {/* Bottom: Infinite Scrolling Stream */}
        <div className="relative w-full overflow-hidden mask-linear-fade">
           {/* Left Fade Mask */}
           <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-neutral-900/90 to-transparent z-10"></div>
           {/* Right Fade Mask */}
           <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-neutral-900/90 to-transparent z-10"></div>
           
           {/* The Moving Track */}
           <div className="flex w-max">
             <motion.div
               animate={{ x: ["0%", "-50%"] }}
               transition={{
                 repeat: Infinity,
                 ease: "linear",
                 duration: 20, // Adjust speed
               }}
               className="flex gap-4"
             >
               {/* We map twice to create seamless loop */}
               {[...category.skills, ...category.skills].map((skill: string, i: number) => (
                 <span 
                   key={i} 
                   className="px-3 py-1 text-xs font-mono font-bold text-green-500/80 bg-green-900/10 border border-green-500/20 rounded backdrop-blur-md whitespace-nowrap"
                 >
                   {skill}
                 </span>
               ))}
             </motion.div>
           </div>
        </div>

      </div>

      {/* 4. Tech Corners (Decorative) */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-white/5 rounded-tl-2xl group-hover:border-green-500/30 transition-colors"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-white/5 rounded-br-2xl group-hover:border-green-500/30 transition-colors"></div>

    </motion.div>
  );
}