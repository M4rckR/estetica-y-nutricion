import { supabaseAdmin } from "@/utils/supabase/admin";
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
import { User } from "@supabase/supabase-js";
import { HeadingDoctor } from "./HeadingDoctor";

export async function PatientList({
  searchParams,
}: {
  searchParams?: { page?: string; search?: string; sort?: string };
}) {
  const page = parseInt(searchParams?.page || "1", 10);
  const search = searchParams?.search || "";
  const sort = searchParams?.sort || "recent"; // 'recent' o 'oldest'
  const perPage = 50; // Límite por página para controlar carga y costos

  // Obtén usuarios de auth con paginación
  const { data: users, error } = await supabaseAdmin.auth.admin.listUsers({
    page,
    perPage,
  });
  if (error) {
    console.error("Error obteniendo usuarios:", error);
    return <div>Error cargando pacientes.</div>;
  }

  // Filtra usuarios que NO sean doctores (role !== 'doctor')
  const pacientesAuth = users.users.filter(
    (user: User) => user.app_metadata?.role !== "doctor"
  );

  // Para cada paciente, obtén datos adicionales de la tabla 'users' (ej. first_name, last_name)
  const supabase = await createClient();
  let pacientesConDatos = await Promise.all(
    pacientesAuth.map(async (user: User) => {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", user.id)
        .single();
      return { ...user, profile: data };
    })
  );

  // Filtra por búsqueda si hay término
  if (search) {
    pacientesConDatos = pacientesConDatos.filter(
      (paciente) =>
        `${paciente.profile?.first_name || ""} ${
          paciente.profile?.last_name || ""
        }`
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (paciente.email?.toLowerCase().includes(search.toLowerCase()) ?? false)
    );
  }

  // Ordena por fecha de creación
  pacientesConDatos.sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return sort === "oldest" ? dateA - dateB : dateB - dateA; // recent: más nuevo primero
  });

  // Calcular si hay más páginas (basado en total de usuarios filtrados, pero aproximado)
  const hasNext = users.total > page * perPage;
  const hasPrev = page > 1;



  return (
    <section className="max-w-7xl mx-auto px-4">

      <HeadingDoctor />
      {/* Barra de búsqueda y filtro */}

      <div className="mt-16 space-y-8 max-w-4xl mx-auto">
        <div className=" flex justify-between space-x-4">
          <form method="GET" className="flex items-center space-x-2">
            <input type="hidden" name="search" value={search} />
            <Select name="sort" defaultValue={sort}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Más reciente</SelectItem>
                <SelectItem value="oldest">Más antiguo</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" variant="outline">
              Aplicar
            </Button>
          </form>
          <form method="GET" className="flex space-x-2 max-w-md">
            <Input
              type="text"
              name="search"
              placeholder="Buscar por nombre o email..."
              defaultValue={search}
              className="flex-1"
            />
            <Button
              type="submit"
              className="bg-m-green text-white hover:bg-m-green-dark"
            >
              Buscar
            </Button>
          </form>
        </div>
        <Table>
          {/* <TableHeader>
            <TableRow>
              <TableHead>Nombre del Paciente</TableHead>
              <TableHead className="text-end">Acción</TableHead>
            </TableRow>
          </TableHeader> */}
          <TableBody>
            {pacientesConDatos.map((paciente) => (
              <TableRow key={paciente.id}>
                <TableCell>
                  {paciente.profile?.first_name || "Sin nombre"}{" "}
                  {paciente.profile?.last_name || ""}
                </TableCell>
                <TableCell className="text-end">
                  <Link
                    href={`/admin/pacientes/${paciente.id}/subir-documento`}
                  >
                    <Button className="bg-m-green-light text-m-green-dark hover:bg-m-green hover:text-white cursor-pointer">
                      Subir Consulta
                    </Button>
                  </Link>
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
