import { z } from "zod";

export interface imagesFromDB {
  title: string;
  url: string;
  _id: string;
  cloudinaryId: string;
}

export const imgSchema = z.object({
  title: z.string(),
  url: z.string(),
  _id: z.string(),
  cloudinaryId: z.string(),
});
