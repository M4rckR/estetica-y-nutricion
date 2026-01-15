'use client'

import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { UsersType } from "@/types/users";
import { formatFullName } from "@/utils/format";
import { FaFileUpload, FaTrash } from "react-icons/fa";
import { BsFillInfoSquareFill } from "react-icons/bs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deletePatient } from "@/app/admin/actions/patients";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";
import {
  TableBody,
  TableCell,
  TableRow,
} from "../ui/table";

interface PatientListClientProps {
  patients: UsersType[];
}

export function PatientListClient({ patients }: PatientListClientProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<UsersType | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDeleteClick = (patient: UsersType) => {
    setSelectedPatient(patient);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedPatient) return;

    setIsDeleting(true);

    try {
      const result = await deletePatient(selectedPatient.user_id);

      if (result.error) {
        toast.error("Error al eliminar", {
          description: result.error,
        });
      } else {
        toast.success("Paciente eliminado", {
          description: "El paciente ha sido eliminado correctamente.",
        });
        setDeleteDialogOpen(false);
        router.refresh();
      }
    } catch (error) {
      toast.error("Error inesperado", {
        description: "Ocurrió un error al eliminar el paciente.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedPatient(null);
  };

  return (
    <>
      <TableBody>
        {patients.map((paciente: UsersType) => (
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
                <Button
                  variant="outline"
                  onClick={() => handleDeleteClick(paciente)}
                  className="border-red-500 text-red-500 hover:bg-red-50 cursor-pointer px-3"
                  title="Eliminar paciente"
                >
                  <FaTrash className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      {/* Modal de Confirmación de Eliminación */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-red-600">¿Eliminar paciente?</DialogTitle>
            <DialogDescription asChild>
              <div className="pt-4 space-y-4">
                <p>
                  Esta acción es <strong className="text-red-600">destructiva e irreversible</strong>.
                </p>
                <div>
                  <p className="mb-2">Se eliminará permanentemente:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>El paciente: <strong>{selectedPatient?.nombres ? formatFullName(selectedPatient.nombres) : "Sin nombre"}</strong></li>
                    <li>Su historia clínica</li>
                    <li>Todas sus consultas y documentos</li>
                    <li>Su cuenta de acceso</li>
                  </ul>
                </div>
                <p>¿Estás seguro de que deseas continuar?</p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelDelete}
              disabled={isDeleting}
              className="cursor-pointer"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
            >
              {isDeleting && <Spinner size="sm" className="mr-2 border-white border-t-transparent" />}
              {isDeleting ? "Eliminando..." : "Sí, eliminar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
