'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { UseFormReturn } from "react-hook-form"
import { CompleteRegistrationFormType } from "@/types/auth/register"
import { register } from "@/app/auth/actions/actions"

interface NutritionFormProps {
  form: UseFormReturn<CompleteRegistrationFormType>;
  onNext: () => void;
  onPrev: () => void;
  isLastStep: boolean;
}

export const NutritionForm = ({ form, onPrev }: NutritionFormProps) => {

  const onSubmit = (data: CompleteRegistrationFormType) => {
    register(data)
    console.log(data)
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4">
        <FormField
          control={form.control}
          name="mealsPreparedBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">¿Quién prepara tus comidas?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-m-green-light/20 py-6 rounded-full pl-6">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="yo">Yo mismo/a</SelectItem>
                  <SelectItem value="familia">Mi familia</SelectItem>
                  <SelectItem value="restaurantes">Restaurantes</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="eatOutFrequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">¿Con qué frecuencia comes fuera de casa?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-m-green-light/20 py-6 rounded-full pl-6">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="nunca">Nunca</SelectItem>
                  <SelectItem value="1-2">1-2 veces por semana</SelectItem>
                  <SelectItem value="3-4">3-4 veces por semana</SelectItem>
                  <SelectItem value="diario">Diariamente</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="favoriteFoods"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="text-m-green">Alimentos o platos favoritos</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ej: pollo, verduras, pasta..."
                  className="bg-m-green-light/20 py-6 rounded-full pl-6"
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dailyLiquids"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">Cantidad de líquidos que consumes al día</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-m-green-light/20 py-6 rounded-full pl-6">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="menos-1">Menos de 1 litro</SelectItem>
                  <SelectItem value="1-2">1-2 litros</SelectItem>
                  <SelectItem value="2-3">2-3 litros</SelectItem>
                  <SelectItem value="mas-3">Más de 3 litros</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="supplements"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">Suplementos que consumes (opcional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ej: vitaminas, proteínas..."
                  className="bg-m-green-light/20 py-6 rounded-full pl-6"
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
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
            type="submit"
            className="flex-1 py-4 sm:py-6 rounded-full bg-m-green hover:bg-m-green-dark cursor-pointer text-base font-medium"
          >
            Completar registro
          </Button>
        </div>
      </form>
    </Form>
  )
}
