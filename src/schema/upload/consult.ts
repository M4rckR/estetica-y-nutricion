import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_MIME_TYPES = ['application/pdf'];

export const schemaConsult = z.object({
  titulo: z.string().min(3, { message: 'El título es requerido (mín. 3 caracteres).' }),
  recomendacion: z.string().min(10, { message: 'La recomendación es requerida (mín. 10 caracteres).' }),
  pdf: z
    .instanceof(File, { message: 'Debes seleccionar un archivo.' })
    .refine((file) => file?.size > 0, 'Debes seleccionar un archivo.')
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE,
      `El archivo no debe superar los 5MB.`
    )
    .refine(
      (file) => file?.type && ACCEPTED_MIME_TYPES.includes(file.type),
      'Solo se permiten archivos en formato PDF.'
    ),
});