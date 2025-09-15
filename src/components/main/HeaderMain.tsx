import { CarouselHeader } from "@/components/header/CarouselHeader";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";

export const HeaderMain = async() => {

  // Obtenemos al usuario autenticado
  const supabase = await createClient();
  const {data: { user } } = await supabase.auth.getUser();

  const isLoggedIn = !!user;
  const saludo = isLoggedIn ? `¡Bienvenido, ${user?.email}!` : "¡Bienvenido invitado!";
  
  return (
      <header className="relative">
        
        <div className="mb-12 md:mb-16 flex justify-between">
          <div className="flex gap-2 items-center">
            <Link href="/">
              <Image
                src="/svg/icon/marca.svg"
                alt="Icono marca estetica y nutricion"
                width={60}
                height={30}
                className="w-12 h-auto md:w-16"
              />
            </Link>
            <p className="text-sm leading-3.5 font-light text-white">
              Estética y <br /> nutrición integral
            </p>
          </div>
          <p className="text-white py-2 text-xs">{saludo}</p>
        </div>
        <div className="space-y-[36px] sm:w-2/3 lg:w-full mb-12 md:mb-16">
          <h1 className="text-3xl lg:text-4xl 3xl:text-5xl text-white font-m-manrope">
            “Nutrición, Salud y Estética para una{" "}
            <span className="text-m-green-light">mejor versión de ti” </span>
          </h1>
          <p className="text-m-gray text-sm md:text-base leading-6">
            Empieza a construir hábitos que transformen tu bienestar desde hoy.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <p className="text-m-green-light text-xs">Nuestras ofertas</p>
          <CarouselHeader />
        </div>
      </header>
  );
};
