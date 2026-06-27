import { createFileRoute, Outlet, redirect, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) throw redirect({ to: "/auth" });
  },
  component: AuthedLayout,
});

function AuthedLayout() {
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);
  return (
    <div>
      <div className="border-b border-border/60 bg-card/40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs">
          <span className="text-muted-foreground">Signed in as <span className="text-foreground">{email}</span></span>
          <button
            onClick={async () => { await supabase.auth.signOut(); window.location.href = "/"; }}
            className="rounded-md border border-border px-2 py-1 hover:bg-muted"
          >Sign out</button>
        </div>
      </div>
      <Outlet />
      <div className="mx-auto max-w-7xl px-4 pb-8 text-xs text-muted-foreground">
        <Link to="/" className="hover:underline">← Back to store</Link>
      </div>
    </div>
  );
}
