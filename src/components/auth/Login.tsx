"use client";

import { loginFormSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { login } from "@/app/auth/actions/actions";

export const Login = () => {

    const form = useForm<{
      email: string;
      password: string;
    }>({
      resolver: zodResolver(loginFormSchema),
      defaultValues: {
        email: "",
        password: "",
      },    
    });


    const handleSubmit = async(values: { email: string; password: string }) => {
       try {
        await login(values)
       }catch (error) {
        console.log(error, "Datos incorrectos")
       }

    };

  return (
    <Form {...form} >
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input className="rounded-3xl py-6 pl-4" placeholder="Tu correo" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs"/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="password" className="rounded-3xl py-6 pl-4" placeholder="Tu contraseña" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                    </FormItem>
                )}
            />
            <Button type="submit" className="w-full py-6 mt-2 rounded-full bg-m-green hover:bg-m-green-dark cursor-pointer">Ingresar</Button>
        </form>
    </Form>
  )
}
