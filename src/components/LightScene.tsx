import type { CSSProperties, ReactNode } from "react";

/**
 * A small stage-lighting rig drawn in CSS: moving-head beams sweeping from a
 * truss, violet haze and a floor wash. Used wherever a project has no real
 * footage yet (instead of stock photos) and layered over the hero photo.
 *
 * Deterministic per `seed`, so every project gets its own rig and the server
 * and client always agree.
 */

type LightSceneProps = {
  seed: string;
  /** "full" draws the dark stage behind the beams; "overlay" is beams only. */
  variant?: "full" | "overlay";
  /** Scales beam brightness (0–1.5). */
  intensity?: number;
  className?: string;
  /** Rendered on the stage, underneath the beams — so the beams light it. */
  children?: ReactNode;
};

function hash(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// mulberry32 — tiny seeded PRNG.
function random(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function LightScene({
  seed,
  variant = "full",
  intensity = 1,
  className = "",
  children,
}: LightSceneProps) {
  const r = random(hash(seed));
  const count = 3 + Math.floor(r() * 3); // 3–5 fixtures

  const beams = Array.from({ length: count }, (_, i) => {
    const x = 8 + (84 * (i + 0.5)) / count + (r() - 0.5) * 10;
    // Outer beams lean outwards, inner ones cross the stage.
    const lean = (x - 50) / 50;
    const from = lean * 22 - 14 + r() * 10;
    const to = from + 16 + r() * 22;
    return {
      "--x": `${x.toFixed(2)}%`,
      "--from": `${from.toFixed(1)}deg`,
      "--to": `${to.toFixed(1)}deg`,
      "--w": `${(16 + r() * 16).toFixed(1)}deg`,
      "--s": ((0.28 + r() * 0.34) * intensity).toFixed(3),
      "--d": `${(7 + r() * 8).toFixed(1)}s`,
      "--delay": `${(-r() * 12).toFixed(1)}s`,
    } as CSSProperties;
  });

  return (
    <div aria-hidden className={`scene ${className}`} data-variant={variant}>
      {children}
      {beams.map((style, i) => (
        <div key={`b${i}`} className="beam" style={style} />
      ))}
      {beams.map((style, i) => (
        <div key={`f${i}`} className="fixture" style={style} />
      ))}
    </div>
  );
}
