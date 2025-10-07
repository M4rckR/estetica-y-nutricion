import { CarouselHeader } from "@/components/header/CarouselHeader";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

export const HeaderMain = async () => {
  // Obtenemos al usuario autenticado
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = null;

  if(user) {
    const {data, error} = await supabase
    .from('users')
    .select('first_name, last_name')
    .eq('user_id', user.id)
    .maybeSingle()

    if(error) {
      console.log(error)
    }

    profile = data;
  }

  const isLoggedIn = !!user;
  const saludo = isLoggedIn
    ? `${profile?.first_name} ${profile?.last_name}`
    : "invitado";


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
        {/* <p className="text-white py-2 text-xs">{saludo}</p> */}
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm p-0 px-2 w-[160px]">
                {saludo}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                {
                  isLoggedIn ? (
                    <>
                      <NavigationMenuLink href="/profile">
                        Ver mi perfil
                      </NavigationMenuLink>
                      <NavigationMenuLink href="/auth/signout">
                        Cerrar sesión
                      </NavigationMenuLink>
                    </>
                  ) : (
                    <>
                      <NavigationMenuLink href="/auth/login">
                        Iniciar sesión
                      </NavigationMenuLink>
                      <NavigationMenuLink href="/auth/register">
                        Registrarme
                      </NavigationMenuLink>
                    </>
                  )
                }
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
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
