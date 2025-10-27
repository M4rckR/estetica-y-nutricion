"use client";

import { createClient } from "@/utils/supabase/client";
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { ChevronDown } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Consulta } from "@/types";
import { PostgrestError } from "@supabase/supabase-js";

function ConsultaAccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 group",
          className
        )}
        {...props}
      >
        {children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function UserConsultaView({ userId, sortOrder = "desc" }: { userId: string; sortOrder?: "asc" | "desc" }) {
  const [sort, setSort] = useState(sortOrder);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    const fetchConsultas = async () => {
      const supabase = await createClient();
      const { data: consultasData, error: fetchError } = await supabase
        .from("consultas")
        .select("id, created_at, titulo, recomendacion, pdf_path, paciente_id")
        .eq("paciente_id", userId)
        .order("created_at", { ascending: sort === "asc" });
      setConsultas(consultasData || []);
      setError(fetchError);
    };
    fetchConsultas();
  }, [userId, sort]);

  if (error) {
    console.error("Error fetching consultas:", error);
    return (
      <section className="max-w-5xl mx-auto px-4 py-8 bg-m-green-blank rounded-lg shadow-md">
        <p className="text-center text-m-gray-base">Error al cargar las consultas.</p>
      </section>
    );
  }

  if (!consultas || consultas.length === 0) {
    return (
      <section className="max-w-5xl mx-auto px-4 py-8 bg-m-green-blank rounded-lg shadow-md">
        <h2 className="text-center text-2xl mb-8 text-m-green-dark">Recomendaciones</h2>
        <p className="text-center text-m-gray-base">No tienes consultas.</p>
      </section>
    );
  }

  return (
    <section className="px-4">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="hidden text-2xl text-m-green-dark">Recomendaciones</h2>
          <div className="flex justify-between items-center gap-2 w-full">
            <label htmlFor="sort" className="text-m-gray-base text-sm">Ordenar por:</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-m-green py-5 rounded-full cursor-pointer px-6 bg-m-green text-white hover:bg-m-green hover:text-white">
                  {sort === "desc" ? "Más recientes" : "Más antiguos"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-2xl">
                <DropdownMenuItem className="px-6" onClick={() => setSort("desc")}>Más recientes</DropdownMenuItem>
                <DropdownMenuItem className="px-6" onClick={() => setSort("asc")}>Más antiguos</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="max-h-96 border-0 overflow-y-auto  rounded-md bg-white sm:max-h-[500px] md:max-h-[600px]">
          <Accordion type="single" collapsible>
            {consultas.map((consulta) => {

              return (
                <AccordionItem className="border-b border-gray-200 font-m-poppins" key={consulta.id} value={consulta.id.toString()}>
                  <ConsultaAccordionTrigger className="text-m-gray-base text-sm sm:text-base flex items-center justify-between">
                    <span className="flex-1 text-left text-xs md:text-base text-m-green-dark lg:text-lg">
                      <span className="hidden md:inline">Consulta</span> 
                      <span className="md:hidden">Con.</span> 
                      - {format(new Date(consulta.created_at), "dd/MM/yyyy")}</span>
                    <span className="text-m-green cursor-pointer bg-white border-2 border-[#8CC63E] px-4 md:px-6 rounded-full py-2 !hover:no-underline font-medium text-xs md:text-sm flex items-center gap-2">
                      Ver más
                      <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180" />
                    </span>
                  </ConsultaAccordionTrigger>
                  <AccordionContent className="pb-4">
                    <h4 className="font-semibold mb-2 text-m-green-dark text-sm sm:text-base">Recomendación del Doctor:</h4>
                    <p className="mb-4 text-m-gray-base text-sm sm:text-base">{consulta.recomendacion}</p>
                    {consulta.pdf_path && (
                      <Button asChild variant="outline" className=" py-5 px-6 rounded-full bg-m-green-light hover:bg-m-green-light text-xs sm:text-sm border-none">
                        <a href={`/api/download?path=${consulta.pdf_path}`} target="_blank" download>
                          Descargar mi consulta
                        </a>
                      </Button>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
