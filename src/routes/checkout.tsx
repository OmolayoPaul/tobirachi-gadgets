import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, CreditCard, Lock, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { clearCart, useCart } from "@/lib/cart";
import { formatNaira } from "@/lib/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — TOBIRACHI Gadgets" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, total, count } = useCart();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    card: "",
    expiry: "",
    cvv: "",
  });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      clearCart();
      toast.success("Payment successful (demo)", { description: "This is a sandbox checkout." });
    }, 1600);
  }

  if (success) {
    return (
      <section className="mx-auto max-w-xl px-4 py-20 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-6 font-display text-3xl font-bold">Payment successful</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This was a demo transaction — no real payment was processed. A live Paystack or ExpressPay gateway can be wired in here when you're ready.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/" className="rounded-md border border-border px-4 py-2 text-sm">Back home</Link>
          <button onClick={() => navigate({ to: "/phones" })} className="rounded-md bg-gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground">
            Keep shopping
          </button>
        </div>
      </section>
    );
  }

  if (count === 0) {
    return (
      <section className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold">Your cart is empty</h1>
        <Link to="/phones" className="mt-6 inline-flex rounded-md bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          Browse products
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold">Checkout</h1>
      <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
        <ShieldCheck className="h-3 w-3" /> Demo gateway — Paystack / ExpressPay coming soon
      </div>

      <form onSubmit={onSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div className="rounded-xl border border-border/60 bg-card p-6">
            <h2 className="font-display text-lg font-semibold">Delivery details</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Field label="Full name" value={form.name} onChange={set("name")} required />
              <Field label="Email" type="email" value={form.email} onChange={set("email")} required />
              <Field label="Phone" value={form.phone} onChange={set("phone")} required />
              <Field label="Delivery address" value={form.address} onChange={set("address")} required className="sm:col-span-2" />
            </div>
          </div>

          <div className="rounded-xl border border-border/60 bg-card p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Card payment</h2>
              <div className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Lock className="h-3 w-3" /> Sandbox</div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_120px_100px]">
              <Field label="Card number" placeholder="4242 4242 4242 4242" value={form.card} onChange={set("card")} required className="sm:col-span-3" />
              <Field label="Expiry" placeholder="MM/YY" value={form.expiry} onChange={set("expiry")} required />
              <Field label="CVV" placeholder="123" value={form.cvv} onChange={set("cvv")} required />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Use any test details — nothing is charged. We'll plug in Paystack or ExpressPay live keys later.
            </p>
          </div>
        </div>

        <aside className="h-fit rounded-xl border border-border/60 bg-card p-6">
          <h3 className="font-display text-lg font-semibold">Order summary</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {items.map((i) => (
              <li key={i.id} className="flex justify-between gap-3">
                <span className="text-muted-foreground">{i.product.name} × {i.qty}</span>
                <span>{formatNaira(i.product.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-border/60 pt-4 text-base font-semibold">
            <span>Total</span><span className="text-gradient">{formatNaira(total)}</span>
          </div>
          <button
            type="submit"
            disabled={processing}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-gradient-brand px-4 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            <CreditCard className="h-4 w-4" />
            {processing ? "Processing…" : `Pay ${formatNaira(total)}`}
          </button>
          <p className="mt-3 text-center text-xs text-muted-foreground">Demo only — replace with Paystack / ExpressPay.</p>
        </aside>
      </form>
    </section>
  );
}

function Field({
  label, className = "", ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
      <input
        {...props}
        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}
