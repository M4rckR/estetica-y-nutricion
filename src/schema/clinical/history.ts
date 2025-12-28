import z from "zod/v3";

// Schema para la historia clínica completa - TODOS LOS CAMPOS OPCIONALES
export const clinicalHistorySchema = z.object({
  // Datos básicos del paciente (primera cita)
  patient_id: z.string().uuid(),
  phone: z.string().nullable().optional(),
  age: z.number().int().min(0).max(120).nullable().optional(),
  birth_date: z.date().nullable().optional(),
  first_appointment_date: z.date().nullable().optional(),
  sex: z.string().nullable().optional(),
  ocupation: z.string().nullable().optional(),

  // Paso 1: Historia Clínica
  consult_reason: z.string().nullable().optional(),
  recent_exams: z.union([z.enum(['si', 'no']), z.null(), z.undefined()]).optional(),
  recent_exams_details: z.string().nullable().optional(),
  practices_sports: z.string().nullable().optional(), // Acepta string, vacío, null o undefined
  pathological_antecedents: z.string().nullable().optional(),
  consumes_alcohol_tobacco: z.union([z.enum(['no', 'alcohol', 'tabaco', 'ambos']), z.null(), z.undefined()]).optional(),
  last_menstruation: z.union([z.date(), z.null(), z.undefined()]).optional(),
  uses_contraceptives: z.union([z.enum(['si', 'no']), z.null(), z.undefined()]).optional(),
  current_medication: z.string().nullable().optional(),
  hypertension_diabetes_antecedents: z.string().nullable().optional(),
  stress_anxiety: z.string().nullable().optional(),
  registro_24h_completo: z.string().nullable().optional(),
  abdominal_pain: z.string().nullable().optional(),
  sleep_quality: z.string().nullable().optional(),

  // Paso 2: Cirugías y Alergias
  has_been_operated: z.union([z.enum(['si', 'no']), z.null(), z.undefined()]).optional(),
  surgery_details: z.string().nullable().optional(),
  allergies: z.string().nullable().optional(),

  // Paso 3: Alimentación
  who_prepares_meals: z.union([z.enum(['tu-mismo', 'pareja-esposo', 'hijo', 'empleada', 'otra']), z.null(), z.undefined()]).optional(),
  eating_out_frequency: z.union([z.enum(['nunca', '1-2-veces', '3-4-veces', '5-mas-veces']), z.null(), z.undefined()]).optional(),
  meals_per_day: z.union([z.enum(['2', '3', '4', '5']), z.null(), z.undefined()]).optional(),
  favorite_foods: z.string().nullable().optional(),
  aliments_hate: z.string().nullable().optional(),
  food_allergies_intolerances: z.string().nullable().optional(),
  daily_liquid_intake: z.union([z.enum(['menos_1L', '1-2L', '2-3L', 'mas_3L']), z.null(), z.undefined()]).optional(),
  supplements: z.string().nullable().optional(),
  physical_activity_record: z.string().nullable().optional(),
  special_habits: z.string().nullable().optional(),

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

