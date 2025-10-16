'use client';
import { Carousel, CarouselContent, CarouselItem, useCarousel } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useEffect, useState } from "react";
import AOS from "aos";

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
      <p className="text-3xl hidden xl:block font-m-poppins text-center text-white font-medium">Nuestro equipo está listo para atenderte y guiarte hacia <span className="text-m-green">resultados rápidos y reales</span>. </p>
      <a href="#" className="text-m-green hidden bg-m-green-light text-sm font-medium px-6 py-2 rounded-full mx-auto text-center xl:inline-block">Hablemos por Whatsapp</a>
      <div className="flex justify-center space-x-3">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full cursor-pointer transition-colors ${
              index === selectedIndex ? 'bg-m-green' : 'bg-white'
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
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section data-aos="fade-in" data-aos-duration="1200" className="px-4 xl:p-8">
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
            <Image
              src="/images/principal-item-carousel-1.png"
              alt="Description of image"
              width={1200}
              height={500}
                className="w-full h-72 md:h-auto rounded-2xl object-cover"
            />
          </CarouselItem>
          <CarouselItem>
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
