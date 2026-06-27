import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductFilter } from "@/components/site/ProductFilter";
import { useProductsCatalog } from "@/lib/useProductsCatalog";

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
  const { products } = useProductsCatalog();
  const items = products.filter((p) => p.category === "accessories");
  return (
    <>
      <PageHeader eyebrow="Shop" title="Accessories" description="Everything you need to complement your devices — earbuds, cases, chargers, and more." />
      <section className="mx-auto max-w-7xl px-4 py-10">
        <ProductFilter items={items} brandKey="subcategory" />
      </section>
    </>
  );
}
