import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { plansOnline, plansPresencial } from "@/data/plans.data";
import { PlanCard } from "./PlanCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export const PlansSection = () => {
  return (
    <section id="planes" className="pt-12 md:pt-24 max-w-6xl mx-auto px-4">
      <div className="text-center space-y-4 px-4">
        <h2 className="text-2xl md:text-4xl text-m-green-dark font-medium">
          Planes de <span className="text-m-green">nutrición y salud</span>{" "}
        </h2>
        <p className="text-sm text-m-green-dark">
          Mejora tus hábitos, transforma tu alimentación y cuida tu salud con
          acompañamiento profesional.
        </p>
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
            <Carousel>
              <CarouselContent>
                {plansPresencial.map((plan) => (
                  <CarouselItem
                    className="basis-[80%] sm:basis-[60%] lg:basis-[55%] 2xl:basis-1/3"
                    key={plan.id}
                  >
                    <PlanCard plan={plan} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </TabsContent>
          <TabsContent value="online">
            <Carousel>
              <CarouselContent>
                  {plansOnline.map((plan) => (
                    <CarouselItem
                    className="basis-[80%] sm:basis-[60%] lg:basis-[55%] 2xl:basis-1/3"
                    key={plan.id}>
                      <PlanCard plan={plan} />
                    </CarouselItem>
                  ))}
              </CarouselContent>
            </Carousel>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
