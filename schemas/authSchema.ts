import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Email invalido"),
  password: z.string().min(6),
});

export type login = z.infer<typeof LoginSchema>;
