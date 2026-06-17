import { addToCart } from "@/lib/cart";
import { formatNaira, type Product } from "@/lib/products";
import { ShoppingCart } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition hover:border-primary/60 hover:shadow-[0_8px_40px_-12px_oklch(0.78_0.16_215/0.3)]">
      <div className="relative aspect-square overflow-hidden bg-surface-elevated">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-2 top-2 flex gap-1.5">
          {product.badge && (
            <span className="rounded-md bg-destructive px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-destructive-foreground">
              {product.badge}
            </span>
          )}
          <span className="rounded-md bg-success/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-success">
            In stock
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{product.brand}</div>
        <h3 className="mt-1 font-display text-base font-semibold leading-tight">{product.name}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{product.spec}</p>
        <div className="mt-4 flex items-end justify-between gap-2">
          <div className="font-display text-lg font-bold text-gradient">{formatNaira(product.price)}</div>
          <button
            onClick={() => addToCart(product)}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
          >
            <ShoppingCart className="h-3.5 w-3.5" /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
