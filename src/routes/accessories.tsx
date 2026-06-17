import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductFilter } from "@/components/site/ProductFilter";
import { useProductsByCategory } from "@/lib/products";

export const Route = createFileRoute("/accessories")({
  head: () => ({
    meta: [
      { title: "Accessories — TOBIRACHI Gadgets" },
      { name: "description", content: "Earbuds, cases, chargers and more to complement your devices." },
    ],
  }),
  component: AccessoriesPage,
});

function AccessoriesPage() {
  const { data: items, isLoading } = useProductsByCategory("accessories");
  return (
    <>
      <PageHeader eyebrow="Shop" title="Accessories" description="Everything you need to complement your devices — earbuds, cases, chargers, and more." />
      <section className="mx-auto max-w-7xl px-4 py-10">
        {isLoading ? <p className="text-muted-foreground">Loading…</p> : <ProductFilter items={items} brandKey="subcategory" />}
      </section>
    </>
  );
}
