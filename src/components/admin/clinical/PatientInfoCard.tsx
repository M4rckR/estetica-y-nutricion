import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UsersType } from "@/types/users";
import { ClinicalHistoryType } from "@/types/clinical/history";
import { formatFullName } from "@/utils/format";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface PatientInfoCardProps {
  patientData: UsersType;
  clinicalHistory: ClinicalHistoryType | null;
  patientId: string;
}

const translateConsultReason = (value: string | null | undefined): string => {
  if (!value) return "Sin motivo de consulta";

  const translations: Record<string, string> = {
    'reducir_grasa': 'Reducir grasa corporal',
    'aumentar_masa': 'Aumentar masa muscular',
    'rendimiento_deportivo': 'Rendimiento deportivo',
    'salud': 'Salud / tratamiento médico',
    'mejorar_alimentacion': 'Mejorar solo alimentación',
    // Valores antiguos por compatibilidad
    'control_peso': 'Control de peso',
    'mejora_estetica': 'Mejora estética corporal',
    'otro': 'Otro',
  };

  return translations[value] || value;
};

export function PatientInfoCard({
  patientData,
  clinicalHistory,
  patientId,
}: PatientInfoCardProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 mt-10 lg:mt-0">
      {/* Información del paciente con flecha de retroceso */}
      <div className="relative mb-6">
        <Link href="/admin/pacientes" className="absolute left-0 top-1/2 -translate-y-1/2">
          <Button 
            className="bg-m-green hover:bg-m-green-dark text-white rounded-full w-10 h-10 p-0 flex items-center justify-center cursor-pointer"
            aria-label="Volver a lista de pacientes"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h2 className="text-2xl font-medium text-center">
          Datos generales <span className="text-m-green">del paciente</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {/* Nombre */}
        <div className="bg-m-green-light/30 px-4 py-3 rounded-full">
          <p className="text-sm text-m-green-dark">
            {patientData.nombres ? formatFullName(patientData.nombres) : "Sin nombre"}
          </p>
        </div>

        {/* DNI */}
        <div className="bg-m-green-light/30 px-4 py-3 rounded-full">
          <p className="text-sm text-m-green-dark">{patientData.dni || "Sin DNI"}</p>
        </div>

        {/* Email */}
        <div className="bg-m-green-light/30 px-4 py-3 rounded-full">
          <p className="text-sm text-m-green-dark">{patientData.correo}</p>
        </div>

        {/* Distrito */}
        <div className="bg-m-green-light/30 px-4 py-3 rounded-full">
          <p className="text-sm text-m-green-dark">{patientData.distrito || "Sin distrito"}</p>
        </div>

        {/* Sexo */}
        <div className="bg-m-green-light/30 px-4 py-3 rounded-full">
          <p className="text-sm text-m-green-dark">
            {clinicalHistory?.sex || "Sin sexo"}
          </p>
        </div>

        {/* Edad */}
        <div className="bg-m-green-light/30 px-4 py-3 rounded-full">
          <p className="text-sm text-m-green-dark">
            {clinicalHistory?.age ? `${clinicalHistory.age} años` : "Sin edad"}
          </p>
        </div>

        {/* Fecha de Nacimiento */}
        <div className="bg-m-green-light/30 px-4 py-3 rounded-full">
          <p className="text-sm text-m-green-dark">
            {clinicalHistory?.birth_date 
              ? format(new Date(clinicalHistory.birth_date), "dd/MM/yyyy", { locale: es })
              : "Sin fecha de nacimiento"}
          </p>
        </div>

        {/* Fecha de Primera Cita */}
        <div className="bg-m-green-light/30 px-4 py-3 rounded-full">
          <p className="text-sm text-m-green-dark">
            {clinicalHistory?.first_appointment_date
              ? format(new Date(clinicalHistory.first_appointment_date), "dd/MM/yyyy", { locale: es })
              : "Sin fecha de primera cita"}
          </p>
        </div>

        {/* Ocupación */}
        <div className="bg-m-green-light/30 px-4 py-3 rounded-full">
          <p className="text-sm text-m-green-dark">
            {clinicalHistory?.ocupation || "Sin ocupación"}
          </p>
        </div>

        {/* Motivo de Consulta */}
        <div className="bg-m-green-light/30 px-4 py-3 rounded-full col-span-1 sm:col-span-2">
          <p className="text-sm text-m-green-dark">
            {translateConsultReason(clinicalHistory?.consult_reason)}
          </p>
        </div>
      </div>

      {/* Historia Clínica Card */}
      <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 text-center">
        <h3 className="text-2xl font-medium mb-4">
          Historia <span className="text-m-green">clínica</span>
        </h3>

        {clinicalHistory ? (
          <>
            <p className="text-gray-600 mb-6">Datos registrados</p>
            <Link href={`/admin/pacientes/${patientId}/historia-clinica/ver`}>
              <Button className="bg-m-green text-white px-8 py-6 rounded-full hover:bg-m-green-dark mb-4 w-full max-w-xs cursor-pointer transition-all">
                Ver historia clínica
              </Button>
            </Link>
            <Link href={`/admin/pacientes/${patientId}/historia-clinica/editar`}>
              <Button 
                variant="outline" 
                className="border-2 border-gray-300 px-8 py-6 rounded-full w-full max-w-xs cursor-pointer hover:bg-gray-50 transition-all"
              >
                Editar datos
              </Button>
            </Link>
          </>
        ) : (
          <>
            <p className="text-gray-600 mb-6">Sin datos actualmente</p>
            <Link href={`/admin/pacientes/${patientId}/historia-clinica/crear`}>
              <Button className="bg-m-green text-white px-8 py-6 rounded-full hover:bg-m-green-dark mb-4 w-full max-w-xs cursor-pointer transition-all">
                Subir datos del paciente
              </Button>
            </Link>
            <Link href="/admin/pacientes">
              <Button 
                variant="outline" 
                className="border-2 border-gray-300 px-8 py-6 rounded-full w-full max-w-xs cursor-pointer hover:bg-gray-50 transition-all"
              >
                Volver
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

