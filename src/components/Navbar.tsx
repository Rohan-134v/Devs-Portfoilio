import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home, User, FolderGit2, Mail, Code2, Briefcase } from "lucide-react";
import { useRef } from "react";
// We don't need 'Link' for simple scrolling. Standard 'a' tags work better.

const items = [
  { id: 1, icon: Home, label: "Home", href: "#home" },         // Scrolls to <div id="home">
  { id: 2, icon: User, label: "About", href: "#about" },       // Scrolls to <div id="about">
  { id: 3, icon: Briefcase, label: "Experience", href: "#experience" }, // Scrolls to <div id="experience">
  { id: 4, icon: Code2, label: "Skills", href: "#skills" },    // Scrolls to <div id="skills">
  { id: 5, icon: FolderGit2, label: "Projects", href: "#projects" }, // Scrolls to <div id="projects">
  { id: 6, icon: Mail, label: "Contact", href: "#contact" },   // Scrolls to <div id="contact">
];

export default function Navbar() {
  let hoverX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        onMouseMove={(e) => hoverX.set(e.pageX)}
        onMouseLeave={() => hoverX.set(Infinity)}
        // Layout: h-16 + items-center ensures perfect centering and stable height
        className="flex h-16 items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 backdrop-blur-xl shadow-2xl ring-1 ring-white/10"
      >
        {items.map((item) => (
          <DockIcon key={item.id} mouseX={hoverX} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

function DockIcon({ mouseX, item }: { mouseX: any; item: any }) {
  let ref = useRef<HTMLAnchorElement>(null);

  let distance = useTransform(mouseX, (val: number) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Physics: Base size 40px -> Grows to 70px on hover
  let widthSync = useTransform(distance, [-150, 0, 150], [40, 70, 40]);
  let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.a
      href={item.href} // Use standard href for scrolling
      ref={ref}
      style={{ width, height: width }} // Apply Framer Motion physics
      className="aspect-square rounded-full bg-gray-900/80 border border-white/10 flex items-center justify-center relative group hover:bg-green-600 transition-colors"
    >
      <motion.div className="w-full h-full flex items-center justify-center">
         <item.icon className="w-5 h-5 text-white" />
      </motion.div>

      {/* Hover Label */}
      <span className="absolute -top-12 left-1/2 -translate-x-1/2 w-auto px-2 py-1 min-w-max rounded-md bg-black/90 text-white text-xs font-bold shadow-md opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 border border-white/10 pointer-events-none">
        {item.label}
      </span>
    </motion.a>
  );
}