"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { plansOnline, plansPresencial } from "@/data/plans.data";
import { PlanCard } from "./PlanCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import WheelGesturesPlugin from "embla-carousel-wheel-gestures";
import { useEffect, useState } from "react";
import AOS from "aos";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export const PlansSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    AOS.init();
    setIsMounted(true);
  }, []);

  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Cerrar modal con tecla ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isModalOpen]);

  const phoneNumber = "51931531046";
  const evaluacionSecaMessage = "Hola, vi su página web y estoy interesado en la evaluación seca.";
  const whatsappUrlEvaluacion = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(evaluacionSecaMessage)}`;

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
          <TabsList className="mx-auto h-full bg-transparent grid grid-cols-3 gap-4 px-4">
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
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full rounded-full text-m-green-blank bg-m-green-dark hover:bg-m-green hover:text-white border border-m-green-dark cursor-pointer transition-colors duration-200 px-4 py-2 text-center inline-flex items-center justify-center font-medium"
            >
              Evaluacion seca
            </button>
          </TabsList>
          <TabsContent value="presencial">
            <Carousel
              className="relative before:content-[''] before:absolute before:left-0 before:top-0 before:w-8 before:h-full before:bg-gradient-to-r before:from-white before:to-transparent before:pointer-events-none before:z-10 after:content-[''] after:absolute after:right-0 after:top-0 after:w-16 after:h-full after:bg-gradient-to-l after:from-white after:to-transparent after:pointer-events-none after:z-10"
              opts={{
                align: "center",
                loop: false,
              }}
              plugins={[WheelGesturesPlugin()]}>
              <CarouselContent className="-ml-2 md:-ml-4 lg:-ml-6 select-none ">
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
                plugins={[WheelGesturesPlugin()]}
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

      {/* Modal de Evaluación SECA */}
      {isMounted && isModalOpen && createPortal(
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
          style={{ zIndex: 99999 }}
        >
          <div 
            className="relative bg-white w-[90vw] max-w-[700px] h-auto max-h-[90vh] rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 cursor-pointer right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Contenido del modal */}
            <div 
              className="p-6 md:p-8 lg:p-10 overflow-y-auto max-h-[90vh] modal-scroll"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#619111 #f3f4f6'
              }}
            >
              <div className="space-y-6">
                {/* Título */}
                <div>
                  <h2 className="text-2xl md:text-3xl text-m-green-dark font-semibold mb-2">
                    ✨ Evaluación SECA
                  </h2>
                </div>

                {/* Descripción principal */}
                <div className="space-y-4 text-m-gray-base text-sm md:text-base">
                  <p>
                    La evaluación SECA es un estudio de bioimpedancia corporal que analiza tu composición en segundos ⚡.
                  </p>
                  <p>
                    Con corrientes eléctricas muy suaves y seguras, obtenemos datos precisos de tu cuerpo.
                  </p>
                </div>

                {/* ¿Qué mide? */}
                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl text-m-green-dark font-semibold">
                    🔍 ¿Qué mide?
                  </h3>
                  <div className="space-y-2 text-m-gray-base text-sm md:text-base">
                    <div className="flex items-start gap-3">
                      <span className="text-m-green mt-1 font-bold">✔</span>
                      <p>Peso corporal</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-m-green mt-1 font-bold">✔</span>
                      <p>Grasa corporal total y visceral (grasa interna)</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-m-green mt-1 font-bold">✔</span>
                      <p>Masa muscular y masa magra</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-m-green mt-1 font-bold">✔</span>
                      <p>Agua corporal (intra y extracelular)</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-m-green mt-1 font-bold">✔</span>
                      <p>Metabolismo basal (calorías que quemas en reposo)</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-m-green mt-1 font-bold">✔</span>
                      <p>IMC y porcentaje de grasa</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-m-green mt-1 font-bold">✔</span>
                      <p>Distribución segmentada (brazos, piernas y tronco)</p>
                    </div>
                  </div>
                </div>

                {/* Beneficios */}
                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl text-m-green-dark font-semibold">
                    💡 Beneficios:
                  </h3>
                  <div className="space-y-2 text-m-gray-base text-sm md:text-base">
                    <div className="flex items-start gap-3">
                      <span className="text-m-green mt-1 font-bold">✔</span>
                      <p>Diagnóstico exacto de tu composición corporal</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-m-green mt-1 font-bold">✔</span>
                      <p>Seguimiento objetivo de tu progreso</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-m-green mt-1 font-bold">✔</span>
                      <p>Base para diseñar un plan nutricional y estético 100% personalizado</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-m-green mt-1 font-bold">✔</span>
                      <p>Resultados claros y fáciles de interpretar</p>
                    </div>
                  </div>
                </div>

                {/* Botón de WhatsApp */}
                <div className="pt-4 mt-6 border-t border-gray-200">
                  <a
                    href={whatsappUrlEvaluacion}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-m-green hover:bg-m-green-dark text-white font-medium px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Contactar por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};
