// src/lib/api.ts

import { contactMessageSchema, insertProductSchema } from "@/app/schema/schema";
import { z } from "zod";

/* =========================
   Error Schemas
========================= */

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

/* =========================
   API Contract
========================= */

export const api = {
  products: {
    list: {
      method: "GET" as const,
      path: "/api/products",
      responses: {
        200: z.array(z.custom<typeof products.$inferSelect>()),
      },
    },

    get: {
      method: "GET" as const,
      path: "/api/products/:id",
      responses: {
        200: z.custom<typeof products.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },

    create: {
      method: "POST" as const,
      path: "/api/products",
      input: insertProductSchema,
      responses: {
        201: z.custom<typeof products.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },

  contact: {
    submit: {
      method: "POST" as const,
      path: "/api/contact",
      input: contactMessageSchema,
      responses: {
        200: z.object({
          success: z.boolean(),
          message: z.string(),
        }),
        400: errorSchemas.validation,
      },
    },
  },
};

/* =========================
   URL Builder Helper
========================= */

export function buildUrl(
  path: string,
  params?: Record<string, string | number>
): string {
  let url = path;

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, String(value));
    });
  }

  return url;
}

/* =========================
   Helper Types (Optional)
========================= */

// Product type inferred from DB
export type Product = typeof products.$inferSelect;

// Create product payload
export type CreateProductInput = z.infer<typeof insertProductSchema>;

// Contact form payload
export type ContactInput = z.infer<typeof contactMessageSchema>;
