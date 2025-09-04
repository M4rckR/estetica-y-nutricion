import { CarouselHeader } from "@/app/components/header/CarouselHeader";
import Image from "next/image";

export const HeaderMain = () => {
  return (
      <header className="relative">
        <div className="mb-12 md:mb-16">
          <div className="flex gap-2 items-center">
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
          </div>
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

        {/* <div className="flex gap-4">
          <Link href="#" className="text-m-green-light text-xs">
            Contáctanos
          </Link>
          <Link href="#" className="text-m-green-light text-xs">
            Encuentranos
          </Link>
          <Link href="#" className="text-m-green-light text-xs">
            Social Media
          </Link>
          <div className="hidden md:flex gap-2">
            <Link href="#" className="text-m-green-light text-xs">
              <Image
                src="/svg/icon/tiktok.svg"
                alt="Icono tiktok"
                width={20}
                height={20}
              />
            </Link>
            <Link href="#" className="text-m-green-light text-xs">
              <Image
                src="/svg/icon/instagram.svg"
                alt="Icono instagram"
                width={20}
                height={20}
              />
            </Link>
            <Link href="#" className="text-m-green-light text-xs">
              <Image
                src="/svg/icon/facebook.svg"
                alt="Icono facebook"
                width={20}
                height={20}
              />
            </Link>
            <Link href="#" className="text-m-green-light text-xs">
              <Image
                src="/svg/icon/youtube.svg"
                alt="Icono youtube"
                width={20}
                height={20}
              />
            </Link>
          </div>
        </div> */}
      </header>
  );
};
