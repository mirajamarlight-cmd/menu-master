import { supabase } from "@/integrations/supabase/client";

let cachedMuskCafeId: string | null = null;

export async function resolveMuskCafeId(): Promise<string> {
  if (cachedMuskCafeId) return cachedMuskCafeId;
  const { data, error } = await supabase.from("cafes").select("id").eq("slug", "musk").maybeSingle();
  if (error || !data?.id) throw new Error("Musk cafe not found");
  cachedMuskCafeId = data.id;
  return data.id;
}
