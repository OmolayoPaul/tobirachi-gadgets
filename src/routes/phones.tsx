import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductFilter } from "@/components/site/ProductFilter";
import { useProductsCatalog } from "@/lib/useProductsCatalog";

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
  const { products } = useProductsCatalog();
  const items = products.filter((p) => p.category === "phones");
  return (
    <>
      <PageHeader eyebrow="Shop" title="Phones" description="Find your perfect phone from top brands at the best prices in Nigeria." />
      <section className="mx-auto max-w-7xl px-4 py-10">
        <ProductFilter items={items} />
      </section>
    </>
  );
}
