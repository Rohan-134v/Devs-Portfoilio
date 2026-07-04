import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, CheckCircle2 } from "lucide-react";

const projects: Record<string, any> = {
  "policy-aware-code-auditor": {
    title: "Policy-Aware Code Compliance Auditor",
    category: "AI / ML",
    status: "Completed",
    github: "https://github.com/Rohan-134v/auditix-policy-aware-code-auditor",
    live: null,
    stack: ["CodeBERT", "LLaMA 3.1", "Kimi K2", "Gemini Embeddings", "FAISS", "HuggingFace", "LoRA/PEFT", "PyTorch", "Python"],
    summary: "A hybrid AI system that automatically audits large-scale Python codebases against business policies, achieving a 93% compliance detection rate in live testing on a real Django e-commerce codebase with 337 code chunks.",
    sections: [
      {
        title: "Problem Statement",
        content: "Large codebases have hundreds of functions. Manual review misses violations — especially subtle ones like bypassing service layers or missing audit logs. Linters check syntax but no tool checks whether code follows a company's own business rules and architecture policies. GDPR non-compliance, unlogged transactions, and hardcoded discounts cause regulatory fines, security breaches, and audit failures."
      },
      {
        title: "Solution Overview",
        content: "A hybrid AI system combining semantic policy retrieval via FAISS and Gemini Embeddings to find relevant policies per function, a fine-tuned CodeBERT classifier as a fast binary gatekeeper, dual-LLM reasoning using LLaMA 3.1 8B for summarization and Kimi K2 for deep compliance auditing, and PDF/JSON report generation for downloadable audit results."
      },
      {
        title: "System Architecture",
        items: [
          "GitHub repository cloned and all .py files discovered",
          "AST chunking via Python's ast module extracts semantically complete functions and classes",
          "LLaMA 3.1 8B generates a 2–3 sentence business-level summary per chunk",
          "Gemini Embedding (RETRIEVAL_QUERY mode, 3072-dim) + FAISS nearest-neighbor search returns top-3 relevant policies",
          "Fine-tuned CodeBERT classifier outputs p(violation) per policy pair",
          "Hybrid routing: >65% fast-path violation, <35% fast-path compliant, 35–65% triggers full Kimi K2 reasoning",
          "Structured JSON verdict per chunk with violations, explanation, and severity",
          "ReportLab compiles a downloadable PDF and JSON audit report"
        ]
      },
      {
        title: "Hybrid Decision Engine",
        content: "The core innovation is CodeBERT as a fast gatekeeper before calling the expensive LLM. High-confidence cases bypass deep LLM reasoning entirely. Only ambiguous cases (35–65% confidence) get full Kimi K2 treatment — saving approximately 60% of LLM calls with zero accuracy degradation on clear-cut cases."
      },
      {
        title: "Fine-Tuning CodeBERT with LoRA",
        content: "Base model: microsoft/codebert-base — a RoBERTa-based transformer pre-trained on natural language and code. Input is a (code_chunk, policy_text) pair concatenated and tokenized to 512 tokens. LoRA targets query and key attention matrices with r=16, alpha=32, lr=2e-4, trained for 5 epochs on a T4 GPU. Approximately 16M parameters added versus full fine-tuning which would require 10x more compute."
      },
      {
        title: "Audit Results",
        stats: [
          { label: "Code Chunks Audited", value: "337" },
          { label: "Violations Found", value: "24" },
          { label: "Compliance Rate", value: "93%" },
          { label: "LLM Calls Saved", value: "60%" },
          { label: "Inference Cost Reduction", value: "75%" },
          { label: "Python Files Scanned", value: "9" },
        ]
      },
      {
        title: "Key Design Decisions",
        items: [
          "AST chunking over line splitting — semantically complete functions make meaningful policy evaluation units",
          "Hybrid routing for cost control — only ambiguous cases get full LLM treatment",
          "FAISS before CodeBERT — narrows 12 policies to top-3 per chunk, reducing classifier calls by 75%",
          "Rate-limit retry logic — parses exact wait time from Groq error messages, up to 5 attempts",
          "Graceful degradation — if CodeBERT fails to load, pipeline falls back to LLM-only mode automatically",
          "LoRA for efficiency — fine-tunes only Q+K attention matrices, feasible on a T4 GPU"
        ]
      }
    ]
  },

  "airline-reservation-system": {
    title: "Airline Reservation System",
    category: "Full Stack",
    status: "Completed",
    github: "https://github.com/OOAD-Airline-Reservation-system/Airline-Reservation",
    live: null,
    stack: ["React", "Vite", "Spring Boot", "Java 17", "Firebase Firestore", "JWT", "Razorpay", "Aviationstack API", "Google Gemini"],
    summary: "A full-stack airline reservation SPA built for the Object Oriented Analysis and Design course, featuring flight search, interactive seat selection, real-time flight tracking, payment processing, and an AI-powered trip suggestion engine — all following strict GRASP and SOLID principles.",
    sections: [
      {
        title: "System Architecture",
        content: "The browser communicates exclusively with a Spring Boot backend via a Vite development proxy, eliminating CORS issues. The backend handles all external API calls server-side — Aviationstack for live flight tracking, Google Gemini for AI trip suggestions, and Razorpay for payments. API keys are never exposed to the browser. Firebase Firestore serves as the single source of truth for all application data."
      },
      {
        title: "Core Features",
        items: [
          "Flight Search — domestic and international routes using IATA codes with real airline flight numbers",
          "Interactive Seat Map — real-time availability with Business and Economy class pricing",
          "Booking Management — full lifecycle from confirmation through payment with unique reference generation",
          "Payment Processing — card and UPI via Razorpay adapter with server-side verification",
          "Passenger Details — travel document collection including passport, contact, and meal preference",
          "Flight Tracking — live status via Aviationstack with schedule-derived fallback for future flights",
          "AI Trip Suggestions — Google Gemini constrained to the system's available route table, validated server-side",
          "Loyalty Programme — four tiers (Bronze, Silver, Gold, Platinum) with points earning and redemption"
        ]
      },
      {
        title: "Object-Oriented Design",
        items: [
          "Information Expert — LoyaltyAccount owns all tier calculation and point arithmetic logic",
          "Creator — DefaultBookingFactory and DefaultPaymentFactory centralise object creation",
          "Controller — all controller classes are pure HTTP routing delegates with zero business logic",
          "Pure Fabrication — all Repository classes handle Firestore persistence, representing no real-world concept",
          "Factory Method — BookingFactory and PaymentFactory interfaces with default implementations",
          "Adapter — RazorpayGatewayAdapter and AviationstackClient adapt external APIs to internal interfaces",
          "Strategy — PaymentService depends on PaymentGatewayAdapter interface, provider fully swappable",
          "Template Method — JwtAuthenticationFilter extends OncePerRequestFilter"
        ]
      },
      {
        title: "My Contributions",
        items: [
          "Flight Search and Seat Selection use cases — end-to-end from controller through service to Firestore",
          "Entire React frontend — all 11 pages including seat map, booking flow, tracking, and loyalty dashboard",
          "Complete database layer — FlightRepository, SeatRepository, and BookingRepository",
          "Factory Method pattern — BookingFactory interface with DefaultBookingFactory implementation",
          "Vite proxy configuration eliminating all CORS issues in development"
        ]
      }
    ]
  },

  "smart-glove-healthcare": {
    title: "Smart Glove for Assistive Healthcare Communication",
    category: "Embedded Systems",
    status: "Completed",
    github: "https://github.com/Rohan-134v/SignLanguage-Vocaliser",
    live: null,
    stack: ["C++", "Arduino", "I2C", "MPU6050", "HC-05 Bluetooth", "Flex Sensors"],
    summary: "A wearable assistive-technology device that improves healthcare accessibility for the hearing-impaired by capturing hand gestures via flex sensors and an MPU6050 module, mapping them to sign language text, and transmitting wirelessly via Bluetooth.",
    sections: [
      {
        title: "System Description",
        content: "The microcontroller reads analog values from four flex sensors and digital orientation data from the MPU6050 via I2C communication. Each gesture is defined by a unique combination of finger bend angles and hand orientation, matched against predefined patterns in firmware. The HC-05 Bluetooth module enables wireless transmission of translated text to external devices such as smartphones or hospital displays."
      },
      {
        title: "Working Principle",
        items: [
          "Flex sensors detect the degree of finger bending via analog voltage readings",
          "MPU6050 captures hand orientation and motion via I2C (accelerometer + gyroscope)",
          "Microcontroller processes and normalises the combined sensor data stream",
          "Pattern-matching algorithm maps sensor combinations to predefined gesture mappings",
          "Recognised gestures are converted into corresponding text strings",
          "Text is transmitted wirelessly via the HC-05 Bluetooth module to paired devices"
        ]
      },
      {
        title: "Hardware Components",
        items: [
          "Arduino UNO microcontroller",
          "4x flex sensors for individual finger bend detection",
          "MPU6050 — 6-axis accelerometer and gyroscope via I2C",
          "HC-05 Bluetooth module for wireless text transmission",
          "Resistor voltage divider network for flex sensor signal conditioning",
          "Portable power supply for untethered operation"
        ]
      },
      {
        title: "Applications",
        items: [
          "Assistive communication for speech-impaired individuals in clinical settings",
          "Non-verbal patient communication in hospital environments",
          "Educational and academic embedded systems projects",
          "Human-computer interaction research",
          "Wearable technology prototyping"
        ]
      },
      {
        title: "Future Scope",
        content: "Future iterations may integrate machine learning algorithms for dynamic gesture training, improving adaptability to different users' signing styles. The system can be expanded with additional sensors for more complex gestures or integrated with voice synthesis for multimodal communication output."
      }
    ]
  },

  "real-time-streaming-platform": {
    title: "Real-Time Streaming Platform",
    category: "Full Stack",
    status: "Completed",
    github: "https://github.com/Rohan-134v/Streamvibe",
    live: "https://streamvibe-two.vercel.app",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "WebSockets", "JWT", "bcryptjs", "FFmpeg", "ngrok"],
    summary: "A full-stack real-time video streaming platform built on the MERN stack, achieving sub-100ms latency via the WebSocket protocol with secure room-based session routing, JWT authentication, and server-side FFmpeg media processing.",
    sections: [
      {
        title: "Architecture",
        content: "Two independent servers work together. The Express HTTP server handles user registration, login, JWT issuance, and REST endpoints backed by MongoDB via Mongoose. The WebSocket server manages all real-time communication — maintaining an in-memory room registry, receiving stream data from broadcasters, and immediately relaying it to all authorised participants in the same room. The React frontend communicates with both: REST over HTTP for standard flows, WebSocket for all real-time stream data."
      },
      {
        title: "Core Features",
        items: [
          "Sub-100ms latency via persistent full-duplex WebSocket connections, eliminating HTTP handshake overhead",
          "Secure room-based routing — stream data relayed exclusively to participants within the authorised room",
          "JWT authentication — signed tokens validated on every protected HTTP request and WebSocket connection",
          "FFmpeg integration via fluent-ffmpeg for server-side video stream processing and transcoding",
          "bcrypt password hashing with constant-time comparison to prevent timing-based attacks",
          "Concurrent multi-stream handling — React state isolation keeps each stream's UI independent",
          "ngrok tunneling for exposing local WebSocket server during development and testing"
        ]
      },
      {
        title: "Security",
        items: [
          "Passwords hashed with bcryptjs before storage — never stored in plaintext",
          "JWT-based stateless authentication — no database lookup required per request",
          "Room-level access control — clients must present a valid JWT before joining any room",
          "Cross-session isolation — stream data cannot leak between rooms regardless of message structure",
          "CORS middleware explicitly defines permitted origins on the Express server"
        ]
      },
      {
        title: "WebSocket Protocol",
        items: [
          "Client opens connection and authenticates via token message immediately after connect",
          "join_room message registers the socket as a participant of the specified room",
          "stream_data messages carry binary or base64-encoded video frames relayed to all room participants",
          "Server maintains strict room-to-socket mapping — unauthorised sockets cannot receive room data",
          "Unauthenticated connections are terminated before any room interaction"
        ]
      }
    ]
  }
};

export const PROJECT_ID_MAP: Record<number, string> = {
  1: "policy-aware-code-auditor",
  2: "airline-reservation-system",
  3: "real-time-streaming-platform",
  4: "smart-glove-healthcare",
};

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = id ? projects[id] : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center text-ink font-mono">
        Project not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper text-ink pt-16 overflow-hidden">

      {/* dot grid */}
      <svg className="pointer-events-none fixed inset-0 w-full h-full opacity-[0.07] z-0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="detail-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="#17B587" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#detail-dots)" />
      </svg>

      {/* top-right rotating rings */}
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none fixed -top-20 -right-20 w-72 h-72 opacity-[0.13] z-0"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="40" fill="none" stroke="#17B587" strokeWidth="1" />
        <circle cx="50" cy="50" r="27" fill="none" stroke="#17B587" strokeWidth="0.8" strokeDasharray="4 4" />
        <circle cx="50" cy="50" r="14" fill="none" stroke="#17B587" strokeWidth="0.6" />
        <circle cx="50" cy="10" r="2.5" fill="#17B587" opacity="0.6" />
      </motion.svg>

      {/* bottom-left rotating square */}
      <motion.svg
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none fixed -bottom-14 -left-14 w-60 h-60 opacity-[0.12] z-0"
        viewBox="0 0 100 100"
      >
        <rect x="12" y="12" width="76" height="76" fill="none" stroke="#17B587" strokeWidth="1.2" strokeDasharray="5 4" />
        <rect x="28" y="28" width="44" height="44" fill="none" stroke="#17B587" strokeWidth="0.8" />
        <line x1="50" y1="12" x2="50" y2="88" stroke="#17B587" strokeWidth="0.5" />
        <line x1="12" y1="50" x2="88" y2="50" stroke="#17B587" strokeWidth="0.5" />
      </motion.svg>

      {/* mid-left floating diamond */}
      <motion.svg
        animate={{ y: [0, -12, 0], rotate: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none fixed top-1/2 -left-6 w-24 h-24 opacity-[0.13] z-0"
        viewBox="0 0 100 100"
      >
        <rect x="20" y="20" width="60" height="60" fill="none" stroke="#17B587" strokeWidth="2" transform="rotate(45 50 50)" />
      </motion.svg>

      {/* mid-right floating triangle */}
      <motion.svg
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none fixed top-1/3 -right-4 w-20 h-20 opacity-[0.13] z-0"
        viewBox="0 0 100 100"
      >
        <polygon points="50,10 90,90 10,90" fill="none" stroke="#17B587" strokeWidth="2.5" />
        <polygon points="50,32 74,80 26,80" fill="none" stroke="#17B587" strokeWidth="1.5" strokeDasharray="4 4" />
      </motion.svg>

      {/* green ambient glow — top */}
      <div className="pointer-events-none fixed left-1/2 -translate-x-1/2 top-24 w-[500px] h-[180px] rounded-full bg-mint/10 blur-[90px] z-0" />
      {/* green ambient glow — bottom */}
      <div className="pointer-events-none fixed bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[160px] rounded-full bg-mint/8 blur-[80px] z-0" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-10 pb-32">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <button
            onClick={() => {
              navigate("/");
              setTimeout(() => {
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 350);
            }}
            className="flex items-center gap-2 text-sm font-mono text-muted hover:text-mint-dark transition-colors mb-6"
          >
            <ArrowLeft size={15} /> Back to projects
          </button>

          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center gap-1.5 text-muted text-xs font-mono">
              <CheckCircle2 size={12} className="text-mint-dark" /> {project.status}
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-5 leading-snug text-ink">
            {project.title}
          </h1>

          <p className="text-muted text-base leading-relaxed mb-8 border-l-2 border-mint-dark/40 pl-4">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-md border border-hairline text-sm font-medium text-ink hover:border-mint-dark hover:text-mint-dark transition-colors"
            >
              <Github size={15} /> View source
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-ink text-paper text-sm font-medium hover:bg-mint-dark transition-colors"
              >
                <ExternalLink size={15} /> Live demo
              </a>
            )}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 p-5 rounded-xl border border-hairline bg-[#fafafa]"
        >
          <p className="text-xs font-mono text-muted uppercase tracking-widest mb-3">Tech stack</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech: string) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full border border-hairline text-xs font-mono text-ink bg-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Sections */}
        <div className="space-y-10">
          {project.sections.map((section: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 + i * 0.05 }}
              className="pt-10 border-t border-hairline first:border-t-0 first:pt-0"
            >
              <h2 className="font-display text-lg font-semibold text-ink mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-mint-dark inline-block" />
                {section.title}
              </h2>

              {section.stats && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {section.stats.map((stat: any, si: number) => (
                    <div key={si} className="p-4 rounded-xl border border-hairline bg-[#fafafa] hover:border-mint-dark/40 transition-colors">
                      <p className="font-display text-2xl font-bold text-mint-dark mb-0.5">{stat.value}</p>
                      <p className="text-[11px] font-mono text-muted uppercase tracking-wider leading-tight">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {section.content && (
                <p className="text-muted leading-relaxed text-[15px]">{section.content}</p>
              )}

              {section.items && (
                <ul className="space-y-2.5">
                  {section.items.map((item: string, ii: number) => (
                    <li key={ii} className="flex items-start gap-3 text-muted text-sm leading-relaxed">
                      <span className="mt-[7px] w-1 h-1 rounded-full bg-mint-dark flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
