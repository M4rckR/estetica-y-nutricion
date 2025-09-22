export * from "./auth";
export * from "./plans";

import z from "zod/v3";
import { formPreReservationSchema } from "@/schema";

export type FormPreReservationType = z.infer<typeof formPreReservationSchema>;