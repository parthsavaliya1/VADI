import { z } from "zod";

/* =========================
   Database Interfaces
========================= */

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number; // in cents
  imageUrl: string;
  category: string;
  stock: number;
  isFeatured: boolean;
}

/* =========================
   Insert / Update Interfaces
========================= */

export interface InsertProduct {
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock?: number;
  is_featured?: boolean;
}

export interface UpdateProduct extends Partial<InsertProduct> {
  id: number;
}

/* =========================
   Zod Schemas (Validation)
========================= */

export const insertProductSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(5),
  price: z.number().int().positive(),
  image_url: z.string().url(),
  category: z.string(),
  stock: z.number().int().min(0).optional(),
  is_featured: z.boolean().optional(),
});

export const updateProductSchema = insertProductSchema.partial().extend({
  id: z.number().int(),
});

/* =========================
   Contact / Newsletter
========================= */

export const contactMessageSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}
