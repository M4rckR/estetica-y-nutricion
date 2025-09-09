import { loginFormSchema } from "@/schema";
import z from "zod/v3";

export type AuthLogin = z.infer<typeof loginFormSchema>;