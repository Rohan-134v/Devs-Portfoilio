import { motion } from "framer-motion";

const experiences = [
  {
    role: "Research Intern",
    org: "CoDMAV Research Lab, PES University",
    date: "May 2025 – Present",
    bullets: [
      "Engineered an AMLSim replay pipeline with controllable fraud burst injection, enabling fully reproducible experimentation across all evaluation scenarios for an anti-money laundering detection system.",
      "Built a FastAPI async serving layer with streaming cache management, migrating from an in-memory Python dict to Redis for scalable, low-latency inference throughput.",
      "Implemented all 5 evaluation scenarios and baseline systems end-to-end, forming the empirical backbone of an active research publication (manuscript in preparation).",
    ],
    tags: ["FastAPI", "Redis", "Python", "Research"],
  },
];

const leadership = [
  {
    role: "Vice Chair & Secretary",
    org: "IEEE PESU Student Branch",
    date: "August 2025 – June 2026",
    bullets: [
      "Led technical direction for 200+ students, designing an AI and cybersecurity curriculum delivered across workshops; managed all CTF competition infrastructure end-to-end.",
      "Mentored junior members via structured code reviews, helping 10+ teams ship their first open-source projects.",
    ],
    tags: ["Leadership", "Mentoring"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 px-6 border-t border-hairline overflow-hidden">
      {/* dot grid */}
      <svg className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="exp-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="#17B587" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#exp-dots)" />
      </svg>
      {/* rotating dashed square + cross — top left */}
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute -top-12 -left-12 w-52 h-52 opacity-[0.13]"
        viewBox="0 0 100 100"
      >
        <rect x="15" y="15" width="70" height="70" fill="none" stroke="#17B587" strokeWidth="1.2" strokeDasharray="4 4" />
        <line x1="50" y1="10" x2="50" y2="90" stroke="#17B587" strokeWidth="0.8" />
        <line x1="10" y1="50" x2="90" y2="50" stroke="#17B587" strokeWidth="0.8" />
      </motion.svg>
      {/* bottom-right floating hexagon */}
      <motion.svg
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute -bottom-14 -right-14 w-56 h-56 opacity-[0.11]"
        viewBox="0 0 100 100"
      >
        <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="none" stroke="#17B587" strokeWidth="1" />
        <polygon points="50,22 76,36 76,64 50,78 24,64 24,36" fill="none" stroke="#17B587" strokeWidth="0.7" strokeDasharray="3 4" />
      </motion.svg>
      {/* mid-left floating diamond */}
      <motion.svg
        animate={{ y: [0, -10, 0], rotate: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-1/2 -left-4 w-20 h-20 opacity-[0.14]"
        viewBox="0 0 100 100"
      >
        <rect x="20" y="20" width="60" height="60" fill="none" stroke="#17B587" strokeWidth="2" transform="rotate(45 50 50)" />
      </motion.svg>
      {/* green glow — right center */}
      <div className="pointer-events-none absolute top-1/2 -right-24 -translate-y-1/2 w-80 h-80 rounded-full bg-mint/8 blur-[90px]" />
      {/* green glow — bottom left */}
      <div className="pointer-events-none absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-mint/6 blur-[70px]" />

      <div className="relative max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-widest text-mint-dark mb-3"
        >
          Experience
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-semibold text-ink mb-14"
        >
          Where I've worked
        </motion.h2>

        <div className="divide-y divide-hairline">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="grid md:grid-cols-[140px_1fr] gap-4 md:gap-10 py-10 first:pt-0"
            >
              <p className="font-mono text-xs text-muted uppercase tracking-wide pt-1">
                {exp.date}
              </p>

              <div>
                <h3 className="font-display text-xl font-semibold text-ink mb-1">{exp.role}</h3>
                <p className="text-sm text-mint-dark font-medium mb-4">{exp.org}</p>

                <ul className="space-y-2.5 mb-5">
                  {exp.bullets.map((b, bi) => (
                    <li key={bi} className="text-muted text-[15px] leading-relaxed pl-4 relative">
                      <span className="absolute left-0 top-[0.6em] w-1.5 h-1.5 rounded-full bg-hairline" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono uppercase tracking-wide text-muted border border-hairline rounded px-2 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Leadership */}
      <div className="relative max-w-5xl mx-auto mt-20 pt-16 border-t border-hairline">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-semibold text-ink mb-14"
        >
          Where I've led
        </motion.h2>

        <div className="divide-y divide-hairline">
          {leadership.map((item, i) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="grid md:grid-cols-[140px_1fr] gap-4 md:gap-10 py-10 first:pt-0"
            >
              <p className="font-mono text-xs text-muted uppercase tracking-wide pt-1">
                {item.date}
              </p>
              <div>
                <h3 className="font-display text-xl font-semibold text-ink">{item.role}</h3>
                <p className="text-sm text-mint-dark font-medium mb-4">{item.org}</p>
                <ul className="space-y-2.5 mb-5">
                  {item.bullets.map((b, bi) => (
                    <li key={bi} className="text-muted text-[15px] leading-relaxed pl-4 relative">
                      <span className="absolute left-0 top-[0.6em] w-1.5 h-1.5 rounded-full bg-hairline" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <span key={t} className="text-[11px] font-mono uppercase tracking-wide text-muted border border-hairline rounded px-2 py-1">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
