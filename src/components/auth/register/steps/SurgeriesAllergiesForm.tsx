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

interface SurgeriesAllergiesFormProps {
  form: UseFormReturn<CompleteRegistrationFormType>;
  onNext: () => void;
  onPrev: () => void;
  isLastStep: boolean;
}

export const SurgeriesAllergiesForm = ({ form, onNext, onPrev, isLastStep }: SurgeriesAllergiesFormProps) => {
  return (
    <Form {...form}>
      <div className="space-y-6 px-4">
        <FormField
          control={form.control}
          name="operated"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">¿Ha sido operado/a?</FormLabel>
              <Select onValueChange={(value) => field.onChange(value === "true")} defaultValue={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger className="bg-m-green-light/20 py-6 rounded-full pl-6">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="true">Sí</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("operated") && (
          <FormField
            control={form.control}
            name="operatedDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-m-green">Describe el tipo de operación</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Describe las operaciones que has tenido..."
                    className="bg-m-green-light/20 py-6 rounded-full pl-6"
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="allergies"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">Alergias (opcional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Describe tus alergias..."
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
          name="alimentsHate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">Alimentos que no te gustan (opcional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Lista los alimentos que no te gustan..."
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
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
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