import { completeRegistrationSchema } from "@/schema/register/register";
import z from "zod/v3";

// Solo el tipo que realmente se está usando
export type CompleteRegistrationFormType = z.infer<typeof completeRegistrationSchema>;