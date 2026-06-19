import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Zap } from "lucide-react";
import { PHONE_TEL, WHATSAPP_DISPLAY } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand text-primary-foreground">
              <Zap className="h-4 w-4" />
            </span>
            TOBIRACHI
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Nigeria's trusted gadget store — phones, laptops, repairs and tech training in Magboro, Ogun State.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/phones" className="hover:text-foreground">Phones</Link></li>
            <li><Link to="/laptops" className="hover:text-foreground">Laptops</Link></li>
            <li><Link to="/accessories" className="hover:text-foreground">Accessories</Link></li>
            <li><Link to="/smart-devices" className="hover:text-foreground">Smart Devices</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Services</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/repairs" className="hover:text-foreground">Repairs</Link></li>
            <li><Link to="/training" className="hover:text-foreground">Tech Training</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/about" className="hover:text-foreground">Contact</Link></li>
            <li><Link to="/trust" className="hover:text-foreground">Trust &amp; Privacy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /><a href={`tel:${PHONE_TEL}`}>{WHATSAPP_DISPLAY}</a></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /><a href="mailto:ajuyahdaniel@gmail.com">ajuyahdaniel@gmail.com</a></li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" />Magboro, Ogun State</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} TOBIRACHI Gadgets and Stores. All rights reserved.
      </div>
    </footer>
  );
}
