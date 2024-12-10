import { z } from "zod";

export const RegisterFormSchema = z
  .object({
    email: z.string().email({ message: "Enter Valid Eamil" }).trim(),
    password: z
      .string()
      .min(1, { message: "Not be Empty" })
      .min(5, { message: "At least 5" })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwod don't match",
        path: ["confirmPassword"],
      });
    }
  });
