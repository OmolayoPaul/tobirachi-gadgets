import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/site/PageHeader";
import { toast } from "sonner";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { formatNaira } from "@/lib/products";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — TOBIRACHI" }] }),
  component: AdminPage,
});

type Row = {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string | null;
  spec: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  badge: string | null;
  active: boolean;
  sort_order: number;
};

const CATEGORIES = ["phones", "laptops", "accessories", "smart-devices"] as const;
const empty: Row = {
  id: "", name: "", brand: "", category: "phones", subcategory: null,
  spec: "", description: "", price: 0, stock: 0, image: "", badge: null,
  active: true, sort_order: 0,
};

function AdminPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [editing, setEditing] = useState<Row | null>(null);
  const [filter, setFilter] = useState<string>("all");

  async function loadAdminStatus() {
    const { data: userRes } = await supabase.auth.getUser();
    if (!userRes.user) return setIsAdmin(false);
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userRes.user.id);
    let admin = (roles ?? []).some((r) => r.role === "admin");
    if (!admin) {
      // Try bootstrap
      const { data: claimed } = await supabase.rpc("claim_admin_if_first");
      if (claimed === true) {
        admin = true;
        toast.success("You're now the admin.");
      }
    }
    setIsAdmin(admin);
  }

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("category")
      .order("sort_order");
    if (error) toast.error(error.message);
    setRows((data as Row[]) ?? []);
    setLoading(false);
  }

  useEffect(() => { loadAdminStatus(); load(); }, []);

  async function save(row: Row) {
    if (!row.id || !row.name || !row.brand || !row.category) {
      toast.error("ID, name, brand, and category are required.");
      return;
    }
    const payload = { ...row, subcategory: row.subcategory || null, badge: row.badge || null };
    const { error } = await supabase.from("products").upsert(payload, { onConflict: "id" });
    if (error) return toast.error(error.message);
    toast.success("Saved");
    setEditing(null);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  }

  async function toggleActive(row: Row) {
    const { error } = await supabase.from("products").update({ active: !row.active }).eq("id", row.id);
    if (error) return toast.error(error.message);
    load();
  }

  if (isAdmin === false) {
    return (
      <>
        <PageHeader eyebrow="Admin" title="Access Denied" description="Your account doesn't have admin permissions." />
        <div className="mx-auto max-w-md px-4 py-10 text-center text-sm text-muted-foreground">
          Ask Tobi to grant you the admin role, or sign out and back in with the owner account.
        </div>
      </>
    );
  }

  const visible = filter === "all" ? rows : rows.filter((r) => r.category === filter);

  return (
    <>
      <PageHeader eyebrow="Admin" title="Product Manager" description="Add, edit, price and stock your catalog." />
      <section className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setEditing({ ...empty, id: `prod-${Date.now()}` })}
            className="inline-flex items-center gap-1.5 rounded-md bg-gradient-brand px-3 py-2 text-sm font-semibold text-primary-foreground"
          >
            <Plus className="h-4 w-4" /> New product
          </button>
          <div className="ml-auto flex gap-2">
            {["all", ...CATEGORIES].map((c) => (
              <button key={c} onClick={() => setFilter(c)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium ${filter === c ? "border-primary bg-primary/15 text-primary" : "border-border/60 text-muted-foreground"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-sm text-muted-foreground">Loading…</div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border/60">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-3 py-2">Image</th>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Category</th>
                  <th className="px-3 py-2">Price</th>
                  <th className="px-3 py-2">Stock</th>
                  <th className="px-3 py-2">Active</th>
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {visible.map((r) => (
                  <tr key={r.id} className="border-t border-border/40">
                    <td className="px-3 py-2"><img src={r.image} alt="" className="h-10 w-10 rounded object-cover" onError={(e) => ((e.currentTarget.style.opacity = "0.2"))} /></td>
                    <td className="px-3 py-2">
                      <div className="font-medium">{r.name}</div>
                      <div className="text-xs text-muted-foreground">{r.brand} · {r.id}</div>
                    </td>
                    <td className="px-3 py-2 text-xs">{r.category}{r.subcategory ? ` / ${r.subcategory}` : ""}</td>
                    <td className="px-3 py-2">{formatNaira(Number(r.price))}</td>
                    <td className="px-3 py-2">{r.stock}</td>
                    <td className="px-3 py-2">
                      <button onClick={() => toggleActive(r)} className={`rounded-full px-2 py-0.5 text-xs ${r.active ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"}`}>
                        {r.active ? "Live" : "Hidden"}
                      </button>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex gap-1">
                        <button onClick={() => setEditing(r)} className="rounded-md border border-border p-1.5 hover:bg-muted" title="Edit"><Pencil className="h-3.5 w-3.5" /></button>
                        <button onClick={() => remove(r.id)} className="rounded-md border border-border p-1.5 text-destructive hover:bg-destructive/10" title="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {visible.length === 0 && (
                  <tr><td colSpan={7} className="py-10 text-center text-muted-foreground">No products.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {editing && <EditorModal row={editing} onClose={() => setEditing(null)} onSave={save} />}
    </>
  );
}

function EditorModal({ row, onClose, onSave }: { row: Row; onClose: () => void; onSave: (r: Row) => void }) {
  const [draft, setDraft] = useState<Row>(row);
  function field<K extends keyof Row>(k: K, v: Row[K]) { setDraft((d) => ({ ...d, [k]: v })); }
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onClick={onClose}>
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-card p-6" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">{row.name ? "Edit product" : "New product"}</h3>
          <button onClick={onClose} className="rounded-md p-1 hover:bg-muted"><X className="h-4 w-4" /></button>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <Input label="ID (slug)" value={draft.id} onChange={(v) => field("id", v)} />
          <Input label="Name" value={draft.name} onChange={(v) => field("name", v)} />
          <Input label="Brand" value={draft.brand} onChange={(v) => field("brand", v)} />
          <Select label="Category" value={draft.category} options={CATEGORIES as unknown as string[]} onChange={(v) => field("category", v)} />
          <Input label="Subcategory" value={draft.subcategory ?? ""} onChange={(v) => field("subcategory", v || null)} />
          <Input label="Badge (optional)" value={draft.badge ?? ""} onChange={(v) => field("badge", v || null)} />
          <Input label="Price (NGN)" type="number" value={String(draft.price)} onChange={(v) => field("price", Number(v))} />
          <Input label="Stock" type="number" value={String(draft.stock)} onChange={(v) => field("stock", Number(v))} />
          <Input label="Sort order" type="number" value={String(draft.sort_order)} onChange={(v) => field("sort_order", Number(v))} />
          <div className="flex items-end gap-2"><label className="text-xs text-muted-foreground">Active</label><input type="checkbox" checked={draft.active} onChange={(e) => field("active", e.target.checked)} /></div>
          <div className="col-span-2"><Input label="Image URL" value={draft.image} onChange={(v) => field("image", v)} /></div>
          <div className="col-span-2"><Input label="Spec (one-liner)" value={draft.spec} onChange={(v) => field("spec", v)} /></div>
          <div className="col-span-2">
            <label className="mb-1 block text-xs text-muted-foreground">Description</label>
            <textarea value={draft.description ?? ""} onChange={(e) => field("description", e.target.value)} rows={3} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
          </div>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-md border border-border px-4 py-2 text-sm">Cancel</button>
          <button onClick={() => onSave(draft)} className="rounded-md bg-gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground">Save</button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="mb-1 block text-xs text-muted-foreground">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
    </div>
  );
}
function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="mb-1 block text-xs text-muted-foreground">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
