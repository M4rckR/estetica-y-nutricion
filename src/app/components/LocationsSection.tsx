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

export const LocationsSection = () => {
  const [selectedSede, setSelectedSede] = useState<string | undefined>(
    undefined
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const selectedSedeInfo = selectedSede
    ? sedesAccordion.find((sede) => sede.id.toString() === selectedSede)
    : undefined;

  const getWhatsAppLink = (sedeName: string) => {
    const message = encodeURIComponent(
      `¡Hola! vi su pagina web y me gustaría agendar una cita en la sede ${sedeName}. ¿Podrían brindarme más información?`
    );
    return `https://wa.me/5199999999?text=${message}`;
  };

  return (
    <section className="pt-12 md:pt-24 max-w-7xl mx-auto px-4">
      <div className="text-center text-m-green-dark space-y-4 mb-8">
        <h2 className="text-2xl md:text-4xl font-medium">
          Encuentra una sede cerca de ti.
        </h2>
        <p className="text-sm">
          Contamos con equipos modernos y atención especializada en cada sede.
        </p>
      </div>
      <section className="grid grid-cols-1 items-center md:grid-cols-12 gap-16">
        <div className="col-span-1 md:col-span-4">
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
                    href={getWhatsAppLink(sede.name)}
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
        <div className="hidden md:block col-span-12 md:col-span-8">
          <div className="relative w-full h-[500px] bg-gray-100 rounded-lg overflow-hidden">
            {!isClient ? (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            ) : (
              <>
                {selectedSedeInfo ? (
                  <Image
                    src="/images/hero-image-1.png"
                    alt={`Sede ${selectedSedeInfo.name} de InSalud`}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    quality={85}
                    sizes="(max-width: 768px) 0px, 66vw"
                  />
                ) : (
                  <Image
                    src="/images/hero-image-1.png"
                    alt="Sede General de InSalud"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
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
