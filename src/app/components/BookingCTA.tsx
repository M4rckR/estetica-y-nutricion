import Image from "next/image";

export const BookingCTA = () => {
  return (
    <section className="max-w-7xl mx-auto pt-12 md:pt-24">
      <div className="relative px-4">
        <Image
          src="/images/cta-booking.png"
          alt="Booking CTA"
          width={800}
          height={1080}
          className="w-full h-auto"
        />
        <p className="hidden sm:block absolute top-1/2 translate-y-[-50%] text-3xl left-12 text-m-green-dark">Reserva tu <span className="text-m-green">cita</span> </p>
      </div>
    </section>
  );
};
