import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Phone, ArrowUpRight, Send, CheckCircle, AlertCircle } from "lucide-react";

const links = [
  { label: "Email", value: "rohanjjogi@gmail.com", href: "mailto:rohanjjogi@gmail.com", icon: Mail },
  { label: "Phone", value: "+91 91135 02491", href: "tel:+919113502491", icon: Phone },
  { label: "GitHub", value: "github.com/Rohan-134v", href: "https://github.com/Rohan-134v", icon: Github },
  { label: "LinkedIn", value: "linkedin.com/in/rohan-a09b11298", href: "https://www.linkedin.com/in/rohan-a09b11298/", icon: Linkedin },
];

// Dot-grid SVG background
function DotGrid() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="contact-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill="#17B587" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#contact-dots)" />
    </svg>
  );
}

// Floating geometric shapes
function GeoAccents() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* top-right hexagon outline */}
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute -top-16 -right-16 w-64 h-64 opacity-[0.14]"
        viewBox="0 0 100 100"
      >
        <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="none" stroke="#17B587" strokeWidth="1.5" />
        <polygon points="50,20 78,35 78,65 50,80 22,65 22,35" fill="none" stroke="#17B587" strokeWidth="0.8" strokeDasharray="3 4" />
      </motion.svg>

      {/* bottom-left rotating square */}
      <motion.svg
        animate={{ rotate: -360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-10 -left-10 w-48 h-48 opacity-[0.13]"
        viewBox="0 0 100 100"
      >
        <rect x="15" y="15" width="70" height="70" fill="none" stroke="#17B587" strokeWidth="1.5" />
        <rect x="30" y="30" width="40" height="40" fill="none" stroke="#17B587" strokeWidth="1" />
      </motion.svg>

      {/* mid-right small triangle */}
      <motion.svg
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 right-8 w-10 h-10 opacity-[0.22]"
        viewBox="0 0 100 100"
      >
        <polygon points="50,10 90,90 10,90" fill="none" stroke="#17B587" strokeWidth="3" />
      </motion.svg>

      {/* mid-left floating orbit */}
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/3 -left-12 w-36 h-36 opacity-[0.14]"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="38" fill="none" stroke="#17B587" strokeWidth="1" strokeDasharray="5 4" />
        <circle cx="50" cy="12" r="4" fill="#17B587" opacity="0.5" />
      </motion.svg>

      {/* green ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full bg-mint/10 blur-[90px]" />
      {/* top glow */}
      <div className="absolute top-0 right-1/4 w-64 h-32 rounded-full bg-mint/6 blur-[60px]" />
    </div>
  );
}

type FormStatus = "idle" | "submitting" | "success" | "error";

function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/mwvbdaaa", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputCls =
    "w-full bg-transparent border border-hairline rounded-md px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-mint-dark transition-colors";

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15 }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12"
    >
      <input name="name" type="text" required placeholder="Your name" className={inputCls} />
      <input name="email" type="email" required placeholder="Your email" className={inputCls} />
      <textarea
        name="message"
        required
        rows={4}
        placeholder="Your message"
        className={`${inputCls} sm:col-span-2 resize-none`}
      />
      <div className="sm:col-span-2 flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="flex items-center gap-2 px-5 py-2.5 rounded-md bg-mint-dark text-white text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          <Send size={14} />
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
        {status === "success" && (
          <span className="flex items-center gap-1.5 text-sm text-mint-dark">
            <CheckCircle size={14} /> Sent! I'll get back to you soon.
          </span>
        )}
        {status === "error" && (
          <span className="flex items-center gap-1.5 text-sm text-red-400">
            <AlertCircle size={14} /> Something went wrong. Try again.
          </span>
        )}
      </div>
    </motion.form>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 px-6 border-t border-hairline overflow-hidden">
      <DotGrid />
      <GeoAccents />

      <div className="relative max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-widest text-mint-dark mb-3"
        >
          Contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-semibold text-ink mb-6 max-w-xl"
        >
          Let's talk about an opportunity, a project, or just software.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted max-w-lg mb-10"
        >
          I'm open to internships and opportunities. Feel free to reach out about
          anything — I'm always happy to talk.
        </motion.p>

        <ContactForm />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="divide-y divide-hairline border-y border-hairline"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-center justify-between py-5 hover:pl-2 transition-all duration-200"
            >
              <span className="flex items-center gap-4">
                <link.icon size={16} className="text-mint-dark flex-shrink-0" />
                <span>
                  <span className="block font-mono text-[11px] uppercase tracking-widest text-muted">
                    {link.label}
                  </span>
                  <span className="block text-ink font-medium">{link.value}</span>
                </span>
              </span>
              <ArrowUpRight
                size={18}
                className="text-muted opacity-0 group-hover:opacity-100 group-hover:text-mint-dark transition-all"
              />
            </a>
          ))}
        </motion.div>

        <p className="text-xs text-muted mt-10">© {new Date().getFullYear()} Rohan. Built with React &amp; Tailwind.</p>
      </div>
    </section>
  );
}
