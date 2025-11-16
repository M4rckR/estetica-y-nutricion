import z from "zod/v3";

// Schema para la historia clínica completa - TODOS LOS CAMPOS OPCIONALES
export const clinicalHistorySchema = z.object({
  // Datos básicos del paciente (primera cita)
  patient_id: z.string().uuid(),
  phone: z.string().nullable().optional(),
  age: z.number().int().min(0).max(120).nullable().optional(),
  first_appointment_date: z.date().nullable().optional(),
  
  // Paso 1: Historia Clínica
  practices_sports: z.enum(['si', 'no', 'ocasionalmente']).nullable().optional(),
  pathological_antecedents: z.string().nullable().optional(),
  consumes_alcohol_tobacco: z.enum(['no', 'alcohol', 'tabaco', 'ambos']).nullable().optional(),
  last_menstruation: z.date().nullable().optional(),
  uses_contraceptives: z.enum(['si', 'no']).nullable().optional(),
  current_medication: z.string().nullable().optional(),
  hypertension_diabetes_antecedents: z.enum(['ninguno', 'hipertension', 'diabetes', 'ambos']).nullable().optional(),
  
  // Paso 2: Cirugías y Alergias
  has_been_operated: z.enum(['si', 'no']).nullable().optional(),
  surgery_details: z.string().nullable().optional(),
  allergies: z.string().nullable().optional(),
  disliked_foods: z.string().nullable().optional(),
  
  // Paso 3: Alimentación
  who_prepares_meals: z.enum(['yo', 'familiar', 'empleada', 'otro']).nullable().optional(),
  eating_out_frequency: z.enum(['nunca', 'ocasional', 'semanal', 'diario']).nullable().optional(),
  favorite_foods: z.string().nullable().optional(),
  daily_liquid_intake: z.enum(['menos_1L', '1-2L', '2-3L', 'mas_3L']).nullable().optional(),
  supplements: z.string().nullable().optional(),
  
  // Metadatos
  completed: z.boolean().default(false),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

// Schema para crear/actualizar (sin patient_id requerido en el form)
export const clinicalHistoryFormSchema = clinicalHistorySchema.omit({
  patient_id: true,
  created_at: true,
  updated_at: true,
}).extend({
  completed: z.boolean().optional(),
});

export type ClinicalHistoryType = z.infer<typeof clinicalHistorySchema>;
export type ClinicalHistoryFormType = z.infer<typeof clinicalHistoryFormSchema>;

