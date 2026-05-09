import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Github, ExternalLink, Layers, Terminal, CheckCircle2, Loader2 } from "lucide-react";
import OrbitingPlanets from "./OrbitingPlanets";

const PROJECT_ID_MAP: Record<number, string> = {
  1: "policy-aware-code-auditor",
  2: "airline-reservation-system",
  3: "smart-glove-healthcare",
  4: "perishables-management-system",
  5: "real-time-streaming-platform",
};
// === DATA ===
const projects = [
  {
    id: 1,
    title: "Policy-Aware Code Auditor",
    category: "AI / ML",
    status: "Completed",
    description: "Hybrid AI system to automatically audit large-scale Python codebases against business policies, achieving a 93% compliance detection rate.",
    stats: ["93% Detection Rate", "60% Fewer LLM Calls", "75% Cost Reduction"],
    github: "https://github.com/Rohan-134v/auditix-policy-aware-code-auditor",
    live: null,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1600&auto=format&fit=crop",
    color: "text-green-400 border-green-500/50"
  },
  {
    id: 2,
    title: "Airline Reservation System",
    category: "Full Stack",
    status: "Completed",
    description: "Responsive SPA with React and Spring Boot backend, featuring real-time seat mapping and concurrent booking state synchronization via Firebase Firestore.",
    stats: ["React + Vite", "Spring Boot", "Firebase"],
    github: "https://github.com/OOAD-Airline-Reservation-system/Airline-Reservation",
    live: null,
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1600&auto=format&fit=crop",
    color: "text-blue-400 border-blue-500/50"
  },
  {
    id: 3,
    title: "Smart Glove for Healthcare",
    category: "Embedded Systems",
    status: "Completed",
    description: "Wearable assistive-technology device for the hearing-impaired using flex sensors and MPU6050 to map hand gestures to text, transmitted via Bluetooth.",
    stats: ["Arduino + I2C", "HC-05 Bluetooth", "C++"],
    github: "https://github.com/Rohan-134v/SignLanguage-Vocaliser",
    live: null,
    image: "/images/project.png",
    color: "text-purple-400 border-purple-500/50"
  },
  {
    id: 4,
    title: "Perishables Management System",
    category: "Software Engineering",
    status: "Completed",
    description: "Retail app to optimally manage perishable inventory like fresh fruits and vegetables. Built following full SDLC — requirements, design, sprints via JIRA, and documented architecture.",
    stats: ["SDLC", "JIRA", "Agile/Scrum"],
    github: "https://github.com/pestechnology/PESU_EC_CSE_H_P15_Perishables_management_system_Rithvik-Matta",
    live: null,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1600&auto=format&fit=crop",
    color: "text-orange-400 border-orange-500/50"
  },
  {
    id: 5,
    title: "Real-Time Streaming Platform",
    category: "Full Stack",
    status: "Completed",
    description: "Live streaming application achieving sub-100ms latency using WebSockets and Node.js, with secure room-based routing and a React frontend for concurrent streams.",
    stats: ["Sub-100ms Latency", "WebSockets", "MERN Stack"],
    github: "https://github.com/Rohan-134v/Streamvibe",
    live: null,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop",
    color: "text-amber-400 border-amber-500/50"
  }
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState(projects[0]);

  return (
    <section id="projects" className="min-h-screen bg-black text-white py-24 px-6 relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12">
        
        {/* === LEFT COLUMN: ORBITING PLANETS === */}
        <div className="hidden lg:flex flex-col h-[calc(100vh-6rem)] sticky top-24 justify-center items-center">
            <OrbitingPlanets category={activeProject.category} />
        </div>


        {/* === RIGHT COLUMN: SCROLLABLE PROJECTS === */}
        <div className="space-y-32 py-12">
           <div className="lg:hidden mb-8">
              <h2 className="text-4xl font-bold">My Projects</h2>
           </div>

           {projects.map((project) => (
             <ProjectCard 
               key={project.id} 
               project={project} 
               setActiveProject={setActiveProject} 
             />
           ))}
        </div>

      </div>
    </section>
  );
}

// === Individual Project Card Component ===
function ProjectCard({ project, setActiveProject }: { project: any, setActiveProject: any }) {
  const ref = useRef(null);
  const navigate = useNavigate();
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (isInView) setActiveProject(project);
  }, [isInView, project, setActiveProject]);

  const isCompleted = project.status === "Completed";
  const slug = PROJECT_ID_MAP[project.id];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative rounded-3xl bg-neutral-900 border border-white/10 overflow-hidden shadow-2xl cursor-pointer"
      onClick={() => slug && navigate(`/project/${slug}`)}
    >
      
      {/* 1. Project Image */}
      <div className="relative h-64 overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent z-10"></div>
         <img 
           src={project.image} 
           alt={project.title}
           loading="lazy"
           decoding="async"
           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
         />
         
         {/* Status Badge */}
         <div className={`absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full backdrop-blur-md border flex items-center gap-2 text-xs font-bold shadow-lg
            ${isCompleted 
              ? "bg-green-500/20 border-green-500/30 text-green-400" 
              : "bg-amber-500/20 border-amber-500/30 text-amber-400"
            }`}
         >
            {isCompleted ? <CheckCircle2 size={14} /> : <Loader2 size={14} className="animate-spin" />}
            {project.status}
         </div>

         {/* Category Badge */}
         <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-gray-300">
           {project.category}
         </div>
      </div>

      {/* 2. Content */}
      <div className="relative z-20 p-8 -mt-12">
         <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-neutral-800 border border-white/10 mb-6 shadow-lg group-hover:border-${project.color.split('-')[1]}-500/50 transition-colors`}>
            <Layers className="text-white" />
         </div>

         <h3 className="text-3xl font-bold text-white mb-3">{project.title}</h3>
         <p className="text-gray-400 leading-relaxed mb-6">{project.description}</p>

         {/* Stats Grid */}
         <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {project.stats.map((stat: string, i: number) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/40 border border-white/5 backdrop-blur-sm">
                <Terminal size={12} className={project.color.split(' ')[0]} />
                <span className="text-xs font-mono text-gray-300">{stat}</span>
              </div>
            ))}
         </div>

         {/* Buttons */}
         <div className="flex gap-4">
            <a href={project.github} onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 text-sm font-bold text-white hover:text-green-400 transition-colors">
              <Github size={18} /> Source
            </a>
            {project.live && (
              <a href={project.live} onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 text-sm font-bold text-white hover:text-green-400 transition-colors">
                <ExternalLink size={18} /> Live Demo
              </a>
            )}
         </div>
      </div>

    </motion.div>
  );
}
