"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { testimonials } from "@/data/testimonials.data";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import AOS from "aos";

export const Testimonials = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mediaPlayersRef = useRef<any[]>([]);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    if (!api) return;

    // Obtener informacion inicial
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    // Escuchar evento de seleccion
    api.on("select", () => {
      const newCurrent = api.selectedScrollSnap() + 1;

      // Pausar todos los videos antes de cambiar
      mediaPlayersRef.current.forEach((player) => {
        if (player && player.paused === false) {
          player.pause();
        }
      });

      setCurrent(newCurrent);
    });
  }, [api]);

  return (
    <section data-aos="fade-up" className="container mx-auto max-w-7xl px-4 pt-16 md:pt-24">
      <div className="bg-m-green-blank rounded-2xl p-6 py-8 md:px-12 grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-4 items-center">
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl leading-8  font-medium text-m-green-dark text-center xl:text-left pb-2">
            Testimonios reales de
            <span className="text-m-green block">
              {" "}
              {` `}
              nuestros pacientes
            </span>
          </h2>
          <p className="text-m-green-dark text-sm text-center xl:text-left font-in-poppins">
            Conoce los testimonios
          </p>
        </div>
        <div>
          <div className="overflow-hidden">
            <Carousel
              className="relative"
              setApi={setApi}
              opts={{
                watchDrag: false,
              }}
            >
              <CarouselContent className="font-in-poppins -ml-4">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem
                    key={testimonial.id}
                    className="pl-4 basis-[100%]"
                  >
                    <div className="rounded-2xl h-full">
                      <div className="flex flex-col justify-between h-full">
                        <MediaPlayer
                          ref={(el) => {
                            if (el) {
                              mediaPlayersRef.current[index] = el;
                            }
                          }}
                          title="Sprite Fight"
                          src={testimonial.videoSrc}
                        >
                          <MediaProvider />
                          <DefaultVideoLayout
                            thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
                            icons={defaultLayoutIcons}
                          />
                        </MediaPlayer>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex items-center justify-center xl:justify-start gap-4 relative pt-4 ">
                <button
                  className="bg-in-blue w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-in-blue/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => api?.scrollPrev()}
                  disabled={current === 1}
                >
                  <Image
                    src="/svg/icon/arrow-right.svg"
                    className="rotate-180"
                    alt="arrow-left"
                    width={36}
                    height={36}
                  />
                </button>
                <span className="text-in-gray-base font-medium">
                  {current} de {count}
                </span>
                <button
                  className="bg-in-blue w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-in-blue/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => api?.scrollNext()}
                  disabled={current === count}
                >
                  <Image
                    src="/svg/icon/arrow-right.svg"
                    alt="arrow-right"
                    width={36}
                    height={36}
                  />
                </button>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};
