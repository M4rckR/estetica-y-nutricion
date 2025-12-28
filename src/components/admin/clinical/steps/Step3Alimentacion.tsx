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

interface Step3Props {
  form: UseFormReturn<ClinicalHistoryFormType>;
}

export function Step3Alimentacion({ form }: Step3Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl lg:text-2xl font-medium mb-6">Alimentación y recuento de actividad física y sueño del paciente</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* CAMPO DE DEPORTES - MEJORADO CON DETALLES */}
        <FormField
          control={form.control}
          name="practices_sports"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="text-m-green">¿Realiza deporte o entrenamiento?</FormLabel>
              <FormDescription>
                Si realiza deporte o entrenamiento, indique a detalle: el tipo de deporte que realiza, la hora, qué días de la semana, el tipo de entrenamiento y categorice la intensidad de 1 al 5 (1=muy ligero, 5=muy intenso)
              </FormDescription>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value || "")}
                  placeholder="Ej: Fútbol - Martes y Jueves 7pm - Entrenamiento de resistencia - Intensidad 4/5. Gimnasio - Lunes, Miércoles, Viernes 6am - Pesas y cardio - Intensidad 3/5..."
                  className="bg-m-green-light/20 rounded-3xl min-h-[120px] resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ¿Quién prepara tus comidas? */}
        <FormField
          control={form.control}
          name="who_prepares_meals"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">¿Quién prepara tus comidas?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || undefined}>
                <FormControl>
                  <SelectTrigger className="bg-m-green-light/20 rounded-full">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="tu-mismo">Tú mismo</SelectItem>
                  <SelectItem value="pareja-esposo">Tu pareja o esposo</SelectItem>
                  <SelectItem value="hijo">Tu hij@</SelectItem>
                  <SelectItem value="empleada">Empleada</SelectItem>
                  <SelectItem value="otra">Otra</SelectItem>
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
              <Select onValueChange={field.onChange} value={field.value || undefined}>
                <FormControl>
                  <SelectTrigger className="bg-m-green-light/20 rounded-full">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="nunca">Nunca</SelectItem>
                  <SelectItem value="1-2-veces">1 a 2 veces/semana</SelectItem>
                  <SelectItem value="3-4-veces">3 a 4 veces/semana</SelectItem>
                  <SelectItem value="5-mas-veces">5 a más veces/semana</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ¿Cuántas comidas normalmente realiza al día? */}
        <FormField
          control={form.control}
          name="meals_per_day"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-m-green">¿Cuántas comidas normalmente realiza al día?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || undefined}>
                <FormControl>
                  <SelectTrigger className="bg-m-green-light/20 rounded-full">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="2">2 comidas</SelectItem>
                  <SelectItem value="3">3 comidas</SelectItem>
                  <SelectItem value="4">4 comidas</SelectItem>
                  <SelectItem value="5">5 comidas</SelectItem>
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
              <Select onValueChange={field.onChange} value={field.value || undefined}>
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
              <FormLabel className="text-m-green">Platos o comidas favoritas</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ""}
                  placeholder="Indíca al menos 5 tipos"
                  className="bg-m-green-light/20 rounded-3xl min-h-[80px] resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Alimentos que evitas */}
        <FormField
          control={form.control}
          name="aliments_hate"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="text-m-green">Alimentos o Platos que no consumes o no te agraden</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ""}
                  placeholder="Ej: brocoli, cebolla, leche..."
                  className="bg-m-green-light/20 rounded-3xl min-h-[80px] resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Alergias e intolerancias alimentarias */}
        <FormField
          control={form.control}
          name="food_allergies_intolerances"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="text-m-green">¿Es alérgico e intolerante a algún alimento?</FormLabel>
              <FormDescription>
                Indique si tiene alergias o intolerancias alimentarias y detalle cuáles
              </FormDescription>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ""}
                  placeholder="Ej: Alérgico a mariscos y frutos secos, Intolerante a la lactosa..."
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
              <FormLabel className="text-m-green">Suplementos o Complementos nutricionales que consume </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ""}
                  placeholder="¿Qué tipo de suplementos y cómo lo toma (explicar cómo y a qué hora)?"
                  className="bg-m-green-light/20 rounded-3xl min-h-[80px] resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Recuento de actividad física */}
        <FormField
          control={form.control}
          name="physical_activity_record"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="text-m-green">Recuento de Actividad Física</FormLabel>
              <FormDescription>
                Detalle qué es lo que hace como actividad física un día anterior desde que se levanta hasta que se acuesta (mencione horas y minutos de cada actividad)
              </FormDescription>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ""}
                  placeholder="Ej: 6:00am - Despierto y camino 30min, 8:00am - Trabajo de oficina sentado, 1:00pm - Camino 15min al almuerzo, 7:00pm - Gimnasio 1 hora..."
                  className="bg-m-green-light/20 rounded-3xl min-h-[120px] resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Hábitos especiales */}
        <FormField
          control={form.control}
          name="special_habits"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="text-m-green">Hábitos Especiales</FormLabel>
              <FormDescription>
                Detalle sobre estos hábitos: Consumo de alcohol (cuántas veces la semana y qué tipo), Consumo de cafeína o estimulantes a la semana, Fumador SI/NO (si es sí detallar cuántos cigarros a la semana), Horarios de comidas irregulares SI/NO, Otros hábitos que consideres a mejorar
              </FormDescription>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ""}
                  placeholder="Ej: Consumo de alcohol: 2 veces/semana (cerveza), Cafeína: 3 cafés al día, Fumador: No, Horarios irregulares: Sí (ceno muy tarde), Otros: Picoteo entre comidas..."
                  className="bg-m-green-light/20 rounded-3xl min-h-[120px] resize-none"
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

