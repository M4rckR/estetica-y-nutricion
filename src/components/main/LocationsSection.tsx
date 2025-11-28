"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { sedesAccordion } from "@/data/sedesAccordion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import AOS from "aos";

export const LocationsSection = () => {
  const [selectedSede, setSelectedSede] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    AOS.init();
  }, []);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const selectedSedeInfo = selectedSede
    ? sedesAccordion.find((sede) => sede.id.toString() === selectedSede)
    : undefined;

  const phone = "51931531046";
  const msgTop = selectedSedeInfo
    ? `Hola, vi su página web y quiero reservar una cita en la sede ${selectedSedeInfo.name}.`
    : "Hola, vi su página web y quiero reservar una cita.";
  const whatsappUrlTop = `https://wa.me/${phone}?text=${encodeURIComponent(
    msgTop
  )}`;



  return (
    <section data-aos="fade-up" data-aos-duration="1200" className="pt-12 md:pt-24 max-w-7xl mx-auto px-4">
      <div className="text-center text-m-green-dark space-y-4 mb-8">
        <h2 className="text-2xl md:text-4xl font-medium">
          Encuentra una sede cerca de ti.
        </h2>
        <p className="text-sm">
          Contamos con equipos modernos y atención especializada en cada sede.
        </p>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-12 items-center gap-16">
        <div className="col-span-1 md:col-span-4 lg:col-span-5 xl:col-span-4">
          <Accordion
            type="single"
            collapsible
            value={selectedSede}
            onValueChange={setSelectedSede}
          >
            {sedesAccordion.map((sede) => (
              <AccordionItem key={sede.id} value={sede.id.toString()}>
                <AccordionTrigger
                  className="hover:no-underline lg:text-lg text-m-green-dark font-semibold cursor-pointer py-4
                     transition-colors duration-300"
                >
                  {sede.name}
                </AccordionTrigger>
                <AccordionContent className="text-m-gray-base space-y-4 -mt-1">
                  <p>{sede.description}</p>
                  <Link
                    href={whatsappUrlTop}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-m-green inline-flex items-center transition-colors duration-300"
                  >
                    Agendar cita
                  </Link>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="hidden md:block md:col-span-8 lg:col-span-7  xl:col-span-8">
          <div className="relative w-full max-h-[400px] rounded-lg overflow-hidden">
            {!isClient ? (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            ) : (
              <>
                {selectedSedeInfo ? (
                  <Image
                    src={`/images/hero-image-${selectedSedeInfo.id}.png`}
                    alt={`Sede ${selectedSedeInfo.name} de Estetica y Nutricion ${selectedSedeInfo.id}`}
                    width={500}
                    height={400}  
                    className="w-full max-h-[400px] object-cover rounded-lg"
                    loading="lazy"
                    quality={85}
                    sizes="(max-width: 768px) 0px, 66vw"
                  />
                ) : (
                  <Image
                    src="/images/hero-image-default.png"
                    alt="Sede General de Estetica y Nutricion"
                    width={500}
                    height={500}
                    className="w-full h-full max-h-[400px] object-cover rounded-lg"
                    loading="lazy"
                    quality={85}
                    sizes="(max-width: 768px) 0px, 66vw"
                  />
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </section>
  );
};
