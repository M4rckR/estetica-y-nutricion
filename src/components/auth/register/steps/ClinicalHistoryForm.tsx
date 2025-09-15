'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { CompleteRegistrationFormType } from "@/types/auth/register"

interface ClinicalHistoryFormProps {
  form: UseFormReturn<CompleteRegistrationFormType>;
  onNext: () => void;
  onPrev: () => void;
  isLastStep: boolean;
}

export const ClinicalHistoryForm = ({ form, onNext, onPrev, isLastStep }: ClinicalHistoryFormProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  return (
    <Form {...form}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4">
        <FormField
          control={form.control}
          name="practicesSports"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">¿Practica deportes?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-m-green-light/20 py-6 rounded-full pl-6">
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

        <FormField
          control={form.control}
          name="patAntecedents"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">Antecedentes patológicos</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-m-green-light/20 py-6 rounded-full pl-6">
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

        <FormField
          control={form.control}
          name="consume"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">¿Consume alcohol o tabaco?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-m-green-light/20 py-6 rounded-full pl-6">
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

        <FormField
          control={form.control}
          name="lastMenstruation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">Última menstruación (opcional)</FormLabel>
              <FormControl>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-m-green-light/20 py-6 rounded-full pl-6"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP", { locale: es })
                      ) : (
                        <span>Selecciona una fecha</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date)
                        setIsCalendarOpen(false)
                      }}
                      formatters={{
                        formatMonthDropdown: (date) =>
                          date.toLocaleString("es-ES", { month: "short" }),
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="useAnticonceptive"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">¿Usa anticonceptivos?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-m-green-light/20 py-6 rounded-full pl-6">
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

        <FormField
          control={form.control}
          name="actualMedication"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">¿Toma medicación actualmente?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-m-green-light/20 py-6 rounded-full pl-6">
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

        <FormField
          control={form.control}
          name="hiperDiaAntecedents"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">Antecedentes de hipertensión o diabetes</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-m-green-light/20 py-6 rounded-full pl-6">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="si">Sí</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="familiares">En familiares</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botones responsive */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 col-span-1 sm:col-span-2 px-4">
          <Button
            type="button"
            variant="outline"
            onClick={onPrev}
            className="flex-1 py-4 sm:py-6 rounded-full text-base font-medium"
          >
            Anterior
          </Button>
          <Button
            type="button"
            onClick={onNext}
            className="flex-1 py-4 sm:py-6 rounded-full bg-m-green hover:bg-m-green-dark cursor-pointer text-base font-medium"
          >
            {isLastStep ? "Completar registro" : "Siguiente"}
          </Button>
        </div>
      </div>
    </Form>
  )
}