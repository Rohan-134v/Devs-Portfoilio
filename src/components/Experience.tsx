import { motion } from "framer-motion";
import { useRef } from "react";
import { Calendar, Code, User } from "lucide-react";

const experiences = [
  {
    id: 1,
    type: "Work Experience",
    typeColor: "text-green-400 bg-green-500/10 border-green-500/20",
    dotColor: "border-green-500 shadow-[0_0_10px_#22c55e]",
    role: "UI/UX Web Developer Intern",
    company: "InstiBuzz (IIT Madras Venture)",
    date: "March 2024 – April 2025",
    description: "Engineered responsive UI components using Figma and HTML/CSS, improving mobile accessibility and user engagement. Implemented minimalist UI patterns to streamline user workflows and collaborated with cross-functional teams using Git in an Agile workflow.",
    skills: ["React.js", "Figma", "HTML/CSS", "Git", "Agile"],
    icon: <Code size={20} />,
  },
  {
    id: 2,
    type: "Leadership & Extracurricular",
    typeColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    dotColor: "border-indigo-400 shadow-[0_0_10px_#818cf8]",
    role: "Vice Chair & Secretary",
    company: "IEEE PESU Student Branch",
    date: "August 2025 – Present",
    description: "Led the technical direction of the student branch, coordinating events and workshops attended by 200+ students. Designed learning curricula focused on emerging technologies, fostered a collaborative community, and mentored junior members in software development and career growth.",
    skills: ["Leadership", "Mentoring", "Planning", "Strategies", "Organising"],
    icon: <User size={20} />,
  },
];

export default function Experience() {
  const containerRef = useRef(null);

  return (
    <section id="experience" className="min-h-screen bg-black text-white py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-green-900/20 rounded-[100%] blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10" ref={containerRef}>

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

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 md:-translate-x-1/2 h-full rounded-full" />
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-green-500/40 md:-translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.4)]" />

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

function TimelineItem({ data, index }: { data: any; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex flex-col md:flex-row items-center md:justify-between ${isEven ? "" : "md:flex-row-reverse"}`}
    >
      {/* Timeline dot */}
      <div className={`absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 z-20 ${data.dotColor}`}>
        <div className="absolute inset-0 bg-current animate-ping rounded-full opacity-40" />
      </div>

      {/* Empty spacer */}
      <div className="hidden md:block w-5/12" />

      {/* Card */}
      <div className="w-[calc(100%-4rem)] md:w-5/12 ml-16 md:ml-0 pl-4 md:pl-0">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-white/20 transition-colors group">

          {/* Type badge */}
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border mb-3 ${data.typeColor}`}>
            {data.type}
          </span>

          <div className="flex flex-col gap-1 mb-3">
            <span className="flex items-center gap-2 text-xs font-mono text-gray-500">
              <Calendar size={12} /> {data.date}
            </span>
            <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
              {data.role}
            </h3>
            <p className="text-sm text-gray-400 font-medium flex items-center gap-2">
              {data.icon} {data.company}
            </p>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            {data.description}
          </p>

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
