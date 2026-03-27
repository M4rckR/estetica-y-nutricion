import { CarouselHeader } from "@/components/header/CarouselHeader";
import { Logo } from "@/components/common/Logo";

export const HeaderMain = () => {
  return (
    <header className="relative">
      <div className="mb-0 lg:mb-16 flex justify-between">
        <Logo textColor="white" />
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
