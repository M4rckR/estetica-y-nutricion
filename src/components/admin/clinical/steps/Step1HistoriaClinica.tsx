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
  const selectedSex = form.watch('sex');
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mb-6 text-m-green">Datos Generales del Paciente</h2>

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
                    captionLayout="dropdown"
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
      </div>
    </div>
  );
}

