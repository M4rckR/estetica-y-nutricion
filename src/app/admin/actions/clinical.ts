'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { ClinicalHistoryFormType } from "@/types/clinical/history";

export async function saveClinicalHistory(data: ClinicalHistoryFormType & { patient_id: string }) {
  console.log("🔵 [SERVER ACTION] Recibiendo datos:", JSON.stringify(data, null, 2));
  
  const supabase = await createClient();

  // Verificar que el usuario sea doctor
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    console.log("❌ [SERVER ACTION] Usuario no autenticado");
    return { error: "No autenticado" };
  }

  console.log("✅ [SERVER ACTION] Usuario autenticado:", user.id);

  const { data: userData } = await supabase
    .from("users")
    .select("rol")
    .eq("user_id", user.id)
    .single();

  console.log("👤 [SERVER ACTION] Rol del usuario:", userData?.rol);

  if (userData?.rol !== "doctor") {
    console.log("❌ [SERVER ACTION] Usuario no es doctor");
    return { error: "No autorizado. Solo doctores pueden crear historias clínicas." };
  }

  // Preparar datos para inserción
  const dataToInsert = {
    patient_id: data.patient_id,
    phone: data.phone || null,
    age: data.age || null,
    first_appointment_date: data.first_appointment_date || null,
    practices_sports: data.practices_sports || null,
    pathological_antecedents: data.pathological_antecedents || null,
    consumes_alcohol_tobacco: data.consumes_alcohol_tobacco || null,
    last_menstruation: data.last_menstruation || null,
    uses_contraceptives: data.uses_contraceptives || null,
    current_medication: data.current_medication || null,
    hypertension_diabetes_antecedents: data.hypertension_diabetes_antecedents || null,
    has_been_operated: data.has_been_operated || null,
    surgery_details: data.surgery_details || null,
    allergies: data.allergies || null,
    disliked_foods: data.disliked_foods || null,
    who_prepares_meals: data.who_prepares_meals || null,
    eating_out_frequency: data.eating_out_frequency || null,
    favorite_foods: data.favorite_foods || null,
    daily_liquid_intake: data.daily_liquid_intake || null,
    supplements: data.supplements || null,
    completed: data.completed || false,
    updated_at: new Date().toISOString(),
  };

  console.log("💾 [SERVER ACTION] Datos a insertar:", JSON.stringify(dataToInsert, null, 2));

  // Insertar o actualizar la historia clínica
  const { error } = await supabase
    .from("clinical_history")
    .upsert(dataToInsert, {
      onConflict: 'patient_id'
    });

  if (error) {
    console.error("❌ [SERVER ACTION] Error de base de datos:", error);
    return { error: error.message };
  }

  console.log("✅ [SERVER ACTION] Historia clínica guardada exitosamente");

  revalidatePath(`/admin/pacientes/${data.patient_id}/historia-clinica`);
  
  return { success: true };
}

