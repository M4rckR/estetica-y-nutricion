import { HeaderMain } from "@/components/main/HeaderMain";
import { InfoUserCard } from "@/components/perfil/consultas/InfoUserCard";
import { UserConsultaView } from "@/components/perfil/consultas/UserConsultaView";
import { HeaderIntern } from "@/components/main/HeaderIntern";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
// No necesitamos 'type User' aquí si no lo pasamos a una función
// import { type User } from "@supabase/supabase-js"; 

export default async function page({ searchParams }: { searchParams: { sort?: string } }) {
  // 1. El cliente de Supabase (con 'await', ya que es una promesa)
  const supabase = await createClient();

  // 2. ¡PRIMERO! Debes obtener el usuario
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 3. AHORA SÍ, puedes verificar si el usuario existe
  if (!user) {
    redirect("/");
  }

  // 4. Obtén el perfil del usuario (su nombre) desde la tabla users
  await supabase
    .from("users")
    .select("first_name")
    .eq("id", user.id) // Asumiendo que 'id' en 'users' es el FK
    .single();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12">
      <aside
        className="lg:col-span-4 2xl:col-span-3
                         bg-white lg:bg-m-green-dark px-4 py-8 md:p-8
                         lg:sticky lg:top-0 lg:h-screen"
      >
        <HeaderIntern />
      </aside>
      <main className="lg:col-span-8 2xl:col-span-9 py-0 lg:py-16 xl:px-8">
        {/* 5. Pasa las props a los componentes hijos */}
        <InfoUserCard />
        <UserConsultaView userId={user.id} sortOrder={searchParams.sort === "asc" ? "asc" : "desc"} />
      </main>
    </div>
  );
}