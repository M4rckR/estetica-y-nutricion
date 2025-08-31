import { Footer } from "@/components/common/Footer";
import { HeaderMain } from "./components/HeaderMain";
import { TrustCTA } from "./components/main/TrustCTA";
import { LocationsSection } from "./components/LocationsSection";
import { PlansSection } from "./components/PlansSection";
import { Testimonials } from "./components/Testimonials";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <aside className="lg:col-span-4 2xl:col-span-3
                   bg-m-green-dark px-4 py-8 md:p-8
                   lg:sticky lg:top-0 lg:h-screen">
          <HeaderMain />
        </aside>
        <section className="lg:col-span-8 2xl:col-span-9 py-8 md:p-8">
          {/* Main content */}
          <TrustCTA />
          <LocationsSection />
          <Testimonials />
          <PlansSection />
          <Footer />
        </section>
      </div>
    </>
  );
}
