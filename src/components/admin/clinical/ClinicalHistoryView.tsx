import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UsersType } from "@/types/users";
import { ClinicalHistoryType } from "@/types/clinical/history";
import { formatFullName } from "@/utils/format";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface ClinicalHistoryViewProps {
  patientData: UsersType;
  clinicalHistory: ClinicalHistoryType;
  patientId: string;
}

interface DataRowProps {
  label: string;
  value: string | null | undefined;
}

function DataRow({ label, value }: DataRowProps) {
  return (
    <div className="py-3 border-b border-gray-100">
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-base text-m-green-dark font-medium">
        {value || "No especificado"}
      </p>
    </div>
  );
}

const translateValue = (value: string | null | undefined): string => {
  if (!value) return "No especificado";

  const translations: Record<string, string> = {
    // Sports
    'si': 'Sí',
    'no': 'No',
    'ocasionalmente': 'Ocasionalmente',

    // Alcohol/Tabaco
    'alcohol': 'Alcohol',
    'tabaco': 'Tabaco',
    'ambos': 'Ambos',

    // Hypertension/Diabetes
    'ninguno': 'Ninguno',
    'hipertension': 'Hipertensión',
    'diabetes': 'Diabetes',

    // Who prepares meals
    'tu-mismo': 'Tú mismo',
    'pareja-esposo': 'Tu pareja o esposo',
    'hijo': 'Tu hij@',
    'empleada': 'Empleada',
    'otra': 'Otra',

    // Eating frequency
    'nunca': 'Nunca',
    '1-2-veces': '1 a 2 veces/semana',
    '3-4-veces': '3 a 4 veces/semana',
    '5-mas-veces': '5 a más veces/semana',

    // Meals per day
    '2': '2 comidas',
    '3': '3 comidas',
    '4': '4 comidas',
    '5': '5 comidas',

    // Liquid intake
    'menos_1L': 'Menos de 1 litro',
    '1-2L': '1 - 2 litros',
    '2-3L': '2 - 3 litros',
    'mas_3L': 'Más de 3 litros',

    // Consult reasons
    'reducir_grasa': 'Reducir grasa corporal',
    'aumentar_masa': 'Aumentar masa muscular',
    'rendimiento_deportivo': 'Rendimiento deportivo',
    'salud': 'Salud / tratamiento médico',
    'mejorar_alimentacion': 'Mejorar solo alimentación',
  };

  return translations[value] || value;
};

const formatDigestiveSymptoms = (value: string | null | undefined): string => {
  if (!value) return "No especificado";
  
  try {
    const symptoms = JSON.parse(value);
    const symptomLabels: Record<string, string> = {
      'hinchazon_abdominal': 'Hinchazón abdominal',
      'estrenimiento': 'Estreñimiento',
      'acidez_reflujo': 'Acidez o reflujo',
      'gases_flatulencia': 'Gases o flatulencia',
      'saciedad_precoz': 'Sensación de saciedad precoz',
      'ansiedad_comida': 'Ansiedad por la comida',
    };
    
    const frequencyLabels: Record<string, string> = {
      'nunca': 'Nunca',
      'ocasional': 'Ocasional',
      'frecuente': 'Frecuente',
    };
    
    const entries = Object.entries(symptoms);
    if (entries.length === 0) return "No especificado";
    
    return entries
      .map(([key, freq]) => {
        const label = symptomLabels[key] || key;
        const frequency = frequencyLabels[freq as string] || freq;
        return `${label}: ${frequency}`;
      })
      .join(' | ');
  } catch {
    return value;
  }
};

export function ClinicalHistoryView({
  patientData,
  clinicalHistory,
  patientId,
}: ClinicalHistoryViewProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 mt-10 lg:mt-0">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-medium mb-2">
          Historia <span className="text-m-green">Clínica</span>
        </h1>
        <p className="text-gray-600">
          Paciente: <span className="font-medium">{formatFullName(patientData.nombres)}</span>
        </p>
      </div>

      {/* Información del Paciente */}
      <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-medium mb-4 text-m-green">Información del Paciente</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataRow label="Nombre completo" value={formatFullName(patientData.nombres)} />
          <DataRow label="DNI" value={patientData.dni} />
          <DataRow label="Correo" value={patientData.correo} />
          <DataRow label="Distrito" value={patientData.distrito} />
          <DataRow
            label="Teléfono"
            value={clinicalHistory.phone}
          />
          <DataRow
            label="Edad"
            value={clinicalHistory.age?.toString()}
          />
          <DataRow
            label="Fecha de Nacimiento"
            value={clinicalHistory.birth_date
              ? format(new Date(clinicalHistory.birth_date), "PPP", { locale: es })
              : undefined
            }
          />
          <DataRow
            label="Sexo"
            value={clinicalHistory.sex}
          />
          <DataRow
            label="Ocupación"
            value={clinicalHistory.ocupation}
          />
          <DataRow
            label="Fecha de primera cita"
            value={clinicalHistory.first_appointment_date
              ? format(new Date(clinicalHistory.first_appointment_date), "PPP", { locale: es })
              : undefined
            }
          />
        </div>
      </div>

      {/* Historia Clínica */}
      <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-medium mb-4 text-m-green">Historia Clínica</h2>
        <div className="space-y-2">
          <DataRow
            label="Motivo de consulta"
            value={translateValue(clinicalHistory.consult_reason)}
          />
          <DataRow
            label="¿Te hiciste análisis en los últimos 3 o 6 meses?"
            value={translateValue(clinicalHistory.recent_exams)}
          />
          {clinicalHistory.recent_exams === 'si' && (
            <DataRow
              label="Indicadores bioquímicos"
              value={clinicalHistory.recent_exams_details}
            />
          )}
          <DataRow
            label="Antecedentes patológicos"
            value={clinicalHistory.pathological_antecedents}
          />
          <DataRow
            label="¿Consume alcohol o tabaco?"
            value={translateValue(clinicalHistory.consumes_alcohol_tobacco)}
          />
          <DataRow
            label="Última menstruación"
            value={clinicalHistory.last_menstruation
              ? format(new Date(clinicalHistory.last_menstruation), "PPP", { locale: es })
              : undefined
            }
          />
          <DataRow
            label="¿Usa anticonceptivos?"
            value={translateValue(clinicalHistory.uses_contraceptives)}
          />
          <DataRow
            label="¿Consumes medicamentos?"
            value={clinicalHistory.current_medication ? "Sí" : "No"}
          />
          {clinicalHistory.current_medication && (
            <DataRow
              label="Detalle de medicamentos"
              value={clinicalHistory.current_medication}
            />
          )}
          <DataRow
            label="Antecedentes de enfermedades crónicas"
            value={clinicalHistory.hypertension_diabetes_antecedents}
          />
          <DataRow
            label="¿Sufres de estrés y ansiedad?"
            value={clinicalHistory.stress_anxiety}
          />
          <DataRow
            label="Síntomas digestivos"
            value={formatDigestiveSymptoms(clinicalHistory.abdominal_pain)}
          />
          <DataRow
            label="Calidad de sueño"
            value={clinicalHistory.sleep_quality}
          />
        </div>
      </div>

      {/* Cirugías y Alergias */}
      <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-medium mb-4 text-m-green">Cirugías y Alergias</h2>
        <div className="space-y-2">
          <DataRow
            label="¿Ha sido operado/a?"
            value={translateValue(clinicalHistory.has_been_operated)}
          />
          {clinicalHistory.has_been_operated === 'si' && (
            <DataRow
              label="Detalle de cirugías"
              value={clinicalHistory.surgery_details}
            />
          )}
          <DataRow
            label="Alergias"
            value={clinicalHistory.allergies}
          />
        </div>
      </div>

      {/* Alimentación */}
      <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-medium mb-4 text-m-green">Alimentacion</h2>
        <div className="space-y-2">
          <DataRow
            label="¿Realiza deporte o entrenamiento? (detalle completo)"
            value={clinicalHistory.practices_sports}
          />
          <DataRow
            label="¿Quién prepara las comidas?"
            value={translateValue(clinicalHistory.who_prepares_meals)}
          />
          <DataRow
            label="Frecuencia de comer fuera de casa"
            value={translateValue(clinicalHistory.eating_out_frequency)}
          />
          <DataRow
            label="¿Cuántas comidas normalmente realiza al día?"
            value={translateValue(clinicalHistory.meals_per_day)}
          />
          <DataRow
            label="Alimentos o platos favoritos"
            value={clinicalHistory.favorite_foods}
          />
          <DataRow
            label="Alimentos que no consume o no le agradan"
            value={clinicalHistory.aliments_hate}
          />
          <DataRow
            label="¿Es alérgico e intolerante a algún alimento?"
            value={clinicalHistory.food_allergies_intolerances}
          />
          <DataRow
            label="Consumo diario de líquidos"
            value={translateValue(clinicalHistory.daily_liquid_intake)}
          />
          <DataRow
            label="Suplementos"
            value={clinicalHistory.supplements}
          />
          <DataRow
            label="Recuento de Actividad Física"
            value={clinicalHistory.physical_activity_record}
          />
          <DataRow
            label="Hábitos Especiales"
            value={clinicalHistory.special_habits}
          />
          <DataRow
            label="Registro alimentario 24 horas"
            value={clinicalHistory.registro_24h_completo}
          />
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex gap-4 justify-center items-center mt-8">
        <Link href={`/admin/pacientes/${patientId}/historia-clinica`}>
          <Button 
            variant="outline"
            className="border-2 border-m-green text-m-green hover:bg-m-green hover:text-white px-8 py-6 rounded-full cursor-pointer transition-all"
          >
            Volver
          </Button>
        </Link>
        <Link href={`/admin/pacientes/${patientId}/historia-clinica/editar`}>
          <Button className="bg-m-green text-white px-8 py-6 rounded-full hover:bg-m-green-dark cursor-pointer transition-all">
            Editar historia clínica
          </Button>
        </Link>
      </div>
    </div>
  );
}

