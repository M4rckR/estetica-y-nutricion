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
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Step1Props {
  form: UseFormReturn<ClinicalHistoryFormType>;
}

export function Step1HistoriaClinica({ form }: Step1Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium mb-6">Historia Clínica</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Teléfono */}
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

        {/* Edad */}
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

        {/* Fecha de primera cita */}
        <FormField
          control={form.control}
          name="first_appointment_date"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
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

        {/* ¿Practica deportes? */}
        <FormField
          control={form.control}
          name="practices_sports"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">¿Practica deportes?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                <FormControl>
                  <SelectTrigger className="bg-m-green-light/20 rounded-full">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="si">Sí</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="ocasionalmente">Ocasionalmente</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  placeholder="Describe..."
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
              <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                <FormControl>
                  <SelectTrigger className="bg-m-green-light/20 rounded-full">
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

        {/* Última menstruación */}
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

        {/* ¿Usa anticonceptivos? */}
        <FormField
          control={form.control}
          name="uses_contraceptives"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">¿Usa anticonceptivos?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
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

        {/* ¿Toma medicación actualmente? */}
        <FormField
          control={form.control}
          name="current_medication"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">¿Toma medicación actualmente?</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ""}
                  placeholder="Describe..."
                  className="bg-m-green-light/20 rounded-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Antecedentes de hipertensión o diabetes */}
        <FormField
          control={form.control}
          name="hypertension_diabetes_antecedents"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="text-m-green">Antecedentes de hipertensión o diabetes</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                <FormControl>
                  <SelectTrigger className="bg-m-green-light/20 rounded-full">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ninguno">Ninguno</SelectItem>
                  <SelectItem value="hipertension">Hipertensión</SelectItem>
                  <SelectItem value="diabetes">Diabetes</SelectItem>
                  <SelectItem value="ambos">Ambos</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

