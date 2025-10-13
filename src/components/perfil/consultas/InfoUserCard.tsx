import { createClient } from "@/utils/supabase/server";

export const InfoUserCard = async () => {

    const supabase = await createClient();

    const {data: { user }} = await supabase.auth.getUser();

    let userProfile = null;

    if(user) {
        const {data} = await supabase
          .from('users')
          .select('*')
          .eq('user_id', user.id)
          .single();
        userProfile = data;
    }

  return (
    <section className="mb-24 px-4">
        <div className="text-m-green-dark space-y-6">
            <p className="text-center text-2xl md:text-4xl ">Hola, {" "}
                <span className="text-m-green">{
                    userProfile?.first_name.charAt(0).toUpperCase() + userProfile?.first_name.slice(1)
                }</span></p>
            <p className="text-center text-sm md:text-base">Bienvenido a tu perfil en donde encontraras todo lo necesario para cuidar tu salud</p>
        </div>
    </section>
  )
}
