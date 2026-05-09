import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, Terminal, CheckCircle2 } from "lucide-react";

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

  "perishables-management-system": {
    title: "Perishables Management System",
    category: "Software Engineering",
    status: "Completed",
    github: "https://github.com/pestechnology/PESU_EC_CSE_H_P15_Perishables_management_system_Rithvik-Matta",
    live: null,
    stack: ["SDLC", "Agile/Scrum", "JIRA", "UML", "Software Architecture"],
    summary: "A retail inventory management application for optimally managing perishable goods such as fresh fruits and vegetables, developed as part of the UE23CS341A Software Engineering course at PES University following a full SDLC process with Agile sprints, JIRA tracking, and documented architecture.",
    sections: [
      {
        title: "Project Overview",
        content: "Developed as part of the UE23CS341A course at PES University (Academic Year 2025, 5th Semester). The project focused on applying software engineering principles throughout the full development lifecycle — from requirements gathering and system design through implementation, testing, and documentation."
      },
      {
        title: "Software Engineering Process",
        items: [
          "Requirements analysis and specification documentation",
          "System architecture design with UML diagrams",
          "Agile/Scrum methodology with sprint planning via JIRA",
          "Feature branch strategy with pull request code review process",
          "Conventional commit message format for traceability",
          "Test coverage with unit and integration test suites",
          "API documentation and developer guides"
        ]
      },
      {
        title: "My Role",
        content: "Contributed as a Developer Team member under Scrum Master Rithvik Matta. Responsibilities included feature implementation, code review participation, sprint task completion, and adherence to the team's branching and commit conventions."
      },
      {
        title: "Key Learnings",
        items: [
          "End-to-end SDLC execution on a team project with defined roles",
          "JIRA for sprint planning, backlog management, and progress tracking",
          "UML for communicating system architecture and design decisions",
          "Structured code review process via pull requests",
          "Documentation as a first-class deliverable alongside code"
        ]
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
  3: "smart-glove-healthcare",
  4: "perishables-management-system",
  5: "real-time-streaming-platform",
};

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = id ? projects[id] : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono">
        Project not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-green-400 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </button>
          <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">{project.category}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono uppercase tracking-wider">
              {project.category}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-mono">
              <CheckCircle2 size={11} className="text-green-400" /> {project.status}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            {project.title}
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mb-8">
            {project.summary}
          </p>

          <div className="flex gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 text-sm font-medium hover:border-green-500/50 hover:text-green-400 transition-all duration-300"
            >
              <Github size={16} /> View Source
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-medium hover:bg-green-500/20 transition-all duration-300"
              >
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Tech Stack</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech: string) => (
              <span
                key={tech}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-300"
              >
                <Terminal size={10} className="text-green-400" /> {tech}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="h-px bg-white/5 mb-16" />

        {/* Sections */}
        <div className="space-y-16">
          {project.sections.map((section: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-mono text-green-500 opacity-40">0{i + 1}</span>
                <h2 className="text-xl font-bold text-white">{section.title}</h2>
                <div className="flex-1 h-px bg-white/5" />
              </div>

              {section.stats && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {section.stats.map((stat: any, si: number) => (
                    <div key={si} className="p-5 rounded-2xl bg-white/5 border border-white/10">
                      <p className="text-3xl font-bold text-green-400 mb-1">{stat.value}</p>
                      <p className="text-xs font-mono text-gray-500 uppercase tracking-wider">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {section.content && (
                <p className="text-gray-400 leading-relaxed text-base">{section.content}</p>
              )}

              {section.items && (
                <ul className="space-y-3">
                  {section.items.map((item: string, ii: number) => (
                    <li key={ii} className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom nav */}
        <div className="mt-24 pt-8 border-t border-white/5 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-green-400 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Portfolio
          </button>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-green-400 transition-colors"
          >
            <Github size={14} /> View on GitHub
          </a>
        </div>

      </div>
    </div>
  );
}
