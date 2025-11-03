import { Login } from "@/components/auth/Login";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase  = await createClient();

  const {data:{ session }} = await supabase.auth.getSession();

  // Si ya hay sesión, redirigir al dashboard o home
  if (session) {
    redirect('/');
  }

  return (
    <section className="space-y-4 bg-white py-6 px-6 rounded-3xl w-full max-w-[480px] mx-auto lg:px-8">
      <div className="space-y-2 text-center lg:text-left">
        <p className="text-xl md:text-2xl lg:text-3xl font-semibold">Hola, de nuevo</p>
        <h1 className="text-xs md:text-sm lg:text-base">Bienvenido al cuidado de tu salud</h1>
      </div>
      {/* Formulario de login */}
      <Login />
      {/* <Link href="/auth/register" className="text-xs text-m-green hover:underline text-center block">
        Olvide mi contraseña
      </Link> */}
    </section>
  );
}