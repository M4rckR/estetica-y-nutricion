import z from "zod/v3";

export const formPreReservationSchema = z.object({
  consultaMedica: z.string().min(1, { message: "El campo es requerido" }),
  sede: z.string().min(1, { message: "La sede es requerida" }),
  date: z.date({
    message: "La fecha es requerida",
  }),
});