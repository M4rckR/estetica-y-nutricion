import { Logo } from "@/components/common/Logo";
import { Footer } from "@/components/common/Footer";
import { WhatsAppFloating } from "@/components/common/WhatsAppFloating";
import { WhatsAppSection } from "@/components/common/WhatsAppSection";
// import { BookingCTA } from "@/components/main/BookingCTA";
import { CarouselHomeCta } from "@/components/main/CarouselHomeCta";
import { HeaderMain } from "@/components/main/HeaderMain";
import { LocationsSection } from "@/components/main/LocationsSection";
import { PlansSection } from "@/components/main/PlansSection";
import { ReserveDate } from "@/components/main/ReserveDate";
import { ServicesSection } from "@/components/main/ServicesSection";
import { Testimonials } from "@/components/main/Testimonials";
import { TrustCTA } from "@/components/main/TrustCTA";

// Cambiar a false para ocultar la landing y mostrar solo el logo
const SITE_ACTIVE = false;

export default async function Home() {

  if (!SITE_ACTIVE) {
    return (
      <div className="min-h-screen bg-m-green-dark flex items-center justify-center">
        <Logo textColor="white" />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <aside className="lg:col-span-4 2xl:col-span-3
                   bg-m-green-dark px-4 py-8 md:p-8
                   lg:sticky lg:top-0 lg:h-screen">
          <HeaderMain />
        </aside>
        <section className="lg:col-span-8 2xl:col-span-9 py-8 xl:px-8">
          {/* Main content */}
          <CarouselHomeCta />
          <ReserveDate />
          <TrustCTA />
          <ServicesSection />
          <PlansSection />
          <LocationsSection />
          <Testimonials />
          {/* <BookingCTA /> */}
          <WhatsAppSection title="Reserva tu consulta nutricional personalizada" subtext="Más de 5,000 pacientes satisfechos" />
          <WhatsAppFloating />
          <Footer />
        </section>
      </div>
    </>
  );
}
