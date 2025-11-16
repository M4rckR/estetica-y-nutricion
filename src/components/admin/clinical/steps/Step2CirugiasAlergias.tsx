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

interface Step2Props {
  form: UseFormReturn<ClinicalHistoryFormType>;
}

export function Step2CirugiasAlergias({ form }: Step2Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium mb-6">Cirugías y Alergias</h2>

      <div className="space-y-4">
        {/* ¿Ha sido operado/a? */}
        <FormField
          control={form.control}
          name="has_been_operated"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">¿Ha sido operado/a?</FormLabel>
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

        {/* Detalles de cirugías (opcional) */}
        <FormField
          control={form.control}
          name="surgery_details"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">Detalles de cirugías (opcional)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ""}
                  placeholder="Describe qué cirugías has tenido..."
                  className="bg-m-green-light/20 rounded-3xl min-h-[100px] resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Alergias (opcional) */}
        <FormField
          control={form.control}
          name="allergies"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">Alergias (opcional)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ""}
                  placeholder="Describe tus alergias..."
                  className="bg-m-green-light/20 rounded-3xl min-h-[100px] resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Alimentos que no te gustan (opcional) */}
        <FormField
          control={form.control}
          name="disliked_foods"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">Alimentos que no te gustan (opcional)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ""}
                  placeholder="Lista los alimentos que no te gustan..."
                  className="bg-m-green-light/20 rounded-3xl min-h-[100px] resize-none"
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

