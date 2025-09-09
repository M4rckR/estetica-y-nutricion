import { Login } from "@/components/auth/Login";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase  = await createClient();

  const {data:{ session }} = await supabase.auth.getSession();

  if (!session) {
    redirect('/');
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-3xl font-semibold">Hola, de nuevo</p>
        <h1 className="text-lg">Bienvenido al cuidado de tu salud</h1>
      </div>
      {/* Formulario de login */}
      <Login />
      <Link href="/auth/register" className="text-xs text-m-green hover:underline text-center block">
        Olvide mi contraseña
      </Link>
    </section>
  );
}