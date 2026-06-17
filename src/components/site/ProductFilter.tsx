import { useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/products";

type SortKey = "price-asc" | "price-desc" | "newest" | "best";

export function ProductFilter({
  items,
  brandKey = "brand",
  filterLabel = "All",
}: {
  items: Product[];
  brandKey?: "brand" | "subcategory";
  filterLabel?: string;
}) {
  const filters = useMemo(() => {
    const set = new Set<string>();
    items.forEach((p) => { const v = brandKey === "subcategory" ? p.subcategory : p.brand; if (v) set.add(v); });
    return [filterLabel, ...Array.from(set)];
  }, [items, brandKey, filterLabel]);

  const [active, setActive] = useState(filterLabel);
  const [sort, setSort] = useState<SortKey>("best");

  const visible = useMemo(() => {
    let list = items.filter((p) => {
      if (active === filterLabel) return true;
      return (brandKey === "subcategory" ? p.subcategory : p.brand) === active;
    });
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "newest": list = [...list].reverse(); break;
      default: list = [...list].sort((a, b) => (a.badge ? -1 : 1) - (b.badge ? -1 : 1));
    }
    return list;
  }, [items, active, sort, filterLabel, brandKey]);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                active === f
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border/60 text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <label className="text-xs text-muted-foreground">Sort:</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-md border border-border/60 bg-card px-2 py-1.5 text-xs"
          >
            <option value="best">Best Seller</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      <div className="mb-4 text-sm text-muted-foreground">{visible.length} items</div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </>
  );
}
