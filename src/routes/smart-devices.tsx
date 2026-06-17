import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductFilter } from "@/components/site/ProductFilter";
import { products } from "@/lib/products";

export const Route = createFileRoute("/smart-devices")({
  head: () => ({
    meta: [
      { title: "Smart Devices — TOBIRACHI Gadgets" },
      { name: "description", content: "Smart home, cameras, gaming, and wearables — upgrade your lifestyle." },
    ],
  }),
  component: SmartPage,
});

function SmartPage() {
  const items = products.filter((p) => p.category === "smart-devices");
  return (
    <>
      <PageHeader eyebrow="Shop" title="Smart Devices" description="Smart home, cameras, gaming, and wearables — upgrade your lifestyle." />
      <section className="mx-auto max-w-7xl px-4 py-10">
        <ProductFilter items={items} brandKey="subcategory" />
      </section>
    </>
  );
}
