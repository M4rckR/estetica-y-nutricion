import { RegisterSection } from "@/components/auth/register/RegisterSection";
import { HeaderMain } from "@/components/main/HeaderMain";

export default function RegisterPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12">
        <aside className="lg:col-span-4 2xl:col-span-3
                   bg-m-green-dark px-4 py-8 md:p-8
                   lg:sticky lg:top-0 lg:h-screen">
      <HeaderMain />
      </aside>

      <main className="lg:col-span-8 2xl:col-span-9 py-12 xl:px-8">
        <RegisterSection />
      </main>
    </div>
  );
}