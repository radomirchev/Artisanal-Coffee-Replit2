import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type ProductResponse, type UserProfileResponse } from "@shared/routes";
import { z } from "zod";

// --- Products ---

export function useProducts() {
  return useQuery({
    queryKey: [api.products.list.path],
    queryFn: async () => {
      const res = await fetch(api.products.list.path);
      if (!res.ok) throw new Error("Failed to fetch products");
      return api.products.list.responses[200].parse(await res.json());
    },
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: [api.products.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.products.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch product");
      return api.products.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: number } & Record<string, any>) => {
      // Validate with partial schema
      const validated = api.products.update.input.parse(updates);
      const url = buildUrl(api.products.update.path, { id });
      
      const res = await fetch(url, {
        method: api.products.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        throw new Error("Failed to update product");
      }
      return api.products.update.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.products.list.path] });
    },
  });
}

// --- User ---

export function useUser() {
  return useQuery({
    queryKey: [api.user.get.path],
    queryFn: async () => {
      const res = await fetch(api.user.get.path);
      if (!res.ok) throw new Error("Failed to fetch user profile");
      return api.user.get.responses[200].parse(await res.json());
    },
  });
}
