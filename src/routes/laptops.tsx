import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductFilter } from "@/components/site/ProductFilter";
import { useProductsByCategory } from "@/lib/products";

export const Route = createFileRoute("/laptops")({
  head: () => ({
    meta: [
      { title: "Laptops — TOBIRACHI Gadgets" },
      { name: "description", content: "From budget workhorses to premium ultrabooks — we've got your next laptop." },
    ],
  }),
  component: LaptopsPage,
});

function LaptopsPage() {
  const { data: items, isLoading } = useProductsByCategory("laptops");
  return (
    <>
      <PageHeader eyebrow="Shop" title="Laptops" description="From budget workhorses to premium ultrabooks — we've got your next laptop." />
      <section className="mx-auto max-w-7xl px-4 py-10">
        {isLoading ? <p className="text-muted-foreground">Loading laptops…</p> : <ProductFilter items={items} />}
      </section>
    </>
  );
}
