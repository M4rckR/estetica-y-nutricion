import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // La función crea y devuelve el cliente con las variables de entorno.
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}