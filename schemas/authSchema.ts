import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Email invalido"),
  password: z.string().min(6,'Tiene que tener al menos 6 caracteres'),
});

export type login = z.infer<typeof LoginSchema>;
