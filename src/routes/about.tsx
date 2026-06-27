import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Mail, MapPin, MessageCircle, Phone, User, Wrench } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { PHONE_TEL, PHONE_TEL_ALT, PHONE_DISPLAY_ALT, WHATSAPP_DISPLAY, waLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & Contact — TOBIRACHI Gadgets" },
      { name: "description", content: "Learn about TOBIRACHI Gadgets and Stores and how to reach owner Tobi Ajuyah and the team in Magboro, Ogun State." },
      { property: "og:title", content: "About & Contact — TOBIRACHI" },
      { property: "og:description", content: "Founded by Tobi Ajuyah. Quality phones, laptops and same-day repairs in Magboro." },
    ],
  }),
  component: AboutPage,
});

const FAQ = [
  { q: "Do you sell brand new or UK-used phones?", a: "Both. We carry brand-new sealed devices and certified UK-used phones — each clearly labeled and inspected for quality." },
  { q: "Do you offer warranty?", a: "Yes — every brand-new device comes with the manufacturer's warranty, and our repairs include a 90-day warranty on parts and labour." },
  { q: "Can you deliver nationwide?", a: "Absolutely. We ship across Nigeria via trusted logistics partners. Delivery is typically 1–3 business days depending on your location." },
  { q: "How long do repairs take?", a: "Most common repairs (screens, batteries, charging ports) are completed the same day. Board-level repairs may take 2–5 days." },
  { q: "Do you accept installment payment?", a: "Yes — flexible installment plans are available on select devices. Chat us on WhatsApp to discuss your options." },
];

function AboutPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <PageHeader eyebrow="About" title="About & Contact" description="Learn about TOBIRACHI and how to reach us." />

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-2xl font-bold">Who We Are</h2>
            <p className="mt-4 text-muted-foreground">
              TOBIRACHI Gadgets and Stores was founded with a simple mission: making quality technology accessible to every Nigerian.
              Based in Magboro, Ogun State, we've grown from a small phone repair shop to a full-service tech hub.
            </p>
            <p className="mt-3 text-muted-foreground">
              We sell genuine phones and laptops, offer professional repair services, and train the next generation of tech
              professionals. Our commitment to authenticity, speed, and customer satisfaction sets us apart.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border/60 bg-card p-5">
                <h3 className="font-display text-lg font-semibold">Our Mission</h3>
                <p className="mt-2 text-sm text-muted-foreground">Making quality technology accessible to every Nigerian.</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-card p-5">
                <h3 className="font-display text-lg font-semibold">Our Vision</h3>
                <p className="mt-2 text-sm text-muted-foreground">To be Nigeria's most trusted tech retail and service brand.</p>
              </div>
            </div>
          </div>

          {/* Owner card */}
          <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-accent/10 to-transparent p-1">
            <div className="rounded-2xl bg-card p-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Founder, Owner & Head of Repairs
              </div>
              <div className="flex items-center gap-5">
                <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-gradient-brand text-3xl font-bold text-primary-foreground">
                  TA
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold">Tobi Ajuyah</h3>
                  <p className="text-sm text-muted-foreground">Founder & Owner — TOBIRACHI Gadgets and Stores</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 text-sm">
                <div className="flex items-center gap-3"><User className="h-4 w-4 text-primary" /> Founder & CEO</div>
                <div className="flex items-center gap-3"><Wrench className="h-4 w-4 text-primary" /> Head of Repairs — leads every diagnosis and board-level fix</div>
                <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary" /> Magboro, Ogun State, Nigeria</div>
              </div>
              <p className="mt-5 text-sm text-muted-foreground">
                Tobi personally oversees sales, repairs and training — making sure every customer leaves happy and every device leaves
                working better than it arrived.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="font-display text-2xl font-bold">Get In Touch</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-4">
          <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-4 rounded-xl border border-border/60 bg-card p-5 transition hover:border-primary/60">
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-primary/10 text-primary"><Phone className="h-5 w-5" /></span>
            <div><div className="text-xs text-muted-foreground">Call us</div><div className="font-semibold">{WHATSAPP_DISPLAY}</div></div>
          </a>
          <a href={`tel:${PHONE_TEL_ALT}`} className="flex items-center gap-4 rounded-xl border border-border/60 bg-card p-5 transition hover:border-primary/60">
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-primary/10 text-primary"><Phone className="h-5 w-5" /></span>
            <div><div className="text-xs text-muted-foreground">Alt line</div><div className="font-semibold">{PHONE_DISPLAY_ALT}</div></div>
          </a>
          <a href="mailto:ajuyahdaniel@gmail.com" className="flex items-center gap-4 rounded-xl border border-border/60 bg-card p-5 transition hover:border-primary/60">
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-primary/10 text-primary"><Mail className="h-5 w-5" /></span>
            <div><div className="text-xs text-muted-foreground">Email</div><div className="font-semibold">ajuyahdaniel@gmail.com</div></div>
          </a>
          <a href={waLink("Hi TOBIRACHI! I have a question.")} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 p-5 transition hover:border-[#25D366]">
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-[#25D366]/20 text-[#25D366]"><MessageCircle className="h-5 w-5" /></span>
            <div><div className="text-xs text-muted-foreground">WhatsApp</div><div className="font-semibold">Chat with us</div></div>
          </a>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-border/60">
          <iframe
            title="TOBIRACHI Location — Magboro"
            src="https://www.google.com/maps?q=Magboro%2C+Ogun+State%2C+Nigeria&output=embed"
            className="h-80 w-full"
            loading="lazy"
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="text-center font-display text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="mt-8 space-y-3">
          {FAQ.map((f, i) => (
            <div key={f.q} className="overflow-hidden rounded-xl border border-border/60 bg-card">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-medium">{f.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 transition ${open === i ? "rotate-180 text-primary" : ""}`} />
              </button>
              {open === i && <div className="border-t border-border/60 p-5 text-sm text-muted-foreground">{f.a}</div>}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
