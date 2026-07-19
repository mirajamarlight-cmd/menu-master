import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BuiltByRaafat } from "@/components/brand/built-by-raafat";

export const Route = createFileRoute("/_authenticated/admin")({
  ssr: false,
  head: () => ({ meta: [{ title: "Platform admin — RAAFAT" }, { name: "robots", content: "noindex" }] }),
  beforeLoad: async () => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("role", "platform_admin")
      .limit(1);
    if (!data || data.length === 0) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: AdminPage,
});

function AdminPage() {
  const [cafeCount, setCafeCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("cafes")
      .select("id", { count: "exact", head: true })
      .then(({ count, error }) => {
        if (error) setError(error.message);
        else setCafeCount(count ?? 0);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold tracking-tight">RAAFAT</span>
            <span className="text-xs uppercase tracking-wider rounded bg-primary/10 text-primary px-1.5 py-0.5">
              Platform admin
            </span>
          </div>
          <Link to="/dashboard" className="text-sm rounded-md border px-2.5 py-1.5 hover:bg-accent">
            Back to dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Platform overview</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Full super-admin tools ship in Phase 8. This page proves the platform-admin gate works.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border bg-card p-5">
            <div className="text-xs uppercase text-muted-foreground">Total cafes</div>
            <div className="mt-2 text-3xl font-semibold">
              {error ? "—" : cafeCount ?? "…"}
            </div>
          </div>
          <div className="rounded-xl border bg-card p-5 opacity-60">
            <div className="text-xs uppercase text-muted-foreground">Active subscriptions</div>
            <div className="mt-2 text-3xl font-semibold">—</div>
            <div className="text-xs text-muted-foreground mt-1">Phase 7</div>
          </div>
          <div className="rounded-xl border bg-card p-5 opacity-60">
            <div className="text-xs uppercase text-muted-foreground">Users</div>
            <div className="mt-2 text-3xl font-semibold">—</div>
            <div className="text-xs text-muted-foreground mt-1">Phase 8</div>
          </div>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}
      </main>

      <footer className="mx-auto max-w-6xl px-4 py-8 text-center">
        <BuiltByRaafat />
      </footer>
    </div>
  );
}
