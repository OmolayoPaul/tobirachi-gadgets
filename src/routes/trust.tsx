import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/trust")({
  head: () => ({
    meta: [
      { title: "Trust, Security & Privacy — TOBIRACHI" },
      { name: "description", content: "How TOBIRACHI handles your data, payments, and account security." },
    ],
  }),
  component: TrustPage,
});

function TrustPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <PageHeader
        title="Trust, Security & Privacy"
        description="This page is maintained by Tobi Ajuyah to answer common security and privacy questions about TOBIRACHI Gadgets and Stores."
      />

      <div className="prose prose-invert mt-8 max-w-none space-y-8 text-sm text-muted-foreground">
        <section>
          <h2 className="text-base font-semibold text-foreground">Access &amp; authentication</h2>
          <p>Customer ordering and repair booking flow through WhatsApp directly to the store owner. Admin tools used to manage the product catalog require a signed-in account with an explicit admin role; role checks are enforced server-side via row-level security.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">Data we collect</h2>
          <p>When you place an order or book a repair, the details you type (name, device model, fault, address you choose to share) are sent over WhatsApp to TOBIRACHI. We do not require you to create an account to shop or request a repair.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">Payments</h2>
          <p>Payment is arranged directly with TOBIRACHI over WhatsApp or in store. We do not store card details on this website.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">Retention &amp; deletion</h2>
          <p>You can ask Tobi Ajuyah to delete any order, repair, or contact information held about you. Requests are handled within a reasonable timeframe.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">Platform</h2>
          <p>The site is hosted on Lovable and uses Lovable Cloud for any server-side data. This describes platform capabilities and is not an independent certification.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">Security contact</h2>
          <p>Report a security concern to Tobi Ajuyah by phone at <a href="tel:+2347073791611" className="text-primary underline">0707 379 1611</a> or by email at <a href="mailto:ajuyahdaniel@gmail.com" className="text-primary underline">ajuyahdaniel@gmail.com</a>.</p>
        </section>
      </div>
    </div>
  );
}
