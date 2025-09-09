'use client';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";

export const CarouselHomeCta = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section data-aos="fade-in" data-aos-duration="1200" className="px-4 xl:p-8">
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <Image
              src="/images/principal-item-carousel-1.png"
              alt="Description of image"
              width={1200}
              height={500}
                className="w-full h-auto"
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src="/images/principal-item-carousel-1.png"
              alt="Description of image"
              width={1200}
              height={500}
                className="w-full h-auto"
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src="/images/principal-item-carousel-1.png"
              alt="Description of image"
              width={1200}
              height={300}
                className="w-full h-auto"
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </section>
  );
};
