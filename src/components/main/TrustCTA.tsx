"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import AOS from "aos";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const TrustCTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section
      data-aos="fade-up"
      data-aos-duration="1200"
      id="confianza"
      className="max-w-7xl mx-auto pt-12 md:pt-24 grid grid-cols-1 gap-4 xl:grid-cols-2 px-4 items-center"
    >
      <div className="space-y-6">
        <div className="space-y-6 text-center xl:text-left">
          <h2 className="text-2xl text-m-green-dark md:text-3xl font-medium">
            Nuestro equipo está listo para atenderte y guiarte hacia{" "}
            <span className="text-m-green">resultados rápidos y reales.</span>{" "}
          </h2>
          <p className="text-sm">
            ¡Súmate a los más de 4000 pacientes que ya vivieron su
            transformación!
          </p>
        </div>
        <div className="flex justify-center xl:justify-start">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary cursor-pointer inline-block hover:bg-m-green text-sm md:text-base hover:text-white transition-all duration-150 bg-m-green-light px-5 py-4 rounded-4xl"
          >
            Conoce más
          </button>
        </div>
      </div>
      <Image
        src="/images/nutricionista-cta.png"
        alt="Confianza"
        priority
        width={600}
        height={300}
        quality={95}
        className="object-cover rounded-lg mx-auto md:max-w-[480px] w-full mt-4 lg:mt-0"
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-m-green-dark font-semibold">
              Rick Flores Gamarra
            </DialogTitle>
            <DialogDescription className="text-base text-m-green font-medium">
              CNP 7723
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-m-gray-base">
            <div className="flex items-start gap-2">
              <span className="text-m-green mt-1">•</span>
              <p>+ 5 años de experiencia en atención a más de 4000 mil personas</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-m-green mt-1">•</span>
              <p>Nutricionista por la Universidad Nacional Mayor de San Marcos (UNMSM)</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-m-green mt-1">•</span>
              <p>Postgrado en Nutrición Estética y Deportiva en Argentina, Colombia, Brasil y España</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-m-green mt-1">•</span>
              <p>Maestría en Deporte, Salud y Estética por la Universidad San Agustín (Arequipa)</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-m-green mt-1">•</span>
              <p>ISAK NIVEL 2</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-m-green mt-1">•</span>
              <p>Past Nutricionista de Federación Peruana de Boxeo, Triatlón, Rugby, Sporting Cristal, Comité Olímpico Peruano</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-m-green mt-1">•</span>
              <p>Disertante Nacional e Internacional</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
