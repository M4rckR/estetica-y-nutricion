import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

export const CarouselHeader = () => {
  return (
    <div>
        <Carousel
        opts={{
            align: "start",
            loop: true,
        }}
        className="w-full text-center"
        >
        <CarouselContent className="pr-6 text-m-green-light">
            <CarouselItem className="basis-[60%] sm:basis-1/3 lg:basis-[50%] xl:basis-[40%] 2xl:basis-[50%]">
            <article className="bg-m-green py-4 px-[10px] space-y-4 text-xs rounded-2xl h-full">
                <Image
                src="/svg/icon/percentaje.svg"
                alt="Icono oferta 1"
                width={28}
                height={28}
                className="mx-auto select-none"
                />
                <p className="select-none">Hasta 15% dscto en tratamientos estéticos</p>
            </article>
            </CarouselItem>
            <CarouselItem className="basis-[60%] sm:basis-1/3 lg:basis-[50%] xl:basis-[40%] 2xl:basis-[50%]">
            <article className="bg-m-green py-4 px-[10px] space-y-4 text-xs rounded-2xl h-full">
                <Image
                src="/svg/icon/percentaje.svg"
                alt="Icono oferta 1"
                width={28}
                height={28}
                className="mx-auto select-none"
                />
                <p className="select-none">Suplementos con envío gratis por compras mayores a 300 soles</p>
            </article>
            </CarouselItem>
            <CarouselItem className="basis-[60%] sm:basis-1/3 lg:basis-[50%] xl:basis-[40%] 2xl:basis-[50%]">
            <article className="bg-m-green py-4 px-[10px] space-y-4 text-xs rounded-2xl h-full">
                <Image
                src="/svg/icon/percentaje.svg"
                alt="Icono oferta 1"
                width={28}
                height={28}
                className="mx-auto select-none"
                />
                <p className="select-none">Hasta 10% dscto en planes nutricionales</p>
            </article>
            </CarouselItem>
        </CarouselContent>
        <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-m-green-dark to-transparent" />
        </Carousel>
    </div>
  );
};
