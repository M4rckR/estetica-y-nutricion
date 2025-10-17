"use client";
import { createBrowserSupabase } from "@/utils/supabase/client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";

export const ButtonsLog = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();
  const supabase = useMemo(() => createBrowserSupabase(), []);

  useEffect(() => {

    // Estado inicial del usuario
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsLoggedIn(!!user);
    });

    // Suscripción a cambios de auth
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session?.user);
      }
    );

    return () => subscription?.subscription.unsubscribe();
  }, [supabase]);

  const handleLogOut = async() => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <div className="flex gap-2 justify-end max-w-7xl">
      {!isLoggedIn && (
        <Button
          variant="secondary"
          className="hover:bg-m-green-dark text-xs bg-m-green text-white cursor-pointer rounded-2xl px-10 py-3"
          onClick={() => router.push("/auth/login")}
        >
          Iniciar sesión
        </Button>
      )}

      {!isLoggedIn && (
        <Button
          variant="secondary"
          className="hover:bg-m-green-dark text-xs bg-m-green text-white cursor-pointer rounded-2xl px-10 py-3"
          onClick={() => router.push("/auth/register")}
        >
          Registrarme
        </Button>
      )}

      {isLoggedIn && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              className="hover:bg-m-green-dark text-xs bg-m-green text-white cursor-pointer rounded-2xl px-10 py-3"
            >
              <User className="w-4 h-4 mr-2" />
              Mi cuenta
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => router.push("/perfil")}>
              Ver mi perfil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogOut}>
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
