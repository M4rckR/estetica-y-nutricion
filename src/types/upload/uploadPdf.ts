import { schemaConsult } from '@/schema/upload/consult';
import { z } from 'zod';
// Importa el ESQUEMA desde su archivo

// Crea y exporta el TIPO a partir del esquema importado
export type UploadPdfType = z.infer<typeof schemaConsult>;