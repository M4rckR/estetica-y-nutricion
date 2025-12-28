'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { ClinicalHistoryFormType } from "@/types/clinical/history";

export async function saveClinicalHistory(data: ClinicalHistoryFormType & { patient_id: string }) {
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
    return { error: "No autorizado. Solo doctores pueden crear historias clínicas." };
  }

  // Preparar datos para inserción
  const dataToInsert = {
    patient_id: data.patient_id,
    // Datos básicos
    phone: data.phone || null,
    age: data.age || null,
    birth_date: data.birth_date || null,
    first_appointment_date: data.first_appointment_date || null,
    sex: data.sex || null,
    ocupation: data.ocupation || null,
    // Historia Clínica
    consult_reason: data.consult_reason || null,
    recent_exams: data.recent_exams ?? null,
    recent_exams_details: data.recent_exams_details || null,
    practices_sports: data.practices_sports || null,
    pathological_antecedents: data.pathological_antecedents || null,
    consumes_alcohol_tobacco: data.consumes_alcohol_tobacco || null,
    last_menstruation: data.last_menstruation || null,
    uses_contraceptives: data.uses_contraceptives || null,
    current_medication: data.current_medication || null,
    hypertension_diabetes_antecedents: data.hypertension_diabetes_antecedents || null,
    stress_anxiety: data.stress_anxiety || null,
    registro_24h_completo: data.registro_24h_completo || null,
    abdominal_pain: data.abdominal_pain || null,
    sleep_quality: data.sleep_quality || null,
    // Cirugías y Alergias
    has_been_operated: data.has_been_operated || null,
    surgery_details: data.surgery_details || null,
    allergies: data.allergies || null,
    // Alimentación
    who_prepares_meals: data.who_prepares_meals || null,
    eating_out_frequency: data.eating_out_frequency || null,
    meals_per_day: data.meals_per_day || null,
    favorite_foods: data.favorite_foods || null,
    aliments_hate: data.aliments_hate || null,
    food_allergies_intolerances: data.food_allergies_intolerances || null,
    daily_liquid_intake: data.daily_liquid_intake || null,
    supplements: data.supplements || null,
    physical_activity_record: data.physical_activity_record || null,
    special_habits: data.special_habits || null,
    // Objetivos y Plan
    short_term_objectives: data.short_term_objectives || null,
    medium_term_objectives: data.medium_term_objectives || null,
    long_term_objectives: data.long_term_objectives || null,
    plan_type: data.plan_type || null,
    plan_type_details: data.plan_type_details || null,
    // Metadatos
    completed: data.completed || false,
    updated_at: new Date().toISOString(),
  };

  // Insertar o actualizar la historia clínica
  const { error } = await supabase
    .from("clinical_history")
    .upsert(dataToInsert, {
      onConflict: 'patient_id'
    });

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/admin/pacientes/${data.patient_id}/historia-clinica`);
  
  return { success: true };
}

