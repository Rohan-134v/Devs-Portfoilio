import { motion } from "framer-motion";

const skillGroups = [
  {
    title: "Languages",
    skills: ["Python", "Java", "C++", "C", "JavaScript (ES6+)", "SQL"],
  },
  {
    title: "AI / ML",
    skills: [
      "PyTorch", "HuggingFace Transformers", "CodeBERT", "LLaMA 3.1",
      "LoRA / PEFT", "FAISS", "RAG", "NLP Pipelines", "LLM Fine-Tuning",
      "Transformer Architectures", "Scikit-learn", "NumPy", "Pandas",
      "Prompt Engineering",
    ],
  },
  {
    title: "Web & Backend",
    skills: [
      "React.js", "Node.js", "Express.js", "Spring Boot", "FastAPI",
      "REST APIs", "WebSockets", "Docker", "Redis", "MongoDB",
      "Firebase Firestore", "HTML5", "CSS3",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 px-6 border-t border-hairline overflow-hidden">
      {/* dot grid */}
      <svg className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="skills-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="#17B587" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#skills-dots)" />
      </svg>
      {/* floating triangle — top right */}
      <motion.svg
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-6 -right-6 w-44 h-44 opacity-[0.14]"
        viewBox="0 0 100 100"
      >
        <polygon points="50,8 92,88 8,88" fill="none" stroke="#17B587" strokeWidth="1.5" />
        <polygon points="50,28 76,76 24,76" fill="none" stroke="#17B587" strokeWidth="1" strokeDasharray="3 4" />
      </motion.svg>
      {/* bottom-left rotating orbit */}
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute -bottom-16 -left-16 w-60 h-60 opacity-[0.12]"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="38" fill="none" stroke="#17B587" strokeWidth="0.8" strokeDasharray="6 4" />
        <circle cx="50" cy="50" r="24" fill="none" stroke="#17B587" strokeWidth="0.6" />
        <circle cx="50" cy="12" r="3" fill="#17B587" opacity="0.6" />
      </motion.svg>
      {/* mid-right floating cross */}
      <motion.svg
        animate={{ rotate: [0, 90, 180, 270, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute top-1/2 -right-4 w-20 h-20 opacity-[0.14]"
        viewBox="0 0 100 100"
      >
        <line x1="50" y1="10" x2="50" y2="90" stroke="#17B587" strokeWidth="2" />
        <line x1="10" y1="50" x2="90" y2="50" stroke="#17B587" strokeWidth="2" />
        <circle cx="50" cy="50" r="15" fill="none" stroke="#17B587" strokeWidth="1.5" strokeDasharray="3 3" />
      </motion.svg>
      {/* green glow — bottom left */}
      <div className="pointer-events-none absolute -bottom-10 -left-10 w-72 h-72 rounded-full bg-mint/8 blur-[80px]" />
      {/* green glow — top right */}
      <div className="pointer-events-none absolute -top-10 -right-10 w-60 h-60 rounded-full bg-mint/6 blur-[70px]" />

      <div className="relative max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-widest text-mint-dark mb-3"
        >
          Skills
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-semibold text-ink mb-14"
        >
          What I work with
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-x-10 gap-y-12">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <h3 className="font-display text-lg font-semibold text-ink mb-4 pb-3 border-b border-hairline">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.skills.map((skill) => (
                  <li key={skill} className="text-[15px] text-muted flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-mint-dark flex-shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
