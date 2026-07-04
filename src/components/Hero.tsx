import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full px-6 pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div id="home" className="absolute top-0 left-0" />
      {/* dot grid */}
      <svg className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hero-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="#17B587" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots)" />
      </svg>
      {/* top-left orbiting rings */}
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 opacity-[0.12]"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="42" fill="none" stroke="#17B587" strokeWidth="0.8" strokeDasharray="5 5" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="#17B587" strokeWidth="0.6" />
        <circle cx="50" cy="50" r="18" fill="none" stroke="#17B587" strokeWidth="0.5" strokeDasharray="2 4" />
      </motion.svg>
      {/* bottom-right floating diamond */}
      <motion.svg
        animate={{ rotate: [0, 45, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-10 -right-10 w-48 h-48 opacity-[0.12]"
        viewBox="0 0 100 100"
      >
        <rect x="25" y="25" width="50" height="50" fill="none" stroke="#17B587" strokeWidth="1.2" transform="rotate(45 50 50)" />
        <rect x="35" y="35" width="30" height="30" fill="none" stroke="#17B587" strokeWidth="0.8" strokeDasharray="3 3" transform="rotate(45 50 50)" />
      </motion.svg>
      {/* green glow bottom center */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-40 rounded-full bg-mint/8 blur-[80px]" />
      {/* mid-right floating triangle */}
      <motion.svg
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-1/3 right-8 w-16 h-16 opacity-[0.15]"
        viewBox="0 0 100 100"
      >
        <polygon points="50,10 90,90 10,90" fill="none" stroke="#17B587" strokeWidth="3" />
        <polygon points="50,32 74,80 26,80" fill="none" stroke="#17B587" strokeWidth="2" strokeDasharray="4 4" />
      </motion.svg>

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
        {/* === LEFT: TEXT === */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block relative border border-dashed border-ink/30 rounded-md px-4 py-2 mb-8"
          >
            <span className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 border border-mint-dark bg-white" />
            <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 border border-mint-dark bg-white" />
            <span className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 border border-mint-dark bg-white" />
            <span className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 border border-mint-dark bg-white" />
            <p className="font-sans text-sm text-ink">Hi there 👋, I'm Rohan</p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl font-bold text-ink leading-[1.05] tracking-tight"
          >
            CSE Student,
            <br />
            Eager to Learn
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-muted text-base leading-relaxed max-w-md"
          >
            Fourth-year at PES University, Bengaluru. I spend most of my time
            reading, building things, and figuring out how stuff works.
            This is a small collection of what I've been up to.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-6"
          >
            <a
              href="mailto:rohanjjogi@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-ink text-white text-sm font-semibold hover:bg-mint-dark transition-colors"
            >
              Get In Touch ↗
            </a>
            <a
              href="/Rohan-Resume.pdf"
              download
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-mint-dark transition-colors"
            >
              Download CV <Download size={15} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex items-center gap-4"
          >
            <span className="text-sm text-muted">Find me on:</span>
            <SocialIcon href="https://github.com/Rohan-134v" label="GitHub"><Github size={16} /></SocialIcon>
            <SocialIcon href="https://www.linkedin.com/in/rohan-a09b11298/" label="LinkedIn"><Linkedin size={16} /></SocialIcon>
            <SocialIcon href="mailto:rohanjjogi@gmail.com" label="Email"><Mail size={16} /></SocialIcon>
          </motion.div>
        </div>

        {/* === RIGHT: PHOTO === */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mx-auto md:mx-0 w-64 sm:w-80 md:w-full max-w-sm"
        >
          {/* mint squiggle shapes */}
          <svg className="absolute -bottom-8 -right-8 w-40 h-40 text-mint -z-10" viewBox="0 0 100 100" fill="none">
            <path d="M10 70 L45 35 L60 50 L95 15" stroke="currentColor" strokeWidth="14" strokeLinecap="round" />
          </svg>
          <svg className="absolute -left-10 top-8 w-10 h-10 text-ink" viewBox="0 0 40 40" fill="none">
            <path d="M2 30 L12 18 L20 26 L38 4" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          {/* offset black border behind photo */}
          <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-md bg-ink" />
          <div className="relative rounded-md overflow-hidden border-2 border-ink aspect-[4/5] bg-hairline">
            <img src="/profile.jpg" alt="Rohan" className="w-full h-full object-cover" />
          </div>

          {/* rotating scroll badge */}
          <motion.button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="hidden sm:flex absolute -left-8 bottom-10 w-20 h-20 rounded-full bg-white border border-hairline items-center justify-center shadow-sm hover:border-mint-dark transition-colors"
            aria-label="Scroll to learn more"
          >
            <motion.svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >
              <defs>
                <path id="circlePath" d="M 50, 50 m -34, 0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0" />
              </defs>
              <text fontSize="8.3" fill="#6B6E76" letterSpacing="1.5">
                <textPath href="#circlePath">SCROLL DOWN • EXPLORE MORE •</textPath>
              </text>
            </motion.svg>
            <span className="text-ink text-sm">↓</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

function SocialIcon({ href, label, children, filled }: { href: string; label: string; children: React.ReactNode; filled?: boolean }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
        filled
          ? "bg-mint border-mint text-ink hover:bg-mint-dark hover:border-mint-dark"
          : "border-hairline text-ink hover:border-mint-dark hover:text-mint-dark"
      }`}
    >
      {children}
    </a>
  );
}
