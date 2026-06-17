import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type ProductCategory = "phones" | "laptops" | "accessories" | "smart-devices";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  subcategory: string | null;
  spec: string;
  description: string;
  price: number;
  image: string;
  badge: string | null;
  sort_order: number;
  active: boolean;
};

export const formatNaira = (n: number) => "₦" + Number(n || 0).toLocaleString("en-NG");

export const PRODUCTS_QUERY_KEY = ["products", "active"] as const;

async function fetchActiveProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as unknown as Product[];
}

export function useProducts() {
  return useQuery({ queryKey: PRODUCTS_QUERY_KEY, queryFn: fetchActiveProducts, staleTime: 30_000 });
}

export function useProductsByCategory(category: ProductCategory) {
  const q = useProducts();
  return { ...q, data: (q.data ?? []).filter((p) => p.category === category) };
}
