import { useEffect, useRef } from "react";

const CORE_NODES = [
  { id: 0,  x: 200, y: 200, r: 10, color: "#22c55e" },
  { id: 1,  x: 200, y: 72,  r: 6,  color: "#38bdf8" },
  { id: 2,  x: 320, y: 116, r: 6,  color: "#818cf8" },
  { id: 3,  x: 358, y: 258, r: 6,  color: "#f472b6" },
  { id: 4,  x: 268, y: 358, r: 6,  color: "#fb923c" },
  { id: 5,  x: 132, y: 358, r: 6,  color: "#facc15" },
  { id: 6,  x: 44,  y: 258, r: 6,  color: "#e879f9" },
  { id: 7,  x: 80,  y: 116, r: 6,  color: "#34d399" },
  { id: 8,  x: 200, y: 138, r: 4,  color: "#38bdf8" },
  { id: 9,  x: 270, y: 168, r: 4,  color: "#818cf8" },
  { id: 10, x: 278, y: 248, r: 4,  color: "#f472b6" },
  { id: 11, x: 200, y: 292, r: 4,  color: "#fb923c" },
  { id: 12, x: 126, y: 248, r: 4,  color: "#facc15" },
  { id: 13, x: 130, y: 168, r: 4,  color: "#34d399" },
];

const EPHEMERAL_NODES = [
  { id: 14, x: 200, y: 105, r: 3, color: "#38bdf8" },
  { id: 15, x: 298, y: 140, r: 3, color: "#818cf8" },
  { id: 16, x: 322, y: 215, r: 3, color: "#f472b6" },
  { id: 17, x: 152, y: 105, r: 3, color: "#34d399" },
  { id: 18, x: 105, y: 152, r: 3, color: "#facc15" },
  { id: 19, x: 292, y: 312, r: 3, color: "#fb923c" },
  { id: 20, x: 105, y: 312, r: 3, color: "#e879f9" },
  { id: 21, x: 200, y: 330, r: 3, color: "#22c55e" },
  { id: 22, x: 340, y: 185, r: 3, color: "#38bdf8" },
];

const ALL_NODES = [...CORE_NODES, ...EPHEMERAL_NODES];

const EDGES = [
  [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],
  [0,8],[0,9],[0,10],[0,11],[0,12],[0,13],
  [1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,1],
  [8,9],[9,10],[10,11],[11,12],[12,13],[13,8],
  [1,8],[2,9],[3,10],[4,11],[5,12],[6,13],[7,13],
  [1,14],[2,15],[3,16],[7,17],[6,18],[4,19],[5,20],[4,21],[3,22],
  [14,8],[15,9],[16,10],[17,13],[18,12],[19,11],[20,11],[21,11],[22,10],
];

const FORMULAS = [
  "σ(x) = 1/(1+e⁻ˣ)",
  "softmax = eˣⁱ/Σeˣʲ",
  "∇L = ∂L/∂W",
  "ReLU(x) = max(0,x)",
  "y = Wx + b",
  "QKᵀ/√d",
  "L = -Σyᵢlog(ŷᵢ)",
  "dW = δ · xᵀ",
  "ŷ = f(Σwᵢxᵢ+b)",
  "p(y|x) = σ(wᵀx)",
];

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

export default function NeuralGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const coreEls      = Array.from(svg.querySelectorAll<SVGCircleElement>(".node-core"));
    const ephemeralEls = Array.from(svg.querySelectorAll<SVGCircleElement>(".node-ephemeral"));
    const edgeEls      = Array.from(svg.querySelectorAll<SVGLineElement>(".edge"));
    const signalEls    = Array.from(svg.querySelectorAll<SVGCircleElement>(".signal"));
    const formulaEls   = Array.from(svg.querySelectorAll<SVGTextElement>(".formula"));

    const startTime = performance.now();

    // --- Signal state ---
    const signalState = signalEls.map((_, i) => {
      const edgeIdx = i % EDGES.length;
      return { edgeIdx, progress: Math.random(), speed: 0.004 + Math.random() * 0.004 };
    });

    // --- Ephemeral node state ---
    const ephState = EPHEMERAL_NODES.map((_, i) => ({
      phase: Math.random() * Math.PI * 2,
      speed: 0.0004 + i * 0.00005,
    }));

    // --- Formula state ---
    const formulaState = FORMULAS.map((_, i) => ({
      x: 20 + Math.random() * 360,
      y: 350 + i * 5,
      vy: -(0.12 + Math.random() * 0.1),
      opacity: 0,
      phase: i * 0.7,
    }));

    // Set initial formula positions
    formulaEls.forEach((el, i) => {
      el.setAttribute("x", String(formulaState[i].x));
      el.setAttribute("y", String(formulaState[i].y));
      el.setAttribute("opacity", "0");
    });

    // Show edges immediately
    edgeEls.forEach(el => el.setAttribute("opacity", "0.18"));

    // Show core nodes immediately at full size
    coreEls.forEach((el, i) => {
      el.setAttribute("r", String(CORE_NODES[i].r));
      el.setAttribute("opacity", "0.9");
    });

    let lastTs = 0;

    function tick(ts: number) {
      if (ts - lastTs < 14) { rafRef.current = requestAnimationFrame(tick); return; }
      lastTs = ts;
      const elapsed = (ts - startTime) / 1000;

      // Core node pulse
      coreEls.forEach((el, i) => {
        const base = CORE_NODES[i].r;
        const pulse = base + Math.sin(elapsed * 1.8 + i * 0.7) * base * 0.35;
        el.setAttribute("r", String(pulse));
        const op = 0.75 + Math.sin(elapsed * 1.8 + i * 0.7) * 0.25;
        el.setAttribute("opacity", String(op));
      });

      // Ephemeral node spawn/fade
      ephemeralEls.forEach((el, i) => {
        const s = ephState[i];
        const wave = Math.sin(elapsed * s.speed * 1000 * 0.003 + s.phase);
        const visible = wave > 0;
        const base = EPHEMERAL_NODES[i].r;
        const r = visible ? base * (0.5 + wave * 1.5) : 0;
        const op = visible ? Math.min(1, wave * 2) : 0;
        el.setAttribute("r", String(Math.max(0, r)));
        el.setAttribute("opacity", String(Math.max(0, op)));
      });

      // Signals travel along edges
      signalEls.forEach((el, i) => {
        const s = signalState[i];
        s.progress += s.speed;
        if (s.progress >= 1) {
          s.progress = 0;
          s.edgeIdx = Math.floor(Math.random() * EDGES.length);
          s.speed = 0.004 + Math.random() * 0.005;
        }
        const edge = EDGES[s.edgeIdx];
        const from = ALL_NODES[edge[0]];
        const to   = ALL_NODES[edge[1]];
        const t = s.progress;
        const x = lerp(from.x, to.x, t);
        const y = lerp(from.y, to.y, t);
        const op = t < 0.1 ? t * 10 : t > 0.9 ? (1 - t) * 10 : 1;
        el.setAttribute("cx", String(x));
        el.setAttribute("cy", String(y));
        el.setAttribute("opacity", String(op * 0.9));
        el.setAttribute("fill", from.color);
      });

      // Floating formulas drift upward
      formulaEls.forEach((el, i) => {
        const s = formulaState[i];
        s.y += s.vy;
        const cycleY = 380 - ((380 - s.y) % 280);
        if (s.y < 80) { s.y = 380; s.x = 20 + Math.random() * 360; el.setAttribute("x", String(s.x)); }
        const distFromMid = Math.abs(cycleY - 230) / 150;
        s.opacity = Math.max(0, 0.55 - distFromMid * 0.55);
        el.setAttribute("y", String(s.y));
        el.setAttribute("opacity", String(s.opacity));
      });

      // Random edge flash
      if (Math.random() < 0.02) {
        const el = edgeEls[Math.floor(Math.random() * edgeEls.length)];
        el.setAttribute("opacity", "0.7");
        el.setAttribute("stroke-width", "2");
        setTimeout(() => { el.setAttribute("opacity", "0.18"); el.setAttribute("stroke-width", "0.8"); }, 200);
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto rounded-[40px] overflow-hidden bg-black border border-white/10 cursor-pointer">
      <svg ref={svgRef} viewBox="0 0 400 400" className="w-full h-full">
        <defs>
          <radialGradient id="ngGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#22c55e" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#000"    stopOpacity="0"    />
          </radialGradient>
          <filter id="ngBlur" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <rect width="400" height="400" fill="black"/>
        <circle cx="200" cy="200" r="200" fill="url(#ngGlow)"/>

        {/* Edges */}
        {EDGES.map(([a, b], i) => (
          <line key={i} className="edge"
            x1={ALL_NODES[a].x} y1={ALL_NODES[a].y}
            x2={ALL_NODES[b].x} y2={ALL_NODES[b].y}
            stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" opacity="0"
          />
        ))}

        {/* Signals */}
        {Array.from({ length: 18 }).map((_, i) => (
          <circle key={i} className="signal"
            cx={ALL_NODES[EDGES[i % EDGES.length][0]].x}
            cy={ALL_NODES[EDGES[i % EDGES.length][0]].y}
            r="3" opacity="0" filter="url(#ngBlur)"
            fill={ALL_NODES[EDGES[i % EDGES.length][0]].color}
          />
        ))}

        {/* Ephemeral nodes */}
        {EPHEMERAL_NODES.map((n) => (
          <circle key={n.id} className="node-ephemeral"
            cx={n.x} cy={n.y} r="0"
            fill={n.color} opacity="0" filter="url(#ngBlur)"
          />
        ))}

        {/* Core nodes */}
        {CORE_NODES.map((n) => (
          <circle key={n.id} className="node-core"
            cx={n.x} cy={n.y} r={n.r}
            fill={n.color} opacity="0.9" filter="url(#ngBlur)"
          />
        ))}

        {/* Floating formulas */}
        {FORMULAS.map((f, i) => (
          <text key={i} className="formula"
            x="200" y="350"
            textAnchor="middle"
            fill="#22c55e"
            fontSize="7.5"
            fontFamily="monospace"
            opacity="0"
          >{f}</text>
        ))}
      </svg>
    </div>
  );
}
