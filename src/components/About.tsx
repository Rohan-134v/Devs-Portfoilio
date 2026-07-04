import { motion } from "framer-motion";
import { MapPin, GraduationCap, Code2 } from "lucide-react";

const coursework = [
  "Data Structures & Algorithms",
  "Operating Systems",
  "Computer Networks",
  "DBMS",
  "Compiler Design",
  "Cloud Computing",
  "Generative AI",
  "Object-Oriented Analysis and Design",
  "Software Engineering",
];

const stats = [
  { icon: GraduationCap, label: "PES University", value: "2023 – 2027" },
  { icon: MapPin,        label: "Bengaluru, India", value: "B.Tech CSE" },
  { icon: Code2,         label: "Passionate learner", value: "Always" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6 border-t border-hairline overflow-hidden">

      {/* dot grid */}
      <svg className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="about-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="#17B587" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#about-dots)" />
      </svg>

      {/* rotating triple-ring — top right */}
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 opacity-[0.14]"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="40" fill="none" stroke="#17B587" strokeWidth="1" />
        <circle cx="50" cy="50" r="28" fill="none" stroke="#17B587" strokeWidth="0.8" strokeDasharray="4 4" />
        <circle cx="50" cy="50" r="14" fill="none" stroke="#17B587" strokeWidth="0.6" />
        <circle cx="50" cy="10" r="2.5" fill="#17B587" opacity="0.5" />
      </motion.svg>

      {/* counter-rotating crosshair — bottom left */}
      <motion.svg
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute -bottom-8 -left-8 w-44 h-44 opacity-[0.12]"
        viewBox="0 0 100 100"
      >
        <line x1="50" y1="10" x2="50" y2="90" stroke="#17B587" strokeWidth="1" />
        <line x1="10" y1="50" x2="90" y2="50" stroke="#17B587" strokeWidth="1" />
        <circle cx="50" cy="50" r="22" fill="none" stroke="#17B587" strokeWidth="0.8" strokeDasharray="3 4" />
        <circle cx="50" cy="50" r="8" fill="none" stroke="#17B587" strokeWidth="0.6" />
      </motion.svg>

      {/* floating diamond — mid right */}
      <motion.svg
        animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-1/3 -right-6 w-24 h-24 opacity-[0.14]"
        viewBox="0 0 100 100"
      >
        <rect x="20" y="20" width="60" height="60" fill="none" stroke="#17B587" strokeWidth="1.5" transform="rotate(45 50 50)" />
      </motion.svg>

      {/* glows */}
      <div className="pointer-events-none absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-mint/8 blur-[80px]" />
      <div className="pointer-events-none absolute -top-10 -right-10 w-60 h-60 rounded-full bg-mint/6 blur-[70px]" />

      <div className="relative max-w-5xl mx-auto grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-20">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-xs uppercase tracking-widest text-mint-dark mb-3">About</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-8">
            A little context
          </h2>

          {/* mini stat cards */}
          <div className="flex flex-col gap-3">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 p-3 rounded-lg border border-hairline bg-white/60">
                <span className="w-7 h-7 rounded-md bg-mint-soft flex items-center justify-center flex-shrink-0">
                  <Icon size={13} className="text-mint-dark" />
                </span>
                <span className="text-xs text-muted font-mono uppercase tracking-wide">{label}</span>
                <span className="ml-auto font-display font-semibold text-ink text-sm">{value}</span>
              </div>
            ))}
          </div>


        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          <p className="text-ink text-lg leading-relaxed">
            I'm a fourth-year Computer Science student at{" "}
            <strong className="font-semibold">PES University, Bengaluru</strong>.
            I got into coding because I genuinely enjoy it, and over the years
            I've picked up bits of AI/ML, web development, and embedded systems
            mostly by building things and breaking them.
          </p>
          <p className="text-muted leading-relaxed">
            I've had some good opportunities along the way — a research internship,
            a few team projects, some late nights debugging things I probably
            overcomplicated. I'm not an expert at anything yet, but I'm curious,
            I work hard, and I care about doing things properly.
          </p>

          {/* styled pull-quote */}
          <blockquote className="relative pl-4 border-l-2 border-mint-dark/50 py-1">
            <p className="text-sm text-muted italic leading-relaxed">
              "I'd rather write something simple that works than something clever that doesn't."
            </p>
          </blockquote>

          <div className="pt-2">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-3">
              Relevant coursework
            </p>
            <div className="flex flex-wrap gap-2">
              {coursework.map((c) => (
                <span
                  key={c}
                  className="px-3 py-1.5 rounded-md border border-hairline text-xs text-ink bg-white"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
