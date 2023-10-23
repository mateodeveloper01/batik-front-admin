import { z } from "zod";

export interface ProductFromDB {
  title: string;
  description: string;
  price: string;
  new: boolean;
  img: any;
  type: "normal" | "featured" | "trending";
  categories: any;
  _id: string;
  isStock: boolean;
}

export const PROD_TYPES = ["normal", "featured", "trending"] as const;

export const productSchema = z.object({
  title: z.string().min(3, "Debe tener al menos 3 caracteres"),
  description: z.string().min(3, "Debe tener al menos 3 caracteres"),
  price: z.number().min(1, "Debe tener al menos 1 numero"),
  new: z.boolean(),
  img: z.array(z.string()).min(1, "Debe tener al menos una imagen"),
  // img:z.string(),
  type: z.enum(PROD_TYPES) || null,
  categories: z.string().min(1, "Debe tener al menos 3 caracteres"),
  isStock: z.boolean(),
});

export type Products = z.infer<typeof productSchema>;
