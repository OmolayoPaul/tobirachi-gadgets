import { useState } from "react";

const LAYERS = [
  { label: "Display Glass", color: "from-cyan-300/80 to-blue-400/60", hint: "Front glass + touch digitizer" },
  { label: "OLED Panel", color: "from-indigo-400/80 to-purple-500/60", hint: "Display assembly" },
  { label: "Mid Frame", color: "from-slate-300/70 to-slate-500/50", hint: "Metal chassis" },
  { label: "Logic Board", color: "from-emerald-400/80 to-teal-500/60", hint: "Mainboard + SoC" },
  { label: "Battery", color: "from-amber-300/80 to-orange-500/60", hint: "Li-ion cell" },
  { label: "Back Cover", color: "from-zinc-400/70 to-zinc-600/60", hint: "Rear housing + camera" },
] as const;

export function ExplodedPhone() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="relative grid gap-6 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-surface to-background p-6 lg:grid-cols-[1fr_220px]">
      <div className="relative mx-auto h-[440px] w-[220px]" style={{ perspective: "1200px" }}>
        <div
          className="relative h-full w-full transition-transform duration-700"
          style={{ transformStyle: "preserve-3d", transform: "rotateX(58deg) rotateZ(-22deg)" }}
        >
          {LAYERS.map((l, i) => {
            const isActive = active === i;
            const offset = (LAYERS.length - 1 - i) * 56;
            return (
              <div
                key={l.label}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onClick={() => setActive(isActive ? null : i)}
                className={`absolute inset-0 cursor-pointer rounded-[28px] border border-white/20 bg-gradient-to-br ${l.color} backdrop-blur-sm transition-all duration-500`}
                style={{
                  transform: `translateZ(${offset}px) ${isActive ? "translateY(-12px) scale(1.04)" : ""}`,
                  boxShadow: isActive
                    ? "0 30px 80px -20px oklch(0.78 0.16 215 / 0.6)"
                    : "0 10px 30px -10px rgba(0,0,0,0.4)",
                  opacity: active === null || isActive ? 1 : 0.6,
                }}
              >
                <div className="absolute left-3 top-3 rounded-md bg-black/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                  {String(i + 1).padStart(2, "0")} · {l.label}
                </div>
                {i === 0 && (
                  <div className="absolute left-1/2 top-3 h-1.5 w-12 -translate-x-1/2 rounded-full bg-black/40" />
                )}
                {i === 3 && (
                  <div className="absolute inset-6 grid grid-cols-3 gap-1.5 opacity-70">
                    {Array.from({ length: 9 }).map((_, k) => (
                      <div key={k} className="rounded-sm bg-black/30" />
                    ))}
                  </div>
                )}
                {i === 5 && (
                  <div className="absolute right-4 top-4 grid grid-cols-2 gap-1.5">
                    {Array.from({ length: 4 }).map((_, k) => (
                      <div key={k} className="h-5 w-5 rounded-full border border-black/40 bg-black/40" />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="pointer-events-none absolute -bottom-4 left-1/2 h-6 w-48 -translate-x-1/2 rounded-full bg-primary/30 blur-2xl" />
      </div>

      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-primary">Exploded Diagnostic View</div>
        <p className="mt-1 text-sm text-muted-foreground">Hover or tap a layer to highlight the part we'll inspect & repair.</p>
        <ul className="mt-5 space-y-2">
          {LAYERS.map((l, i) => (
            <li
              key={l.label}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(active === i ? null : i)}
              className={`flex cursor-pointer items-start gap-3 rounded-md border px-3 py-2 text-sm transition ${
                active === i ? "border-primary bg-primary/10" : "border-border/60 hover:border-primary/50"
              }`}
            >
              <span className={`mt-1 h-3 w-3 shrink-0 rounded-full bg-gradient-to-br ${l.color}`} />
              <div>
                <div className="font-semibold">{l.label}</div>
                <div className="text-xs text-muted-foreground">{l.hint}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
