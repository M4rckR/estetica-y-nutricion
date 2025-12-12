import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { UsersType } from "@/types/users";
import { formatFirstName } from "@/utils/format";

interface UserDropdownProps {
  userProfile: UsersType;
}

export function UserDropdown({ userProfile }: UserDropdownProps) {
  const displayName = userProfile.rol === 'doctor' 
    ? 'Admin' 
    : formatFirstName(userProfile.nombres);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-sm cursor-pointer bg-m-green text-white px-4 py-2 rounded-full transition flex items-center gap-2">
          <User className="w-4 h-4" />
          {displayName}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {userProfile.rol !== 'doctor' && (
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/perfil/consultas">Ver mi perfil</Link>
          </DropdownMenuItem>
        )}

        {userProfile.rol === 'doctor' && (
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/admin/pacientes">Subir consulta</Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/auth/signout">Cerrar sesión</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

