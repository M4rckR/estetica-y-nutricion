'use client'
import Image from "next/image"
import Link from "next/link"
import { FaWhatsapp } from "react-icons/fa"

type WhatsAppSectionProps = {
    title:string,
    subtext:string,
}

export const WhatsAppSection = ({title, subtext}: WhatsAppSectionProps) => {

    const whatsappNumber = "51931531046";
    const whatsappMessage = encodeURIComponent(`Hola, vi su pagina web Estetica y Nutricion y me gustaria obtener más información`);
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;


  return (
    <section className="max-w-5xl mx-auto px-4 pt-24 md:pt-32 font-m-poppins ">
        <div className="w-full bg-m-green-blank rounded-3xl py-14 space-y-6 px-6 shadow-xl relative">
            <div className="text-center space-y-4">
                <h2 className="font-m-poppins text-2xl md:text-3xl font-semibold text-m-green-dark">{title}</h2>
                <p className="text-sm text-m-green-dark max-w-3xl mx-auto">{subtext}</p>
            </div>
            <Link
            target="_blank" className="flex justify-center items-center  rounded-lg" href={whatsappLink}>
                <div className="group bg-white flex items-center gap-2 py-4 transition hover:bg-m-green hover:text-white rounded-full px-8 shadow-lg">
                    <FaWhatsapp className="text-m-green group-hover:text-white" size={20} />
                    <p className="font-semibold text-m-green group-hover:text-white">Agenda tu cita hoy mismo</p>
                </div>
            </Link>
        <Image src="/images/common/plus-green.png" alt="Onda Degradado" width={32} height={32} className="hidden xl:block absolute animate-pulseSoft -bottom-28 lg:-bottom-11 z-10 right-12" />
        <Image src="/images/common/plus-green.png" alt="Onda Degradado" width={12} height={12} className="hidden xl:block absolute animate-pulseSoft right-24 -top-6 lg:-top-6 z-10 lg:right-52" />
        <Image src="/images/common/plus-green.png" alt="Onda Degradado" width={32} height={32} className="hidden xl:block absolute animate-pulseSoft -top-8 z-10 left-6" />
        <Image src="/images/common/plus-green.png" alt="Onda Degradado" width={32} height={32} className="hidden xl:block absolute animate-pulseSoft top-40 z-10 -left-8" />
        <Image src="/images/common/plus-green.png" alt="Onda Degradado" width={32} height={32} className="hidden xl:block absolute animate-pulseSoft -bottom-20 md:-bottom-14 z-10 md:left-44" />
        <Image src="/images/common/plus-green.png" alt="Onda Degradado" width={24} height={24} className="md:hidden xl:block right-12 top-4 absolute animate-pulseSoft lg:top-12 z-10 lg:-right-8" />
        </div>
    </section>
  ) 
}