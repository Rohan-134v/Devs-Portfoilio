import { motion } from "framer-motion";

export default function Statement() {
  return (
    <section className="relative px-6 py-24 md:py-32 overflow-hidden">
      {/* dot grid */}
      <svg className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="stmt-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="#17B587" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#stmt-dots)" />
      </svg>
      {/* subtle green ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[300px] rounded-full bg-mint/10 blur-[100px]" />
      </div>
      {/* top-left slow rotating triangle */}
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute -top-10 -left-10 w-48 h-48 opacity-[0.13]"
        viewBox="0 0 100 100"
      >
        <polygon points="50,8 92,88 8,88" fill="none" stroke="#17B587" strokeWidth="1.2" />
        <polygon points="50,30 74,78 26,78" fill="none" stroke="#17B587" strokeWidth="0.8" strokeDasharray="3 4" />
      </motion.svg>
      {/* bottom-right counter-rotating square */}
      <motion.svg
        animate={{ rotate: -360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute -bottom-8 -right-8 w-40 h-40 opacity-[0.13]"
        viewBox="0 0 100 100"
      >
        <rect x="15" y="15" width="70" height="70" fill="none" stroke="#17B587" strokeWidth="1" />
        <rect x="30" y="30" width="40" height="40" fill="none" stroke="#17B587" strokeWidth="0.7" strokeDasharray="3 3" />
      </motion.svg>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative max-w-4xl mx-auto text-center font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ink leading-tight tracking-tight"
      >
        Turning research questions and product ideas into systems that actually ship.
      </motion.p>
    </section>
  );
}
