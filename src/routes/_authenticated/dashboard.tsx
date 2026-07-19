import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BuiltByRaafat } from "@/components/brand/built-by-raafat";

type CafeMembership = {
  cafe_id: string;
  role: "owner" | "manager" | "staff";
  cafes: { id: string; slug: string; name: string; status: string } | null;
};

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — RAAFAT" }, { name: "robots", content: "noindex" }] }),
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [memberships, setMemberships] = useState<CafeMembership[]>([]);
  const [isPlatformAdmin, setIsPlatformAdmin] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      setEmail(userData.user?.email ?? null);

      const [{ data: mems }, { data: roles }] = await Promise.all([
        supabase
          .from("cafe_memberships")
          .select("cafe_id, role, cafes ( id, slug, name, status )")
          .eq("status", "active"),
        supabase.from("user_roles").select("role").eq("role", "platform_admin"),
      ]);

      setMemberships((mems ?? []) as unknown as CafeMembership[]);
      setIsPlatformAdmin((roles?.length ?? 0) > 0);
      setLoading(false);
    })();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold tracking-tight">RAAFAT</span>
            <span className="text-xs text-muted-foreground">Cafe dashboard</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            {isPlatformAdmin && (
              <Link to="/admin" className="rounded-md border px-2.5 py-1.5 hover:bg-accent">
                Platform admin
              </Link>
            )}
            <span className="text-muted-foreground hidden sm:inline">{email}</span>
            <button onClick={signOut} className="rounded-md border px-2.5 py-1.5 hover:bg-accent">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-semibold tracking-tight">Your cafes</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage the businesses you belong to. Cafe onboarding launches in the next phase.
        </p>

        <div className="mt-6">
          {loading ? (
            <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">Loading…</div>
          ) : memberships.length === 0 ? (
            <div className="rounded-xl border bg-card p-8 text-center">
              <h2 className="text-lg font-medium">No cafe yet</h2>
              <p className="mt-1 text-sm text-muted-foreground max-w-md mx-auto">
                You aren't a member of any cafe. Cafe creation ships in Phase 2 — for now, ask a
                platform admin to attach you to a cafe.
              </p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {memberships.map((m) => (
                <div key={m.cafe_id} className="rounded-xl border bg-card p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{m.cafes?.name ?? "Cafe"}</h3>
                    <span className="text-[10px] uppercase tracking-wider rounded bg-muted px-1.5 py-0.5">
                      {m.role}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    /{m.cafes?.slug} · {m.cafes?.status}
                  </p>
                  <div className="mt-4 flex gap-2">
                    {m.cafes?.slug && (
                      <Link
                        to="/menu/$slug"
                        params={{ slug: m.cafes.slug }}
                        className="text-xs rounded border px-2 py-1 hover:bg-accent"
                      >
                        View public menu
                      </Link>
                    )}
                    <span className="text-xs text-muted-foreground self-center">
                      Dashboard tools · Phase 2+
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="mx-auto max-w-6xl px-4 py-8 text-center">
        <BuiltByRaafat />
      </footer>
    </div>
  );
}
