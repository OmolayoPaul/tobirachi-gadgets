import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/site/PageHeader";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — TOBIRACHI Admin" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
        toast.success("Account created. You can now sign in.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Signed in.");
        navigate({ to: "/admin" });
      }
    } catch (err: any) {
      toast.error(err?.message ?? "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHeader eyebrow="Account" title="Admin Sign In" description="Sign in to manage products, prices and stock." />
      <section className="mx-auto max-w-md px-4 py-12">
        <div className="rounded-2xl border border-border/60 bg-card p-6">
          <div className="mb-5 flex gap-2">
            <button onClick={() => setMode("signin")} className={`flex-1 rounded-md px-3 py-2 text-sm font-medium ${mode === "signin" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>Sign in</button>
            <button onClick={() => setMode("signup")} className={`flex-1 rounded-md px-3 py-2 text-sm font-medium ${mode === "signup" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>Create account</button>
          </div>
          <form onSubmit={submit} className="space-y-3">
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">Password</label>
              <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
            </div>
            <button type="submit" disabled={loading} className="w-full rounded-md bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60">
              {loading ? "Please wait..." : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground">
            First account to sign in becomes the admin automatically. <Link to="/" className="text-primary hover:underline">Back to store</Link>
          </p>
        </div>
      </section>
    </>
  );
}
