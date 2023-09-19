import { z } from "zod";

export const categorySchema = z.object({
  title: z.string(),
  description: z.string(),
  img: z.string(), // Puedes cambiarlo a z.string() si es opcional
});

export interface CategoriesFromDB {
  title: string;
  description: string;
  img: any;
  _id: string;
}
export type Category = z.infer<typeof categorySchema>;
