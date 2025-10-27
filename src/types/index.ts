export * from "./auth";
export * from "./plans";

import z from "zod/v3";
import { formPreReservationSchema } from "@/schema";


export type Consulta = {
  id: string; // El ID de la consulta (lo vi como 'int8' en tu schema, pero lo tratamos como string)
  created_at: string; // La fecha de creación
  titulo: string; // El título de la consulta
  recomendacion: string; // El texto de recomendación
  pdf_path: string | null; // La ruta al archivo PDF
  paciente_id: string; // El UUID del paciente
};

export type FormPreReservationType = z.infer<typeof formPreReservationSchema>;