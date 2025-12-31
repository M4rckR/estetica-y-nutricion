import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_MIME_TYPES = ['application/pdf'];

// Esquema de validación para archivo PDF opcional
const optionalPdfSchema = z
  .instanceof(File)
  .refine(
    (file) => !file || file.size <= MAX_FILE_SIZE,
    `El archivo no debe superar los 5MB.`
  )
  .refine(
    (file) => !file || (file.type && ACCEPTED_MIME_TYPES.includes(file.type)),
    'Solo se permiten archivos en formato PDF.'
  )
  .optional();

export const schemaConsult = z.object({
  titulo: z.string().min(3, { message: 'El título es requerido (mín. 3 caracteres).' }),
  recomendacion: z.string().min(10, { message: 'La recomendación es requerida (mín. 10 caracteres).' }),
  seguimiento: z.string().optional(),
  pdf1: optionalPdfSchema,
  pdf2: optionalPdfSchema,
  pdf3: optionalPdfSchema,
});