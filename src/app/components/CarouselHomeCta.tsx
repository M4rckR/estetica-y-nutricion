import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";

export const CarouselHomeCta = () => {
  return (
    <section className="px-4">
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <Image
              src="/images/principal-item-carousel-1.png"
              alt="Description of image"
              width={1200}
              height={300}
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
