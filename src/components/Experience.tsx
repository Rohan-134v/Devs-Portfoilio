import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {Calendar, Code, User} from "lucide-react";

const experiences = [
  {
    id: 1,
    role: "UI/UX Web Developer Intern",
    company: "InstiBuzz (IIT Madras Venture)",
    date: "Feb 2024 - Apr 2025",
    description: "Collaborated in Agile teams to design responsive UI components. Improved user engagement through intuitive layouts and optimized frontend performance using React.js and Git.",
    skills: ["React.js", "Figma", "Git", "Agile", "HTML/CSS"],
    icon: <Code size={20} />,
  },
  {
    id: 2,
    role: "Vice Chair & Secretary",
    company: "IEEE PESU Student Branch",
    date: "Jan 2026 - Present",
    description: "Leading technical direction for large-scale hackathons. Organized 'Capture The Flag' cybersecurity challenges and mentored junior developers in system architecture.",
    skills: ["Leadership", "Event Mgmt", "Public Speaking", "Mentoring"],
    icon: <User size={20} />,
  },
];

export default function Experience() {
  const containerRef = useRef(null);
  
  // Track scroll progress within this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // The height of the green line grows as you scroll
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="min-h-screen bg-black text-white py-24 px-6 relative overflow-hidden">
      <div id="experience" className="absolute -top-10 left-0" />
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-green-900/20 rounded-[100%] blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10" ref={containerRef}>
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Professional <span className="text-green-500">Journey</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            From internships at startups to leading student bodies, here is how I've been applying my code to the real world.
          </p>
        </motion.div>

        {/* TIMELINE CONTAINER */}
        <div className="relative">
          
          {/* THE CENTRAL BEAM (Desktop) / LEFT BEAM (Mobile) */}
          {/* Gray Background Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 md:-translate-x-1/2 h-full rounded-full"></div>
          
          {/* Animated Green Line */}
          <motion.div 
            style={{ scaleY }}
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-green-500 md:-translate-x-1/2 origin-top shadow-[0_0_15px_rgba(34,197,94,0.6)]"
          />

          {/* EVENTS LOOP */}
          <div className="space-y-12 md:space-y-24">
            {experiences.map((exp, index) => (
              <TimelineItem key={exp.id} data={exp} index={index} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

// === Sub-Component for Individual Timeline Items ===
function TimelineItem({ data, index }: { data: any, index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex flex-col md:flex-row items-center md:justify-between ${isEven ? "" : "md:flex-row-reverse"}`}
    >
      
      {/* 1. The Dot (Timeline Node) */}
      <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-green-500 z-20 shadow-[0_0_10px_#22c55e]">
         <div className="absolute inset-0 bg-green-500 animate-ping rounded-full opacity-50"></div>
      </div>

      {/* 2. Empty Space for the other side (Desktop only) */}
      <div className="hidden md:block w-5/12" />

      {/* 3. The Card Content */}
      <div className="w-[calc(100%-4rem)] md:w-5/12 ml-16 md:ml-0 pl-4 md:pl-0">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-green-500/30 transition-colors group">
          
          {/* Header: Date & Role */}
          <div className="flex flex-col gap-1 mb-3">
             <span className="flex items-center gap-2 text-xs font-mono text-green-400">
                <Calendar size={12} />
                {data.date}
             </span>
             <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
               {data.role}
             </h3>
             <p className="text-sm text-gray-400 font-medium flex items-center gap-2">
               {data.icon} {data.company}
             </p>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            {data.description}
          </p>

          {/* Skill Tags */}
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill: string) => (
              <span key={skill} className="px-2 py-1 text-[10px] uppercase tracking-wider font-semibold rounded bg-white/5 text-gray-400 border border-white/5">
                {skill}
              </span>
            ))}
          </div>

        </div>
      </div>

    </motion.div>
  );
}