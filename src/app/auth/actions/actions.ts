'use server'

import { AuthLogin } from "@/types"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function login(formData: AuthLogin) {
    const supabase = await createClient()

    const data = {
        email: formData.email,
        password: formData.password,
    }

      const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

