import { UsersType } from "@/types/users";
import { createClient } from "@/utils/supabase/server";


export async function InfoUserCard() {

    const supabase = await createClient();
  
    const {data: { user }} = await supabase.auth.getUser();
  
    let userProfile: UsersType | null = null;
  
    if(user) {
      const {data} = await supabase
        .from('users')
        .select('*')
        .eq('user_id', user.id)
        .single();
      userProfile = data;
    }


  return (
    <section className="mb-12 md:mb-16 lg:mb-24 px-4 pt-8">
        <div className="text-m-green-dark space-y-6">
            <p className="text-center text-2xl md:text-4xl ">Hola, {" "}
                <span className="text-m-green">
                    {userProfile?.nombres
                        ? userProfile.nombres.split(' ')[0].charAt(0).toUpperCase() + userProfile.nombres.split(' ')[0].slice(1).toLowerCase()
                        : ""}
                </span>
            </p>
            <p className="text-center text-sm md:text-base">
                Bienvenido a tu perfil en donde encontraras todo lo necesario para cuidar tu salud
            </p>
        </div>
    </section>
  )
}
