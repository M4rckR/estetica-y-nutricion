import { usersSchema } from "@/schema/users/index";
import z from "zod/v3";

export type UsersType = z.infer<typeof usersSchema>;