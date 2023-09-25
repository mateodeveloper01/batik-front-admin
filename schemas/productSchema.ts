import { z } from "zod";
import { imgSchema } from "./imgSchema";

export interface ProductFromDB {
  title: string;
  description: string;
  price: string;
  new: boolean;
  img: any;
  type: "normal" | "featured" | "trending";
  categories: any;
  _id: string;
}

export const PROD_TYPES = ["normal", "featured", "trending"] as const;

export const productSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.string(),
  new: z.boolean(),
  img: z.array(z.string()),
  // img:z.string(),
  type: z.enum(PROD_TYPES) || null,
  categories: z.string(),
});

export type Products = z.infer<typeof productSchema>;
