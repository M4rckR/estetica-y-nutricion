import { FormConsultaPatient } from "@/components/admin/pacientes/FormConsultaPatient";
import { HeaderMain } from "@/components/main/HeaderMain";

type Props = {
  params: Promise<{ patientId: string }>;
};

export default async function SubirDocumento({ params }: Props) {
  const { patientId } = await params;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12">
      <aside
        className="lg:col-span-4 2xl:col-span-3
                               bg-m-green-dark px-4 py-8 md:p-8
                               lg:sticky lg:top-0 lg:h-screen"
      >
        <HeaderMain />
      </aside>
      <section className="lg:col-span-8 2xl:col-span-9 py-16 xl:px-8">
        <FormConsultaPatient patientId={patientId} />
      </section>
    </div>
  );
}
