import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Github, ArrowUpRight } from "lucide-react";

const PROJECT_ID_MAP: Record<number, string> = {
  1: "policy-aware-code-auditor",
  2: "airline-reservation-system",
  3: "real-time-streaming-platform",
  4: "smart-glove-healthcare",
};

const projects = [
  {
    id: 1,
    title: "Policy-Aware Code Compliance Auditor",
    date: "Apr 2026",
    category: "AI / ML",
    description:
      "A hybrid RAG + classifier system that auto-audits document databases against business policies, achieving a 93% compliance detection rate across live testing with scalable batch inference.",
    stats: ["93% detection rate", "60% fewer LLM calls", "75% lower inference cost"],
    stack: ["PyTorch", "CodeBERT", "LLaMA 3.1", "FAISS", "RAG"],
    github: "https://github.com/Rohan-134v/auditix-policy-aware-code-auditor",
  },
  {
    id: 2,
    title: "Airline Reservation System",
    date: "Apr 2026",
    category: "Full Stack",
    description:
      "A full-stack booking platform with a React/Vite frontend and Spring Boot REST backend, containerized with Docker. Real-time seat map resolving concurrent bookings with zero conflicts via Firebase Firestore transactions.",
    stats: ["React + Spring Boot", "Firestore transactions", "Docker"],
    stack: ["React", "Spring Boot", "Java 17", "Firebase Firestore", "Docker"],
    github: "https://github.com/OOAD-Airline-Reservation-system/Airline-Reservation",
  },
  {
    id: 3,
    title: "Real-Time Streaming Platform",
    date: "Jul 2025",
    category: "Full Stack",
    description:
      "A live streaming app achieving sub-100ms latency using WebSockets and Node.js, handling multiple concurrent text and video streams with secure private room isolation and fault-tolerant reconnection logic.",
    stats: ["Sub-100ms latency", "Zero data leakage", "Fault-tolerant reconnects"],
    stack: ["MERN Stack", "WebSockets", "Node.js"],
    github: "https://github.com/Rohan-134v/Streamvibe",
  },
  {
    id: 4,
    title: "Smart Glove for Assistive Healthcare Communication",
    date: "Jan 2025",
    category: "Embedded Systems",
    description:
      "A wearable device converting sign language to real-time text using an Arduino, 4 flex sensors, and an MPU6050 via I2C — delivered wirelessly via HC-05 Bluetooth, enabling hearing-impaired patients to communicate independently in clinical settings.",
    stats: ["4 flex sensors", "I2C + Bluetooth", "Zero external dependencies"],
    stack: ["C++", "Arduino", "I2C", "Bluetooth"],
    github: "https://github.com/Rohan-134v/SignLanguage-Vocaliser",
  },
];

export { PROJECT_ID_MAP };

export default function Projects() {
  const navigate = useNavigate();

  return (
    <section id="projects" className="relative py-24 px-6 border-t border-hairline overflow-hidden">
      {/* dot grid */}
      <svg className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="proj-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="#17B587" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#proj-dots)" />
      </svg>
      {/* rotating hexagon — bottom right */}
      <motion.svg
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute -bottom-16 -right-16 w-64 h-64 opacity-[0.13]"
        viewBox="0 0 100 100"
      >
        <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="none" stroke="#17B587" strokeWidth="1.2" />
        <polygon points="50,20 78,35 78,65 50,80 22,65 22,35" fill="none" stroke="#17B587" strokeWidth="0.8" strokeDasharray="3 4" />
      </motion.svg>
      {/* top-right floating diamond */}
      <motion.svg
        animate={{ rotate: [0, 90, 180, 270, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute -top-10 -right-10 w-44 h-44 opacity-[0.13]"
        viewBox="0 0 100 100"
      >
        <rect x="20" y="20" width="60" height="60" fill="none" stroke="#17B587" strokeWidth="1" transform="rotate(45 50 50)" />
        <rect x="32" y="32" width="36" height="36" fill="none" stroke="#17B587" strokeWidth="0.7" strokeDasharray="3 3" transform="rotate(45 50 50)" />
      </motion.svg>
      {/* mid-left floating triangle */}
      <motion.svg
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-1/2 -left-4 w-20 h-20 opacity-[0.15]"
        viewBox="0 0 100 100"
      >
        <polygon points="50,10 90,90 10,90" fill="none" stroke="#17B587" strokeWidth="2.5" />
      </motion.svg>
      {/* green glow — top left */}
      <div className="pointer-events-none absolute -top-10 -left-10 w-72 h-72 rounded-full bg-mint/8 blur-[80px]" />
      {/* green glow — bottom right */}
      <div className="pointer-events-none absolute -bottom-10 -right-10 w-60 h-60 rounded-full bg-mint/6 blur-[70px]" />

      <div className="relative max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-widest text-mint-dark mb-3"
        >
          Projects
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-semibold text-ink mb-14"
        >
          Top Work
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => {
            const slug = PROJECT_ID_MAP[project.id];
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.06 }}
                onClick={() => slug && navigate(`/project/${slug}`)}
                className="group cursor-pointer rounded-xl border border-hairline bg-white p-7 flex flex-col hover:border-mint-dark/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-mint-dark">
                    {project.category}
                  </span>
                  <span className="font-mono text-[11px] text-muted">{project.date}</span>
                </div>

                <h3 className="font-display text-xl font-semibold text-ink mb-2 flex items-start gap-1.5">
                  {project.title}
                  <ArrowUpRight size={16} className="mt-1.5 opacity-0 group-hover:opacity-100 text-mint-dark transition-opacity flex-shrink-0" />
                </h3>

                <p className="text-muted text-sm leading-relaxed mb-5">{project.description}</p>

                <ul className="space-y-1.5 mb-6">
                  {project.stats.map((s) => (
                    <li key={s} className="text-xs text-ink flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-mint-dark" /> {s}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-hairline">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((t) => (
                      <span key={t} className="text-[10px] font-mono uppercase tracking-wide text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-shrink-0 text-ink hover:text-mint-dark transition-colors ml-3"
                    aria-label="View source on GitHub"
                  >
                    <Github size={16} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
