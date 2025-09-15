import { BookingCTA } from "@/components/main/BookingCTA";
import { ButtonsLog } from "@/components/main/ButtonsLog";
import { CarouselHomeCta } from "@/components/main/CarouselHomeCta";
import { HeaderMain } from "@/components/main/HeaderMain";
import { LocationsSection } from "@/components/main/LocationsSection";
import { PlansSection } from "@/components/main/PlansSection";
import { ReserveDate } from "@/components/main/ReserveDate";
import { ServicesSection } from "@/components/main/ServicesSection";
import { Testimonials } from "@/components/main/Testimonials";
import { TrustCTA } from "@/components/main/TrustCTA";
import { Footer } from "react-day-picker";

export default async function Home() {

  

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
          <ButtonsLog />
          <CarouselHomeCta />
          <ReserveDate />
          <TrustCTA />
          <ServicesSection />
          <PlansSection />
          <LocationsSection />
          <Testimonials />
          <BookingCTA />
          <Footer />
        </section>
      </div>
    </>
  );
}
