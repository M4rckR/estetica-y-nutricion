import { PatientList } from "@/components/admin/PatientList";
import { HeaderMain } from "@/components/main/HeaderMain";
export default async function AdminPacientes() {
    
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-12">
                <aside className="lg:col-span-4 2xl:col-span-3
                   bg-m-green-dark px-4 py-8 md:p-8
                   lg:sticky lg:top-0 lg:h-screen">
                    <HeaderMain />
                   </aside>
                   <section className="lg:col-span-8 2xl:col-span-9 py-16 xl:px-8"> 
                        <PatientList />
                   </section>
            </div>
        </>
    )
}