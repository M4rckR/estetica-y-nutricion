'use client'

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

interface Step4Props {
  form: UseFormReturn<ClinicalHistoryFormType>;
}

export function Step4ObjetivosYPlan({ form }: Step4Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl lg:text-2xl font-medium mb-6 text-m-green">
        Objetivos, Tipo de Plan y Seguimiento del Paciente
      </h2>

      <div className="grid grid-cols-1 gap-6">
        {/* SECCIÓN: OBJETIVOS NUTRICIONALES */}
        <div className="space-y-4">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-m-green">Objetivos Nutricionales</h3>
            <p className="text-sm text-gray-600 mt-1">
              Detalle las metas nutricionales del paciente según el plazo de tiempo
            </p>
          </div>

          {/* 1. OBJETIVOS DE CORTO PLAZO (1-3 meses) */}
          <FormField
            control={form.control}
            name="short_term_objectives"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-m-green">Objetivos de Corto Plazo (1-3 meses)</FormLabel>
                <FormDescription>
                  Metas inmediatas y alcanzables en el primer trimestre
                </FormDescription>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value || ""}
                    placeholder="Ejemplo:&#10;- Reducir 5kg de peso&#10;- Mejorar hábitos alimenticios&#10;- Aumentar consumo de agua a 2L diarios&#10;- Reducir consumo de azúcares procesados"
                    className="bg-m-green-light/20 rounded-2xl min-h-[120px] resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 2. OBJETIVOS DE MEDIANO PLAZO (3-6 meses) */}
          <FormField
            control={form.control}
            name="medium_term_objectives"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-m-green">Objetivos de Mediano Plazo (3-6 meses)</FormLabel>
                <FormDescription>
                  Metas a alcanzar en el segundo trimestre
                </FormDescription>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value || ""}
                    placeholder="Ejemplo:&#10;- Alcanzar peso objetivo de 70kg&#10;- Establecer rutina de ejercicio regular&#10;- Consolidar hábitos alimenticios saludables&#10;- Mejorar marcadores bioquímicos (colesterol, glucosa)"
                    className="bg-m-green-light/20 rounded-2xl min-h-[120px] resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 3. OBJETIVOS DE LARGO PLAZO (6-12 meses) */}
          <FormField
            control={form.control}
            name="long_term_objectives"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-m-green">Objetivos de Largo Plazo (6-12 meses)</FormLabel>
                <FormDescription>
                  Metas de mantenimiento y consolidación a largo plazo
                </FormDescription>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value || ""}
                    placeholder="Ejemplo:&#10;- Mantener peso saludable&#10;- Consolidar estilo de vida saludable&#10;- Mejorar composición corporal&#10;- Prevenir enfermedades crónicas"
                    className="bg-m-green-light/20 rounded-2xl min-h-[120px] resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* SEPARADOR */}
        <div className="border-t border-gray-200 my-6"></div>

        {/* SECCIÓN: TIPO DE PLAN */}
        <div className="space-y-4">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-m-green">Tipo de Plan Nutricional</h3>
            <p className="text-sm text-gray-600 mt-1">
              Seleccione el enfoque principal del plan nutricional
            </p>
          </div>

          {/* 4. TIPO DE PLAN */}
          <FormField
            control={form.control}
            name="plan_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-m-green">Tipo de Plan que le corresponde</FormLabel>
                <FormDescription>
                  Seleccione el tipo de plan nutricional más adecuado para el paciente
                </FormDescription>
                <Select onValueChange={field.onChange} value={field.value || undefined}>
                  <FormControl>
                    <SelectTrigger className="bg-m-green-light/20 rounded-full h-12">
                      <SelectValue placeholder="Selecciona el tipo de plan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="estetica">Estética</SelectItem>
                    <SelectItem value="clinico">Clínico</SelectItem>
                    <SelectItem value="deportivo">Deportivo</SelectItem>
                    <SelectItem value="pediatrico">Pediátrico</SelectItem>
                    <SelectItem value="salud">Salud</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 5. DETALLE DEL TIPO DE PLAN */}
          <FormField
            control={form.control}
            name="plan_type_details"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-m-green">Detalle del Tipo de Plan</FormLabel>
                <FormDescription>
                  Proporcione información adicional sobre el tipo de plan seleccionado, consideraciones especiales, o detalles si seleccionó &quot;Otro&quot;
                </FormDescription>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value || ""}
                    placeholder="Ej: Plan enfocado en reducción de grasa corporal con enfoque estético. Incluye control de porciones y macronutrientes. Considerar restricciones alimentarias por intolerancia a la lactosa..."
                    className="bg-m-green-light/20 rounded-2xl min-h-[120px] resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* SEPARADOR */}
        <div className="border-t border-gray-200 my-6"></div>

        {/* SECCIÓN: RECORDATORIO DE 24 HORAS */}
        <div className="space-y-4">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-m-green">Recordatorio de 24 Horas</h3>
            <p className="text-sm text-gray-600 mt-1">
              Detalle del consumo y actividad del día anterior
            </p>
          </div>

          {/* RECORDATORIO DE 24 HORAS DETALLADO */}
          <FormField
            control={form.control}
            name="registro_24h_completo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-m-green">Recordatorio de 24 horas detallado</FormLabel>
                <FormDescription>
                  Detalle del consumo y actividad del día anterior. Incluya horarios precisos, alimentos, preparaciones, bebidas, porciones y cantidades. Especifique además la ingesta de agua, el consumo entre comidas y la actividad física realizada.
                </FormDescription>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value || ""}
                    placeholder="Incluye alimentos, bebidas, ejercicio, etc..."
                    className="bg-m-green-light/20 resize-none rounded-2xl min-h-[150px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Nota informativa */}
      <div className="mt-6 p-4 bg-m-green-light/10 rounded-lg border border-m-green/20">
        <p className="text-sm text-gray-700">
          <strong className="text-m-green">Nota:</strong> Esta información será utilizada para diseñar el plan nutricional personalizado del paciente. Asegúrese de que los objetivos sean específicos, medibles, alcanzables, relevantes y con un tiempo definido (SMART).
        </p>
      </div>
    </div>
  );
}
