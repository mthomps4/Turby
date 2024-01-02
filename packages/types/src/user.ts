import { z } from "zod";

export const createUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(10).max(30),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
