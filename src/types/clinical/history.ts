import { clinicalHistorySchema, clinicalHistoryFormSchema } from "@/schema/clinical/history";
import z from "zod/v3";

export type ClinicalHistoryType = z.infer<typeof clinicalHistorySchema>;
export type ClinicalHistoryFormType = z.infer<typeof clinicalHistoryFormSchema>;

