"use client"
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { testimonials } from "@/data/testimonials.data"
import Image from "next/image"
import { useEffect, useState } from "react"

export const Testimonials = () => {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if(!api) return 

        // Obtener informacion inicial
        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        // Escuchar evento de seleccion
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <section className="container mx-auto max-w-7xl px-4 pt-16 md:pt-24">
            <div className="bg-m-green-blank rounded-2xl p-6 py-8 md:py-12 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-4 items-center">
                <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl leading-8  font-medium text-m-green-dark text-center lg:text-left pb-2">
                        Testimonios reales de 
                        <span className="text-m-green block"> {` `}
                            nuestros pacientes
                        </span> 
                    </h2>
                    <p className="text-m-green-dark text-sm text-center lg:text-left font-in-poppins">Conoce los testimonios</p>
                </div>
                <div>
                    <div className="overflow-hidden">
                        <Carousel className="relative" setApi={setApi}>
                            <CarouselContent className="font-in-poppins -ml-4">
                                {testimonials.map((testimonial) => (
                                    <CarouselItem key={testimonial.id} className="pl-4 md:basis-[60%] lg:basis-[100%]">
                                        <div className="bg-white py-6 md:py-8 px-6  rounded-2xl h-full">
                                            <div className="flex flex-col justify-between h-full">
                                                <p className="text-m-gray-base text-sm md:text-base">&quot;{testimonial.description}&quot;</p>
                                                <div className="flex items-center gap-4 mt-6">

                                                    <div>
                                                        <p className="font-semibold text-m-green">{testimonial.name}</p>
                                                        <p className="text-sm text-in-gray">{testimonial.anio}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <div className="flex items-center justify-center lg:justify-start gap-4 relative pt-4 pl-4  ">
                                <button 
                                    className="bg-in-blue w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-in-blue/90 disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={() => api?.scrollPrev()}
                                    disabled={current === 1}
                                >
                                    <Image src="/svg/icon/arrow-right.svg" className="rotate-180" alt="arrow-left" width={36} height={36} />
                                </button>
                                <span className="text-in-gray-base font-medium">
                                    {current} de {count}
                                </span>
                                <button 
                                    className="bg-in-blue w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-in-blue/90 disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={() => api?.scrollNext()}
                                    disabled={current === count}
                                >
                                    <Image src="/svg/icon/arrow-right.svg" alt="arrow-right" width={36} height={36} />
                                </button>
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
        </section>
    )
}