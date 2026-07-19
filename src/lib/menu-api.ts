import { supabase } from "@/integrations/supabase/client";
import { categories as staticCategories, popular as staticPopular, type Category, type MenuItem } from "@/lib/menu-data";

export type MenuPayload = {
  categories: Category[];
  featured: MenuItem[];
  source: "db" | "static";
};

function mapDbItem(row: {
  id: string;
  name_en: string;
  name_am: string | null;
  name_ar: string | null;
  description_en: string | null;
  description_am: string | null;
  description_ar: string | null;
  price: string;
  image_url: string | null;
  is_available: boolean;
  is_featured: boolean;
  starting_from: boolean;
  sizes: unknown;
}): MenuItem {
  const sizes = Array.isArray(row.sizes)
    ? (row.sizes as { label?: string; price?: string }[])
        .filter((s) => s?.label && s?.price)
        .map((s) => ({ label: String(s.label), price: String(s.price) }))
    : undefined;

  return {
    id: row.id,
    name: row.name_en,
    name_am: row.name_am ?? undefined,
    name_ar: row.name_ar ?? undefined,
    description: row.description_en ?? undefined,
    description_am: row.description_am ?? undefined,
    description_ar: row.description_ar ?? undefined,
    note: row.description_en ?? undefined,
    price: row.price,
    image: row.image_url ?? undefined,
    isAvailable: row.is_available,
    isFeatured: row.is_featured,
    startingFrom: row.starting_from,
    sizes: sizes?.length ? sizes : undefined,
  };
}

export async function fetchMuskMenu(): Promise<MenuPayload> {
  try {
    const { data: cafe, error: cafeError } = await supabase
      .from("cafes")
      .select("id")
      .eq("slug", "musk")
      .eq("status", "active")
      .maybeSingle();

    if (cafeError || !cafe) throw cafeError ?? new Error("Cafe unavailable");

    const { data: cats, error: catError } = await supabase
      .from("menu_categories")
      .select("id, slug, name_en, name_am, name_ar, sort_order")
      .eq("cafe_id", cafe.id)
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    // Relation missing / not migrated yet → static fallback
    if (catError) {
      const msg = catError.message?.toLowerCase() ?? "";
      if (msg.includes("does not exist") || catError.code === "42P01" || catError.code === "PGRST205") {
        return staticMenuFallback();
      }
      throw catError;
    }

    if (!cats || cats.length === 0) {
      return staticMenuFallback();
    }

    const { data: items, error: itemError } = await supabase
      .from("menu_items")
      .select(
        "id, category_id, name_en, name_am, name_ar, description_en, description_am, description_ar, price, image_url, is_available, is_featured, starting_from, sizes, sort_order",
      )
      .eq("cafe_id", cafe.id)
      .order("sort_order", { ascending: true });

    if (itemError) throw itemError;

    const byCat = new Map<string, MenuItem[]>();
    for (const row of items ?? []) {
      const mapped = mapDbItem(row);
      const list = byCat.get(row.category_id) ?? [];
      list.push(mapped);
      byCat.set(row.category_id, list);
    }

    const categories: Category[] = cats.map((c) => ({
      id: c.id,
      slug: c.slug,
      name: c.name_en,
      name_am: c.name_am ?? undefined,
      name_ar: c.name_ar ?? undefined,
      items: byCat.get(c.id) ?? [],
    }));

    const featured = categories.flatMap((c) => c.items).filter((i) => i.isFeatured);
    return {
      categories,
      featured: featured.length
        ? featured
        : staticPopular.map((i) => ({ ...i, isFeatured: true, isAvailable: true })),
      source: "db",
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message.toLowerCase() : String(err).toLowerCase();
    if (msg.includes("failed to fetch") || msg.includes("network")) throw err;
    // Schema / env gaps: keep the menu usable
    return staticMenuFallback();
  }
}

export function staticMenuFallback(): MenuPayload {
  return {
    categories: staticCategories,
    featured: staticPopular.map((i) => ({ ...i, isFeatured: true, isAvailable: true })),
    source: "static",
  };
}
