import { createClient } from "@/utils/supabase/server";
import { UsersType } from "@/types/users";

/**
 * Obtiene el perfil completo del usuario autenticado desde la tabla users
 * @returns El perfil del usuario o null si no está autenticado o no existe
 */
export async function getUserProfile(): Promise<UsersType | null> {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error) {
    console.error("Error al obtener el perfil:", error);
    return null;
  }

  return data;
}

