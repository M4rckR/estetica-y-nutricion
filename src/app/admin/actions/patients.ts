'use server'

import { createClient } from "@/utils/supabase/server";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { revalidatePath } from "next/cache";

export async function deletePatient(patientId: string) {
  const supabase = await createClient();

  // Verificar que el usuario sea doctor
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: "No autenticado" };
  }

  const { data: userData } = await supabase
    .from("users")
    .select("rol")
    .eq("user_id", user.id)
    .single();

  if (userData?.rol !== "doctor") {
    return { error: "No autorizado. Solo doctores pueden eliminar pacientes." };
  }

  // Verificar que el paciente existe y es un paciente
  const { data: patientData } = await supabase
    .from("users")
    .select("rol")
    .eq("user_id", patientId)
    .single();

  if (!patientData) {
    return { error: "Paciente no encontrado" };
  }

  if (patientData.rol !== "paciente") {
    return { error: "Solo se pueden eliminar pacientes" };
  }

  // Eliminar el usuario de auth usando el cliente admin (con service role key)
  // Esto eliminará en cascada los registros relacionados
  const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(patientId);

  if (deleteError) {
    console.error("Error al eliminar paciente:", deleteError);
    return { error: "Error al eliminar el paciente: " + deleteError.message };
  }

  // Revalidar la página de pacientes
  revalidatePath("/admin/pacientes");
  
  return { success: true };
}
