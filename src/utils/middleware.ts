import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // refreshing the auth token
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Obtener el rol de la tabla users
  let userRole = null;
  
  if (user) {
    const { data: userData } = await supabase
      .from('users')
      .select('rol')
      .eq('user_id', user.id)
      .single();
    
    userRole = userData?.rol;
  }

  // Verificación de roles para rutas protegidas
  if (request.nextUrl.pathname.startsWith("/admin") && userRole !== "doctor") {
    // Redirige a página de error si no es doctor
    console.log("userRole", userRole);
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return supabaseResponse;
}
