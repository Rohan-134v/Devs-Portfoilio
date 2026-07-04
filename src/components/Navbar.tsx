import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const items = [
  { label: "Home",       target: "home" },
  { label: "About",      target: "about" },
  { label: "Experience", target: "experience" },
  { label: "Certifications", target: "education" },
  { label: "Skills",     target: "skills" },
  { label: "Projects",   target: "projects" },
  { label: "Contact",    target: "contact" },
];

export default function Navbar() {
  const navigate   = useNavigate();
  const location   = useLocation();
  const isHome     = location.pathname === "/";
  const [active, setActive] = useState("home");

  useEffect(() => {
    if (location.pathname.startsWith("/project/")) setActive("projects");
  }, [location.pathname]);

  useEffect(() => {
    if (!isHome) return;
    setActive("home");

    const onScroll = () => {
      const mid = window.innerHeight / 2;
      let current = "home";
      for (const { target: id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < mid) current = id;
      }
      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  function handleClick(target: string) {
    setActive(target);
    if (isHome) {
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/", { state: { scrollTo: target } });
    }
  }

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-center">

        {/* Desktop nav — pill container */}
        <ul className="flex items-center gap-0.5 bg-paper/70 border border-hairline rounded-full px-2 py-1.5 backdrop-blur-sm shadow-sm">
          {items.map((item) => (
            <li key={item.target}>
              <button
                onClick={() => handleClick(item.target)}
                className="relative px-3 py-1.5 rounded-full text-[13px] font-sans transition-colors duration-200"
              >
                {active === item.target && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className={`relative z-10 transition-colors duration-200 ${
                  active === item.target ? "text-paper font-medium" : "text-muted hover:text-ink"
                }`}>
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

    </header>
  );
}
