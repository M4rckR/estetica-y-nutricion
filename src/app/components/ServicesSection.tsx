import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";

export const ServicesSection = () => {
  const phoneNumber = "51931531046";
  const message = "Hola, vi su página web y estoy interesado en sus servicios.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <section
      id="servicios"
      className="pt-12 md:pt-24 max-w-7xl mx-auto px-4 space-y-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center xl:items-end gap-y-4">
        <div className="text-center lg:col-span-7 lg:text-left space-y-4">
          <h2 className="text-2xl text-m-green-dark">Servicios</h2>
          <p className="text-m-gray-base">
            Te ayudamos a mejorar tu alimentación con evaluaciones
            personalizadas, asesoría profesional y planes nutricionales
            adaptados a tus objetivos de salud. Empieza a construir hábitos que
            transformen tu bienestar desde hoy.
          </p>
        </div>
        <div className="lg:col-start-9 xl:col-start-10 col-span-4 ">
          <Link
            className="flex items-center justify-center bg-m-green-dark text-white px-4 py-3 rounded-full w-fit mx-auto"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex gap-2 items-center">
              <Image
                src="/svg/icon/callendar.svg"
                alt="Icono calendario"
                width={24}
                height={24}
              />
              <p className="text-sm  text-center">Reservar una cita</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8">
        <article className="bg-m-green-light rounded-2xl py-8 px-6">
          <h3 className="text-m-green-dark font-medium text-lg">
            Consultoría y evaluación nutricional
          </h3>
          <Image
            src="/images/consultoria-nutricional.png"
            alt="Consultoría y evaluación nutricional"
            width={400}
            height={300}
            className="w-full h-auto mt-8 rounded-lg"
          />
          <Link
            href="#"
            className="text-m-green-dark bg-white mt-6 block text-center py-2 rounded-full"
          >
            Me interesa
          </Link>
        </article>
        <div>
          <Accordion
            className="space-y-4"
            defaultValue="item-1"
            type="single"
            collapsible
          >
            <AccordionItem
              className="bg-m-green-light py-4 px-6 rounded-2xl"
              value="item-1"
            >
              <AccordionTrigger className="text-lg text-m-green-dark hover:no-underline cursor-pointer">
                Tratamientos faciales
              </AccordionTrigger>
              <AccordionContent className="text-m-green-dark">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              className="bg-m-green-light py-4 px-6 rounded-2xl"
              value="item-2"
            >
              <AccordionTrigger className="text-lg text-m-green-dark hover:no-underline cursor-pointer">
                Tratamientos corporales
              </AccordionTrigger>
              <AccordionContent className="text-m-green-dark">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              className="bg-m-green-light py-4 px-6 rounded-2xl"
              value="item-3"
            >
              <AccordionTrigger className="text-lg text-m-green-dark hover:no-underline cursor-pointer">
                Venta de suplementos y productos nutricionales
              </AccordionTrigger>
              <AccordionContent className="text-m-green-dark">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};
