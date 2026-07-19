import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/menu/$slug")({
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Digital Menu` },
          { name: "description", content: `Browse the ${loaderData.name} digital menu.` },
          { property: "og:title", content: `${loaderData.name} — Digital Menu` },
          { property: "og:description", content: `Browse the ${loaderData.name} digital menu.` },
        ]
      : [{ title: "Menu not found" }, { name: "robots", content: "noindex" }],
  }),
  loader: async ({ params }) => {
    const { data, error } = await supabase
      .from("cafes")
      .select("id, slug, name, status")
      .eq("slug", params.slug)
      .maybeSingle();
    if (error) throw error;
    if (!data || data.status !== "active") throw notFound();

    // Phase 1: only the seeded Musk cafe has a rendered menu; it lives at "/".
    if (data.slug === "musk") throw redirect({ to: "/" });

    return data;
  },
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-lg font-semibold">This menu couldn't load</h1>
        <p className="mt-1 text-sm text-muted-foreground">{error.message}</p>
      </div>
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-2xl font-semibold">Menu not found</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          This cafe doesn't exist or isn't currently active.
        </p>
      </div>
    </div>
  ),
  component: MenuComingSoon,
});

function MenuComingSoon() {
  const cafe = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-semibold">{cafe.name}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This cafe's public menu will be available once the owner publishes items (Phase 3).
        </p>
      </div>
    </div>
  );
}
