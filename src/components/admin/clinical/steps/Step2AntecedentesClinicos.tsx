'use client'

import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { ClinicalHistoryFormType } from "@/types/clinical/history";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Step2Props {
  form: UseFormReturn<ClinicalHistoryFormType>;
}

// Tipos y constantes para síntomas digestivos
const DIGESTIVE_SYMPTOMS = [
  { id: 'hinchazon_abdominal', label: 'Hinchazón abdominal' },
  { id: 'estrenimiento', label: 'Estreñimiento' },
  { id: 'acidez_reflujo', label: 'Acidez o reflujo' },
  { id: 'gases_flatulencia', label: 'Gases o flatulencia' },
  { id: 'saciedad_precoz', label: 'Sensación de saciedad precoz' },
  { id: 'ansiedad_comida', label: 'Ansiedad por la comida' },
] as const;

const FREQUENCY_OPTIONS = [
  { value: 'nunca', label: 'Nunca' },
  { value: 'ocasional', label: 'Ocasional' },
  { value: 'frecuente', label: 'Frecuente' },
] as const;

export function Step2AntecedentesClinicos({ form }: Step2Props) {
  const selectedSex = form.watch('sex');
  const hasRecentExams = form.watch('recent_exams');
  const hasBeenOperated = form.watch('has_been_operated');
  
  // Estado local para manejar si consume medicamentos
  const [takesMedication, setTakesMedication] = useState<string>(() => {
    const currentValue = form.getValues('current_medication');
    return currentValue ? 'si' : 'no';
  });
  
  // Estado para síntomas digestivos
  type DigestiveSymptomsState = Record<string, string>;
  const [digestiveSymptoms, setDigestiveSymptoms] = useState<DigestiveSymptomsState>({});
  const [isLoadedFromDB, setIsLoadedFromDB] = useState(false);
  
  // Observar el campo abdominal_pain para cargar datos desde la BD
  const abdominalPainValue = form.watch('abdominal_pain');
  
  // Cargar datos desde la BD cuando el formulario se llena (solo una vez)
  useEffect(() => {
    if (!isLoadedFromDB && abdominalPainValue) {
      try {
        const parsed = JSON.parse(abdominalPainValue);
        if (typeof parsed === 'object' && parsed !== null) {
          setDigestiveSymptoms(parsed);
          setIsLoadedFromDB(true);
        }
      } catch {
        // Si no es JSON válido, ignorar
      }
    }
  }, [abdominalPainValue, isLoadedFromDB]);
  
  // Actualizar el campo cuando cambian los síntomas digestivos
  useEffect(() => {
    if (isLoadedFromDB || Object.keys(digestiveSymptoms).length > 0) {
      const hasSymptoms = Object.keys(digestiveSymptoms).length > 0;
      form.setValue('abdominal_pain', hasSymptoms ? JSON.stringify(digestiveSymptoms) : null);
    }
  }, [digestiveSymptoms, form, isLoadedFromDB]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl lg:text-2xl font-medium mb-6 text-m-green">Antecedentes Clínicos del Paciente</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. ANTECEDENTES PATOLÓGICOS */}
        <FormField
          control={form.control}
          name="pathological_antecedents"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="text-m-green">Antecedentes patológicos</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ""}
                  placeholder="Detalle si es que tiene"
                  className="bg-m-green-light/20 rounded-full w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 2. FECHA DE MENSTRUACIÓN - Solo para mujeres */}
        {selectedSex === 'femenino' && (
          <FormField
            control={form.control}
            name="last_menstruation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-m-green">Última menstruación (opcional)</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className="w-full bg-m-green-light/20 rounded-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(new Date(field.value), "PPP", { locale: es }) : "Selecciona una fecha"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={field.onChange}
                      locale={es}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* 3. USO DE ANTICONCEPTIVOS - Solo para mujeres */}
        {selectedSex === 'femenino' && (
          <FormField
            control={form.control}
            name="uses_contraceptives"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-m-green">¿Usa anticonceptivos?</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || undefined}>
                  <FormControl>
                    <SelectTrigger className="bg-m-green-light/20 rounded-full w-full">
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="si">Sí</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* 4. ANTECEDENTES DE ENFERMEDADES CRÓNICAS */}
        <FormField
          control={form.control}
          name="hypertension_diabetes_antecedents"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="text-m-green">Antecedentes de enfermedades crónicas</FormLabel>
              <FormDescription>
                Detalle si tiene antecedentes de hipertensión, diabetes, cáncer, osteoporosis, enfermedad renal u otras enfermedades crónicas.
              </FormDescription>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ""}
                  placeholder="Describe los antecedentes..."
                  className="bg-m-green-light/20 rounded-2xl min-h-[80px] resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 5. SÍNTOMAS DIGESTIVOS */}
        <FormField
          control={form.control}
          name="abdominal_pain"
          render={() => (
            <FormItem className="md:col-span-2">
              <FormLabel className="text-m-green">Síntomas digestivos que pueda tener</FormLabel>
              <FormDescription>
                Seleccione los síntomas que presenta e indique la frecuencia de cada uno.
              </FormDescription>
              <div className="space-y-4 mt-4">
                {DIGESTIVE_SYMPTOMS.map((symptom) => {
                  const isChecked = symptom.id in digestiveSymptoms;
                  
                  return (
                    <div key={symptom.id} className="space-y-2">
                      {/* Checkbox del síntoma */}
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={symptom.id}
                          checked={isChecked}
                          onCheckedChange={(checked: boolean) => {
                            if (checked) {
                              setDigestiveSymptoms(prev => ({
                                ...prev,
                                [symptom.id]: 'nunca'
                              }));
                            } else {
                              setDigestiveSymptoms(prev => {
                                const newSymptoms = { ...prev };
                                delete newSymptoms[symptom.id];
                                return newSymptoms;
                              });
                            }
                          }}
                          className="border-m-green data-[state=checked]:bg-m-green"
                        />
                        <Label 
                          htmlFor={symptom.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {symptom.label}
                        </Label>
                      </div>
                      
                      {/* Select de frecuencia - Solo si está marcado */}
                      {isChecked && (
                        <div className="ml-6">
                          <Select
                            value={digestiveSymptoms[symptom.id]}
                            onValueChange={(value) => {
                              setDigestiveSymptoms(prev => ({
                                ...prev,
                                [symptom.id]: value
                              }));
                            }}
                          >
                            <SelectTrigger className="bg-m-green-light/20 rounded-full w-full md:w-64">
                              <SelectValue placeholder="Selecciona frecuencia" />
                            </SelectTrigger>
                            <SelectContent>
                              {FREQUENCY_OPTIONS.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 6. EXÁMENES RECIENTES */}
        <FormField
          control={form.control}
          name="recent_exams"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="text-m-green">¿Te hiciste análisis en los últimos 3 o 6 meses?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || undefined}>
                <FormControl>
                  <SelectTrigger className="bg-m-green-light/20 rounded-full w-full">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="si">Sí</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 7. CIRUGÍAS */}
        <FormField
          control={form.control}
          name="has_been_operated"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="text-m-green">¿Ha sido operado/a?</FormLabel>
              <Select 
                onValueChange={(value) => {
                  field.onChange(value);
                  if (value === 'no') {
                    form.setValue('surgery_details', null);
                  }
                }} 
                value={field.value || undefined}
              >
                <FormControl>
                  <SelectTrigger className="bg-m-green-light/20 rounded-full">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="si">Sí</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 8. DETALLE DE CIRUGÍAS - Solo si ha sido operado */}
        {hasBeenOperated === 'si' && (
          <FormField
            control={form.control}
            name="surgery_details"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="text-m-green">Detalle de cirugías</FormLabel>
                <FormDescription>
                  Detalle las cirugías que ha tenido y cuándo se realizaron
                </FormDescription>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value || ""}
                    placeholder="Ej: Apendicectomía en 2020, Cesárea en 2018..."
                    className="bg-m-green-light/20 rounded-3xl min-h-[100px] resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* 9. ALERGIAS A MEDICAMENTOS */}
        <FormField
          control={form.control}
          name="allergies"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="text-m-green">¿Tienes alergia a algún medicamento o compuesto?</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ""}
                  placeholder="Describe tus alergias a medicamentos..."
                  className="bg-m-green-light/20 rounded-3xl min-h-[100px] resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 10. DETALLE DE EXÁMENES - Solo si tiene exámenes */}
        {hasRecentExams === 'si' && (
          <FormField
            control={form.control}
            name="recent_exams_details"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="text-m-green">Detalle de indicadores bioquímicos en los últimos 3 o 6 meses</FormLabel>
                <FormDescription>
                  Indique qué indicadores bioquímicos tener en cuenta
                </FormDescription>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value || ""}
                    placeholder="Ej: Glucosa, colesterol, triglicéridos, hemoglobina..."
                    className="bg-m-green-light/20 rounded-2xl min-h-[100px] resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* 11. TOMA MEDICACIÓN */}
        <div className="md:col-span-2 space-y-4">
          <div>
            <FormLabel className="text-m-green">¿Consumes medicamentos?</FormLabel>
            <Select 
              value={takesMedication} 
              onValueChange={(value) => {
                setTakesMedication(value);
                if (value === 'no') {
                  form.setValue('current_medication', null);
                }
              }}
            >
              <SelectTrigger className="bg-m-green-light/20 rounded-full w-full mt-2">
                <SelectValue placeholder="Selecciona una opción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="si">Sí</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {takesMedication === 'si' && (
            <FormField
              control={form.control}
              name="current_medication"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-m-green">Detalle de medicamentos</FormLabel>
                  <FormDescription>
                    Indique qué medicamentos consume y para qué
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value || ""}
                      placeholder="Ej: Metformina 850mg para diabetes, Losartán 50mg para presión..."
                      className="bg-m-green-light/20 rounded-2xl min-h-[100px] resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

      </div>
    </div>
  );
}

