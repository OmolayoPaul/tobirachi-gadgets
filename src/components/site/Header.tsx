import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Phone, Settings, ShoppingCart, X, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { PHONE_TEL, WHATSAPP_DISPLAY } from "@/lib/whatsapp";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/phones", label: "Phones" },
  { to: "/laptops", label: "Laptops" },
  { to: "/accessories", label: "Accessories" },
  { to: "/smart-devices", label: "Smart Devices" },
  { to: "/repairs", label: "Repairs", badge: "FAST FIX" },
  { to: "/training", label: "Tech Training" },
  { to: "/about", label: "About / Contact" },
] as const;

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand text-primary-foreground">
            <Zap className="h-4 w-4" />
          </span>
          <span className="tracking-tight">TOBIRACHI</span>
        </Link>

        <nav className="ml-6 hidden flex-1 items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative rounded-md px-3 py-2 text-sm font-medium transition ${
                  active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                {"badge" in item && item.badge && (
                  <span className="absolute -right-2 -top-1.5 rounded-full bg-destructive px-1.5 py-0.5 text-[9px] font-bold text-destructive-foreground">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link to="/cart" className="relative grid h-10 w-10 place-items-center rounded-md hover:bg-muted">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          <a href={`tel:${PHONE_TEL}`} className="hidden items-center gap-2 rounded-md border border-border/60 px-3 py-2 text-sm hover:bg-muted md:flex">
            <Phone className="h-4 w-4 text-primary" />
            <span>{WHATSAPP_DISPLAY}</span>
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-md hover:bg-muted lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="absolute inset-x-0 top-full z-50 border-t border-border/60 bg-background shadow-xl lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col p-2">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center justify-between rounded-md px-3 py-3 text-sm font-medium hover:bg-muted"
              >
                <span>{item.label}</span>
                {"badge" in item && item.badge && (
                  <span className="rounded-full bg-destructive px-1.5 py-0.5 text-[9px] font-bold text-destructive-foreground">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
