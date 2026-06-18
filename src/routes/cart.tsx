import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { checkoutLink, removeFromCart, updateQty, useCart } from "@/lib/cart";
import { formatNaira } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — TOBIRACHI Gadgets" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, total, count } = useCart();

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-display text-4xl font-bold">Your Cart</h1>
      <p className="mt-2 text-muted-foreground">{count} {count === 1 ? "item" : "items"}</p>

      {items.length === 0 ? (
        <div className="mt-10 rounded-xl border border-border/60 bg-card p-12 text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 text-lg font-semibold">Your cart is empty</h2>
          <p className="mt-1 text-sm text-muted-foreground">Browse our store and add a few gadgets.</p>
          <Link to="/phones" className="mt-6 inline-flex rounded-md bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-3">
            {items.map((i) => (
              <div key={i.id} className="flex gap-4 rounded-xl border border-border/60 bg-card p-4">
                <img src={i.product.image} alt={i.product.name} className="h-20 w-20 rounded-lg object-cover" />
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground">{i.product.brand}</div>
                  <div className="font-semibold">{i.product.name}</div>
                  <div className="text-xs text-muted-foreground">{i.product.spec}</div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-md border border-border/60">
                      <button onClick={() => updateQty(i.id, i.qty - 1)} className="grid h-8 w-8 place-items-center hover:bg-muted"><Minus className="h-3 w-3" /></button>
                      <span className="w-8 text-center text-sm">{i.qty}</span>
                      <button onClick={() => updateQty(i.id, i.qty + 1)} className="grid h-8 w-8 place-items-center hover:bg-muted"><Plus className="h-3 w-3" /></button>
                    </div>
                    <div className="font-semibold text-gradient">{formatNaira(i.product.price * i.qty)}</div>
                  </div>
                </div>
                <button onClick={() => removeFromCart(i.id)} className="self-start text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-xl border border-border/60 bg-card p-6">
            <h3 className="font-display text-lg font-semibold">Order Summary</h3>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatNaira(total)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Delivery</dt><dd>Calculated at checkout</dd></div>
            </dl>
            <div className="mt-4 flex justify-between border-t border-border/60 pt-4 text-base font-semibold">
              <span>Total</span><span className="text-gradient">{formatNaira(total)}</span>
            </div>
            <Link
              to="/checkout"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-gradient-brand px-4 py-3 text-sm font-semibold text-primary-foreground"
            >
              Pay with card (Demo)
            </Link>
            <a
              href={checkoutLink(items, total)}
              target="_blank" rel="noreferrer"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-md border border-primary/40 bg-primary/5 px-4 py-3 text-sm font-semibold text-primary"
            >
              Checkout via WhatsApp
            </a>
            <p className="mt-3 text-center text-xs text-muted-foreground">Card checkout is a sandbox demo — Paystack / ExpressPay coming soon.</p>
          </aside>
        </div>
      )}
    </section>
  );
}
