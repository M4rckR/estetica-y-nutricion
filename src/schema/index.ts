import z from "zod/v3";
export * from "./register/register";


// Esquema para el formulario de pre-reserva
export const formPreReservationSchema = z.object({
  consultaMedica: z.string().min(1, { message: "El campo es requerido" }),
  sede: z.string().min(1, { message: "La sede es requerida" }),
  date: z.date({
    message: "La fecha es requerida",
  }),
});


// Esquema para el login
export const loginFormSchema = z.object({
  email: z.string().email({ message: "El correo no es válido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});
