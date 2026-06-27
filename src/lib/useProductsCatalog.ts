import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { products as fallbackProducts, type Product } from "./products";

export type DBProduct = Product & { active: boolean; stock: number; description: string };

export function useProductsCatalog() {
  const query = useQuery({
    queryKey: ["products-catalog"],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from("products")
        .select("id,name,brand,category,subcategory,spec,price,image,badge,active,stock")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      const rows = (data ?? []).filter((r) => r.active && (r.stock ?? 0) >= 0);
      if (rows.length === 0) return fallbackProducts;
      return rows.map((r) => ({
        id: r.id,
        name: r.name,
        brand: r.brand,
        category: r.category as Product["category"],
        subcategory: r.subcategory ?? undefined,
        spec: r.spec ?? "",
        price: Number(r.price),
        image: r.image,
        badge: (r.badge as Product["badge"]) ?? undefined,
      }));
    },
    staleTime: 30_000,
  });
  return { products: query.data ?? fallbackProducts, isLoading: query.isLoading };
}
