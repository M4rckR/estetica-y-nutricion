'use server'

import { AuthLogin } from "@/types"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { RegisterType } from "@/types/auth/register"
import { createClient as createAdminClient } from '@supabase/supabase-js'

export async function login(formData: AuthLogin) {
    const supabase = await createClient()

    const data = {
        email: formData.email,
        password: formData.password,
    }

      const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        return { error: "Credenciales inválidas. Por favor, verifica tu correo y contraseña." }
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signOut() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
}
    

export async function register(formData: RegisterType) {
    const supabase = await createClient()
    

    const data = {
        email: formData.correo,
        password: formData.contraseña,
    }

    const { data:authResult, error:authError } = await supabase.auth.signUp(data)

    if (authError) {

        return { 
            error: authError.message || 'Error al crear la cuenta de autenticación',
            type: 'auth'
        }
    }

    const userId = authResult.user?.id

    const profileData = {
        user_id: userId,
        nombres: formData.nombres,
        dni: formData.dni,
        correo: formData.correo,
        distrito: formData.distrito,
        rol: 'paciente',
        follow_preview: formData.followPreview,
        created_at: new Date().toISOString(),
    }

    const supabaseAdmin = createAdminClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!, 
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const {error:profileError} = await supabaseAdmin.from('users').insert(profileData)

    if (profileError) {
        console.error('Error al insertar perfil:', profileError)
        return { 
            error: profileError.message || 'Error al crear el perfil de usuario',
            type: 'database',
            details: profileError // Para debugging en consola
        }
    }

    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/')
}