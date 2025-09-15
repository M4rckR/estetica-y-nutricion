import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
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

interface PersonalDataFormProps {
  form: UseFormReturn<CompleteRegistrationFormType>;
  onNext: () => void;
  onPrev: () => void;
  isLastStep: boolean;
}

export const PersonalDataForm = ({ form, onNext, onPrev, isLastStep }: PersonalDataFormProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  return (
    <section className="space-y-8 sm:space-y-12">
      {/* Header responsive */}
      <div className="flex flex-col items-center px-4">
        <h1 className="text-2xl sm:text-3xl font-medium text-m-green-dark text-center mb-4 leading-tight">
          Empecemos un camino de <span className="text-m-green">nutrición saludable</span>
        </h1>
        <p className="text-center text-m-green-dark text-sm sm:text-base max-w-md">
          ¡Súmate a los más de 300 pacientes que ya vivieron su transformación!
        </p>
      </div>

      <Form {...form}>
        {/* Form grid responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 px-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="bg-m-green-light/20 py-6 rounded-full pl-6" placeholder="Nombre" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="bg-m-green-light/20 py-6 rounded-full pl-6" placeholder="Apellido" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstDate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className=" justify-start text-left font-normal text-m-gray-base bg-m-green-light/20 py-6 rounded-full px-80"
                        >
                          <CalendarIcon className="relative left-2 mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP", { locale: es })
                          ) : (
                            <span className="text-m-gray-base">Primera cita (opcional)</span>
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
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      className="bg-m-green-light/20 py-6 rounded-full pl-6"
                      placeholder="Edad"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="bg-m-green-light/20 py-6 rounded-full pl-6" placeholder="Correo" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telephone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="bg-m-green-light/20 py-6 rounded-full pl-6" placeholder="Telefono" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" className="bg-m-green-light/20 py-6 rounded-full pl-6" placeholder="Contraseña" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-m-green-light/20 w-full py-6 rounded-full pl-6">
                        <SelectValue placeholder="Selecciona tu sexo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="hombre">Hombre</SelectItem>
                      <SelectItem value="mujer">Mujer</SelectItem>
                      <SelectItem value="no prefiero decirlo">No prefiero decirlo</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Botones responsive */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 px-4">
            <Button
              type="button"
              variant="outline"
              onClick={onPrev}
              className="flex-1 py-4 sm:py-6 rounded-full text-base font-medium"
              disabled={true} // First step, no previous
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
      </Form>
    </section>
  )
}
