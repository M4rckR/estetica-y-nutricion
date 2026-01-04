'use client'

import { useState } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { clinicalHistoryFormSchema } from "@/schema/clinical/history";
import { ClinicalHistoryFormType } from "@/types/clinical/history";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { saveClinicalHistory } from "@/app/admin/actions/clinical";
import { X } from "lucide-react";
import Link from "next/link";

// Importar los pasos del formulario
import { Step1HistoriaClinica } from "./steps/Step1HistoriaClinica";
import { Step2AntecedentesClinicos } from "./steps/Step2AntecedentesClinicos";
import { Step3Alimentacion } from "./steps/Step3Alimentacion";
import { Step4ObjetivosYPlan } from "./steps/Step4ObjetivosYPlan";

interface ClinicalHistoryFormProps {
  patientId: string;
  patientName: string;
  existingData?: ClinicalHistoryFormType;
}

export function ClinicalHistoryForm({
  patientId,
  patientName,
  existingData,
}: ClinicalHistoryFormProps) {
  console.log("🔄 ClinicalHistoryForm cargado");
  
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ClinicalHistoryFormType>({
    resolver: zodResolver(clinicalHistoryFormSchema),
    mode: "onSubmit", // Solo validar en el submit final
    reValidateMode: "onSubmit",
    defaultValues: existingData || {
      phone: undefined,
      age: undefined,
      birth_date: undefined,
      first_appointment_date: undefined,
      sex: undefined,
      ocupation: undefined,
      consult_reason: undefined,
      recent_exams: undefined,
      recent_exams_details: undefined,
      practices_sports: undefined,
      pathological_antecedents: undefined,
      consumes_alcohol_tobacco: undefined,
      last_menstruation: undefined,
      uses_contraceptives: undefined,
      current_medication: undefined,
      hypertension_diabetes_antecedents: undefined,
      stress_anxiety: undefined,
      registro_24h_completo: undefined,
      abdominal_pain: undefined,
      sleep_quality: undefined,
      has_been_operated: undefined,
      surgery_details: undefined,
      allergies: undefined,
      who_prepares_meals: undefined,
      eating_out_frequency: undefined,
      meals_per_day: undefined,
      favorite_foods: undefined,
      aliments_hate: undefined,
      food_allergies_intolerances: undefined,
      daily_liquid_intake: undefined,
      supplements: undefined,
      physical_activity_record: undefined,
      // Hábitos Especiales - Campos separados
      alcohol_consumption: undefined,
      caffeine_stimulants_consumption: undefined,
      is_smoker: undefined,
      smoking_details: undefined,
      irregular_meal_times: undefined,
      irregular_meal_times_details: undefined,
      other_habits: undefined,
      special_habits: undefined, // Mantener por compatibilidad
      short_term_objectives: undefined,
      medium_term_objectives: undefined,
      long_term_objectives: undefined,
      plan_type: undefined,
      plan_modality: undefined,
      plan_type_details: undefined,
      completed: false,
    },
  });

  const totalSteps = 4;

  const onNext = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const onPrev = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Función para manejar el submit con pre-procesamiento
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Pre-procesar: Si el sexo es masculino, limpiar campos femeninos ANTES de validar
    const currentSex = form.getValues('sex');
    console.log("=== DEBUGGING SUBMIT ===");
    console.log("Sexo seleccionado:", currentSex);
    console.log("Valores actuales del formulario:", form.getValues());
    
    if (currentSex === 'masculino') {
      console.log("Limpiando campos femeninos...");
      form.setValue('last_menstruation', null, { shouldValidate: false });
      form.setValue('uses_contraceptives', null, { shouldValidate: false });
      console.log("Valores después de limpiar:", form.getValues());
    }
    
    // Ahora sí, ejecutar la validación y submit
    form.handleSubmit(onSubmit, onError)(e);
  };

  const onSubmit = async (data: ClinicalHistoryFormType) => {
    setIsSubmitting(true);

    try {
      // Si el sexo es masculino, establecer campos femeninos como null
      const dataToSave = { ...data };
      if (dataToSave.sex === 'masculino') {
        dataToSave.last_menstruation = null;
        dataToSave.uses_contraceptives = null;
      }
      
      // Convertir cadenas vacías a null
      if (dataToSave.practices_sports === '') {
        dataToSave.practices_sports = null;
      }
      
      console.log("Datos a guardar:", dataToSave);

      const result = await saveClinicalHistory({
        ...dataToSave,
        patient_id: patientId,
        completed: true,
      });

      if (result.error) {
        toast.error("Error al guardar", {
          description: result.error,
        });
      } else {
        toast.success("Historia clínica guardada", {
          description: "Los datos se han guardado correctamente.",
        });
        router.push(`/admin/pacientes/${patientId}/historia-clinica`);
      }
    } catch (error) {
      toast.error("Error inesperado", {
        description: "Ocurrió un error al guardar los datos.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onError = (errors: FieldErrors<ClinicalHistoryFormType>) => {
    console.error("=== ERRORES DE VALIDACIÓN ===");
    console.error("Errores completos:", errors);
    console.error("Campos con error:", Object.keys(errors));
    
    // Mostrar detalles de cada error
    Object.entries(errors).forEach(([field, error]) => {
      console.error(`Campo "${field}":`, error);
    });
    
    // Contar errores
    const errorCount = Object.keys(errors).length;
    const errorFields = Object.keys(errors).join(", ");
    
    toast.error("Error de validación", {
      description: `Se encontraron ${errorCount} error(es) en: ${errorFields}`,
      duration: 10000, // 10 segundos para que puedas leerlo
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 mt-10 lg:mt-0">
      {/* Header con título y progreso */}
      <div className="mb-8 relative">
        {/* Botón X arriba a la derecha */}
        <div className="absolute top-0 right-0">
          <Link href={`/admin/pacientes/${patientId}/historia-clinica`}>
            <Button
              type="button"
              className="bg-m-green hover:bg-m-green-dark text-white rounded-full w-10 h-10 p-0 flex items-center justify-center cursor-pointer"
              aria-label="Cancelar"
            >
              <X className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-medium mb-2">
          Historia <span className="text-m-green">Clínica</span>
        </h1>
        <p className="text-gray-600 mb-4">
          Paciente: <span className="font-medium">{patientName}</span>
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            Paso {currentStep} de {totalSteps}
          </span>
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-m-green transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Formulario con pasos */}
      <Form {...form}>
        <form
          onSubmit={handleFormSubmit}
          onKeyDown={(e) => {
            // Prevenir submit al presionar Enter, excepto en el último paso
            if (e.key === 'Enter' && currentStep < totalSteps) {
              e.preventDefault();
            }
          }}
          className="space-y-6"
        >
          {currentStep === 1 && <Step1HistoriaClinica form={form} />}
          {currentStep === 2 && <Step2AntecedentesClinicos form={form} />}
          {currentStep === 3 && <Step3Alimentacion form={form} />}
          {currentStep === 4 && <Step4ObjetivosYPlan form={form} />}

          {/* Botones de navegación */}
          <div className="flex justify-between gap-4 pt-6">
            {/* Botón Anterior - Solo visible desde el paso 2 */}
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={onPrev}
                disabled={isSubmitting}
                className="px-8 py-6 rounded-full cursor-pointer"
              >
                Anterior
              </Button>
            )}

            {currentStep < totalSteps ? (
              <Button
                type="button"
                onClick={onNext}
                className="ml-auto bg-m-green text-white px-8 py-6 rounded-full hover:bg-m-green-dark cursor-pointer"
              >
                Siguiente
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                onClick={() => console.log("🔘 Botón Completar registro clickeado")}
                className="ml-auto bg-m-green text-white px-8 py-6 rounded-full hover:bg-m-green-dark flex items-center gap-2"
              >
                {isSubmitting && <Spinner size="sm" className="border-white border-t-transparent" />}
                {isSubmitting ? "Guardando..." : "Completar registro"}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}

