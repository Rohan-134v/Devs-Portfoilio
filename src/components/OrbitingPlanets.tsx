import { useEffect, useRef } from "react";

// ── keyboard layout ───────────────────────────────────────────────────────────
const ROWS = [
  ["Esc","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12"],
  ["`","1","2","3","4","5","6","7","8","9","0","-","=","⌫"],
  ["Tab","Q","W","E","R","T","Y","U","I","O","P","[","]","\\"],
  ["Caps","A","S","D","F","G","H","J","K","L",";","'","Enter"],
  ["⇧","Z","X","C","V","B","N","M",",",".","/","⇧"],
  ["Ctrl","Alt","⌘","Space","⌘","Alt","Ctrl"],
];

// wide keys and their relative widths
const WIDE: Record<string, number> = {
  "⌫": 1.9, "Tab": 1.5, "\\": 1.5, "Caps": 1.75,
  "Enter": 2.1, "⇧": 2.3, "Space": 5.2, "Ctrl": 1.4, "Alt": 1.2, "⌘": 1.2,
};

const KEY_H    = 42;
const KEY_GAP  = 5;
const PAD      = 18;
const CORNER_R = 6;

// ── category accent colours ───────────────────────────────────────────────────
const CATEGORY_HUE: Record<string, number> = {
  "AI / ML":              140,
  "Full Stack":           210,
  "Embedded Systems":     25,
  "Software Engineering": 270,
};

interface KeyState {
  row: number; col: number;
  x: number; y: number;
  w: number; h: number;
  label: string;
  press: number;   // 0–1, 1 = fully pressed
  pressDir: number;
}

function hsl(h: number, s: number, l: number, a = 1) {
  return `hsla(${h},${s}%,${l}%,${a})`;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

export default function OrbitingPlanets({ category }: { category?: string }) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const categoryRef = useRef(category);
  useEffect(() => { categoryRef.current = category; }, [category]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    let raf = 0;

    // ── build key layout ──────────────────────────────────────────────────────
    const keys: KeyState[] = [];
    const BASE_W = 42;

    // compute total keyboard width from row 1 (widest)
    const row1W = ROWS[1].reduce((s, k) => s + (WIDE[k] ?? 1) * BASE_W + KEY_GAP, -KEY_GAP);
    const KBD_W = row1W + PAD * 2;

    ROWS.forEach((row, ri) => {
      // row offsets to align nicely
      const ROW_OFFSETS = [0, 0, 0, 0, 0, (BASE_W * 1.5)];
      let x = PAD + (ROW_OFFSETS[ri] ?? 0);
      const y = PAD + ri * (KEY_H + KEY_GAP);
      row.forEach((label, ci) => {
        const w = (WIDE[label] ?? 1) * BASE_W;
        keys.push({ row: ri, col: ci, x, y, w, h: KEY_H, label, press: 0, pressDir: 0 });
        x += w + KEY_GAP;
      });
    });

    // ── hi-dpi resize ─────────────────────────────────────────────────────────
    const resize = () => {
      const dpr  = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width  = rect.width  * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ── random key clack scheduler ────────────────────────────────────────────
    const clackable = keys.filter(k => k.label !== "Space" && k.w === BASE_W);
    let nextClack = 0;

    function scheduleClack(now: number) {
      if (now < nextClack) return;
      const burst = 1 + Math.floor(Math.random() * 3);
      for (let b = 0; b < burst; b++) {
        const k = clackable[Math.floor(Math.random() * clackable.length)];
        if (k.pressDir === 0) k.pressDir = 1;
      }
      nextClack = now + 180 + Math.random() * 320;
    }

    // ── draw ──────────────────────────────────────────────────────────────────
    function draw(ts: number) {
      const W   = canvas.getBoundingClientRect().width;
      const H   = canvas.getBoundingClientRect().height;
      const cat = categoryRef.current ?? "";
      const baseHue = CATEGORY_HUE[cat] ?? 140;

      // wave: hue sweeps across keyboard width over time
      const waveSpeed  = 90;   // px per second
      const waveOffset = (ts / 1000 * waveSpeed) % (KBD_W + 200);

      // scale keyboard to fit canvas width
      const scale  = (W - 32) / KBD_W;
      const kbdH   = PAD * 2 + ROWS.length * (KEY_H + KEY_GAP) - KEY_GAP;
      const offsetX = 16;
      const offsetY = (H - kbdH * scale) / 2;

      ctx.clearRect(0, 0, W, H);

      // background
      ctx.fillStyle = "#080808";
      ctx.fillRect(0, 0, W, H);

      // keyboard body
      ctx.save();
      ctx.translate(offsetX, offsetY);
      ctx.scale(scale, scale);

      // body shadow / glow
      ctx.shadowColor = hsl(baseHue, 80, 50, 0.4);
      ctx.shadowBlur  = 40;
      roundRect(ctx, 0, 0, KBD_W, kbdH, 14);
      ctx.fillStyle = "#111";
      ctx.fill();
      ctx.shadowBlur = 0;

      // body border
      roundRect(ctx, 0, 0, KBD_W, kbdH, 14);
      ctx.strokeStyle = hsl(baseHue, 60, 30, 0.6);
      ctx.lineWidth   = 1.5;
      ctx.stroke();

      // ── draw each key ──────────────────────────────────────────────────────
      keys.forEach(k => {
        // animate press
        if (k.pressDir === 1) {
          k.press += 0.18;
          if (k.press >= 1) { k.press = 1; k.pressDir = -1; }
        } else if (k.pressDir === -1) {
          k.press -= 0.10;
          if (k.press <= 0) { k.press = 0; k.pressDir = 0; }
        }

        const pressY  = k.press * 3;
        const kx      = k.x;
        const ky      = k.y + pressY;
        const kw      = k.w;
        const kh      = k.h - pressY;

        // RGB wave hue for this key (based on x position)
        const keyCenter = kx + kw / 2;
        const waveDist  = keyCenter - (waveOffset - 100);
        const waveHue   = (baseHue + waveDist * 1.1) % 360;
        const waveIntensity = Math.max(0, 1 - Math.abs(waveDist) / 160);

        // key shadow (depth effect)
        if (k.press < 0.5) {
          roundRect(ctx, kx + 1, ky + 4 * (1 - k.press), kw, kh, CORNER_R);
          ctx.fillStyle = "#000";
          ctx.fill();
        }

        // key face
        roundRect(ctx, kx, ky, kw, kh, CORNER_R);

        // base colour — dark with slight hue tint
        const baseLightness = 14 + waveIntensity * 8;
        ctx.fillStyle = hsl(waveHue, 30 + waveIntensity * 40, baseLightness);
        ctx.fill();

        // RGB glow overlay on key face
        if (waveIntensity > 0.05) {
          roundRect(ctx, kx, ky, kw, kh, CORNER_R);
          const glowGrad = ctx.createLinearGradient(kx, ky, kx, ky + kh);
          glowGrad.addColorStop(0, hsl(waveHue, 100, 65, waveIntensity * 0.55));
          glowGrad.addColorStop(1, hsl(waveHue, 100, 40, waveIntensity * 0.15));
          ctx.fillStyle = glowGrad;
          ctx.fill();
        }

        // pressed key extra glow
        if (k.press > 0.1) {
          roundRect(ctx, kx, ky, kw, kh, CORNER_R);
          ctx.fillStyle = hsl(waveHue, 100, 70, k.press * 0.5);
          ctx.fill();
          ctx.shadowColor = hsl(waveHue, 100, 60);
          ctx.shadowBlur  = 14 * k.press;
          roundRect(ctx, kx, ky, kw, kh, CORNER_R);
          ctx.strokeStyle = hsl(waveHue, 100, 75, k.press * 0.9);
          ctx.lineWidth   = 1;
          ctx.stroke();
          ctx.shadowBlur  = 0;
        }

        // key border
        roundRect(ctx, kx, ky, kw, kh, CORNER_R);
        ctx.strokeStyle = hsl(waveHue, 50, 35 + waveIntensity * 30, 0.7);
        ctx.lineWidth   = 0.8;
        ctx.stroke();

        // key label
        const labelSize = k.w > BASE_W * 1.5 ? 9 : 10;
        ctx.font        = `600 ${labelSize}px ui-monospace, monospace`;
        ctx.textAlign   = "center";
        ctx.textBaseline = "middle";
        const labelAlpha = 0.45 + waveIntensity * 0.55;
        ctx.fillStyle   = hsl(waveHue, 80, 85, labelAlpha);
        if (k.press > 0.1) {
          ctx.shadowColor = hsl(waveHue, 100, 80);
          ctx.shadowBlur  = 6;
        }
        ctx.fillText(k.label, kx + kw / 2, ky + kh / 2 + 0.5);
        ctx.shadowBlur = 0;
      });

      ctx.restore();

      // bottom label
      ctx.font      = "bold 11px ui-monospace, monospace";
      ctx.fillStyle = hsl(baseHue, 70, 65, 0.5);
      ctx.textAlign = "center";
      ctx.fillText(
        cat ? cat.toUpperCase() : "DEV SETUP",
        W / 2, H - 10
      );

      scheduleClack(ts);
      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="w-full aspect-square max-w-[480px] mx-auto relative">
      <div
        className="absolute inset-0 rounded-2xl blur-3xl opacity-20 pointer-events-none transition-all duration-700"
        style={{ background: `hsl(${CATEGORY_HUE[category ?? ""] ?? 140},80%,40%)` }}
      />
      <canvas ref={canvasRef} className="w-full h-full rounded-2xl" />
    </div>
  );
}
