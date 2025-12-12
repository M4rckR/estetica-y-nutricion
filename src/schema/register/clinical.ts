import z from "zod/v3";

export const clinicalHistorySchema = z.object({
  practicesSports: z.string().optional(),
  patAntecedents: z.string().optional(),
  consume: z.string().optional(),
  lastMenstruation: z.date().optional(),
  useAnticonceptive: z.string().optional(),
  actualMedication: z.string().optional(),
  hiperDiaAntecedents: z.string().optional(),
});

