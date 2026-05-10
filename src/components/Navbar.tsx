import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home, User, FolderGit2, Mail, Code2, Briefcase } from "lucide-react";
import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const items = [
  { id: 1, icon: Home,       label: "Home",       target: "home"       },
  { id: 2, icon: User,       label: "About",      target: "about"      },
  { id: 3, icon: Briefcase,  label: "Experience", target: "experience" },
  { id: 4, icon: Code2,      label: "Skills",     target: "skills"     },
  { id: 5, icon: FolderGit2, label: "Projects",   target: "projects"   },
  { id: 6, icon: Mail,       label: "Contact",    target: "contact"    },
];

export default function Navbar() {
  const hoverX   = useMotionValue(Infinity);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome   = location.pathname === "/";

  function handleClick(target: string) {
    if (isHome) {
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/");
      // Wait for home page to mount then scroll
      setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 350);
    }
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center px-4">
      <motion.div
        onMouseMove={(e) => hoverX.set(e.pageX)}
        onMouseLeave={() => hoverX.set(Infinity)}
        className="flex h-14 md:h-16 items-center gap-2 md:gap-3 rounded-2xl border border-white/10 bg-black/80 px-3 md:px-4 backdrop-blur-xl shadow-2xl ring-1 ring-white/10"
      >
        {items.map((item) => (
          <DockIcon key={item.id} mouseX={hoverX} item={item} onPress={handleClick} />
        ))}
      </motion.div>
    </div>
  );
}

function DockIcon({ mouseX, item, onPress }: { mouseX: any; item: any; onPress: (t: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [36, 62, 36]);
  const width     = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      onClick={() => onPress(item.target)}
      style={{ width, height: width }}
      className="aspect-square rounded-full bg-gray-900/80 border border-white/10 flex items-center justify-center relative group hover:bg-green-600 transition-colors cursor-pointer flex-shrink-0"
    >
      <motion.div className="w-full h-full flex items-center justify-center">
        <item.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
      </motion.div>
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 w-auto px-2 py-1 min-w-max rounded-md bg-black/90 text-white text-xs font-bold shadow-md opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 border border-white/10 pointer-events-none">
        {item.label}
      </span>
    </motion.div>
  );
}
