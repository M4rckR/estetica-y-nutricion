import { formPreReservationSchema } from "@/schema";
import z from "zod/v3";
export * from "./plans";
export * from "./auth";

export type FormPreReservationType = z.infer<typeof formPreReservationSchema>;