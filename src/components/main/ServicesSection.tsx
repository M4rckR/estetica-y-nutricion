'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import AOS from "aos";

export const ServicesSection = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const phoneNumber = "51931531046";
  const message = "Hola, vi su página web y estoy interesado en sus servicios.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <section
    data-aos="fade-up"
    data-aos-duration="1200"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-8">
        <article className="bg-m-green-light rounded-2xl flex flex-col justify-center py-8 px-6">
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
                <ul className="list-disc list-inside space-y-1">
                  <li>Limpieza facial profunda</li>
                  <li>limpieza facial express</li>
                  <li>Limpieza facial + dermapen</li>
                  <li>Limpieza facial + PRP</li>
                  <li>PRP</li>
                  <li>Coctel antiaging, ETC</li>
                </ul>
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
                <div className="flex gap-1 xl:gap-1 md:gap-1 2xl:gap-10 flex-col 2xl:flex-row md:space-y-0 xl:space-y-0">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Hidrolipoclasia</li>
                    <li>Hidrolipoescultura</li>
                    <li>Anticelulitis</li>
                    <li>Carboxiterapia</li>
                    <li>Maderoterapia</li>
                  </ul>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Ultracavitacion</li>
                    <li>Pack Levantamiento de gluteos</li>
                    <li>Pack reductor</li>
                    <li>Coctel de vida</li>
                    <li>Lipopapada, etc</li>
                  </ul>
                </div>
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
                <div className="flex gap-1 xl:gap-1 md:gap-1 2xl:gap-10 flex-col 2xl:flex-row md:space-y-0 xl:space-y-0">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Xtropin</li>
                    <li>Curcupro</li>
                    <li>St.jhon&apos;swort</li>
                    <li>Glicinato de magnesio</li>
                    <li>Berberina</li>
                  </ul>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Zinc</li>
                    <li>Glucolife</li>
                    <li>Picolinato de cromo</li>
                    <li>Selenio 200mcg</li>
                    <li>Citrato de magnesio</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};
