"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import AOS from "aos";

export const TrustCTA = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const phoneNumber = "51931531046";
  const message = "Hola, vi su página web y estoy interesado en atenderme con ustedes.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <section
      data-aos="fade-up"
      data-aos-duration="1200"
      id="confianza"
      className="max-w-7xl mx-auto pt-12 md:pt-24 grid grid-cols-1 gap-4 xl:grid-cols-2 items-center"
    >
      <div className="space-y-6">
        <div className="space-y-6 text-center xl:text-left">
          <h2 className="text-2xl text-m-green-dark md:text-3xl font-medium">
            Nuestro equipo está listo para atenderte y guiarte hacia{" "}
            <span className="text-m-green">resultados rápidos y reales.</span>{" "}
          </h2>
          <p className="text-sm">
            ¡Súmate a los más de 300 pacientes que ya vivieron su
            transformación!
          </p>
        </div>
        <div className="flex justify-center xl:justify-start">
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block hover:bg-m-green text-sm md:text-base hover:text-white transition-all duration-150 bg-m-green-light px-5 py-4 rounded-4xl"
          >
            Hablemos por Whatsapp
          </Link>
        </div>
      </div>
      <Image
        src="/images/nutricionista-cta.png"
        alt="Confianza"
        priority
        width={600}
        height={300}
        quality={95}
        className=" object-cover rounded-lg mx-auto md:max-w-[480px] w-full mt-4 lg:mt-0"
      />
    </section>
  );
};
