import { z } from "zod";

export const createUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export type SerializedUser = {
  firstName: string;
  lastName: string;
  email: string;
};
