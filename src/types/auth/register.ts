import { registerSchema } from "@/schema/register/register";
import { clinicalHistorySchema } from "@/schema/register/clinical";
import z from "zod/v3";

export type RegisterType = z.infer<typeof registerSchema>;
export type CompleteRegistrationFormType = z.infer<typeof clinicalHistorySchema>;
