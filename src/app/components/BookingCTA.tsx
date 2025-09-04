'use client'
import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";

export const BookingCTA = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section data-aos="fade-up" data-aos-duration="1200" className="max-w-7xl mx-auto pt-12 md:pt-24">
      <div className="relative px-4">
        <Image
          src="/images/cta-booking.png"
          alt="Booking CTA"
          width={800}
          height={1080}
          className="w-full h-auto"
        />
        <p className="hidden sm:block absolute top-1/2 translate-y-[-50%] text-3xl left-12 text-m-green-dark">
          Reserva tu <span className="text-m-green">cita</span>{" "}
        </p>
      </div>
    </section>
  );
};
