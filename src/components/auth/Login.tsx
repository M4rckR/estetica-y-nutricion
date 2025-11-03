"use client";

import { loginFormSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { login } from "@/app/auth/actions/actions";
import { useState } from "react";
import Link from "next/link";

export const Login = () => {
  const [authError, setAuthError] = useState<string | null>(null);

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


  const handleSubmit = async (values: { email: string; password: string }) => {
    setAuthError(null);

    const response = await login(values);

    if (response?.error) {
      // Si hay un error, lo ponemos en el estado para mostrarlo en la UI
      setAuthError(response.error);
    }

  };

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="rounded-3xl py-4 md:py-5 pl-4 text-base placeholder:text-base" placeholder="Tu correo" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" className="rounded-3xl py-4 md:py-5 pl-4 text-base placeholder:text-base" placeholder="Tu contraseña" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Button type="submit" className="w-full py-5 mt-2 rounded-full bg-m-green hover:bg-m-green-dark cursor-pointer">Ingresar</Button>
          <Link className="block lg:hidden w-full p-0 m-0 h-full" href="/auth/register">
            <Button variant="secondary" className="hover:bg-m-green hover:text-white w-full text-sm bg-white text-m-green border border-m-green cursor-pointer rounded-3xl px-10 py-5">Registrarme</Button>
          </Link>
        </div>
      </form>
      {authError && (
        <p className="text-xs text-red-500 text-center px-2 mt-2">{authError}</p>
      )}
    </Form>
  )
}
