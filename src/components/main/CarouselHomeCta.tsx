"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

const CarouselDots = () => {
  const { api } = useCarousel();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!api) return;
    setScrollSnaps(api.scrollSnapList());
    setSelectedIndex(api.selectedScrollSnap());

    api.on("select", () => {
      setSelectedIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="flex flex-col justify-center gap-8">
      <div className="hidden md:flex justify-center space-x-3 ">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full cursor-pointer transition-colors ${
              index === selectedIndex ? "bg-m-green" : "bg-white"
            }`}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Ir a la diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export const CarouselHomeCta = () => {
  const phoneNumber = "51931531046";
  const message =
    "Hola, vi su página web y estoy interesado en atenderme con ustedes.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;



  return (
    <section
      className="px-4 xl:p-8"
    >
      <Carousel
        className="relative"
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          <CarouselItem className="relative">
            <div className="flex flex-col gap-4 absolute bottom-32 left-0 right-0 mx-auto pl-4">
              <p className="text-xl w-full 2xl:text-3xl hidden md:block select-none xl:block font-m-poppins text-center md:px-28 lg:px-16 xl:px-32 text-white font-medium">
                Nuestro equipo está listo para atenderte y guiarte hacia{" "}
                <span className="text-m-green">
                  resultados rápidos y reales
                </span>
                .{" "}
              </p>
              <Link
                href={whatsappUrl}
                target="_blank"
                className="text-m-green hidden bg-m-green-light text-sm font-medium px-6 py-2 rounded-full mx-auto text-center xl:inline-block"
              >
                Hablemos por Whatsapp
              </Link>
            </div>
            <Image
              src="/images/principal-item-carousel-1.png"
              alt="Description of image"
              width={1200}
              height={500}
              className="w-full h-72 md:h-auto rounded-2xl object-cover"
            />
          </CarouselItem>
          <CarouselItem className="relative">
            <Image
              src="/images/principal-item-carousel-2.png"
              alt="Description of image"
              width={1200}
              height={500}
              className="w-full h-72 md:h-auto rounded-2xl object-cover"
            />
          </CarouselItem>
          {/* <CarouselItem>
            <Image
              src="/images/principal-item-carousel-1.png"
              alt="Description of image"
              width={1200}
              height={300}
                className="w-full h-auto"
            />
          </CarouselItem> */}
        </CarouselContent>
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <CarouselDots />
        </div>
      </Carousel>
    </section>
  );
};
