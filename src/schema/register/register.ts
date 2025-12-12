import z from "zod/v3";

export const registerSchema = z.object({
  nombres: z.string().min(2, { message: 'Los nombres son requeridos' }),
  dni: z.string().min(8, { message: 'El DNI es requerido' }),
  correo: z.string().email({ message: 'El correo no es válido' }),
  distrito: z.string().min(2, { message: 'El distrito es requerido' })
            .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
            ,{ message: 'Distrito no válido' }),
  contraseña: z.string().min(8, { message: 'La contraseña es requerida' }),
  followPreview: z.string(),
})






