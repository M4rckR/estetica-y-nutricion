'use client'

import { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Step1Props {
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

export function Step1HistoriaClinica({ form }: Step1Props) {
  const selectedSex = form.watch('sex');
  const hasRecentExams = form.watch('recent_exams');
  
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
  
  // NO limpiar campos de menstruación y anticonceptivos al cambiar sexo
  // Los campos se ocultan visualmente, pero mantienen sus valores
  // Si el usuario cambia accidentalmente el sexo y vuelve, no pierde los datos
  // Al guardar, si el sexo es masculino, el backend puede ignorar estos campos
  
  // Actualizar el campo cuando cambian los síntomas digestivos (solo si ya cargó de BD)
  useEffect(() => {
    if (isLoadedFromDB || Object.keys(digestiveSymptoms).length > 0) {
      const hasSymptoms = Object.keys(digestiveSymptoms).length > 0;
      form.setValue('abdominal_pain', hasSymptoms ? JSON.stringify(digestiveSymptoms) : null);
    }
  }, [digestiveSymptoms, form, isLoadedFromDB]);
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mb-6 text-m-green">Historia Clínica</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Motivo de consulta */}
        <FormField
          control={form.control}
          name="consult_reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">Motivo de consulta</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || undefined}>
                <FormControl>
                  <SelectTrigger className="bg-m-green-light/20 rounded-full w-full">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="reducir_grasa">Reducir grasa corporal</SelectItem>
                  <SelectItem value="aumentar_masa">Aumentar masa muscular</SelectItem>
                  <SelectItem value="rendimiento_deportivo">Rendimiento deportivo</SelectItem>
                  <SelectItem value="salud">Salud / tratamiento médico</SelectItem>
                  <SelectItem value="mejorar_alimentacion">Mejorar solo alimentación</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 2. Sexo */}
        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">Sexo</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || undefined}>
                <FormControl>
                  <SelectTrigger className="bg-m-green-light/20 rounded-full w-full">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="femenino">Femenino</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 3. Edad */}
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">Edad</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                  placeholder="Ej: 25"
                  min="0"
                  max="120"
                  className="bg-m-green-light/20 rounded-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 4. Fecha de Nacimiento */}
        <FormField
          control={form.control}
          name="birth_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">Fecha de Nacimiento</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className="w-full bg-m-green-light/20 rounded-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? format(field.value, "PPP", { locale: es }) : "Selecciona una fecha"}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value || undefined}
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

        {/* 5. Fecha de primera cita */}
        <FormField
          control={form.control}
          name="first_appointment_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">Fecha de primera cita</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className="w-full bg-m-green-light/20 rounded-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? format(field.value, "PPP", { locale: es }) : "Selecciona una fecha"}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value || undefined}
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

        {/* 6. Ocupación */}
        <FormField
          control={form.control}
          name="ocupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">Ocupación</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ""}
                  placeholder="Ingeniero, jardinero, etc..."
                  className="bg-m-green-light/20 rounded-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 7. Teléfono */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">Teléfono</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ""}
                  placeholder="Ej: 987654321"
                  className="bg-m-green-light/20 rounded-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ¿Consume alcohol o tabaco? */}
        <FormField
          control={form.control}
          name="consumes_alcohol_tobacco"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">¿Consume alcohol o tabaco?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || undefined}>
                <FormControl>
                  <SelectTrigger className="bg-m-green-light/20 rounded-full w-full">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="alcohol">Alcohol</SelectItem>
                  <SelectItem value="tabaco">Tabaco</SelectItem>
                  <SelectItem value="ambos">Ambos</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Calidad de sueño text area que detalla Horas promedio de sueño
Calidad del sueño (1–5)
Nivel de estrés (1–5)
Factores que alteran el descanso en el form description */}
        <FormField
          control={form.control}
          name="sleep_quality"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="text-m-green">Calidad de sueño</FormLabel>
              <FormDescription>
                Detalle las horas promedio de sueño, la calidad del sueño (1–5) y el nivel de estrés (1–5) y factores que alteran el descanso.
              </FormDescription>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ""}
                  placeholder="Ej. 7 horas promedio de sueño, calidad del sueño, nivel de estrés y factores que alteran el descanso."
                  className="bg-m-green-light/20  rounded-2xl"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        {/* Registro 24h completo text area  */}
        <FormField
          control={form.control}
          name="registro_24h_completo"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="text-m-green">Recordatorio de 24 horas detallado</FormLabel>
              <FormDescription>
                Detalle del consumo y actividad del día anterior. Incluya horarios precisos, alimentos, preparaciones, bebidas, porciones y cantidades. Especifique además la ingesta de agua, el consumo entre comidas y la actividad física realizada.
              </FormDescription>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ""}
                  placeholder="Incluye alimentos, bebidas, ejercicio, etc..."
                  className="bg-m-green-light/20 resize-none rounded-2xl"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* SECCIÓN: ANTECEDENTES CLÍNICOS DEL PACIENTE */}
      <div className="mt-8">
        <h3 className="text-xl font-medium mb-6 text-m-green">Antecedentes Clínicos del Paciente</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Antecedentes patológicos */}
          <FormField
            control={form.control}
            name="pathological_antecedents"
            render={({ field }) => (
              <FormItem>
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

          {/* ¿Consumes medicamentos? */}
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

          {/* Antecedentes de enfermedades crónicas */}
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

          {/* Síntomas digestivos */}
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
                                // Agregar síntoma con valor por defecto
                                setDigestiveSymptoms(prev => ({
                                  ...prev,
                                  [symptom.id]: 'nunca'
                                }));
                              } else {
                                // Remover síntoma
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
                            className="text-sm font-normal cursor-pointer"
                          >
                            {symptom.label}
                          </Label>
                        </div>
                        
                        {/* Radio buttons de frecuencia (solo si está checked) */}
                        {isChecked && (
                          <div className="ml-7 flex gap-4 p-3 bg-m-green-light/10 rounded-lg">
                            {FREQUENCY_OPTIONS.map((option) => (
                              <label
                                key={option.value}
                                className="flex items-center gap-2 cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  name={symptom.id}
                                  value={option.value}
                                  checked={digestiveSymptoms[symptom.id] === option.value}
                                  onChange={(e) => {
                                    setDigestiveSymptoms(prev => ({
                                      ...prev,
                                      [symptom.id]: e.target.value
                                    }));
                                  }}
                                  className="w-4 h-4 text-m-green focus:ring-m-green accent-m-green"
                                />
                                <span className="text-sm">{option.label}</span>
                              </label>
                            ))}
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

          {/* ¿Te hiciste análisis en los últimos 3 o 6 meses? */}
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

          {/* Detalles de indicadores bioquímicos - Solo si tiene exámenes */}
          {hasRecentExams === 'si' && (
            <FormField
              control={form.control}
              name="recent_exams_details"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="text-m-green">Detalle de indicadores bioquímicos</FormLabel>
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

          {/* Última menstruación - Solo para mujeres */}
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
                          {field.value ? format(field.value, "PPP", { locale: es }) : "Selecciona una fecha"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value || undefined}
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

          {/* ¿Usa anticonceptivos? - Solo para mujeres */}
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
        </div>
      </div>
    </div>
  );
}


