import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Terminal, CheckCircle2, ChevronRight, Instagram, Loader2, RefreshCcw } from "lucide-react";
import Spline from '@splinetool/react-spline';

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen bg-black text-white py-24 px-6 relative overflow-hidden flex flex-col justify-center">
      <div id="contact" className="absolute -top-10 left-0" />
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[800px] h-[600px] bg-green-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* === MAIN GRID CONTENT === */}
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10 flex-grow">
        
        {/* === LEFT COL: AVATAR & CONTEXT === */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-2 lg:order-1 flex flex-col items-center lg:items-start"
        >
          {/* Avatar Container */}
          <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm mb-8 group shadow-[0_0_50px_rgba(34,197,94,0.1)]">
             <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-green-500/50 rounded-tl-lg"></div>
             <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-green-500/50 rounded-br-lg"></div>
             
             <div className="w-full h-full relative z-10 scale-110">
                {/* 3D Model */}
                <Spline scene="https://prod.spline.design/gXWdQgcEOx8fIihY/scene.splinecode" className="w-full h-full" />
             </div>
             
             <div className="absolute bottom-6 left-6 px-3 py-1.5 rounded-full bg-black/80 border border-green-500/30 backdrop-blur-md flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs font-mono text-green-400 font-bold">RECEIVER: ONLINE</span>
             </div>
          </div>

          <div className="w-full max-w-md text-center lg:text-left">
             <h3 className="text-2xl font-bold text-white mb-2">Rohan Jogi</h3>
             <p className="text-gray-400">Engineering the future, one bit at a time.</p>
          </div>
        </motion.div>


        {/* === RIGHT COL: INTERACTIVE TERMINAL FORM === */}
        <motion.div 
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="order-1 lg:order-2 w-full"
        >
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Initialize <span className="text-green-500">Handshake</span>
            </h2>
            <p className="text-gray-400">
              Establish a secure connection. Use the terminal below to transmit your message parameters directly to my system.
            </p>
          </div>

          <ContactTerminal />

        </motion.div>

      </div>

      {/* === BOTTOM FOOTER: SOCIAL ICONS === */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 w-full mt-20 border-t border-white/10 pt-8 flex flex-col items-center justify-center gap-4"
      >
         <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Establish Link via Frequency</p>
         
         <div className="flex items-center gap-6">
            <SocialIcon href="https://github.com/rohanjogi" icon={<Github size={20} />} label="GitHub" />
            <SocialIcon href="mailto:rohanjjogi@gmail.com" icon={<Mail size={20} />} label="Email" />
            <SocialIcon href="https://linkedin.com/in/rohan-jogi" icon={<Linkedin size={20} />} label="LinkedIn" />
            <SocialIcon href="https://instagram.com/yourhandle" icon={<Instagram size={20} />} label="Instagram" />
         </div>
         
         <p className="text-xs text-gray-600 mt-4">© 2027 Rohan Jogi. System Status: Nominal.</p>
      </motion.div>

    </section>
  );
}

// === COMPONENT: TERMINAL LOGIC ===
function ContactTerminal() {
  const [history, setHistory] = useState<{ type: 'system' | 'user', text: string }[]>([
    { type: 'system', text: 'Initializing secure connection protocol...' },
    { type: 'system', text: 'Connection established [Secure: TLS 1.3]' },
    { type: 'system', text: 'Please identify yourself. Enter your NAME:' },
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0); // 0: Name, 1: Email, 2: Message, 3: Done
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isProcessing, step]);

  // RESET FUNCTION
  const resetTerminal = () => {
    setStep(0);
    setFormData({ name: "", email: "", message: "" });
    setHistory([
      { type: 'system', text: 'Re-initializing connection...' },
      { type: 'system', text: 'New session started.' },
      { type: 'system', text: 'Please identify yourself. Enter your NAME:' },
    ]);
  };

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim() && !isProcessing && step < 3) {
      
      const userText = input;
      setIsProcessing(true); // Lock input
      setHistory(prev => [...prev, { type: 'user', text: userText }]);
      setInput(""); 

      // Update State
      let newFormData = { ...formData };
      if (step === 0) newFormData.name = userText;
      if (step === 1) newFormData.email = userText;
      if (step === 2) newFormData.message = userText;
      setFormData(newFormData);

      // Determine System Response
      let nextMsg = "";
      let nextStep = step + 1;
      let delay = 600;

      if (step === 0) {
        nextMsg = `Identity confirmed: ${userText}. Please enter your EMAIL address:`;
      } else if (step === 1) {
        nextMsg = `Target acquired. Please enter your TRANSMISSION MESSAGE:`;
      } else if (step === 2) {
        // === SENDING TO FORMSPREE ===
        nextMsg = `Transmission packet received. Uploading to server...`;
        setHistory(prev => [...prev, { type: 'system', text: nextMsg }]);
        
        try {
          // ---------------------------------------------------------
          // 🔴 IMPORTANT: PASTE YOUR FORMSPREE ID BELOW
          const FORMSPREE_ENDPOINT = "https://formspree.io/f/mwvbdaaa"; 
          // ---------------------------------------------------------

          const response = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: newFormData.name,
              email: newFormData.email,
              message: userText
            })
          });

          if (response.ok) {
            setTimeout(() => {
               setHistory(prev => [...prev, { type: 'system', text: "Upload Complete. Connection Terminated." }]);
               setStep(3); 
               setIsProcessing(false);
            }, 1000);
            return; 
          } else {
            throw new Error("Formspree Failed");
          }

        } catch (error) {
          nextMsg = "Error: Connection refused. Please contact manually via email.";
          console.error(error);
          setIsProcessing(false);
        }
      }

      // Standard response for Steps 0 & 1
      setTimeout(() => {
        if (step < 2) {
            setHistory(prev => [...prev, { type: 'system', text: nextMsg }]);
            setStep(nextStep);
            setIsProcessing(false);
        }
      }, delay);
    }
  };

  return (
    <div className="w-full rounded-xl bg-[#0d0d0d] border border-white/10 shadow-2xl overflow-hidden font-mono text-sm md:text-base">
      
      {/* Terminal Bar */}
      <div className="bg-white/5 border-b border-white/5 px-4 py-2 flex items-center gap-4">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="text-gray-500 text-xs flex items-center gap-2">
          <Terminal size={12} /> guest@rohan-portfolio:~
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={scrollRef}
        className="p-6 h-[400px] overflow-y-auto custom-scrollbar relative scroll-smooth" 
        onClick={() => document.getElementById('terminal-input')?.focus()}
      >
        <div className="space-y-3">
          {history.map((line, i) => (
            <div key={i} className={`flex items-start gap-3 ${line.type === 'system' ? 'text-green-400' : 'text-blue-300'}`}>
              <span className="opacity-50 mt-1 select-none">
                {line.type === 'system' ? <ChevronRight size={14}/> : '$'}
              </span>
              <span>{line.text}</span>
            </div>
          ))}
          
          {isProcessing && step < 3 && (
            <div className="flex items-center gap-2 text-gray-500 ml-6">
              <Loader2 size={14} className="animate-spin" />
              <span>Processing...</span>
            </div>
          )}
        </div>

        {/* Input Area */}
        {!isProcessing && step < 3 && (
           <div className="flex items-center gap-3 mt-3 text-blue-300 animate-in fade-in duration-300">
             <span className="opacity-50 select-none">$</span>
             <input
               id="terminal-input"
               autoFocus
               autoComplete="off"
               type={step === 1 ? "email" : "text"}
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={handleKeyDown}
               className="bg-transparent border-none outline-none flex-1 text-blue-300 placeholder-white/20 font-mono caret-green-500"
               placeholder={step === 1 ? "name@domain.com" : "Type command..."}
             />
           </div>
        )}

        {/* Success Message & Reset Button */}
        {step === 3 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 space-y-4"
          >
            <div className="p-4 border border-green-500/20 bg-green-500/5 rounded-lg text-green-400 flex items-center gap-3">
              <CheckCircle2 size={20} />
              <div>
                <p className="font-bold">Transmission Successful</p>
                <p className="text-xs opacity-70">Rohan has received your data packet.</p>
              </div>
            </div>

            {/* RESET BUTTON */}
            <button 
               onClick={resetTerminal}
               className="flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors"
            >
               <RefreshCcw size={12} /> Establish New Connection
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// === SOCIAL ICON COMPONENT ===
function SocialIcon({ href, icon, label }: { href: string, icon: any, label: string }) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-green-400 hover:bg-green-500/10 hover:border-green-500/50 hover:scale-110 transition-all duration-300"
      aria-label={label}
    >
      {icon}
    </a>
  );
}