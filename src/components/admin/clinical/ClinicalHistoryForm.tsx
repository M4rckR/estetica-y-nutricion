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

// Importar los pasos del formulario
import { Step1HistoriaClinica } from "./steps/Step1HistoriaClinica";
import { Step2CirugiasAlergias } from "./steps/Step2CirugiasAlergias";
import { Step3Alimentacion } from "./steps/Step3Alimentacion";

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
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ClinicalHistoryFormType>({
    resolver: zodResolver(clinicalHistoryFormSchema),
    defaultValues: existingData || {
      phone: undefined,
      age: undefined,
      first_appointment_date: undefined,
      practices_sports: undefined,
      pathological_antecedents: undefined,
      consumes_alcohol_tobacco: undefined,
      last_menstruation: undefined,
      uses_contraceptives: undefined,
      current_medication: undefined,
      hypertension_diabetes_antecedents: undefined,
      has_been_operated: undefined,
      surgery_details: undefined,
      allergies: undefined,
      disliked_foods: undefined,
      who_prepares_meals: undefined,
      eating_out_frequency: undefined,
      favorite_foods: undefined,
      daily_liquid_intake: undefined,
      supplements: undefined,
      completed: false,
    },
  });

  const totalSteps = 3;

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

  const onSubmit = async (data: ClinicalHistoryFormType) => {
    console.log("🚀 Iniciando submit con datos:", data);
    setIsSubmitting(true);
    
    try {
      const result = await saveClinicalHistory({
        ...data,
        patient_id: patientId,
        completed: true,
      });

      console.log("📥 Resultado del action:", result);

      if (result.error) {
        console.error("❌ Error del servidor:", result.error);
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
      console.error("💥 Error inesperado:", error);
      toast.error("Error inesperado", {
        description: "Ocurrió un error al guardar los datos.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Log de errores de validación
  const onError = (errors: FieldErrors<ClinicalHistoryFormType>) => {
    console.error("❌ Errores de validación completos:", JSON.stringify(errors, null, 2));
    console.error("❌ Campos con error:", Object.keys(errors));
    (Object.keys(errors) as Array<keyof ClinicalHistoryFormType>).forEach(key => {
      console.error(`  - ${key}:`, errors[key]);
    });
    toast.error("Error de validación", {
      description: "Por favor revisa los campos marcados en rojo.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 mt-10 lg:mt-0">
      {/* Header con título y progreso */}
      <div className="mb-8">
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
          onSubmit={form.handleSubmit(onSubmit, onError)} 
          onKeyDown={(e) => {
            // Prevenir submit al presionar Enter, excepto en el último paso
            if (e.key === 'Enter' && currentStep < totalSteps) {
              e.preventDefault();
            }
          }}
          className="space-y-6"
        >
          {currentStep === 1 && <Step1HistoriaClinica form={form} />}
          {currentStep === 2 && <Step2CirugiasAlergias form={form} />}
          {currentStep === 3 && <Step3Alimentacion form={form} />}

          {/* Botones de navegación */}
          <div className="flex justify-between gap-4 pt-6">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={onPrev}
                disabled={isSubmitting}
                className="px-8 py-6 rounded-full"
              >
                Anterior
              </Button>
            )}

            {currentStep < totalSteps ? (
              <Button
                type="button"
                onClick={onNext}
                className="ml-auto bg-m-green text-white px-8 py-6 rounded-full hover:bg-m-green-dark"
              >
                Siguiente
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
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

