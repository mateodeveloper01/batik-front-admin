import { z } from "zod";

export interface SubCategoriesFromDB {
  title: string;
  _id: string;
  categories: any;
}
export const SubCategorySchema = z.object({
  title: z.string(),
  categories:z.string()
});
