import z from "zod/v3";

export const usersSchema = z.object({
  user_id: z.string(),
  nombres: z.string().min(2, { message: 'Los nombres son requeridos' }),
  dni: z.string().min(8, { message: 'El DNI es requerido' }),
  correo: z.string().email({ message: 'El correo no es válido' }),
  distrito: z.string().min(2, { message: 'El distrito es requerido' })
            .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
            ,{ message: 'Distrito no válido' }),
  rol: z.enum(['paciente', 'doctor']),
  follow_preview: z.string(),
  created_at: z.string(),
})