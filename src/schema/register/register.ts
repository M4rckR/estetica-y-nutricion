import z from "zod/v3";
// Esquema para el registro

// Datos personales para el registro
// 1️⃣ PASO 1: Datos personales
export const personalDataSchema = z.object({
  firstName: z.string().min(1, { message: "El nombre es requerido" }),
  lastName: z.string().min(1, { message: "El apellido es requerido" }),
  sex: z.string().min(1, { message: "El sexo es requerido" }),
  age: z.number().min(1, { message: "La edad es requerida" }),
  firstDate: z.date({
    message: "La fecha es requerida",
  }).optional(),
  email: z.string().email({ message: "El correo no es válido" }),
  telephone: z.string().min(1, { message: "El telefono es requerido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

// 2️⃣ PASO 2: Historia clínica básica
export const clinicalHistorySchema = z.object({
  practicesSports: z.string().min(1, { message: "Seleccione una opción" }),
  patAntecedents: z.string().min(1, { message: "Seleccione una opción" }),
  consume: z.string().min(1, { message: "Seleccione una opción" }),
  lastMenstruation: z
    .date({
      message: "La fecha es requerida",
    })
    .optional(),
  useAnticonceptive: z.string().min(1, { message: "Seleccione una opción" }),
  actualMedication: z.string().min(1, { message: "Seleccione una opción" }),
  hiperDiaAntecedents: z.string().min(1, { message: "Seleccione una opción" }),
});

// 3️⃣ PASO 3: Cirugías y alergias
export const surgeriesAllergiesSchema = z
  .object({
    operated: z.boolean(),
    operatedDescription: z.string().optional(),
    allergies: z.string().optional(),
    alimentsHate: z.string().optional(),
  })
  .refine(
    (data) => {
      if (
        data.operated &&
        (!data.operatedDescription || data.operatedDescription.trim() === "")
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Describe el tipo de operación",
      path: ["operatedDescription"], // Especifica dónde mostrar el error
    }
  );

// 4️⃣ PASO 4: Alimentación
export const nutritionSchema = z.object({
  mealsPreparedBy: z
    .string()
    .min(1, { message: "Indique quién prepara sus comidas" }),
  eatOutFrequency: z
    .string()
    .min(1, { message: "Indique con qué frecuencia come fuera de casa" }),
  favoriteFoods: z
    .string()
    .min(1, { message: "Indique sus alimentos o platos favoritos" }),
  dailyLiquids: z
    .string()
    .min(1, { message: "Indique la cantidad de líquidos que consume al día" }),
  supplements: z.string()
});

// Esquema completo para el registro
export const completeRegistrationSchema = z.object({
  // Personal data
  firstName: z.string().min(1, { message: "El nombre es requerido" }),
  lastName: z.string().min(1, { message: "El apellido es requerido" }),
  sex: z.string().min(1, { message: "El sexo es requerido" }),
  age: z.number().min(1, { message: "La edad es requerida" }),
  firstDate: z.date({
    message: "La fecha es requerida",
  }).optional(),
  email: z.string().email({ message: "El correo no es válido" }),
  telephone: z.string().min(1, { message: "El telefono es requerido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),

  // Clinical history
  practicesSports: z.string().min(1, { message: "Seleccione una opción" }),
  patAntecedents: z.string().min(1, { message: "Seleccione una opción" }),
  consume: z.string().min(1, { message: "Seleccione una opción" }),
  lastMenstruation: z
    .date({
      message: "La fecha es requerida",
    })
    .optional(),
  useAnticonceptive: z.string().min(1, { message: "Seleccione una opción" }),
  actualMedication: z.string().min(1, { message: "Seleccione una opción" }),
  hiperDiaAntecedents: z.string().min(1, { message: "Seleccione una opción" }),

  // Surgeries and allergies
  operated: z.boolean({
    required_error: "Seleccione una opción",
  }),
  operatedDescription: z.string().optional(),
  allergies: z.string().optional(),
  alimentsHate: z.string().optional(),

  // Nutrition
  mealsPreparedBy: z
    .string()
    .min(1, { message: "Indique quién prepara sus comidas" }),
  eatOutFrequency: z
    .string()
    .min(1, { message: "Indique con qué frecuencia come fuera de casa" }),
  favoriteFoods: z
    .string()
    .min(1, { message: "Indique sus alimentos o platos favoritos" }),
  dailyLiquids: z
    .string()
    .min(1, { message: "Indique la cantidad de líquidos que consume al día" }),
  supplements: z.string()
}).refine(
  (data) => {
    if (
      data.operated &&
      (!data.operatedDescription || data.operatedDescription.trim() === "")
    ) {
      return false;
    }
    return true;
  },
  {
    message: "Describe el tipo de operación",
    path: ["operatedDescription"],
  }
);
