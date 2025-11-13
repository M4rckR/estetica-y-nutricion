import { CarouselHeader } from "@/components/header/CarouselHeader";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { UsersType } from "@/types/users";

export const HeaderMain = async() => {
  const supabase = await createClient();

  const {data: { user }} = await supabase.auth.getUser();


  let userProfile: UsersType | null = null;

  if(user) {
    const {data, error} = await supabase
      .from('users')
      .select('*')
      .eq('user_id', user.id)
      .single();
    

    if(error){
      console.error("Error al obtener el perfil:", error);
    }

    userProfile = data;
  }
  
  
  return (
    <header className="relative">
      <div className="mb-0 lg:mb-16 flex justify-between">
          <Link className="flex gap-2 items-center" href="/">
            <Image
              src="/svg/icon/marca.svg"
              alt="Icono marca estetica y nutricion"
              width={60}
              height={30}
              className="w-12 h-auto md:w-16"
            />
            <p className="text-sm leading-3.5 font-light text-white">
              Estética y <br /> nutrición integral

            </p>
          </Link>
        
        {userProfile ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-sm cursor-pointer bg-m-green text-white px-4 py-2 rounded-full transition flex items-center gap-2">
                <User className="w-4 h-4" />
                {userProfile.rol === 'doctor' ? 'Admin' : userProfile.nombres.split(' ')[0].charAt(0).toUpperCase() + userProfile.nombres.split(' ')[0].slice(1).toLowerCase()}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">

            {userProfile.rol !== 'doctor' && (
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href="/perfil/consultas">Ver mi perfil</Link>
              </DropdownMenuItem>
            )}

              {userProfile.rol === 'doctor' && (
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link href="/admin/pacientes">Subir consulta</Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href="/auth/signout">Cerrar sesión</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
            <Link href="/auth/login" className="text-sm bg-m-green text-white px-4 py-2 rounded-full transition">
              Iniciar sesión
            </Link>
        )}
      </div>
      <div className="space-y-[36px] sm:w-2/3 lg:w-full mb-12 md:mb-16 hidden lg:block">
        <h1 className="text-3xl lg:text-4xl 3xl:text-5xl text-white font-m-manrope">
          “Nutrición, Salud y Estética para una{" "}
          <span className="text-m-green-light">mejor versión de ti” </span>
        </h1>
        <p className="text-m-gray text-sm md:text-base leading-6">
          Empieza a construir hábitos que transformen tu bienestar desde hoy.
        </p>
      </div>

      <div className="space-y-4 mb-8 hidden lg:block">
        <p className="text-m-green-light text-xs">Nuestras ofertas</p>
        <CarouselHeader />
      </div>
    </header>
  );
};
