import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductFilter } from "@/components/site/ProductFilter";
import { useProductsByCategory } from "@/lib/products";

export const Route = createFileRoute("/phones")({
  head: () => ({
    meta: [
      { title: "Phones — TOBIRACHI Gadgets" },
      { name: "description", content: "Find your perfect phone from top brands at the best prices in Nigeria." },
    ],
  }),
  component: PhonesPage,
});

function PhonesPage() {
  const { data: items, isLoading } = useProductsByCategory("phones");
  return (
    <>
      <PageHeader eyebrow="Shop" title="Phones" description="Find your perfect phone from top brands at the best prices in Nigeria." />
      <section className="mx-auto max-w-7xl px-4 py-10">
        {isLoading ? <p className="text-muted-foreground">Loading phones…</p> : <ProductFilter items={items} />}
      </section>
    </>
  );
}
