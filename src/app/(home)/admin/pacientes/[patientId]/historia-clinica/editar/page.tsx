import { HeaderIntern } from "@/components/main/HeaderIntern";
import { ClinicalHistoryForm } from "@/components/admin/clinical/ClinicalHistoryForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function EditClinicalHistoryPage({
  params,
}: {
  params: Promise<{ patientId: string }>;
}) {
  const { patientId } = await params;
  const supabase = await createClient();

  // Verificar si el usuario es doctor
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: userData } = await supabase
    .from("users")
    .select("rol")
    .eq("user_id", user.id)
    .single();

  if (userData?.rol !== "doctor") {
    redirect("/unauthorized");
  }

  // Obtener datos del paciente
  const { data: patientData } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", patientId)
    .single();

  if (!patientData) {
    redirect("/admin/pacientes");
  }

  // Obtener historia clínica existente
  const { data: clinicalHistory } = await supabase
    .from("clinical_history")
    .select("*")
    .eq("patient_id", patientId)
    .single();

  // Si no existe, redirigir a crear
  if (!clinicalHistory) {
    redirect(`/admin/pacientes/${patientId}/historia-clinica/crear`);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12">
      <aside className="lg:col-span-4 2xl:col-span-3 px-4 py-4 md:p-8 bg-white lg:bg-m-green-dark lg:sticky lg:top-0 lg:h-screen">
        <HeaderIntern />
      </aside>
      <section className="lg:col-span-8 2xl:col-span-9 lg:py-16 xl:px-8">
        <ClinicalHistoryForm
          patientId={patientId}
          patientName={patientData.nombres}
          existingData={clinicalHistory}
        />
      </section>
    </div>
  );
}

