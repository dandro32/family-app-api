import { z } from "zod";

const UserSchema = z.object({
  username: z.string().min(3).max(100),
  password: z
    .string()
    .min(8)
    .max(100)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
});

export type UserSchemaDTO = z.infer<typeof UserSchema>;

const validateUser = (user: unknown) => {
  return UserSchema.safeParse(user);
};

export default validateUser;
