import { PatientList } from "@/components/admin/PatientList";
import { HeaderIntern } from "@/components/main/HeaderIntern";


export default async function AdminPacientes() {
    
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-12">
                <aside className="lg:col-span-4 2xl:col-span-3
                    px-4 py-4 md:p-8 bg-white lg:bg-m-green-dark
                   lg:sticky lg:top-0 lg:h-screen">
                    <HeaderIntern />
                   </aside>
                   <section className="lg:col-span-8 2xl:col-span-9 lg:py-16 xl:px-8"> 
                        <PatientList />
                   </section>
            </div>
        </>
    )
}