import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { LogOut, Plus, Save, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatNaira, PRODUCTS_QUERY_KEY, type Product, type ProductCategory } from "@/lib/products";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Manage products" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

type Row = Product & { _dirty?: boolean; _saving?: boolean };

const CATEGORIES: ProductCategory[] = ["phones", "laptops", "accessories", "smart-devices"];

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [filter, setFilter] = useState<ProductCategory | "all">("all");
  const [search, setSearch] = useState("");

  // Auth + role bootstrap
  useEffect(() => {
    let active = true;
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) { navigate({ to: "/auth" }); return; }
      if (!active) return;
      setUserId(sess.session.user.id);
      // Try to claim admin if no admin exists yet (server-side guarded)
      await supabase.rpc("claim_admin_if_unclaimed");
      const { data: isAdm } = await supabase.rpc("is_admin");
      if (!active) return;
      setIsAdmin(Boolean(isAdm));
    })();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate({ to: "/auth" });
    });
    return () => { active = false; sub.subscription.unsubscribe(); };
  }, [navigate]);

  const { data: rawRows = [], isLoading, refetch } = useQuery({
    queryKey: ["admin", "products"],
    enabled: isAdmin === true,
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as unknown as Product[];
    },
  });

  const [rows, setRows] = useState<Row[]>([]);
  useEffect(() => { setRows(rawRows as Row[]); }, [rawRows]);

  const visible = useMemo(() => {
    const s = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (filter !== "all" && r.category !== filter) return false;
      if (s && !(`${r.name} ${r.brand} ${r.id}`.toLowerCase().includes(s))) return false;
      return true;
    });
  }, [rows, filter, search]);

  function patch(id: string, patch: Partial<Product>) {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch, _dirty: true } : r)));
  }

  async function save(row: Row) {
    setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, _saving: true } : r)));
    const { error } = await supabase.from("products").update({
      name: row.name,
      brand: row.brand,
      category: row.category,
      subcategory: row.subcategory || null,
      spec: row.spec,
      description: row.description,
      price: Number(row.price) || 0,
      image: row.image,
      badge: row.badge || null,
      sort_order: Number(row.sort_order) || 0,
      active: row.active,
    }).eq("id", row.id);
    if (error) { toast.error(error.message); }
    else {
      toast.success(`Saved: ${row.name}`);
      qc.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    }
    setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, _saving: false, _dirty: false } : r)));
  }

  async function remove(row: Row) {
    if (!confirm(`Delete "${row.name}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("products").delete().eq("id", row.id);
    if (error) return toast.error(error.message);
    toast.success(`Deleted: ${row.name}`);
    qc.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    refetch();
  }

  async function addNew() {
    const id = prompt("Product ID (lowercase, hyphens, unique). e.g. iphone-17");
    if (!id) return;
    const max = Math.max(0, ...rows.map((r) => r.sort_order || 0));
    const { error } = await supabase.from("products").insert({
      id: id.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-"),
      name: "New product",
      brand: "Brand",
      category: "phones",
      spec: "",
      description: "",
      price: 0,
      image: "",
      sort_order: max + 1,
      active: false,
    });
    if (error) return toast.error(error.message);
    toast.success("Product added — fill in the details and save");
    qc.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    refetch();
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  if (isAdmin === null) {
    return <section className="mx-auto max-w-3xl px-4 py-20 text-center text-muted-foreground">Checking access…</section>;
  }
  if (isAdmin === false) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold">Not authorized</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You're signed in as {userId ? "this account" : "a guest"}, but it doesn't have admin access.
        </p>
        <button onClick={signOut} className="mt-6 rounded-md border border-border px-4 py-2 text-sm">Sign out</button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Product Manager</h1>
          <p className="mt-1 text-sm text-muted-foreground">Edit prices, descriptions and details. Changes go live instantly.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={addNew} className="inline-flex items-center gap-1.5 rounded-md bg-gradient-brand px-3 py-2 text-sm font-semibold text-primary-foreground">
            <Plus className="h-4 w-4" /> Add product
          </button>
          <button onClick={signOut} className="inline-flex items-center gap-1.5 rounded-md border border-border/60 px-3 py-2 text-sm">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap gap-1.5">
          {(["all", ...CATEGORIES] as const).map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                filter === c ? "border-primary bg-primary/15 text-primary" : "border-border/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <input
          placeholder="Search by name, brand, id…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ml-auto w-64 rounded-md border border-border/60 bg-background px-3 py-1.5 text-sm"
        />
      </div>

      {isLoading ? (
        <p className="mt-10 text-muted-foreground">Loading…</p>
      ) : (
        <div className="mt-6 space-y-3">
          {visible.map((r) => (
            <div key={r.id} className={`rounded-xl border bg-card p-4 ${r._dirty ? "border-primary/60" : "border-border/60"}`}>
              <div className="flex flex-wrap items-start gap-4">
                <img src={r.image || "https://placehold.co/120x120?text=No+image"} alt={r.name} className="h-20 w-20 rounded-lg object-cover" />
                <div className="grid flex-1 min-w-[260px] gap-2 sm:grid-cols-2">
                  <Field label="Name"><input className={inputCls} value={r.name} onChange={(e) => patch(r.id, { name: e.target.value })} /></Field>
                  <Field label="Brand"><input className={inputCls} value={r.brand} onChange={(e) => patch(r.id, { brand: e.target.value })} /></Field>
                  <Field label="Price (₦)">
                    <input
                      type="number"
                      className={inputCls}
                      value={r.price}
                      onChange={(e) => patch(r.id, { price: Number(e.target.value) })}
                    />
                    <span className="mt-0.5 block text-[10px] text-muted-foreground">{formatNaira(r.price)}</span>
                  </Field>
                  <Field label="Category">
                    <select className={inputCls} value={r.category} onChange={(e) => patch(r.id, { category: e.target.value as ProductCategory })}>
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </Field>
                  <Field label="Subcategory (optional)">
                    <input className={inputCls} value={r.subcategory ?? ""} onChange={(e) => patch(r.id, { subcategory: e.target.value })} />
                  </Field>
                  <Field label="Badge (HOT / NEW / BEST SELLER / blank)">
                    <input className={inputCls} value={r.badge ?? ""} onChange={(e) => patch(r.id, { badge: e.target.value })} />
                  </Field>
                  <Field label="Short spec (shown on card)">
                    <input className={inputCls} value={r.spec} onChange={(e) => patch(r.id, { spec: e.target.value })} />
                  </Field>
                  <Field label="Image URL">
                    <input className={inputCls} value={r.image} onChange={(e) => patch(r.id, { image: e.target.value })} />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Full description">
                      <textarea
                        rows={3}
                        className={inputCls + " resize-y"}
                        value={r.description}
                        onChange={(e) => patch(r.id, { description: e.target.value })}
                      />
                    </Field>
                  </div>
                  <Field label="Sort order">
                    <input type="number" className={inputCls} value={r.sort_order} onChange={(e) => patch(r.id, { sort_order: Number(e.target.value) })} />
                  </Field>
                  <Field label="Active (visible on site)">
                    <label className="mt-1 inline-flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={r.active} onChange={(e) => patch(r.id, { active: e.target.checked })} />
                      {r.active ? "Visible" : "Hidden"}
                    </label>
                  </Field>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    disabled={!r._dirty || r._saving}
                    onClick={() => save(r)}
                    className="inline-flex items-center gap-1.5 rounded-md bg-gradient-brand px-3 py-2 text-xs font-semibold text-primary-foreground disabled:opacity-50"
                  >
                    <Save className="h-3.5 w-3.5" /> {r._saving ? "Saving…" : "Save"}
                  </button>
                  <button
                    onClick={() => remove(r)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-destructive/40 px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>
              </div>
              <div className="mt-2 text-[10px] text-muted-foreground">ID: {r.id}</div>
            </div>
          ))}
          {visible.length === 0 && <p className="text-muted-foreground">No products match.</p>}
        </div>
      )}

      <Link to="/" className="mt-10 inline-block text-xs text-muted-foreground hover:text-foreground">← Back to site</Link>
    </section>
  );
}

const inputCls = "w-full rounded-md border border-border/60 bg-background px-2.5 py-1.5 text-sm";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="mt-0.5">{children}</div>
    </label>
  );
}
