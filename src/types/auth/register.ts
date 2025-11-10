import { registerSchema } from "@/schema/register/register";
import z from "zod/v3";

export type RegisterType = z.infer<typeof registerSchema>;
