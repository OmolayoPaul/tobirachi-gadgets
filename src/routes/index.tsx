import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Cpu, Headphones, Laptop, ShieldCheck, Smartphone, Truck, Wrench, GraduationCap, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/site/ProductCard";
import { useProducts } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TOBIRACHI Gadgets and Stores — Phones, Laptops & Repairs" },
      { name: "description", content: "Buy the latest phones & laptops. Get fast repairs. Learn in-demand tech skills." },
      { property: "og:title", content: "TOBIRACHI Gadgets and Stores" },
      { property: "og:description", content: "Nigeria's most trusted gadget store." },
    ],
  }),
  component: Index,
});

const CATEGORIES = [
  { to: "/phones", label: "Phones", icon: Smartphone },
  { to: "/laptops", label: "Laptops", icon: Laptop },
  { to: "/accessories", label: "Accessories", icon: Headphones },
  { to: "/smart-devices", label: "Smart Devices", icon: Cpu },
  { to: "/repairs", label: "Repairs", icon: Wrench },
  { to: "/training", label: "Tech Training", icon: GraduationCap },
] as const;

const MARQUEE = [
  "iPhone 17 Series Now Available",
  "Samsung Galaxy S25",
  "MacBook Air M3",
  "Free Screen Guard on Every Phone Purchase",
];

const TESTIMONIALS = [
  { quote: "Got my iPhone 15 Pro screen fixed same day! Quality service and genuine parts. Highly recommend TOBIRACHI.", name: "Chinedu A.", city: "Lagos" },
  { quote: "Bought my Infinix Note 40 Pro here — best price in town! They even threw in a free screen guard. Amazing!", name: "Fatimah O.", city: "Abeokuta" },
  { quote: "The tech training program changed my career. I went from zero to freelance gigs in 6 weeks!", name: "David E.", city: "Ijebu-Ode" },
];

function Index() {
  const { data: products = [] } = useProducts();
  const hot = products.filter((p) => p.badge === "HOT" || p.badge === "BEST SELLER").slice(0, 5);

  return (
    <>
      {/* Marquee */}
      <div className="overflow-hidden border-b border-border/60 bg-surface/60 py-2">
        <div className="flex w-max gap-12 whitespace-nowrap animate-marquee">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3 w-3 text-primary" /> {m}
            </span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="starfield absolute inset-0" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 lg:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3 w-3" /> Nigeria's #1 Trusted Gadget Hub
            </div>
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Nigeria's Most <span className="text-gradient">Trusted</span> Gadget Store
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              Buy the latest phones & laptops. Get fast repairs. Learn in-demand tech skills.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/phones" className="inline-flex items-center gap-2 rounded-md bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                Shop Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/repairs" className="inline-flex items-center gap-2 rounded-md border border-primary/40 bg-primary/5 px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10">
                Book a Repair
              </Link>
            </div>
            <div className="mt-10 grid max-w-md grid-cols-3 gap-6 text-sm">
              <div><div className="font-display text-2xl font-bold text-gradient">5K+</div><div className="text-xs text-muted-foreground">Happy customers</div></div>
              <div><div className="font-display text-2xl font-bold text-gradient">90d</div><div className="text-xs text-muted-foreground">Repair warranty</div></div>
              <div><div className="font-display text-2xl font-bold text-gradient">24h</div><div className="text-xs text-muted-foreground">Fast delivery</div></div>
            </div>
          </div>
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm">
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-brand opacity-20 blur-3xl" />
            <div className="relative h-full overflow-hidden rounded-[2.5rem] border border-primary/30 bg-surface ring-glow animate-float">
              <img
                src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=900&q=80"
                alt="Latest iPhone"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-8 font-display text-3xl font-bold">Shop by Category</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="group flex flex-col items-center gap-3 rounded-xl border border-border/60 bg-card p-6 text-center transition hover:-translate-y-1 hover:border-primary/60 hover:bg-card/80"
            >
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-gradient-brand group-hover:text-primary-foreground">
                <Icon className="h-6 w-6" />
              </span>
              <span className="text-sm font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Hot */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-3xl font-bold">What's Hot Right Now</h2>
          <Link to="/phones" className="text-sm font-medium text-primary hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {hot.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <h2 className="mb-12 text-center font-display text-3xl font-bold">Why Choose TOBIRACHI</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, title: "Genuine Products", desc: "100% authentic, warranty-backed devices" },
            { icon: Wrench, title: "Fast Repairs", desc: "Same-day repairs for most faults" },
            { icon: Truck, title: "Delivery Available", desc: "We ship across Nigeria" },
            { icon: Headphones, title: "After-Sales Support", desc: "We're always here for you" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-border/60 bg-card p-6">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-gradient-brand text-primary-foreground">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent p-10 md:p-16">
          <div className="starfield absolute inset-0" />
          <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="font-display text-3xl font-bold md:text-4xl">Phone Cracked? Battery Dead? Charging Issues?</h2>
              <p className="mt-3 text-muted-foreground">We Fix It Fast! Same-day repairs with 90-day warranty.</p>
            </div>
            <Link to="/repairs" className="inline-flex items-center gap-2 rounded-md bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground">
              Book Repair Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <h2 className="mb-12 text-center font-display text-3xl font-bold">What Our Customers Say</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="rounded-xl border border-border/60 bg-card p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">"{t.quote}"</p>
              <div className="mt-4 border-t border-border/60 pt-4">
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.city}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
