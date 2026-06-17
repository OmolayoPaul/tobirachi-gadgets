import { useEffect, useState } from "react";
import { toast } from "sonner";
import { waLink } from "./whatsapp";
import { formatNaira, useProducts, type Product } from "./products";

const KEY = "tobirachi-cart";
const EVT = "tobirachi-cart-change";

export type CartItem = { id: string; qty: number };

function read(): CartItem[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
function write(items: CartItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(EVT));
}

export function addToCart(p: Pick<Product, "id" | "name" | "price">, qty = 1) {
  const items = read();
  const existing = items.find((i) => i.id === p.id);
  if (existing) existing.qty += qty;
  else items.push({ id: p.id, qty });
  write(items);
  toast.success(`${p.name} added to cart`, { description: formatNaira(p.price) });
}

export function removeFromCart(id: string) {
  write(read().filter((i) => i.id !== id));
}

export function updateQty(id: string, qty: number) {
  if (qty <= 0) return removeFromCart(id);
  const items = read();
  const it = items.find((i) => i.id === id);
  if (it) { it.qty = qty; write(items); }
}

export function clearCart() { write([]); }

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const { data: products = [] } = useProducts();
  useEffect(() => {
    setItems(read());
    const h = () => setItems(read());
    window.addEventListener(EVT, h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener(EVT, h);
      window.removeEventListener("storage", h);
    };
  }, []);
  const detailed = items
    .map((i) => {
      const p = products.find((x) => x.id === i.id);
      return p ? { ...i, product: p } : null;
    })
    .filter(Boolean) as Array<CartItem & { product: Product }>;
  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = detailed.reduce((s, i) => s + i.product.price * i.qty, 0);
  return { items: detailed, count, total };
}

export function checkoutMessage(items: Array<CartItem & { product: Product }>, total: number) {
  const lines = items.map((i) => `• ${i.product.name} × ${i.qty} — ${formatNaira(i.product.price * i.qty)}`);
  return `Hi TOBIRACHI! I'd like to order:\n\n${lines.join("\n")}\n\nTotal: ${formatNaira(total)}`;
}

export function checkoutLink(items: Array<CartItem & { product: Product }>, total: number) {
  return waLink(checkoutMessage(items, total));
}
