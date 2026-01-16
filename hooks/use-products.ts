"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// <-- use your schema file
import { useToast } from "./use-toast";
import {
  ContactMessage,
  contactMessageSchema,
  Product,
} from "../schema/schema";

/* =========================
   Helper for dynamic URLs
========================= */
function buildUrl(path: string, params?: Record<string, string | number>) {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, String(value));
    });
  }
  return url;
}

/* =========================
   Products Hooks
========================= */

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["/api/products"],
    queryFn: async () => {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();
      // Optionally validate using Zod
      return Array.isArray(data) ? data : [];
    },
  });
}

export function useProduct(id: number | undefined) {
  return useQuery<Product | null>({
    queryKey: ["/api/products", id],
    queryFn: async () => {
      if (!id) return null;

      const url = buildUrl("/api/products/:id", { id });
      const res = await fetch(url);

      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch product");

      const data = await res.json();
      return data;
    },
    enabled: !!id,
  });
}

/* =========================
   Contact Form Hook
========================= */

export function useContactForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ContactMessage) => {
      // Optional: validate before sending
      const parsed = contactMessageSchema.safeParse(data);
      if (!parsed.success) {
        throw new Error(parsed.error.errors[0].message);
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed to send message");

      return json;
    },
    onSuccess: (data) => {
      toast({
        title: "Message Sent!",
        description: data.message,
        className: "bg-primary text-primary-foreground",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message ?? "Something went wrong",
        variant: "destructive",
      });
    },
  });
}
