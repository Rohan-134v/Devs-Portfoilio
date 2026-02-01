import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Github, ExternalLink, Layers, Terminal, CheckCircle2, Loader2 } from "lucide-react";
import SplineAvatar from "./SplineAvatar";
// === DATA ===
const projects = [
  {
    id: 1,
    title: "Sign Language Vocalizer",
    category: "Embedded Systems",
    status: "Completed",
    description: "A wearable device translating sign language to speech using flex sensors.",
    stats: ["98% Accuracy", "20ms Latency", "Arduino C++"], 
    github: "#",
    live: null,
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1600&auto=format&fit=crop",
    color: "text-blue-400 border-blue-500/50"
  },
  {
    id: 2,
    title: "Real-Time Streaming",
    category: "Full Stack",
    status: "Completed",
    description: "High-performance video/text streaming platform with custom WebSockets.",
    stats: ["500+ Users", "0.5s Delay", "MERN Stack"],
    github: "#",
    live: "#",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1600&auto=format&fit=crop",
    color: "text-purple-400 border-purple-500/50"
  },
  {
    id: 3,
    title: "Intelligent Traffic AI",
    category: "Computer Vision",
    status: "In Progress",
    description: "AI-powered Green Corridor system optimizing traffic for emergency vehicles.",
    stats: ["YOLO v8", "OpenCV", "Real-time"],
    github: "#",
    live: null,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
    color: "text-green-400 border-green-500/50"
  }
];

// === NEW CSS for the spinning border animation ===
const styles = `
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-spin-slow {
    animation: spin-slow 5s linear infinite;
  }
`;

export default function Projects() {
  const [activeProject, setActiveProject] = useState(projects[0]);

  return (
    <section id="projects" className="min-h-screen bg-black text-white py-24 px-6 relative">
      <style>{styles}</style>
      <div id="project" className="absolute -top-10 left-0" />
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12">
        
        {/* === LEFT COLUMN: STICKY AVATAR === */}
        <div className="hidden lg:flex flex-col h-[calc(100vh-6rem)] sticky top-24 justify-center items-center">
            
            {/* === Outer Avatar Container (Holds the shape) === */}
            <div className="relative w-full aspect-square max-w-[500px] mx-auto rounded-full overflow-hidden shadow-[0_0_50px_rgba(34,197,94,0.2)]">
                
                {/* 1. THE ANIMATED BORDER LAYER */}
                {/* This sits behind the content and spins a green conic gradient */}
                <div className="absolute inset-[-25%] bg-[conic-gradient(from_0deg_at_50%_50%,#22c55e_0deg,transparent_60deg,transparent_300deg,#22c55e_360deg)] animate-spin-slow opacity-80"></div>

                {/* 2. THE INNER CONTENT POD */}
                {/* inset-[3px] creates the thickness of the border. */}
                <div className="absolute inset-[3px] rounded-full bg-black/80 backdrop-blur-md overflow-hidden z-10 border border-white/10">
                   
                   {/* SPLINE COMPONENT */}
                   <div className="w-full h-full relative z-10 scale-125"> 
                      <SplineAvatar 
                      sceneUrl="https://prod.spline.design/lWoIz1yzzDcCCW0f/scene.splinecode"
                      className="w-full h-full"
                      />
                   </div>

                   {/* Dark Overlay to blend bottom */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-10"></div>
                </div>
            </div>
            
            {/* Context Label */}
            <div className="mt-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur text-sm font-mono text-gray-400">
               Analyzing: <span className="text-white font-bold">{activeProject.category}</span>
            </div>

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
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (isInView) {
      setActiveProject(project);
    }
  }, [isInView, project, setActiveProject]);

  const isCompleted = project.status === "Completed";

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative rounded-3xl bg-neutral-900 border border-white/10 overflow-hidden shadow-2xl"
    >
      
      {/* 1. Project Image */}
      <div className="relative h-64 overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent z-10"></div>
         <img 
           src={project.image} 
           alt={project.title} 
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
            <a href={project.github} className="flex items-center gap-2 text-sm font-bold text-white hover:text-green-400 transition-colors">
              <Github size={18} /> Source
            </a>
            {project.live && (
              <a href={project.live} className="flex items-center gap-2 text-sm font-bold text-white hover:text-green-400 transition-colors">
                <ExternalLink size={18} /> Live Demo
              </a>
            )}
         </div>
      </div>

    </motion.div>
  );
}