import { z } from "zod";

export interface ProductFromDB {
  title: string;
  description: string;
  price: number;
  new: boolean;
  img: any;
  img2: any;
  type: {
    type: string;
    enum: ["normal", "featured", "trending"];
  };
  categories: any;
  sub_categories: any;
  _id: string;
}

export const PROD_TYPES = ["normal", "featured", "trending"] as const;

export const productSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.string(),
  new: z.boolean(),
  img: z.string(),
  img2: z.string(),
  type: z.enum(PROD_TYPES) || null,
  categories: z.string(),
  sub_categories: z.string(),
});

export type Products = z.infer<typeof productSchema>;
