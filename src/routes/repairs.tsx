import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft, ArrowRight, Camera, Check, Gamepad2, Headphones,
  Laptop, MessageCircle, Monitor, ShieldCheck, Smartphone, Stethoscope, Timer, Wrench,
} from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { ExplodedPhone } from "@/components/site/ExplodedPhone";
import { waLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/repairs")({
  head: () => ({
    meta: [
      { title: "Repairs — TOBIRACHI Gadgets" },
      { name: "description", content: "Professional gadget repair with 90-day warranty. Same-day service available." },
    ],
  }),
  component: RepairsPage,
});

const DEVICES = [
  { key: "Smartphone", icon: Smartphone },
  { key: "Laptop", icon: Laptop },
  { key: "Gaming Console", icon: Gamepad2 },
  { key: "Earbuds / Headphones", icon: Headphones },
  { key: "Camera", icon: Camera },
  { key: "Desktop / Monitor", icon: Monitor },
] as const;

const FAULTS_BY_DEVICE: Record<string, string[]> = {
  Smartphone: ["Cracked screen", "Battery replacement", "Charging port", "Speaker / mic", "Water damage", "Software / unlock", "Camera fault", "Board-level repair"],
  Laptop: ["Screen replacement", "Battery / charging", "Keyboard", "RAM / SSD upgrade", "Overheating", "OS install", "Liquid damage"],
  "Gaming Console": ["HDMI port", "Overheating", "Disc drive", "Controller drift", "Software / firmware"],
  "Earbuds / Headphones": ["No sound (one side)", "Charging case", "Pairing issues", "Battery drain"],
  Camera: ["Lens / shutter", "LCD screen", "Battery", "Memory / firmware"],
  "Desktop / Monitor": ["No display", "PSU failure", "Backlight", "RAM / storage", "OS install"],
};

const URGENCY = [
  { key: "Standard", desc: "1–3 business days", icon: Timer },
  { key: "Same-Day", desc: "Walk-in, ready by close", icon: Check },
];

function RepairsPage() {
  const [step, setStep] = useState(1);
  const [device, setDevice] = useState<string>("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [faults, setFaults] = useState<string[]>([]);
  const [urgency, setUrgency] = useState("Standard");
  const [name, setName] = useState("");

  const toggleFault = (f: string) =>
    setFaults((cur) => (cur.includes(f) ? cur.filter((x) => x !== f) : [...cur, f]));

  const canNext = (s: number) => {
    if (s === 1) return !!device;
    if (s === 2) return !!brand && !!model;
    if (s === 3) return faults.length > 0;
    return true;
  };

  const summary = `Hi TOBIRACHI! I'd like to book a repair.

• Device: ${device}
• Brand / Model: ${brand} ${model}
• Issues: ${faults.join(", ")}
• Urgency: ${urgency}
• Name: ${name || "—"}`;

  return (
    <>
      <PageHeader
        eyebrow="Service"
        title="Repairs"
        description="Professional gadget repair with 90-day warranty. Same-day service available."
      >
        <div className="flex flex-wrap gap-3 text-sm">
          {[
            { icon: Timer, text: "Same-Day Service" },
            { icon: ShieldCheck, text: "90-Day Warranty" },
            { icon: Stethoscope, text: "Free Diagnostics" },
            { icon: Wrench, text: "Certified Technicians" },
          ].map(({ icon: Icon, text }) => (
            <span key={text} className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-primary">
              <Icon className="h-4 w-4" /> {text}
            </span>
          ))}
        </div>
      </PageHeader>

      <section className="mx-auto max-w-5xl px-4 py-12">
        {/* Stepper */}
        <div className="mb-8 flex items-center justify-between gap-2">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex flex-1 items-center gap-2">
              <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold transition ${
                step >= n ? "bg-gradient-brand text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {step > n ? <Check className="h-4 w-4" /> : n}
              </div>
              {n < 4 && <div className={`h-0.5 flex-1 rounded ${step > n ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>
        <div className="mb-6 text-sm font-medium text-muted-foreground">
          Step {step} of 4 — {["Select Device", "Brand & Model", "What's Wrong?", "Confirm & Book"][step - 1]}
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-6 md:p-8">
          {/* Step 1 */}
          {step === 1 && (
            <>
              <div className="grid gap-3 sm:grid-cols-3">
                {DEVICES.map(({ key, icon: Icon }) => {
                  const active = device === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setDevice(key)}
                      className={`flex flex-col items-center gap-3 rounded-xl border p-5 text-center transition ${
                        active ? "border-primary bg-primary/10 ring-glow" : "border-border/60 hover:border-primary/50"
                      }`}
                    >
                      <Icon className={`h-7 w-7 ${active ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="text-sm font-medium">{key}</span>
                    </button>
                  );
                })}
              </div>

              {device === "Smartphone" && (
                <div className="mt-8">
                  <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                    Smartphone — what we inspect
                  </div>
                  <ExplodedPhone />
                </div>
              )}
            </>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium">Brand</span>
                <input
                  value={brand} onChange={(e) => setBrand(e.target.value)}
                  placeholder="e.g. Apple, Samsung, Dell"
                  className="mt-2 w-full rounded-md border border-border/60 bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium">Model</span>
                <input
                  value={model} onChange={(e) => setModel(e.target.value)}
                  placeholder="e.g. iPhone 13 Pro, Galaxy S24"
                  className="mt-2 w-full rounded-md border border-border/60 bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </label>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div>
              <p className="mb-4 text-sm text-muted-foreground">Select all that apply.</p>
              <div className="flex flex-wrap gap-2">
                {(FAULTS_BY_DEVICE[device] || []).map((f) => {
                  const on = faults.includes(f);
                  return (
                    <button
                      key={f}
                      onClick={() => toggleFault(f)}
                      className={`rounded-full border px-3 py-1.5 text-sm transition ${
                        on ? "border-primary bg-primary/15 text-primary" : "border-border/60 hover:border-primary/40"
                      }`}
                    >
                      {on && <Check className="mr-1 inline h-3 w-3" />} {f}
                    </button>
                  );
                })}
              </div>

              <div className="mt-8">
                <div className="text-sm font-medium">Urgency</div>
                <div className="mt-2 grid gap-3 sm:grid-cols-2">
                  {URGENCY.map(({ key, desc, icon: Icon }) => {
                    const active = urgency === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setUrgency(key)}
                        className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${
                          active ? "border-primary bg-primary/10" : "border-border/60 hover:border-primary/50"
                        }`}
                      >
                        <Icon className={`mt-0.5 h-5 w-5 ${active ? "text-primary" : "text-muted-foreground"}`} />
                        <div>
                          <div className="font-semibold">{key}</div>
                          <div className="text-xs text-muted-foreground">{desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div>
              <label className="block">
                <span className="text-sm font-medium">Your name (optional)</span>
                <input
                  value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Tobi A."
                  className="mt-2 w-full rounded-md border border-border/60 bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </label>
              <div className="mt-6 rounded-xl border border-border/60 bg-background/50 p-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-primary">Booking Summary</div>
                <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                  <div><dt className="text-muted-foreground">Device</dt><dd className="font-medium">{device}</dd></div>
                  <div><dt className="text-muted-foreground">Brand / Model</dt><dd className="font-medium">{brand} {model}</dd></div>
                  <div className="sm:col-span-2"><dt className="text-muted-foreground">Issues</dt><dd className="font-medium">{faults.join(", ") || "—"}</dd></div>
                  <div><dt className="text-muted-foreground">Urgency</dt><dd className="font-medium">{urgency}</dd></div>
                </dl>
              </div>
              <a
                href={waLink(summary)}
                target="_blank" rel="noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/20 hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" /> Send Booking via WhatsApp
              </a>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                We'll confirm a drop-off / pick-up window and quote within minutes.
              </p>
            </div>
          )}

          {/* Footer nav */}
          <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-6">
            <button
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="inline-flex items-center gap-2 rounded-md border border-border/60 px-4 py-2 text-sm disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            {step < 4 ? (
              <button
                onClick={() => canNext(step) && setStep(step + 1)}
                disabled={!canNext(step)}
                className="inline-flex items-center gap-2 rounded-md bg-gradient-brand px-5 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <a
                href={waLink("Hi TOBIRACHI! I have a quick repair question.")}
                target="_blank" rel="noreferrer"
                className="text-sm font-medium text-primary hover:underline"
              >
                Have a question? Chat us →
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
