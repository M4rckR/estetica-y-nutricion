'use client'

import { UseFormReturn } from "react-hook-form";
import { ClinicalHistoryFormType } from "@/types/clinical/history";
import {
  FormControl,
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

interface Step3Props {
  form: UseFormReturn<ClinicalHistoryFormType>;
}

export function Step3Alimentacion({ form }: Step3Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium mb-6">Alimentación</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ¿Quién prepara tus comidas? */}
        <FormField
          control={form.control}
          name="who_prepares_meals"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">¿Quién prepara tus comidas?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                <FormControl>
                  <SelectTrigger className="bg-m-green-light/20 rounded-full">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="yo">Yo</SelectItem>
                  <SelectItem value="familiar">Familiar</SelectItem>
                  <SelectItem value="empleada">Empleada</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ¿Con qué frecuencia comes fuera de casa? */}
        <FormField
          control={form.control}
          name="eating_out_frequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">¿Con qué frecuencia comes fuera de casa?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                <FormControl>
                  <SelectTrigger className="bg-m-green-light/20 rounded-full">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="nunca">Nunca</SelectItem>
                  <SelectItem value="ocasional">Ocasionalmente</SelectItem>
                  <SelectItem value="semanal">Semanalmente</SelectItem>
                  <SelectItem value="diario">Diariamente</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Cantidad de líquidos que consumes al día */}
        <FormField
          control={form.control}
          name="daily_liquid_intake"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="text-m-green">Cantidad de líquidos que consumes al día</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                <FormControl>
                  <SelectTrigger className="bg-m-green-light/20 rounded-full">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="menos_1L">Menos de 1 litro</SelectItem>
                  <SelectItem value="1-2L">1 - 2 litros</SelectItem>
                  <SelectItem value="2-3L">2 - 3 litros</SelectItem>
                  <SelectItem value="mas_3L">Más de 3 litros</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Alimentos o platos favoritos */}
        <FormField
          control={form.control}
          name="favorite_foods"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="text-m-green">Alimentos o platos favoritos</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ""}
                  placeholder="Ej: pollo, verduras, pasta..."
                  className="bg-m-green-light/20 rounded-3xl min-h-[80px] resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Suplementos que consumes (opcional) */}
        <FormField
          control={form.control}
          name="supplements"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="text-m-green">Suplementos que consumes (opcional)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ""}
                  placeholder="Ej: vitaminas, proteínas..."
                  className="bg-m-green-light/20 rounded-3xl min-h-[80px] resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

