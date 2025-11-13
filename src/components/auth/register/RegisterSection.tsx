'use client'

import { registerSchema } from "@/schema"
import { RegisterType } from "@/types/auth/register"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { register } from "@/app/auth/actions/actions"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select"
import { useState } from "react"
import { Spinner } from "@/components/ui/spinner"
export const RegisterSection = () => {

  const [isLoading, setIsLoading] = useState(false) // 👈 Estado de carga
  const [errorMessage, setErrorMessage] = useState<string | null>(null) // 👈 Estado de error

  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nombres: '',
      dni: '',
      correo: '',
      distrito: '',
      contraseña: '',
      followPreview: '',
    }
  })

  const onSubmit = async (data: RegisterType) => {
    try {
      setIsLoading(true)
      setErrorMessage(null) // Limpiar error anterior
      
      const result = await register(data)
      
      // 👇 Si hay error, mostrarlo
      if (result?.error) {
        setErrorMessage(result.error)
        console.error('Error de registro:', result) // Ver detalles en consola del navegador
      }
      // Si no hay error, el redirect se hará automáticamente
    } catch (error) {
      console.error('Error inesperado:', error)
      setErrorMessage('Ocurrió un error inesperado. Por favor, intenta nuevamente.')
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <section className='max-w-5xl mx-auto container px-4 sm:px-6 lg:px-8'>
      <div className="mb-8 sm:mb-12 space-y-4">
        <h1 className="text-center text-2xl md:text-4xl font-medium text-m-green-dark">
          Empecemos un camino de <br /> 
          <span className="text-m-green">
            nutricion saludable</span>
        </h1>
        <p className="text-center">¡Súmate a los más de 300 pacientes que ya vivieron su transformación!</p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm text-center">{errorMessage}</p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4 mb-4">
            <FormField
              control={form.control}
              name="nombres"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="input-register" placeholder="Nombre y Apellido" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dni"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="input-register" maxLength={8} placeholder="DNI" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="correo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="input-register" placeholder="Correo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="distrito"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="input-register" placeholder="Distrito" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contraseña"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" className="input-register" placeholder="Contraseña" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="followPreview"
              render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="input-register w-full">
                        <SelectValue placeholder="¿Cómo llegaste hasta aquí?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="recomendacion">Recomendación de un amigo</SelectItem>
                      <SelectItem value="busqueda">Busqueda Online</SelectItem>
                    </SelectContent>
                  </Select>
              )}
            />
          </section>


          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-5 mt-2 rounded-full bg-m-green-light text-m-green-dark hover:text-white hover:bg-m-green cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading && <Spinner size="sm" className="border-m-green-dark border-t-transparent" />}
            {isLoading ? 'Registrando...' : 'Registrarme'}
          </Button>
        </form>
      </Form>
    </section>
  )
}
