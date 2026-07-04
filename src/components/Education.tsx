import { motion } from "framer-motion";
import { Award, Trophy, ExternalLink } from "lucide-react";

const certifications = [
  {
    name: "Problem Solving (Basic)",
    issuer: "HackerRank",
    date: "",
    credentialUrl: "https://www.hackerrank.com/certificates/iframe/edcc6bc5acf5",
    tags: ["Problem Solving", "Algorithms"],
  },
  {
    name: "UI/UX and Figma",
    issuer: "PES University",
    date: "Oct 2023",
    credentialUrl: "",
    tags: ["UI/UX", "Figma", "Design"],
  },
];

const achievements = [
  {
    icon: Trophy,
    title: "74th Rank — Good Coder Competition",
    desc: "Competitive programming contest conducted by PES University.",
  },
  {
    icon: Award,
    title: "Distinction — Every Semester",
    desc: "Consistently achieved distinction across all semesters at PES University.",
  },
];

export default function Education() {
  return (
    <section id="education" className="relative py-24 px-6 border-t border-hairline overflow-hidden">
      {/* dot grid */}
      <svg className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="edu-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="#17B587" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#edu-dots)" />
      </svg>

      {/* rotating dashed ring — top right */}
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 opacity-[0.12]"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="40" fill="none" stroke="#17B587" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="50" cy="50" r="24" fill="none" stroke="#17B587" strokeWidth="0.7" />
        <circle cx="50" cy="10" r="2.5" fill="#17B587" opacity="0.5" />
      </motion.svg>

      {/* floating diamond — bottom left */}
      <motion.svg
        animate={{ y: [0, -10, 0], rotate: [0, 20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-16 -left-6 w-20 h-20 opacity-[0.13]"
        viewBox="0 0 100 100"
      >
        <rect x="20" y="20" width="60" height="60" fill="none" stroke="#17B587" strokeWidth="2" transform="rotate(45 50 50)" />
      </motion.svg>

      {/* glow */}
      <div className="pointer-events-none absolute top-1/2 -left-24 -translate-y-1/2 w-80 h-80 rounded-full bg-mint/8 blur-[90px]" />

      <div className="relative max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-widest text-mint-dark mb-3"
        >
          Education & Credentials
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-semibold text-ink mb-14"
        >
          My Academic Achievements
        </motion.h2>

        {/* Two-column grid: Certifications + Achievements */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* Certifications */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-5">Licenses & Certifications</p>
            <div className="space-y-4">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex items-start gap-4 p-4 rounded-lg border border-hairline bg-white/60"
                >
                  <span className="w-8 h-8 rounded-md bg-mint-soft flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Award size={14} className="text-mint-dark" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-display text-sm font-semibold text-ink leading-snug">{cert.name}</h4>
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 text-muted hover:text-mint-dark transition-colors"
                          aria-label="Show credential"
                        >
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-mint-dark font-medium mt-0.5">{cert.issuer}</p>
                    {cert.date && <p className="font-mono text-[11px] text-muted mt-0.5">Issued {cert.date}</p>}
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {cert.tags.map((t) => (
                        <span key={t} className="text-[10px] font-mono uppercase tracking-wide text-muted border border-hairline rounded px-1.5 py-0.5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Academic Achievements */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-5">Academic Achievements</p>
            <div className="space-y-4">
              {achievements.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex items-start gap-4 p-4 rounded-lg border border-hairline bg-white/60"
                >
                  <span className="w-8 h-8 rounded-md bg-mint-soft flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={14} className="text-mint-dark" />
                  </span>
                  <div>
                    <h4 className="font-display text-sm font-semibold text-ink leading-snug">{title}</h4>
                    <p className="text-xs text-muted mt-1 leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
