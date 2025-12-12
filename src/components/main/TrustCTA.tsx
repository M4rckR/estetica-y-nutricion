"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import AOS from "aos";
import { X } from "lucide-react";

export const TrustCTA = () => {
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

      {/* Modal nativo con Portal */}
      {isMounted && isModalOpen && createPortal(
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
          style={{ zIndex: 99999 }}
        >
          <div 
            className="relative bg-white w-[90vw] max-w-[1000px] h-auto rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 cursor-pointer right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
              {/* Columna izquierda - Imagen (40% del ancho) */}
              <div className="relative lg:col-span-2 h-[280px] lg:h-[500px] flex items-center justify-center bg-gray-50 p-4">
                <Image
                  src="/images/nutricionista-cta-simple.png"
                  alt="Dr. Rick Flores Gamarra"
                  width={350}
                  height={350}
                  quality={95}
                  className="object-contain w-full h-full"
                />
              </div>
              
              {/* Columna derecha - Información (60% del ancho) */}
              <div 
                className="lg:col-span-3 p-6 md:p-8 lg:p-10 overflow-y-auto max-h-[450px] lg:max-h-[500px] modal-scroll"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#619111 #f3f4f6'
                }}
              >
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl text-m-green-dark font-semibold mb-2">
                      Rick Flores Gamarra
                    </h2>
                    <p className="text-lg text-m-green font-medium">
                      CNP 7723
                    </p>
                  </div>
                  
                  <div className="space-y-4 text-m-gray-base text-sm md:text-base">
                    <div className="flex items-start gap-3">
                      <span className="text-m-green mt-1 font-bold">•</span>
                      <p>+ 5 años de experiencia en atención a más de 4000 mil personas</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-m-green mt-1 font-bold">•</span>
                      <p>Nutricionista por la Universidad Nacional Mayor de San Marcos (UNMSM)</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-m-green mt-1 font-bold">•</span>
                      <p>Postgrado en Nutrición Estética y Deportiva en Argentina, Colombia, Brasil y España</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-m-green mt-1 font-bold">•</span>
                      <p>Maestría en Deporte, Salud y Estética por la Universidad San Agustín (Arequipa)</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-m-green mt-1 font-bold">•</span>
                      <p>ISAK NIVEL 2</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-m-green mt-1 font-bold">•</span>
                      <p>Past Nutricionista de Federación Peruana de Boxeo, Triatlón, Rugby, Sporting Cristal, Comité Olímpico Peruano</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-m-green mt-1 font-bold">•</span>
                      <p>Disertante Nacional e Internacional</p>
                    </div>
                  </div>

                  {/* Botón de WhatsApp */}
                  <div className="pt-4 mt-6 border-t border-gray-200">
                    <a
                      href="https://wa.me/51931531046?text=Hola%2C%20vi%20su%20p%C3%A1gina%20web%20y%20quiero%20agendar%20una%20cita%20con%20el%20Dr.%20Rick%20Flores"
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
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};
