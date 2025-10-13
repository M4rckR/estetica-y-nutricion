import { HeaderMain } from "@/components/main/HeaderMain";
import { InfoUserCard } from "@/components/perfil/consultas/InfoUserCard";
import { UserConsultaView } from "@/components/perfil/consultas/UserConsultaView";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12">
      <aside
        className="lg:col-span-4 2xl:col-span-3
                         bg-m-green-dark px-4 py-8 md:p-8
                         lg:sticky lg:top-0 lg:h-screen"
      >
        <HeaderMain />
      </aside>
      <main className="lg:col-span-8 2xl:col-span-9 py-16 xl:px-8">
        <InfoUserCard />
        <UserConsultaView />
      </main>
    </div>
  );
};
