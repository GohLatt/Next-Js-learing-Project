"use server";

import { getCollection } from "@/lib/db";
import { RegisterFormSchema } from "@/lib/rule";
const bcrypt = require("bcryptjs");
export async function register(state: any, formData: FormData) {
  const validFormData = RegisterFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });
  console.log(validFormData);
  console.log(validFormData?.error?.flatten().fieldErrors);

  if (!validFormData.success) {
    return {
      error: validFormData.error.flatten().fieldErrors,
      email: formData.get("email"),
    };
  }

  //check server
  const userCollection = await getCollection("user");
  if (!userCollection) return { errors: { email: "Server Error !" } };

  const { email, password } = validFormData.data;

  //already exist email
  const existEmail = await userCollection.findOne({ email });

  if (existEmail) return { errors: { email: "Your Email is already exist" } };

  //password hash
  const hashPassword = await bcrypt.hash(password, 10);

  //save db
  const result = await userCollection.insertOne({
    email,
    password: hashPassword,
  });

  console.log(result);
}
