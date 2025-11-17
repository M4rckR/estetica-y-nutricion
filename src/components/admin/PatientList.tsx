import { createClient } from "@/utils/supabase/server";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Link from "next/link";
import { HeadingDoctor } from "./HeadingDoctor";
import { UsersType } from "@/types/users";
import { formatFullName } from "@/utils/format";
import { FaFileUpload } from "react-icons/fa";
import { BsFillInfoSquareFill } from "react-icons/bs";


export async function PatientList({
  searchParams,
}: {
  searchParams?: { page?: string; search?: string; sort?: string };
}) {
  const page = parseInt(searchParams?.page || "1", 10);
  const search = searchParams?.search || "";
  const sort = searchParams?.sort || "recent"; // 'recent' o 'oldest'
  const perPage = 50; // Límite por página para controlar carga y costos

  // Obtener pacientes directamente desde la tabla users filtrando por rol
  const supabase = await createClient();
  const { data: pacientesData, error } = await supabase
    .from("users")
    .select("*")
    .eq("rol", "paciente")
    .order("created_at", { ascending: sort === "oldest" });

  if (error) {
    console.error("Error obteniendo pacientes:", error);
    return <div>Error cargando pacientes.</div>;
  }

  let pacientesConDatos = pacientesData || [];

  // Filtra por búsqueda si hay término
  if (search) {
    pacientesConDatos = pacientesConDatos.filter(
      (paciente) =>
        paciente.nombres?.toLowerCase().includes(search.toLowerCase()) ||
        paciente.correo?.toLowerCase().includes(search.toLowerCase()) ||
        paciente.dni?.includes(search)
    );
  }

  // Implementar paginación manual
  const totalPacientes = pacientesConDatos.length;
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  pacientesConDatos = pacientesConDatos.slice(startIndex, endIndex);

  // Calcular si hay más páginas
  const hasNext = endIndex < totalPacientes;
  const hasPrev = page > 1;



  return (
    <section className="max-w-7xl mx-auto px-4">

      <HeadingDoctor />
      {/* Barra de búsqueda y filtro */}

      <div className="space-y-8 max-w-4xl mx-auto py-4 md:py-8 lg:py-10">
        <div className="flex flex-col gap-4 md:flex-row justify-between md:items-center">
          <form method="GET" className="flex order-2 md:order-1 items-center gap-2 w-full md:w-auto">
            <input type="hidden" name="search" value={search} />
            <Select name="sort" defaultValue={sort}>
              <SelectTrigger className="w-full md:w-48 h-10">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Más reciente</SelectItem>
                <SelectItem value="oldest">Más antiguo</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" variant="outline" className="h-10 px-6 whitespace-nowrap">
              Aplicar
            </Button>
          </form>
          <form method="GET" className="flex order-1 md:order-2 items-center gap-2 w-full md:flex-1 md:max-w-2xl">
            <Input
              type="text"
              name="search"
              placeholder="Buscar por nombre o email..."
              defaultValue={search}
              className="h-10 text-sm"
            />
            <Button
              type="submit"
              className="bg-m-green text-white hover:bg-m-green-dark h-10 px-6 whitespace-nowrap"
            >
              Buscar
            </Button>
          </form>
        </div>
        <Table>
          <TableBody>
            {pacientesConDatos.map((paciente: UsersType) => (
              <TableRow key={paciente.user_id}>
                <TableCell>
                  {paciente.nombres ? formatFullName(paciente.nombres) : "Sin nombre"}
                </TableCell>
                <TableCell className="text-end">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/pacientes/${paciente.user_id}/historia-clinica`}
                    >
                      <Button 
                        variant="outline" 
                        className="border-m-green text-m-green hover:bg-m-green-light cursor-pointer whitespace-nowrap"
                      >
                        <BsFillInfoSquareFill className="w-4 h-4 sm:hidden" />
                        <p className="text-sm hidden sm:block">
                          Historia clínica
                        </p>
                      </Button>
                    </Link>
                    <Link
                      href={`/admin/pacientes/${paciente.user_id}/subir-documento`}
                    >
                      <Button className="bg-m-green-light text-m-green-dark hover:bg-m-green hover:text-white cursor-pointer whitespace-nowrap">
                        <FaFileUpload className="w-4 h-4 sm:hidden" />
                        <p className="text-sm hidden sm:block">
                          Subir consulta
                        </p>
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Controles de paginación */}
      <div className="flex justify-center mt-8 space-x-4">
        {hasPrev && (
          <Link
            href={`/admin/pacientes?page=${page - 1}${
              search ? `&search=${encodeURIComponent(search)}` : ""
            }${sort !== "recent" ? `&sort=${sort}` : ""}`}
          >
            <Button variant="outline">Anterior</Button>
          </Link>
        )}
        <span>Página {page}</span>
        {hasNext && (
          <Link
            href={`/admin/pacientes?page=${page + 1}${
              search ? `&search=${encodeURIComponent(search)}` : ""
            }${sort !== "recent" ? `&sort=${sort}` : ""}`}
          >
            <Button variant="outline">Siguiente</Button>
          </Link>
        )}
      </div>

      {pacientesConDatos.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No hay pacientes registrados.
        </p>
      )}
    </section>
  );
}
