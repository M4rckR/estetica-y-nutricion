"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { plansOnline, plansPresencial } from "@/data/plans.data";
import { PlanCard } from "./PlanCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect } from "react";
import AOS from "aos";

export const PlansSection = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section
      data-aos="fade-up"
      data-aos-duration="1200"
      id="planes"
      className="pt-12 md:pt-24 max-w-6xl mx-auto"
    >
      <div className="text-center px-4">
        <div className="space-y-4">
          <h2 className="text-2xl md:text-4xl text-m-green-dark font-medium">
            Planes de <span className="text-m-green">nutrición y salud</span>{" "}
          </h2>
          <p className="text-sm text-m-green-dark">
            Mejora tus hábitos, transforma tu alimentación y cuida tu salud con
            acompañamiento profesional.
          </p>
        </div>
      </div>
      <div>
        <Tabs defaultValue="presencial" className="mt-8 space-y-8">
          <TabsList className="mx-auto h-full bg-transparent grid grid-cols-2 gap-4 px-4">
            <TabsTrigger
              value="presencial"
              className="cursor-pointer font-semibold h-full text-m-green-dark data-[state=active]:bg-m-green-light data-[state=active]:border-transparent px-12 border border-m-green-dark rounded-full py-2"
            >
              Presencial
            </TabsTrigger>
            <TabsTrigger
              value="online"
              className="cursor-pointer font-semibold h-full text-m-green-dark data-[state=active]:bg-m-green-light data-[state=active]:border-transparent px-12 border border-m-green-dark rounded-full py-2"
            >
              Online
            </TabsTrigger>
          </TabsList>
          <TabsContent value="presencial">
            <Carousel
              className="relative before:content-[''] before:absolute before:left-0 before:top-0 before:w-8 before:h-full before:bg-gradient-to-r before:from-white before:to-transparent before:pointer-events-none before:z-10 after:content-[''] after:absolute after:right-0 after:top-0 after:w-16 after:h-full after:bg-gradient-to-l after:from-white after:to-transparent after:pointer-events-none after:z-10"
              opts={{
                align: "center",
                loop: false,
              }}
            >
              <CarouselContent className="-ml-2 md:-ml-4 lg:-ml-6">
                {plansPresencial.map((plan) => (
                  <CarouselItem
                    className="basis-[80%] sm:basis-[60%] lg:basis-[55%] 2xl:basis-1/3 pl-4 md:pl-6 lg:pl-8
           first:pl-6 md:first:pl-8 lg:first:pl-10
           last:pr-4 md:last:pr-6 lg:last:pr-8"
                    key={plan.id}
                  >
                    <PlanCard plan={plan} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </TabsContent>
          <TabsContent value="online">
            <div className="lg:-mr-8 xl:-mr-8 2xl:-mr-8">
              <Carousel
                className="relative before:content-[''] before:absolute before:left-0 before:top-0 before:w-8 before:h-full before:bg-gradient-to-r before:from-white before:to-transparent before:pointer-events-none before:z-10 after:content-[''] after:absolute after:right-0 after:top-0 after:w-16 after:h-full after:bg-gradient-to-l after:from-white after:to-transparent after:pointer-events-none after:z-10"
                opts={{
                  align: "center",
                  loop: false,
                }}
              >
                <CarouselContent className="-ml-2 md:-ml-4 lg:-ml-6">
                  {plansOnline.map((plan) => (
                    <CarouselItem
                      className="basis-[80%] sm:basis-[60%] lg:basis-[55%] 2xl:basis-1/3
           pl-4 md:pl-6 lg:pl-8
           first:pl-6 md:first:pl-8 lg:first:pl-10
           last:pr-4 md:last:pr-6 lg:last:pr-8"
                      key={plan.id}
                    >
                      <PlanCard plan={plan} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
